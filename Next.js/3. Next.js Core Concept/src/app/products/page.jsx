import React from 'react'
import { getProducts } from '../actions/products/getProducts';

export default async function Products() {
    const products = await getProducts();
    return (
        <div>
            {products.map(product => (
                <div key={product._id}>
                    <h2>{product.name}</h2>
                </div>
            ))}
        </div>
    )
}