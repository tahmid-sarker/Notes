import { useEffect } from 'react';
import { getProducts } from '../api/productsAPI';
import { useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts()
        .then(response => setProducts(response.data))
        .catch(error => console.error("Error fetching products:", error));
    }, []);
    // console.log(products)

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Products Data: {products.length}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product.id} className="card bg-base-100 shadow-md p-4">
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-lg">Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;