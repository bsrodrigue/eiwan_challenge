import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CookiesProvider } from 'react-cookie';

import App from './App';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ChallengeForm from './pages/dashboard/challenge_form';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/challenges/new" element={<ChallengeForm />} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
