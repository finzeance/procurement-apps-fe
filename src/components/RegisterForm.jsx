import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import api from "../Api";
import "../styles/ProcurementForm.css"; // pakai styling yang sama agar konsisten

export default function RegistrationForm() {
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await api.get("/users/roles/non-admin");
                setRoles(res.data);
            } catch (err) {
                console.error("Gagal load role: ", err);
                toast.error("Gagal load role dari server");
            }
        };

        fetchRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData.entries());

        // Validasi mandatory fields
        const requiredFields = [
            { name: "username", label: "Username" },
            { name: "password", label: "Password" },
            { name: "role", label: "Role" }
        ];

        for (let field of requiredFields) {
            if (!payload[field.name] || !payload[field.name].trim()) {
                return showError(`Kolom '${field.label}' wajib diisi.`);
            }
        }

        if (payload.password.length < 8)
            return showError("Password minimal 8 karakter.");

        try {
            const res = await api.post("/register", payload);
            toast.success(res.data.message || "Registrasi berhasil!", { duration: 3000 });
            e.target.reset();
        } catch (err) {
            toast.error("Kesalahan: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const showError = (msg) => {
        toast.error(msg);
        setLoading(false);
    };

    return (
        <motion.div
            className="procurement-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Toaster position="top-right" />
            <motion.div
                className="procurement-card"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                <h1>👤 Form Registrasi User</h1>
                <p className="note">
                    Isi data di bawah ini lalu klik <strong>Submit</strong>. Field bertanda * wajib diisi.
                </p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username *</label>
                        <input name="username" type="text" placeholder="Username" />
                    </div>

                    <div>
                        <label>Password *</label>
                        <input name="password" type="password" placeholder="Password min. 8 karakter" />
                    </div>

                    <div>
                        <label>Role</label>
                        <select name="role" required>
                            <option value="">-- Pilih Role --</option>
                            {roles.map((role, idx) => (
                                <option key={idx} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>

                    <div className="actions">
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {loading ? "⏳ Mengirim..." : "🚀 Submit"}
                        </motion.button>
                        <motion.button
                            type="reset"
                            className="secondary"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            🔄 Reset
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
