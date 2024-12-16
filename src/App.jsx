import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TodoApp from './pages/Todo';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import { checkAuthStatus } from './api/userApi';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const authStatus = await checkAuthStatus();
      console.log(authStatus);
      setIsAuthenticated(authStatus);
      setIsLoading(false);
    };
    verifyAuth();
  }, []);

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
          <Route
            path="/signin"
            element={
              !isAuthenticated ? (
                <SignInPage setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/todo" replace />
              )
            }
          />
          <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/todo" replace />} />
          <Route path="/todo" element={isAuthenticated ? <TodoApp /> : <Navigate to="/signin" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;