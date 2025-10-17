"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

export default function About() {
  const router = useRouter();
  const handleNavigation = () => {
    router.push('/about/address');
  }
  return (
    <section>
        <p>This is the About Page.</p>
        <button onClick={handleNavigation}>Click Address</button>
    </section>
  )
}