import React from "react";
import "../styles/Dashboard.css";
import { FaHome, FaClipboardList, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api";

export default function DashboardLayout({ children }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");

            const response = await api.post(
                "/auth/logout",
                { refreshToken },
                { withCredentials: true }
            );

            if (response.data.isSuccess) {
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                navigate("/login");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2>BNI Procurement Apps</h2>
                <Link to="/dashboard">
                    <FaHome /> Beranda
                </Link>
                <Link to="/procurement-form">
                    <FaClipboardList /> Pengadaan
                </Link>
                <a href="#">
                    <FaUserPlus /> Registrasi User
                </a>
            </aside>

            {/* Header */}
            <header className="header">
                <div className="logo">
                    <div></div>
                    <span>Procura</span>
                </div>
                <button onClick={handleLogout}>Logout</button>
            </header>

            {/* Konten */}
            <main className="content">{children}</main>
        </div>
    );
}
