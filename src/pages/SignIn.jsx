import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/userApi';

function SignInPage({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const handleChange = (event) => {
    console.log('event.target:', event.target);
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiRequest('auth/signin', 'POST', formData);
      console.log('auth/signin', response);
      if (response === true) {
        setIsAuthenticated(true);
        navigate('/todo');
        console.log('Login successful', response);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="page-signin">
      <div className="form-box-signin">
        <h1 name="title">Sign In</h1>
        <form onSubmit={handleSubmit} id="loginForm">
          <div className="input-group">
            <div className="input-field">
              <i className="fa-regular fa-user"></i>
              <input type="text" name="login" placeholder="Login" value={formData.login} onChange={handleChange} />
            </div>
            <div className="input-field">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="btn-field">
            <button className="btn signup-btn disable" type="button" onClick={() => navigate('/signup')}>
              Sign up
            </button>
            <button className="btn signin-btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
