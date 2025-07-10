"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/auth/register", { email, password });
            alert("Kayıt başarılı, şimdi giriş yapabilirsin!");
            router.push("/login");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Kayıt başarısız!");
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
                <h1 className="text-2xl font-bold">Kayıt Ol</h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    className="border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-green-500 text-white p-2 rounded">
                    Kayıt Ol
                </button>
            </form>
        </main>
    );
}