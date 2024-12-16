import React, { useState } from 'react';
import { apiRequest } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    second_name: '',
    login: '',
    password: '',
    email: '',
    phone: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await apiRequest('auth/signup', 'POST', formData);
      console.log('Registration successful', data);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div>
      <div className="page-signup">
        <div className="form-box-signup">
          <h1 name="title">Sign Up</h1>
          <form onSubmit={handleSubmit} id="logonForm">
            <div className="input-group">
              <div className="input-field">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First name"
                />
              </div>
              <div className="input-field">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  name="second_name"
                  value={formData.second_name}
                  onChange={handleChange}
                  placeholder="Second name"
                />
              </div>
              <div className="input-field">
                <i className="fa-regular fa-user"></i>
                <input type="login" name="login" value={formData.login} onChange={handleChange} placeholder="Login" />
              </div>
              <div className="input-field">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="input-field">
                <i className="fa-solid fa-envelope"></i>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              </div>
              <div className="input-field">
                <i className="fa-solid fa-phone"></i>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone +79000000000"
                />
              </div>
              <p>
                Lost password <a href="/">Click here!</a>
              </p>
            </div>
            <div className="btn-field">
              <button className="btn signup-btn" type="submit">
                Sign up
              </button>
              <button className="btn signin-btn disable" type="button" onClick={() => navigate('/signin')}>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
