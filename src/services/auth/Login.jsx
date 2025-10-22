import React, { useState, useRef } from "react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import api from "../../Api.jsx";
import LoginUI from "../../pages/Login.html.jsx";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const requestInProgress = useRef(false); // mencegah double submit

    const handleLogin = async (e) => {
        e.preventDefault();

        if (requestInProgress.current) return;
        requestInProgress.current = true;
        setLoading(true);

        try {
            const response = await api.post("/auth/login", { username, password });
            const { message, refreshToken, accessToken } = response.data;

            // ✅ validasi token: pastikan tidak null atau kosong
            if (!accessToken || !refreshToken) {
                // tampilkan pesan dari backend atau fallback message
                notifications.show({
                    title: "Login gagal",
                    message: message || "Username atau password salah!",
                    color: "red",
                });
                return; // hentikan eksekusi, jangan ke dashboard
            }

            // simpan token kalau valid
            setPassword("");
            localStorage.setItem("username", username);
            localStorage.setItem("refreshToken", refreshToken);

            notifications.show({
                title: "Login berhasil",
                message: `Selamat datang, ${username}`,
                color: "green",
            });

            navigate("/dashboard", { replace: true });
        } catch (err) {
            const backendMessage = err.response?.data?.message || "";
            let errorMessage = "Terjadi kesalahan. Silahkan coba lagi beberapa saat.";

            if (backendMessage.includes("Username atau password salah")) {
                errorMessage = "Username atau password salah!";
            } else if (backendMessage.includes("diblokir")) {
                errorMessage = "Akun anda telah terblokir. Silahkan hubungi admin!";
            } else if (backendMessage.includes("setelah beberapa saat")) {
                errorMessage = "Login anda dibatasi, silahkan coba lagi beberapa saat.";
            }

            notifications.show({
                title: "Login gagal",
                message: errorMessage,
                color: "red",
            });
        } finally {
            requestInProgress.current = false;
            setLoading(false);
        }
    };

    return (
        <LoginUI
            username={username}
            password={password}
            loading={loading}
            onUsernameChange={(e) => setUsername(e.currentTarget.value)}
            onPasswordChange={(e) => setPassword(e.currentTarget.value)}
            onSubmit={handleLogin}
        />
    );
};

export default Login;
