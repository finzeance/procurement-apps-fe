import React from "react";
import "../styles/Dashboard.css";
import { FaHome, FaClipboardList, FaUserPlus } from "react-icons/fa";

export default function Dashboard() {
    const handleLogout = () => {
        alert("Logout berhasil!");
        // window.location.href = "/login";
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            
            
            <aside className="sidebar">
                <h2>BNI Procurement Apps</h2>
                <a href="#">
                    <FaHome /> Beranda
                </a>
                <a href="#">
                    <FaClipboardList /> Pengadaan
                </a>
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
            <main className="content">
                <div className="card">
                    <h3>Selamat Datang!</h3>
                    <p>
                        Ini adalah contoh konten dashboard. Bisa diisi tabel, grafik, atau
                        ringkasan data.
                    </p>
                </div>

                <div className="card">
                    <h3>Pengumuman</h3>
                    <p>Informasi penting dapat ditampilkan di sini.</p>
                </div>
            </main>
        </div>
    );
}
