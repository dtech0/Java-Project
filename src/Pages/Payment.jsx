
/*
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Payment.css';

const Payment = () => {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);

  const orderId = localStorage.getItem('order_id');
  const customerId = localStorage.getItem('userId');

  useEffect(() => {
    const storedOrderAmount = localStorage.getItem('order_amount');
    if (storedOrderAmount) {
      setOrderAmount(parseFloat(storedOrderAmount));
    }

    if (!orderId || !storedOrderAmount || !customerId) {
      setError('Missing order information. Please try again.');
    }
  }, [orderId, customerId]);

  const handlePayment = async () => {
    if (!orderId || !paymentMethod || !customerId) {
      setError('Missing required information. Please check all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          payment_method: paymentMethod,
          cust_id: customerId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Payment successful!');
        localStorage.removeItem('order_id');
        localStorage.removeItem('order_amount');
        navigate(`/tracking/${orderId}`);
      } else {
        setError(data.error || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('An error occurred while processing the payment.');
    } finally {
      setLoading(false);
    }
  };

  const handleMethodClick = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="order-summary">
        <h3>Order Total</h3>
        <p><strong>Total Amount: ${orderAmount.toFixed(2)}</strong></p>
      </div>

      <div className="payment-methods">
        <h3>Select Payment Method</h3>
        <button
          onClick={() => handleMethodClick('Bkash')}
          className={`payment-btn ${paymentMethod === 'Bkash' ? 'selected' : ''}`}
        >
          Pay with Bkash
        </button>
        <button
          onClick={() => handleMethodClick('Nagad')}
          className={`payment-btn ${paymentMethod === 'Nagad' ? 'selected' : ''}`}
        >
          Pay with Nagad
        </button>
        <button
          onClick={() => handleMethodClick('Cash on Delivery')}
          className={`payment-btn ${paymentMethod === 'Cash on Delivery' ? 'selected' : ''}`}
        >
          Cash on Delivery
        </button>
      </div>

      {(paymentMethod === 'Bkash' || paymentMethod === 'Nagad') && (
        <div className="phone-number-input">
          <label htmlFor="phoneNumber">Enter your {paymentMethod} phone number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="11-digit phone number"
          />
        </div>
      )}

      <button
        onClick={handlePayment}
        className="proceed-payment-btn"
        disabled={!paymentMethod || loading}
      >
        {loading ? 'Processing...' : 'Proceed to Pay'}
      </button>
    </div>
  );
};

export default Payment;


*/


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Payment.css';

const Payment = () => {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const orderId = localStorage.getItem('order_id');
  const customerId = localStorage.getItem('userId');

  useEffect(() => {
    const storedOrderAmount = localStorage.getItem('order_amount');
    if (storedOrderAmount) {
      setOrderAmount(parseFloat(storedOrderAmount));
    }

    if (!orderId || !storedOrderAmount || !customerId) {
      setError('Missing order information. Please try again.');
    }
  }, [orderId, customerId]);

  const handlePayment = async () => {
    if (!orderId || !paymentMethod || !customerId || (paymentMethod !== 'Cash on Delivery' && !phoneNumber)) {
      setError('Missing required information. Please check all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          payment_method: paymentMethod,
          cust_id: customerId,
          phone_number: paymentMethod !== 'Cash on Delivery' ? phoneNumber : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Payment successful!');
        localStorage.removeItem('order_id');
        localStorage.removeItem('order_amount');
        navigate(`/tracking/${orderId}`);
      } else {
        setError(data.error || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('An error occurred while processing the payment.');
    } finally {
      setLoading(false);
      setShowPopup(false);
    }
  };

  const handleMethodClick = (method) => {
    setPaymentMethod(method);
    setShowPopup(true);
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="order-summary">
        <h3>Order Total</h3>
        <p><strong>Total Amount: ${orderAmount.toFixed(2)}</strong></p>
      </div>

      <div className="payment-methods">
        <h3>Select Payment Method</h3>
        <button
          onClick={() => handleMethodClick('Bkash')}
          className={`payment-btn ${paymentMethod === 'Bkash' ? 'selected' : ''}`}
        >
          Pay with Bkash
        </button>
        <button
          onClick={() => handleMethodClick('Nagad')}
          className={`payment-btn ${paymentMethod === 'Nagad' ? 'selected' : ''}`}
        >
          Pay with Nagad
        </button>
        <button
          onClick={() => handleMethodClick('Cash on Delivery')}
          className={`payment-btn ${paymentMethod === 'Cash on Delivery' ? 'selected' : ''}`}
        >
          Cash on Delivery
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Payment Confirmation</h3>
            <p>Payment Method: <strong>{paymentMethod}</strong></p>
            <p>Amount: <strong>${orderAmount.toFixed(2)}</strong></p>
            {(paymentMethod === 'Bkash' || paymentMethod === 'Nagad') && (
              <div className="phone-number-input">
                <label htmlFor="phoneNumber">Enter your {paymentMethod} phone number:</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="11-digit phone number"
                />
              </div>
            )}
            <div className="popup-buttons">
              <button
                onClick={handlePayment}
                className="submit-btn"
                disabled={loading || (paymentMethod !== 'Cash on Delivery' && phoneNumber.length !== 11)}
              >
                {loading ? 'Processing...' : 'Submit Payment'}
              </button>
              <button onClick={() => setShowPopup(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
