import UserInfo from '@/components/UserInfo'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1 className='text-3xl font-bold underline text-center mt-10'>Welcome to Next.js Core Concepts - Part 3</h1>
      <div className='text-center'>
        <p className='text-lg font-medium mt-5'>From Client Side Session Fetching:</p>
        <UserInfo />
        <p className='text-lg font-medium mt-5'>From Server Side Session Fetching:</p>
        <p>{JSON.stringify(session)}</p>
      </div>
    </div>
  )
}