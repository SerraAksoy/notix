"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function NewNotebookPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            await axios.post(
                "/notebooks",
                { name, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            router.push("/dashboard/notebooks");
        } catch (err) {
            console.error("Defter oluşturulamadı:", err);
            alert("Defter oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className="min-h-screen px-6 py-24 bg-[url('/dashboard-bg1.jpeg')] bg-cover bg-center">
            <div className="max-w-xl mx-auto bg-white/80 p-8 rounded-lg shadow">
                <h1 className="text-2xl font-bold text-primary mb-6">📔 Yeni Not Defteri Oluştur</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Defter adı"
                        className="input input-bordered"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Açıklama (isteğe bağlı)"
                        className="textarea textarea-bordered"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                        ➕ Oluştur
                    </button>
                </form>
            </div>
        </div>
    );
}