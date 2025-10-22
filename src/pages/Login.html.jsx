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
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={onSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Masukkan username"
              value={username}
              onChange={onUsernameChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={onPasswordChange}
              required
            />
          </div>

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
