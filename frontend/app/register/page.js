"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState(""); // kullanıcı adı
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/auth/register", { email, password, username }); // 👈 username gönderildi
            alert("Kayıt başarılı, şimdi giriş yapabilirsin!");
            router.push("/login");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Kayıt başarısız!");
        }
    };

    return (
        <main className="relative min-h-screen flex items-center justify-center bg-[url('/login-bg.jpeg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm z-0" />

            <form
                onSubmit={handleRegister}
                className="z-10 bg-white bg-opacity-80 backdrop-blur-md shadow-2xl rounded-xl p-8 w-[90%] max-w-md space-y-4 animate-fade-in-down"
            >
                <h1 className="text-3xl font-bold text-center text-green-600">Yeni Hesap Oluştur</h1>

                <input
                    type="text"
                    placeholder="👤 Kullanıcı adınız"
                    className="input input-bordered w-full"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="📧 Email adresiniz"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="🔐 Şifreniz"
                    className="input input-bordered w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn btn-success w-full">
                    🚀 Kayıt Ol
                </button>
            </form>

            {/* Alt not */}
            <div className="absolute bottom-4 left-4 text-xs text-gray-500 z-10 animate-fade-in">
                🎉 Hadi başlayalım, fikirlerini koru!
            </div>
        </main>
    );
}