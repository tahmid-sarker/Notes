"use client";

import { useSession } from 'next-auth/react'
import React from 'react'

export default function UserInfo() {
    const session = useSession(); // This session we found from client side. To get session on server side, we have to use a different approach.
    return (
        <div>
            <p>{JSON.stringify(session)}</p>
        </div>
    )
}