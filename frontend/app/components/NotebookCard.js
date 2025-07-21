"use client";

import Link from "next/link";
import "./NotebookCard.css"; // Ek CSS sınıflarını burada tutacağız

export default function NotebookCard({ id, name, description }) {
    return (
        <div className="group perspective w-full h-64">
            <div className="relative w-full h-full duration-700 transform-style preserve-3d group-hover:rotate-y-180">

                {/* Ön Kapak */}
                <div className="absolute w-full h-full backface-hidden bg-rose-200 border-[3px] border-rose-300 rounded-xl shadow-xl p-6 flex flex-col justify-center">
                    <h2 className="text-xl font-bold text-brown-800">{name}</h2>
                    <p className="text-sm text-brown-600 mt-2 italic">👀 Tıkla ve aç!</p>
                </div>

                {/* Arka İç Sayfa */}
                <div className="absolute w-full h-full backface-hidden bg-amber-50 border border-gray-200 rounded-xl shadow-inner p-6 rotate-y-180 overflow-hidden">
                    <p className="text-sm text-gray-700 line-clamp-5">{description}</p>
                    <Link
                        href={`/dashboard/notebooks/${id}`}
                        className="btn btn-sm btn-primary mt-4"
                    >
                        Aç
                    </Link>
                </div>
            </div>
        </div>
    );
}