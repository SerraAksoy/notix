"use client";

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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Notlar</h1>

            <form onSubmit={handleCreate} className="flex flex-col gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Not Başlığı"
                    className="border p-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="İçerik"
                    className="border p-2 rounded"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <select
                    className="border p-2 rounded"
                    value={access}
                    onChange={(e) => setAccess(e.target.value)}
                >
                    <option value="PRIVATE">Gizli</option>
                    <option value="SHARED">Paylaşılan</option>
                    <option value="PUBLIC">Herkese Açık</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Not Ekle
                </button>
            </form>

            <ul className="space-y-2">
                {notes.map((note) => (
                    <li key={note.id} className="border p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">{note.title}</h2>
                        <p className="text-gray-600">{note.content}</p>
                        <p className="text-sm text-gray-400 italic">Erişim: {note.access}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}