import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewList from './components/ReviewList';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { checkAuth } from './utils/checkAuth';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuth(dispatch);
  }, [dispatch]);

  return (
    <GoogleOAuthProvider clientId="568573046548-125srbffrrh311fpdtlenkpmnhbreas1.apps.googleusercontent.com">
        <div className="container">
          <Header />
          <div className="row">
            <div className="col-md-3">
              <LoginForm />
            </div>
            <div className="col-md-9">
              <ReviewList />
            </div>
          </div>
        </div>
    </GoogleOAuthProvider>
  );
};

export default App;
