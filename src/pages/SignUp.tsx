import React, { ChangeEvent, FormEvent, useState } from 'react';
// import { apiRequest } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signUp } from '../store/apiSlice';
import { RootState } from '../store/index';
import { FormData } from '../store/apiSlice';
import { useAppDispatch } from '../hook';

function SignUpPage() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.api);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    second_name: '',
    login: '',
    password: '',
    email: '',
    phone: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signUp(formData));
  };

  if (isLoading)
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  if (error)
    return (
      <div className="loading">
        <h2>{error}</h2>
      </div>
    );

  return (
    <div>
      <div className="page-signup">
        <div className="form-box-signup">
          <h1 className="title">Sign Up</h1>
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
