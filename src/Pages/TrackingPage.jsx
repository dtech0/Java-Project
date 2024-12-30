
import React, { useState, useEffect } from 'react';

const TrackingPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('userId');

        if (!userId) {
          setError('User is not authenticated');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:4000/user/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cust_id: userId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }

        const data = await response.json();

        if (data.Success && data.orders) {
          setOrders(data.orders);
        } else {
          setError('No orders found');
        }
      } catch (err) {
        setError(err.message || 'Error fetching order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>All Orders and Tracking Details</h1>
      <div>
        {orders.map((order, index) => (
          <div
            key={order.order_id}
            style={{ borderBottom: '1px solid #ddd', padding: '10px' }}
          >
            <h3>Order No: {index + 1}</h3>
            <p>Order Date: {new Date(order.Order_date).toLocaleDateString()}</p>
            <p>Amount: ${order.payment_amount}</p>
            <p>Payment Method: {order.payment_method}</p>
            <p>
              Status:{' '}
              {order.order_status
                ? Array.from(new Set(order.order_status.split(','))).join(', ')
                : 'Not available'}
            </p>
            <p>
              Delivery Dates:{' '}
              {order.delivery_dates
                ? order.delivery_dates.split(',').join(', ')
                : 'Not available'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingPage;
