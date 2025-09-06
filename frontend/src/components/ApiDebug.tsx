import React, { useState, useEffect } from 'react';
import { productApi } from '@/services/api';

const ApiDebug: React.FC = () => {
  const [status, setStatus] = useState('Checking...');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testApi = async () => {
      try {
        console.log('Testing API...');
        const response = await productApi.getProducts({ limit: 3 });
        console.log('Response:', response);
        
        if (response.success) {
          setStatus(`✅ Success - ${response.data.length} products`);
          setData(response.data);
        } else {
          setStatus('❌ API returned success: false');
        }
      } catch (err) {
        console.error('API Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setStatus('❌ Connection failed');
      }
    };

    testApi();
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded shadow-lg border z-50 max-w-sm">
      <h3 className="font-bold mb-2">API Debug</h3>
      <p className="text-sm mb-2">Status: {status}</p>
      {error && <p className="text-red-600 text-xs mb-2">Error: {error}</p>}
      {data && (
        <div className="text-xs">
          <p>Products: {data.length}</p>
          <p>First: {data[0]?.name}</p>
        </div>
      )}
    </div>
  );
};

export default ApiDebug;