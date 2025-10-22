import React, { useState } from "react";
import api from "../Api";
import "../styles/Register.css"

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/register", {
        username: form.username,
        password: form.password,
        role: form.role.toUpperCase(), // backend expects enum RoleType
      });

      setMessage(response.data.message || "Registrasi berhasil!");

      if (response.data.username) {
        setForm({ username: "", password: "", role: "" });
      }
    } catch (error) {
      console.error("Register error:", error);
      setMessage("Terjadi kesalahan saat registrasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Registrasi User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Masukkan username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimal 8 karakter, huruf besar, kecil & angka"
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Role</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="PROCUREMENT">PROCUREMENT</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Mendaftarkan..." : "Daftar"}
          </button>
        </form>

        {message && <p className="response-message">{message}</p>}
      </div>
    </div>
  );
}
