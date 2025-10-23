import React, { useEffect, useState } from "react";
import api from "../Api";
import "../styles/ProcurementForm.css";
import "../styles/ManageUser.css";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ManageUsersPage() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("username");
    const [sortOrder, setSortOrder] = useState("asc");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/users/non-admin");
                setUsers(res.data);
                setFilteredUsers(res.data);
            } catch (err) {
                console.error("Gagal load users: ", err);
                toast.error("Gagal load user non-admin dari server");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        let temp = [...users];

        // Filter by search
        if (search.trim() !== "") {
            temp = temp.filter(
                (u) =>
                    u.username.toLowerCase().includes(search.toLowerCase()) ||
                    u.role.toLowerCase().includes(search.toLowerCase()) ||
                    u.status.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Sort
        temp.sort((a, b) => {
            const aVal = a[sortField]?.toLowerCase() || "";
            const bVal = b[sortField]?.toLowerCase() || "";
            if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
            if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        setFilteredUsers(temp);
    }, [users, search, sortField, sortOrder]);

    const toggleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const handleAddUser = () => {
        navigate("/register-form");
    };

    const handleViewDetail = (userId) => {
        navigate(`/users/${userId}`); // nanti route detail user
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
                <div className="user-header">
                    <h1>👥 Daftar User</h1>
                    <button onClick={handleAddUser} className="add-user-button">
                        ➕ Tambah User
                    </button>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <input
                        type="text"
                        placeholder="Cari username, role, atau status..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "10px",
                            border: "1px solid #e5e7eb",
                        }}
                    />
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={thStyle} onClick={() => toggleSort("username")}>
                                    Username {sortField === "username" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                </th>
                                <th style={thStyle} onClick={() => toggleSort("role")}>
                                    Role {sortField === "role" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                </th>
                                <th style={thStyle} onClick={() => toggleSort("status")}>
                                    Status {sortField === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                </th>
                                <th style={thStyle}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: "center", padding: "1rem" }}>
                                        Tidak ada data user
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td style={tdStyle}>{user.username}</td>
                                        <td style={tdStyle}>{user.role}</td>
                                        <td style={tdStyle}>{user.status}</td>
                                        <td style={tdStyle}>
                                            <button onClick={() => handleViewDetail(user.id)} style={detailButtonStyle}>
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </motion.div>
        </motion.div>
    );
}

const thStyle = {
    textAlign: "left",
    borderBottom: "1px solid #e5e7eb",
    padding: "8px",
    color: "#6b7280",
    fontWeight: 500,
    cursor: "pointer",
};

const tdStyle = {
    padding: "8px",
    borderBottom: "1px solid #e5e7eb",
};

const detailButtonStyle = {
    backgroundColor: "#ff6600",
    color: "#fff",
    border: "none",
    padding: "4px 10px",
    borderRadius: "6px",
    cursor: "pointer",
};
