import Image from 'next/image'
import React from 'react'

export default function About() {
  return (
    <section className='place-content-center place-items-center'>
      <h1 className='text-3xl font-bold underline'>About Page</h1>
      <div>
        <p className='mt-4'>This is the about page of our Next.js Core Concepts Part 2 application.</p>
        <h1 className='text-2xl font-semibold mt-6'>Image of Tahmid</h1>
        <Image src='/tahmid.png' alt='Tahmid Image' width={300} height={300} className='mt-4'/>
      </div>
    </section>
  )
}