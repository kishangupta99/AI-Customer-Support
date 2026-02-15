// all logic of cookies for auth(login and signup session).....
import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { message: "No authorization code found" },
      { status: 400 }
    );
  }

  try {
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;

    // Exchange code for token
    const session = await scalekit.authenticateWithCode(
      code,
      redirectUri
    );

    console.log("Token:", session);

    // Redirect to homepage after success
    const response =  NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);


    response.cookies.set("access_token", session.accessToken, {
        httpOnly:true,
        maxAge:24*60*60*1000,
        secure:false,
        path:"/"
    })

    return response;

  } catch (error) {
    console.error("OAuth Error:", error);
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}
