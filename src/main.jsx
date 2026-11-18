import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import Appointment from './pages/Appointment'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/a/:id" element={<Appointment />} />
    </Routes>
  </BrowserRouter>
)
