import React from 'react';
import { BrowserRouter, Routes, Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewList from './components/ReviewList';
import Header from './components/Header';
import LoginForm from './components/LoginForm';


const App = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;

