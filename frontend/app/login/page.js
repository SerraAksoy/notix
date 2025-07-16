"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { login } = useAuth();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/login", { email, password });
            localStorage.setItem("accessToken", res.data.accessToken);
            login(res.data.accessToken);
            alert("Giriş başarılı!");
            router.push("/dashboard"); //  için yönlendirme
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Giriş başarısız!");
        }
    };
    return (
        <main className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
                <h1 className="text-2xl font-bold">Giriş Yap</h1>
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
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Giriş Yap
                </button>
            </form>
        </main>
    );
}