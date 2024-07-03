import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { AuthProvider } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';

import RegisterForm from './components/RegisterForm';
import Home from './components/Home';

const App = () => {
  return (
    // <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/register" element={<RegisterForm/>} />
        </Routes>
      </Router>
    // </AuthProvider>
  );
};

export default App;
