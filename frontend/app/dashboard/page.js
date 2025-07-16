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
        <div className="min-h-screen bg-base-100">
            <div className="pt-24 px-6 space-y-8">
                <h1 className="text-3xl font-bold">Hoş geldin!</h1>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Hızlı Erişim</h2>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/dashboard/notebooks/new" className="btn btn-primary">
                        </Link>
                        <Link href="/dashboard/shared" className="btn btn-secondary">
                            Paylaşılanlarla Düzenle
                        </Link>
                        <Link href="/dashboard/recent" className="btn btn-accent">
                            Son Notlarım
                        </Link>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Son Not Defterlerin</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notebooks.map((nb) => (
                            <div key={nb.id} className="card shadow-md bg-base-200">
                                <div className="card-body">
                                    <h2 className="card-title">{nb.name}</h2>
                                    <p className="line-clamp-3 text-sm text-gray-500">{nb.description}</p>
                                    <div className="card-actions justify-end">
                                        <Link
                                            href={`/dashboard/notebooks/${nb.id}`}
                                            className="btn btn-sm btn-primary"
                                        >
                                            Aç
                                        </Link>
                                    </div>
                                </div>
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