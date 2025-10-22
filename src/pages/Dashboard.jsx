// src/pages/Dashboard.jsx
import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
    return (
        <DashboardLayout>
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
        </DashboardLayout>
    );
}
