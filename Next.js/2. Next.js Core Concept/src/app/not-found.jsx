import Link from 'next/link'
import React from 'react'

export default function NotFound404() {
  return (
    <div>
        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded">
          Go to Home
        </Link>
    </div>
  )
}