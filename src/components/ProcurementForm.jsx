import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import "../styles/ProcurementForm.css";

export default function ProcurementForm() {
    const [loading, setLoading] = useState(false);
    const apiUrl = "/api/procurements";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData.entries());

        if (!payload.name) return showError("Kolom 'Nama' wajib diisi.");
        if (!payload.type) return showError("Kolom 'Jenis Pengadaan' wajib diisi.");
        if (!payload.paymentType) return showError("Kolom 'Metode Pembayaran' wajib diisi.");
        if (!payload.picEmail) return showError("Kolom 'PIC Email' wajib diisi.");
        if (payload.picEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.picEmail))
            return showError("Format email PIC tidak valid.");

        try {
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                toast.success("Data berhasil dikirim 🎉", { duration: 3000 });
                e.target.reset();
            } else {
                const msg = await res.text();
                toast.error("Gagal mengirim data: " + msg);
            }
        } catch (err) {
            toast.error("Kesalahan jaringan: " + err.message);
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
                <h1>🧾 Form Pengajuan Pengadaan</h1>
                <p className="note">
                    Isi form di bawah ini lalu klik <strong>Submit</strong>. Field bertanda * wajib diisi.
                </p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nama *</label>
                        <input name="name" type="text" placeholder="Nama usulan" required />
                    </div>

                    <div>
                        <label>Jenis Pengadaan *</label>
                        <select name="type" required>
                            <option value="">-- Pilih Type --</option>
                            <option value="CAPEX">CAPEX</option>
                            <option value="OPEX">OPEX</option>
                        </select>
                    </div>

                    <div>
                        <label>PIC Email *</label>
                        <input name="picEmail" type="email" placeholder="pic@example.com" required />
                    </div>

                    <div>
                        <label>Metode Pembayaran *</label>
                        <select name="paymentType" required>
                            <option value="">-- Pilih Metode Pembayaran --</option>
                            <option value="ONEYEAR">ONEYEAR</option>
                            <option value="MULTIYEARS">MULTIYEARS</option>
                        </select>
                    </div>

                    <div>
                        <label>Start Period</label>
                        <input name="startPeriod" type="date" />
                    </div>

                    <div>
                        <label>End Period</label>
                        <input name="endPeriod" type="date" />
                    </div>

                    <div>
                        <label>Nomor Kontrak</label>
                        <input name="contractNumber" type="text" />
                    </div>

                    <div>
                        <label>Nomor SPK</label>
                        <input name="spkNumber" type="text" />
                    </div>

                    <div>
                        <label>Tanggal Kontrak</label>
                        <input name="contractDate" type="date" />
                    </div>

                    <div>
                        <label>Tanggal SPK</label>
                        <input name="spkDate" type="date" />
                    </div>

                    <div>
                        <label>Estimasi Nilai Proyek</label>
                        <input name="procurementAmount" type="number" step="0.01" min="0" placeholder="1000000.00" />
                    </div>

                    <div>
                        <label>Total Realisasi</label>
                        <input name="realizationAmount" type="number" step="0.01" min="0" placeholder="500000.00" />
                    </div>

                    <div>
                        <label>Target</label>
                        <input name="target" type="date" />
                    </div>

                    <div className="full">
                        <label>Keterangan / Spesifikasi</label>
                        <textarea name="description" placeholder="Deskripsi tambahan (opsional)" />
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
