"use client";
import Link from 'next/link'
import React from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { useSession } from 'next-auth/react'

export default function Header() {
    const session = useSession();
    return (
        <nav className='flex justify-center'>
            <ul className='flex justify-between items-center w-6/12 mx-auto'>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/customers'>Customers</Link></li>
                <li><Link href='/customers/add'>Add Customer</Link></li>
                <li><Link href='/products'>Products</Link></li>
                <li><Link href='/products/add'>Add Products</Link></li>
                <li>{session.data?.user ? null : <Link href='/register'>Register</Link>}</li>
                <li>{session.data?.user ? <LogoutButton /> : <LoginButton />}</li>
            </ul>
        </nav>
    )
}