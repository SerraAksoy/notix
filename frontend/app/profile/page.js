"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";

export default function ProfilePage() {
    const { isAuthenticated, user } = useAuth();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get("/auth/stats", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStats(res.data);
            } catch (err) {
                console.error("İstatistik alınamadı:", err);
            }
        };

        if (isAuthenticated) {
            fetchStats();
        }
    }, [isAuthenticated]);

    return (
        <div className="min-h-screen bg-[url('/dashboard-bg.jpeg')] bg-cover bg-center bg-no-repeat relative">
            <div className="max-w-4xl mx-auto ">
                <h1 className="text-4xl font-bold text-primary mb-8 text-center pt-20">👤 Profilim</h1>

                <div className="bg-base-100 rounded-xl shadow-md border border-base-300 p-6 mb-10">
                    <h2 className="text-xl font-semibold text-accent mb-2">🪪 Kullanıcı Bilgileri</h2>
                    <div className="space-y-2">
                        <p><span className="font-medium">Kullanıcı Adı:</span> {user?.username || "Bilinmiyor"}</p>
                        <p><span className="font-medium">Email:</span> {user?.email || "Bilinmiyor"}</p>
                        <p><span className="font-medium">Kayıt Tarihi:</span> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("tr-TR") : "Bilinmiyor"}</p>
                    </div>
                </div>

                {stats ? (
                    <>
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
                            <div className="card bg-base-100 shadow-lg p-5 border border-base-300">
                                <h2 className="text-lg font-semibold text-accent">📚 Not Defteri Sayısı</h2>
                                <p className="text-3xl font-bold">{stats.notebookCount}</p>
                            </div>

                            <div className="card bg-base-100 shadow-lg p-5 border border-base-300">
                                <h2 className="text-lg font-semibold text-accent">📝 Toplam Not Sayısı</h2>
                                <p className="text-3xl font-bold">{stats.totalNotes}</p>
                            </div>

                            <div className="card bg-base-100 shadow-lg p-5 border border-base-300">
                                <h2 className="text-lg font-semibold text-accent">🌍 Paylaşılan Not Sayısı</h2>
                                <p className="text-3xl font-bold">{stats.sharedNotes}</p>
                            </div>

                            <div className="card bg-base-100 shadow-lg p-5 border border-base-300 sm:col-span-2 lg:col-span-1">
                                <h2 className="text-lg font-semibold text-accent">🕒 Son Düzenleme</h2>
                                <p className="text-lg">{stats.lastEditDate ? new Date(stats.lastEditDate).toLocaleString("tr-TR") : "Yok"}</p>
                            </div>
                        </div>

                        {stats.recentNotes?.length > 0 && (
                            <div className="bg-base-100 rounded-xl shadow-md border border-base-300 p-6">
                                <h2 className="text-xl font-semibold text-accent mb-4">🧾 Son Düzenlenen Notlar</h2>
                                <ul className="space-y-3">
                                    {stats.recentNotes.map((note) => (
                                        <li key={note.id} className="flex justify-between items-center">
                                            <Link
                                                href={`/dashboard/notebooks/notes/${note.id}`}
                                                className="font-medium text-primary hover:underline truncate max-w-xs"
                                            >
                                                {note.title}
                                            </Link>
                                            <span className="text-sm text-gray-500">
                                                {note.updatedAt
                                                    ? new Date(note.updatedAt).toLocaleString("tr-TR")
                                                    : "Tarih yok"}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-center text-gray-500">İstatistikler yükleniyor...</p>
                )}
            </div>
        </div>
    );
}