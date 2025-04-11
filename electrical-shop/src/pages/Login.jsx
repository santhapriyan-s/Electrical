import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "./Login.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Handle regular login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      // In a real app, you would authenticate with your backend
      // This is just a simulation
      if (email && password) {
        setUser({ email });
        
        // Check if there's a pending purchase redirect
        if (location.state?.from === "buynow" && location.state?.product) {
          navigate("/checkout", { state: { product: location.state.product } });
        } else {
          navigate("/");
        }
      } else {
        setError("Please fill in all fields");
      }
    } catch (err) {
      setError("Failed to login. Please try again.");
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser({
        email: result.user.email,
        name: result.user.displayName
      });
      
      // Check if there's a pending purchase redirect
      if (location.state?.from === "buynow" && location.state?.product) {
        navigate("/checkout", { state: { product: location.state.product } });
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {location.state?.from === "buynow" && (
        <div className="login-notice">
          Please login to complete your purchase
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <div className="divider">OR</div>

      <button onClick={handleGoogleLogin} className="google-login-button">
        Continue with Google
      </button>

      <div className="signup-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};

export default Login;