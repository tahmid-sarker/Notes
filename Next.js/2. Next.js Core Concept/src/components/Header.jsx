import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <nav className='flex justify-center'>
            <ul className='flex justify-between w-1/3'>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/about'>About</Link></li>
                <li><Link href='/users'>Users</Link></li>
                <li><Link href='/posts'>Posts</Link></li>
            </ul>
        </nav>
    )
}