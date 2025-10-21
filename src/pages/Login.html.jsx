import React from "react";
import "../styles/Login.css";

export default function LoginUI({
  username,
  password,
  loading,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) {
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={onUsernameChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
        <div className="login-footer">
          <p>
            Belum punya akun? <a href="#">Daftar</a>
          </p>
        </div>
      </div>
    </div>
  );
}
