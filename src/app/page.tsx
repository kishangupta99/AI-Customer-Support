import HomeClient from "@/components/HomeClient";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getSession()
  console.log(session);

  if (!session?.user?.email) {
    return null
  }

  return (
    <>
      <HomeClient email={session?.user?.email} />
    </>
  );
}
