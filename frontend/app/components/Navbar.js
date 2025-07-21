"use client";
import axios from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const { isAuthenticated, logout } = useAuth();
    const [avatarUrl, setAvatarUrl] = useState("/default-avatar.png");
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            const storedAvatar = localStorage.getItem("userAvatar");
            if (storedAvatar) {
                setAvatarUrl(storedAvatar);
            } else {
                const random = `https://api.dicebear.com/7.x/thumbs/svg?seed=${Math.floor(Math.random() * 1000)}`;
                localStorage.setItem("userAvatar", random);
                setAvatarUrl(random);
            }

            // ✳️ username backend'den çekiliyor
            const token = localStorage.getItem("token");
            axios
                .get("/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => setUsername(res.data.username))
                .catch((err) => console.error("Kullanıcı adı alınamadı:", err));
        }
    }, [isAuthenticated]);

    return (
        <div className="navbar bg-base-100 fixed top-0 left-0 w-full shadow-md z-50 px-4">
            <div className="flex-1">
                <Link href="/" className="text-xl font-bold text-primary">
                    Notix
                </Link>
            </div>
            <div className="flex gap-2 items-center">
                {isAuthenticated ? (
                    <>
                        <span className="text-sm font-medium text-gray-600 hidden sm:inline">
                            👋 Merhaba, <span className="text-primary font-semibold">{username}</span>
                        </span>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img alt="Kullanıcı" src={avatarUrl} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li><Link href="/profile">Profilim</Link></li>
                                <li><Link href="/change-password">Şifre Değiştir</Link></li>
                                <li>
                                    <button
                                        onClick={() => {
                                            logout();
                                            router.push("/");
                                        }}
                                    >
                                        Çıkış Yap
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="btn btn-ghost">Giriş Yap</Link>
                        <Link href="/register" className="btn btn-outline btn-primary">Kayıt Ol</Link>
                    </>
                )}

                <label className="swap swap-rotate">
                    <input type="checkbox" className="theme-controller" value="dark" />
                    <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="..." />
                    </svg>
                    <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="..." />
                    </svg>
                </label>
            </div>
        </div>
    );
}