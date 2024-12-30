



import React, { useState, useEffect } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:4000/admin/orders"); // Adjust this URL if needed
        if (response.ok) {
          const data = await response.json();
          setOrders(data.data); // Use `data.data` if the API returns data in this structure
        } else {
          console.error("Failed to fetch orders:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update order status and send it to the backend
  const handleStatusChange = (id, newStatus) => {
    // Update the status of the selected order in state
    const updatedOrders = orders.map((order) =>
      order.order_id === id ? { ...order, order_status: newStatus } : order
    );
    setOrders(updatedOrders);

    // Send the updated status to the backend along with the order_id
    updateTrackingDetails(id, newStatus, null);
  };

  // Update delivery date and send it to the backend
  const handleDeliveryDateChange = (id, newDate) => {
    // Update the delivery date for the selected order in state
    const updatedOrders = orders.map((order) =>
      order.order_id === id ? { ...order, delivery_date: newDate } : order
    );
    setOrders(updatedOrders);

    // Send the updated delivery date to the backend along with the order_id
    updateTrackingDetails(id, null, newDate);
  };

  // Send updates to backend API
  const updateTrackingDetails = async (order_id, order_status, delivery_date) => {
    try {
      const data = { order_id };

      if (order_status !== null) data.order_status = order_status;
      if (delivery_date !== null) data.delivery_date = delivery_date;

      const response = await fetch("http://localhost:4000/admin/tracking/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send the data dynamically based on changes
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Tracking details updated successfully");
      } else {
        console.error("Error updating tracking details:", result.error);
      }
    } catch (error) {
      console.error("Error sending update request:", error);
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="admin-orders-container">
      <h2>Admin Order Management</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Payment Method</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Order Date</th>
            <th>Payment Date</th>
            <th>Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.cust_name}</td>
              <td>{order.payment_method}</td>
              <td>${order.payment_amount.toFixed(2)}</td>
              <td>
                <select
                  value={order.order_status}
                  onChange={(e) => handleStatusChange(order.order_id, e.target.value)} // Pass the order_id here
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  
                </select>
              </td>
              <td>{new Date(order.Order_date).toLocaleDateString()}</td>
              <td>{new Date(order.payment_date).toLocaleDateString()}</td>
              <td>
                <input
                  type="date"
                  value={order.delivery_date || ""} // Set delivery date or empty string if undefined
                  onChange={(e) => handleDeliveryDateChange(order.order_id, e.target.value)} // Pass the order_id here
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;

