"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import dynamic from "next/dynamic";
import socket from "@/lib/socket";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function NoteEditorPage() {
    const { noteId } = useParams();
    const [note, setNote] = useState(null);
    const [content, setContent] = useState("");
    const [revisions, setRevisions] = useState([]);
    const [selectedRevisionId, setSelectedRevisionId] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`/notes/${noteId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNote(res.data);
                setContent(res.data.content);

                // WebSocket join
                socket.emit("join-note", noteId);
            } catch (err) {
                console.error("Not alınamadı:", err);
            }
        };

        const fetchRevisions = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`/notes/${noteId}/revisions`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRevisions(res.data);
            } catch (err) {
                console.error("Revisions alınamadı:", err);
            }
        };

        if (noteId) {
            fetchNote();
            fetchRevisions();
        }

        socket.on("note-updated", (newContent) => {
            setContent(newContent);
        });

        return () => {
            socket.off("note-updated");
        };
    }, [noteId]);

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`/notes/${noteId}`, {
                title: note.title,
                content: content,
                access: note.access,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Not başarıyla güncellendi!");
        } catch (err) {
            console.error("Güncelleme hatası:", err);
            alert("Not güncellenemedi.");
        }
    };

    const handleRollback = async () => {
        if (!selectedRevisionId) return alert("Lütfen bir revizyon seç.");

        const token = localStorage.getItem("token");
        try {
            const res = await axios.post(`/notes/${noteId}/rollback`, {
                revisionId: selectedRevisionId,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setContent(res.data.content);
            alert("🔁 Revizyon geri yüklendi!");
        } catch (err) {
            console.error("Rollback hatası:", err);
            alert("❌ Revizyon geri alınamadı.");
        }
    };

    if (!note) return <p className="p-6">Yükleniyor...</p>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold text-primary mb-6">Notu Düzenle</h1>

            <input
                className="input input-bordered w-full mb-4"
                value={note.title}
                readOnly
            />

            <ReactQuill
                theme="snow"
                value={content}
                onChange={(value) => {
                    setContent(value);
                    socket.emit("edit-note", { noteId, content: value });
                }}
                className="mb-6 bg-white rounded-lg"
                modules={{
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'align': [] }],
                        [{ 'color': [] }, { 'background': [] }],
                        ['clean'],
                    ]
                }}
            />

            <div className="flex items-center gap-4 mb-6">
                <select
                    className="select select-bordered"
                    value={selectedRevisionId || ""}
                    onChange={(e) => setSelectedRevisionId(e.target.value)}
                >
                    <option value="" disabled>Bir revizyon seç</option>
                    {revisions.map((rev) => (
                        <option key={rev.id} value={rev.id}>
                            {new Date(rev.createdAt).toLocaleString("tr-TR")}
                        </option>
                    ))}
                </select>

                <button className="btn btn-warning" onClick={handleRollback}>↩️ Geri Al</button>
            </div>

            <button className="btn btn-primary" onClick={handleSave}>💾 Kaydet</button>
        </div>
    );
}