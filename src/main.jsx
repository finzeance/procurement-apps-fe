import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import App from './App'
import About from './pages/About'
import Login from './services/auth/Login'
import Dashboard from './layouts/DashboardLayout'
import Register from './pages/Register'
import ProcurementForm from './pages/ProcurementForm'
import DashboardLayout from './layouts/DashboardLayout'
import RegistrationForm from './components/RegisterForm'
import ManageUsersPage from './components/UserTable'
import UserDetailPage from './components/UserDetail'

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/procurement-form" element={<DashboardLayout><ProcurementForm /></DashboardLayout>} />
        <Route path="/manage-user" element={<DashboardLayout><ManageUsersPage /></DashboardLayout>} />
        <Route path="/users/:id" element={<DashboardLayout><UserDetailPage /></DashboardLayout>} />
        <Route path="/register-form" element={<DashboardLayout><RegistrationForm /></DashboardLayout>} />
      </Routes>
    </BrowserRouter>
  </MantineProvider>
);
