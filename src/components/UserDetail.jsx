import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Api";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import "../styles/ProcurementForm.css";
import "../styles/UserDetail.css";

export default function UserDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState([]);
    const [status, setStatus] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/users/id/${id}`);
                setUser(res.data);
            } catch (err) {
                console.error(err);
                toast.error("Gagal load data user");
            } finally {
                setLoading(false);
            }
        };

        const fetchRoles = async () => {
            try {
                const res = await api.get("/users/roles/non-admin");
                setRoles(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchStatus = async () => {
            try {
                const res = await api.get("/users/status");
                setStatus(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
        fetchRoles();
        fetchStatus();

    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/users/id/${id}`, user);
            toast.success("User berhasil diperbarui!");
            navigate(-1);
        } catch (err) {
            console.error(err);
            toast.error("Gagal update user");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>User tidak ditemukan.</p>;

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
                <h1>👤 Detail User</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input type="text" value={user.username} disabled />
                    </div>

                    <div>
                        <label>Role</label>
                        <input value={user.role} disabled>
                        </input>
                    </div>

                    <div>
                        <label>Status</label>
                        <select name="status" value={user.status} onChange={handleChange}>
                            {status.map((status, idx) => (
                                <option key={idx} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Created At</label>
                        <input type="text" value={user.createdAt} readOnly />
                    </div>

                    <div className="actions">
                        <button type="submit" className="primary">
                            💾 Simpan Perubahan
                        </button>
                        <button
                            type="button"
                            className="secondary"
                            onClick={() => navigate(-1)}
                        >
                            🔙 Kembali
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
