"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotebooksPage() {
    const [notebooks, setNotebooks] = useState([]);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.push("/login");
        } else {
            axios
                .get("/notebooks")
                .then((res) => setNotebooks(res.data))
                .catch((err) => console.error(err))
                .finally(() => setIsAuthChecked(true));
        }
    }, [router]);

    if (!isAuthChecked) return null;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Not Defterlerim</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notebooks.map((nb) => (
                    <div key={nb.id} className="card bg-base-100 shadow-md hover:shadow-lg transition">
                        <div className="card-body">
                            <h2 className="card-title text-primary">
                                <Link href={`/dashboard/notebooks/${nb.id}`} className="hover:underline">
                                    {nb.name}
                                </Link>
                            </h2>
                            {nb.description && (
                                <p className="text-sm text-gray-500">{nb.description}</p>
                            )}
                            <div className="card-actions justify-end mt-2">
                                <Link
                                    href={`/dashboard/notebooks/${nb.id}`}
                                    className="btn btn-sm btn-primary"
                                >
                                    Notlara Git
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}