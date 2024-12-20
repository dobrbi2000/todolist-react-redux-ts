import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { apiRequest } from '../api/userApi';
import { useSelector } from 'react-redux';
import { signIn } from '../store/apiSlice';
import { RootState } from '../store/index';
import { useAppDispatch } from '../hook';

function SignInPage() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.api);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: '',
    password: '',
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
    dispatch(signIn(formData));
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
    <div className="page-signin">
      <div className="form-box-signin">
        <h1 className="title">Sign In</h1>
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
