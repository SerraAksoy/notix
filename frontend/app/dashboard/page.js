"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "@/lib/axios";

export default function DashboardPage() {
    const router = useRouter();
    const [notebooks, setNotebooks] = useState([]);

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

    return (
        <div className="bg-[url('/dashboard-bg1.jpeg')] bg-white bg-opacity-70 backdrop-blur-md min-h-screen bg-cover bg-center bg-no-repeat">
            <div className="min-h-screen px-6 pt-24 pb-10">
                <h1 className="text-3xl font-bold">Hoş geldin!</h1>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Hızlı Erişim</h2>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/dashboard/notebooks/new" className="btn btn-primary gap-2">
                            <span className="text-lg">➕</span> Yeni Defter
                        </Link>
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
                                <div className="group perspective w-52 h-72">
                                    <div className="relative w-full h-full duration-700 transform-style preserve-3d group-hover:rotate-y-180">
                                        <div
                                            className="absolute w-full h-full backface-hidden rounded-xl shadow-xl"
                                            style={{
                                                backgroundImage: `url('/cover-1.jpeg')`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        >
                                        </div>
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
            </div>
        </div>
    );
}