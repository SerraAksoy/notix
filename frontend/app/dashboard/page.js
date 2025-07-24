"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "@/lib/axios";

export default function DashboardPage() {
    const router = useRouter();
    const [notebooks, setNotebooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.push("/login");
        } else {
            axios
                .get("/notebooks")
                .then((res) => setNotebooks(res.data.slice(0, 3)))
                .catch((err) => console.error(err));
        }
    }, [router]);

    const handleCreate = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.post(
                "/notebooks",
                { name, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setShowModal(false);
            setName("");
            setDescription("");
            setNotebooks((prev) => [res.data, ...prev.slice(0, 2)]);
        } catch (err) {
            console.error("Defter oluşturulamadı:", err);
            alert("Defter oluşturulurken bir hata oluştu.");
        }
    };

    const handleDelete = async (notebookId) => {
        const confirmed = confirm("Bu not defterini silmek istediğinizden emin misiniz?");
        if (!confirmed) return;

        try {
            await axios.delete(`/notebooks/${notebookId}`);
            setNotebooks((prev) => prev.filter((nb) => nb.id !== notebookId));
        } catch (err) {
            console.error("Not defteri silinirken hata oluştu:", err);
        }
    };

    return (
        <div className="bg-[url('/dashboard-bg1.jpeg')] bg-white bg-opacity-70 backdrop-blur-md min-h-screen bg-cover bg-center bg-no-repeat">
            <div className="min-h-screen px-6 pt-24 pb-10">
                <h1 className="text-3xl font-bold">Hoş geldin!</h1>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Hızlı Erişim</h2>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn btn-primary gap-2"
                        >
                            <span className="text-lg">➕</span> Yeni Defter
                        </button>
                        <Link href="/dashboard/shared" className="btn btn-secondary gap-2">
                            <span className="text-lg">👥</span> Paylaşılanlarla Düzenle
                        </Link>
                        <Link href="/dashboard/recent" className="btn btn-accent gap-2">
                            <span className="text-lg">🕒</span> Son Notlarım
                        </Link>
                    </div>
                </div>
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-6">Son Not Defterlerin</h2>

                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {notebooks.map((nb) => (
                            <div key={nb.id} className="flex flex-col items-center ">
                                <div className="relative w-52 h-72">
                                    <button
                                        onClick={() => handleDelete(nb.id)}
                                        className="absolute top-1 right-1 z-10 text-xl hover:text-red-600 transition"
                                        title="Sil"
                                    >
                                        🗑️
                                    </button>
                                    <div className="group perspective w-full h-full">
                                        <div className="relative w-full h-full duration-700 transform-style preserve-3d group-hover:rotate-y-180">
                                            <div
                                                className="absolute w-full h-full backface-hidden rounded-xl shadow-xl"
                                                style={{
                                                    backgroundImage: `url('/cover-1.jpeg')`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                }}
                                            ></div>
                                            <div
                                                className="absolute w-full h-full backface-hidden rounded-xl shadow-inner p-4 rotate-y-180 overflow-hidden "
                                                style={{
                                                    backgroundImage: `url('/note-page.jpeg')`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                }}
                                            >
                                                <p className="text-sm text-gray-800 line-clamp-6">{nb.description}</p>
                                                <Link
                                                    href={`/dashboard/notebooks/${nb.id}`}
                                                    className="btn btn-sm btn-primary mt-4"
                                                >
                                                    Aç
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-gray-800">{nb.name}</p>
                            </div>
                        ))}
                    </div>

                    {notebooks.length === 0 && (
                        <p className="text-sm text-gray-400 mt-4">
                            Henüz bir not defterin yok gibi. Hemen oluştur!
                        </p>
                    )}
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl w-full max-w-md">
                            <h3 className="text-xl font-semibold mb-4 text-primary">📔 Yeni Not Defteri</h3>
                            <input
                                type="text"
                                placeholder="Defter adı"
                                className="input input-bordered w-full mb-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <textarea
                                placeholder="Açıklama (isteğe bağlı)"
                                className="textarea textarea-bordered w-full mb-3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-ghost"
                                >
                                    Vazgeç
                                </button>
                                <button
                                    onClick={handleCreate}
                                    className="btn btn-primary"
                                >
                                    ➕ Oluştur
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}