import React from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import api from "../Api";

function About() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Pastikan cookie ikut dikirim (aksesToken dikirim otomatis oleh browser)
            await api.post("/auth/logout", 
                {refreshToken: localStorage.getItem("refreshToken")}, 
                { withCredentials: true });

            // Bersihkan data yang tersisa di localStorage
            localStorage.removeItem("username");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken"); // kalau sempat tersimpan

            notifications.show({
                title: "Logout berhasil",
                message: "Anda telah keluar dari sistem.",
                color: "green",
            });

            // Redirect ke login
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout gagal:", error);
            notifications.show({
                title: "Logout gagal",
                message:
                    error.response?.data?.message ||
                    "Terjadi kesalahan saat menghubungi server.",
                color: "red",
            });

            // Jika token tidak valid / sudah expired, tetap arahkan ke login
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate("/login", { replace: true });
            }
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Halaman About</h1>
            <p>Selamat datang di halaman About.</p>
            <button
                onClick={handleLogout}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default About;