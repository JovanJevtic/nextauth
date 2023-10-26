import { getServerSession } from 'next-auth'
import React from 'react'

const Profile = async () => {
    const session = await getServerSession();

    return (
    <div>
        <h1>{session?.user?.name}</h1>
    </div>
  )
}

export default Profile  