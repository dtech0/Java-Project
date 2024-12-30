import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          previousPassword,
          newPassword,
        }),
      });

      const result = await response.json();

      if (result.Success) {
        alert(result.message);
        navigate('/'); // Redirect to homepage after success
      } else {
        alert(result.errors); // Show error message
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('An error occurred while resetting the password. Please try again later.');
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      background: '#ffffff',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      width: '400px',
      textAlign: 'center',
      margin: '20px auto',
      backgroundColor: '#f5f5f5',
    }}>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #cccccc',
            borderRadius: '4px',
            fontSize: '16px',
            color: '#333333',
          }}
        />
        <input
          type="password"
          placeholder="Previous Password"
          value={previousPassword}
          onChange={(e) => setPreviousPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #cccccc',
            borderRadius: '4px',
            fontSize: '16px',
            color: '#333333',
          }}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #cccccc',
            borderRadius: '4px',
            fontSize: '16px',
            color: '#333333',
          }}
        />
        <button type="submit" style={{
          backgroundColor: '#4caf50',
          color: 'white',
          fontSize: '20px',
          padding: '10px',
          border: 'none',
          borderRadius: '29px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
