import DashboardClient from '@/components/DashboardClient'
import { getSession } from '@/lib/getSession'
import React from 'react'

async function page() {

  const session = await getSession()
  
  if (!session?.user?.id) {
    return null; // or redirect("/login")
  }

  return (
    <>
      <DashboardClient ownerId={session.user.id!}/>
    </>
  )
}

export default page