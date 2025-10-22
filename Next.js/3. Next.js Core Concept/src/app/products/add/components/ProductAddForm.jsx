"use client"
import { postProducts } from '@/app/actions/products/postProducts';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function ProductAddForm() {
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const from = e.target;
        const name = from.name.value;
        const payload = { name };
        const products = await postProducts(payload);
        from.reset();
        router.push('/products');
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Product Name" required />
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded ml-2 cursor-pointer'>Add Products</button>
            </form>
        </div>
    )
}