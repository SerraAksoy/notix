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
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Giriş başarısız!");
        }
    };

    return (
        <main
            className="relative min-h-screen flex items-center justify-center bg-[url('/login-bg.jpeg')] bg-cover bg-center"
        >
            {/* Blur Overlay */}
            <div className="absolute inset-0 bg-white bg-opacity-5 backdrop-blur-sm z-0" />

            {/* Giriş Kartı */}
            <form
                onSubmit={handleLogin}
                className="z-10 bg-white bg-opacity-80 backdrop-blur-md shadow-2xl rounded-xl p-8 w-[90%] max-w-md space-y-4 animate-fade-in-down"
            >
                <h1 className="text-3xl font-bold text-center text-primary">Notix'e Giriş</h1>

                <input
                    type="email"
                    placeholder="📧 Email adresiniz"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="🔐 Şifreniz"
                    className="input input-bordered w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="btn btn-primary w-full">
                    🚀 Giriş Yap
                </button>
            </form>

            {/* Hafif animasyon (örnek) */}
            <div className="absolute bottom-4 right-4 text-xs text-gray-500 z-10 animate-bounce">
                💡 Şifreni hatırlamıyor musun?
            </div>
        </main>
    );
}