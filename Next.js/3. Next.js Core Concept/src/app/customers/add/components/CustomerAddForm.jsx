"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

export default function CustomerAddForm() {
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const from = e.target;
        const name = from.name.value;
        const payload = { name };
        const res = await fetch('http://localhost:3000/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        from.reset();
        router.push('/customers');
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Customer Name" required />
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded ml-2 cursor-pointer'>Add Customer</button>
            </form>
        </div>
    )
}