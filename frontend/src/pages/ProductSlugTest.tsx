import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productApi, Product } from '@/services/api';

const ProductSlugTest: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getProducts({ limit: 10 });
        if (response.success) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-8">Loading products...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Slug Test</h1>
      <p className="mb-6 text-gray-600">
        Click on any product to view it using slug-based URL
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-lg font-bold text-green-600 mb-4">₹{product.price}</p>
            
            <div className="space-y-2">
              {product.slug ? (
                <Link 
                  to={`/product/slug/${product.slug}`}
                  className="block w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
                >
                  View by Slug
                </Link>
              ) : (
                <div className="text-gray-500 text-center py-2">No slug available</div>
              )}
              
              <Link 
                to={`/product/${product.id}`}
                className="block w-full bg-gray-500 text-white text-center py-2 rounded hover:bg-gray-600"
              >
                View by ID
              </Link>
            </div>
            
            {product.slug && (
              <p className="text-xs text-gray-500 mt-2">
                Slug: {product.slug}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlugTest;