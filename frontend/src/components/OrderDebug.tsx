import React from 'react';
import { useAuth } from '@/context/AuthContext';

const OrderDebug: React.FC = () => {
  const { orders, user } = useAuth();

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <p>User: {user ? user.email : 'Not logged in'}</p>
      <p>Orders count: {orders.length}</p>
      <p>LocalStorage orders: {localStorage.getItem('nutri_orders') ? JSON.parse(localStorage.getItem('nutri_orders') || '[]').length : 0}</p>
      {orders.length > 0 && (
        <div className="mt-2">
          <p className="font-semibold">Last order:</p>
          <p>#{orders[0].orderNumber}</p>
          <p>Total: ₹{orders[0].total}</p>
          <p>Items: {orders[0].items.length}</p>
        </div>
      )}
    </div>
  );
};

export default OrderDebug;