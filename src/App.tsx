import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TodoApp from './pages/Todo';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import { checkAuthStatus } from './store/apiSlice';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useAppDispatch } from './hook';

function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.api.isAuthenticated);
  const isLoading = useSelector((state: RootState) => state.api.isLoading);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? '/todo' : '/signin'} replace />} />
          <Route path="/signin" element={!isAuthenticated ? <SignInPage /> : <Navigate to="/todo" replace />} />
          <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/todo" replace />} />
          <Route path="/todo" element={isAuthenticated ? <TodoApp /> : <Navigate to="/signin" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
