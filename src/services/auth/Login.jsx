import React, { useState, useRef } from "react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import api from "../../Api.jsx";
import LoginUI from "../../pages/Login.html.jsx"; // pastikan path sesuai

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
            const { refreshToken } = response.data;
            setPassword("");

            localStorage.setItem("username", username);
            localStorage.setItem("refreshToken", refreshToken);

            notifications.show({
                title: "Login berhasil",
                message: `Selamat datang, ${username}`,
                color: "green",
            });

            // navigate("/about", { replace: true });
            navigate("/dashboard", { replace: true });
        } catch (err) {
            notifications.show({
                title: "Login gagal",
                message: err.response?.data?.message || "Username atau password salah",
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
