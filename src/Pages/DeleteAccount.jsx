import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const [email, setEmail] = useState(""); // Storing the email of the user
  const navigate = useNavigate(); // useNavigate hook for redirecting to homepage

  const handleDelete = async () => {
    try {
      // Send delete request to the backend
      const response = await fetch('http://localhost:4000/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.Success) {
        alert(result.message); // Show success message
        localStorage.removeItem('auth-token'); // Remove the token from local storage
        sessionStorage.clear(); // Optionally clear session storage if any session-related data exists
        navigate('/'); // Redirect to homepage using useNavigate
      } else {
        alert(result.errors); // Show error message
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting your account. Please try again later.");
    }
  };

  // Styles as JS objects
  const containerStyle = {
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'center',
    margin: '20px auto',
    backgroundColor: '#f5f5f5',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    fontSize: '16px',
    color: '#333333',
  };

  const buttonStyle = {
    backgroundColor: '#4caf50',
    color: 'white',
    fontSize: '20px',
    padding: '12px',
    border: 'none',
    borderRadius: '29px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '15px',
  };

  return (
    <div style={containerStyle}>
      <h1>Delete Account</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleDelete} style={buttonStyle}>
        Delete My Account
      </button>
    </div>
  );
};

export default DeleteAccount;
