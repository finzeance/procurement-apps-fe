import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { FaHome, FaClipboardList, FaUserPlus, FaBars, FaMoon, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api";

export default function DashboardLayout({ children }) {
    const navigate = useNavigate();

    // Sidebar state
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

    // Dark mode state
    const [darkMode, setDarkMode] = useState(false);

    // Apply dark mode class to body
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleSidebarCollapsed = () => setSidebarCollapsed(!sidebarCollapsed);
    const toggleSidebarMobile = () => setSidebarMobileOpen(!sidebarMobileOpen);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await api.post("/auth/logout", { refreshToken }, { withCredentials: true });

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
            <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${sidebarMobileOpen ? "open" : ""}`}>
                <button className="collapse-btn" onClick={toggleSidebarCollapsed}>
                    <FaBars />
                </button>

                <h2 className="sidebar-title">{!sidebarCollapsed && "BNI Procurement Portal"}</h2>

                <Link to="/dashboard">
                    <FaHome />
                    {!sidebarCollapsed && <span>Beranda</span>}
                </Link>
                <Link to="/procurement-form">
                    <FaClipboardList />
                    {!sidebarCollapsed && <span>Pengadaan</span>}
                </Link>
                <a href="#">
                    <FaUserPlus />
                    {!sidebarCollapsed && <span>Registrasi User</span>}
                </a>
            </aside>

            {/* Header */}
            <header className="header">
                <div className="logo">
                    <div></div>
                    <span>Procura</span>
                </div>

                <div className="header-actions">
                    {/* Toggle mobile sidebar */}
                    <button className="toggle-btn" onClick={toggleSidebarMobile}>
                        <FaBars />
                    </button>

                    {/* Toggle dark mode */}
                    <button onClick={toggleDarkMode} className="darkmode-btn">
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>

                    <button onClick={handleLogout}>Logout</button>
                </div>
            </header>

            {/* Konten */}
            <main
                className={`content ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}
                onClick={() => sidebarMobileOpen && setSidebarMobileOpen(false)}
            >
                {children}
            </main>
        </div>
    );
}
