import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <nav className='flex justify-center'>
            <ul className='flex justify-between w-1/3'>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/about'>About</Link></li>
                <li><Link href='/services'>Services</Link></li>
                <li><Link href='/contact'>Contact</Link></li>
            </ul>
        </nav>
    )
}

export default Header