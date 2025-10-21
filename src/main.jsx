import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import App from './App'
import About from './pages/About'
import Counter from './pages/Counter'
import Login from './services/auth/Login'
import Dashboard from './pages/Dashboard'

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  </MantineProvider>
);
