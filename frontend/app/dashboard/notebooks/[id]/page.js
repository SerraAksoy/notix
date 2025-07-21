"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useParams } from "next/navigation";

export default function NotebookDetailPage() {
    const { id } = useParams();
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [access, setAccess] = useState("PRIVATE");

    const fetchNotes = async () => {
        try {
            const res = await axios.get("/notes");
            const filtered = res.data.filter((n) => n.notebookId === parseInt(id));
            setNotes(filtered);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (id) fetchNotes();
    }, [id]);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/notes", { title, content, access, notebookId: Number(id) });
            setTitle("");
            setContent("");
            setAccess("PRIVATE");
            fetchNotes();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className="min-h-screen bg-[url('/dashboard-bg1.jpeg')] bg-cover bg-center bg-no-repeat px-4 py-24"
        >
            <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-primary">📝 Yeni Not Ekle</h2>
                    <form onSubmit={handleCreate} className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Not Başlığı"
                            className="input input-bordered w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Not içeriği..."
                            className="textarea textarea-bordered min-h-[140px]"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                        <select
                            className="select select-bordered"
                            value={access}
                            onChange={(e) => setAccess(e.target.value)}
                        >
                            <option value="PRIVATE">🔒 Gizli</option>
                            <option value="SHARED">👥 Paylaşılan</option>
                            <option value="PUBLIC">🌐 Herkese Açık</option>
                        </select>
                        <button type="submit" className="btn btn-primary mt-2">
                            Notu Kaydet
                        </button>
                    </form>
                </div>

                {/* Sağ: Notlar Listesi */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-secondary">📚 Notlarım</h2>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                        {notes.length > 0 ? (
                            notes.map((note) => (
                                <div key={note.id} className="bg-base-100 p-4 rounded-lg shadow border border-gray-200">
                                    <h3 className="text-lg font-semibold mb-1">{note.title}</h3>
                                    <p className="text-sm text-gray-600 whitespace-pre-line">{note.content}</p>
                                    <div className="mt-2">
                                        <span
                                            className={`badge ${
                                                note.access === "PRIVATE"
                                                    ? "badge-primary"
                                                    : note.access === "SHARED"
                                                        ? "badge-secondary"
                                                        : "badge-accent"
                                            }`}
                                        >
                                            {note.access}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 italic">Henüz not eklenmemiş.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}