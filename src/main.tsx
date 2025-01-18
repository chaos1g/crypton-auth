import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Toaster } from "@/components/ui/toaster"

import Register from './pages/Register';
import Profile from './pages/Profile';
import Login from './pages/Login';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </React.StrictMode>
);
