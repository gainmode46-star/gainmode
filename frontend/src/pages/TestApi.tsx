import React, { useState, useEffect } from 'react';
import { productApi } from '@/services/api';

const TestApi: React.FC = () => {
  const [status, setStatus] = useState('Testing...');
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testApi = async () => {
      try {
        console.log('Testing API connection...');
        setStatus('Connecting to API...');
        
        const response = await productApi.getProducts({ limit: 5 });
        console.log('API Response:', response);
        
        if (response.success) {
          setProducts(response.data);
          setStatus(`Success! Found ${response.data.length} products`);
        } else {
          setError('API returned success: false');
          setStatus('API Error');
        }
      } catch (err) {
        console.error('API Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setStatus('Connection Failed');
      }
    };

    testApi();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">API Connection Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Status: {status}</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
              <h3 className="font-semibold text-red-800">Error:</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <div className="mb-4">
            <h3 className="font-semibold mb-2">API Configuration:</h3>
            <p>Base URL: http://localhost:3000/api</p>
            <p>Endpoint: /products</p>
          </div>
        </div>

        {products.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Products ({products.length})</h2>
            <div className="grid gap-4">
              {products.map((product, index) => (
                <div key={product.id || index} className="border p-4 rounded">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p>Price: ₹{product.price}</p>
                  <p>Category: {product.category}</p>
                  <p>Brand: {product.brand}</p>
                  {product.featured && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Featured</span>}
                  {product.trending && <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm ml-2">Trending</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestApi;