"use client";
import Link from "next/link";
import Image from "next/image";
import NedenNotix from "./components/NedenNotix";
import DemoPreview from "./components/DemoPreview";

export default function Home() {
    return (
        <div className="relative min-h-screen  overflow-hidden">
            <div
                className="min-h-screen px-6 pt-24 pb-10 bg-[url('/hero.jpg')] bg-cover bg-center bg-no-repeat relative z-0">
                {/* Üst Satır: Hero + NedenNotix */}

                    <div className="hero-overlay bg-white bg-opacity-60 backdrop-blur-md rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                        {/* Sol: Hero Content */}
                        <div className="p-6 rounded-2xl shadow-lg flex flex-col justify-center">
                            <h1 className="text-4xl font-bold text-primary mb-4">Fikirlerini Koru, Hayallerini Yaz</h1>
                            <p className="text-md text-gray-700 mb-6">
                                Notix ile tüm notlarını tek bir yerde sakla, düzenle ve dilediğin an eriş.
                            </p>
                            <Link href="/dashboard" className="btn btn-primary w-full">Notlarına Git</Link>
                        </div>


                        <NedenNotix/>

                    </div>

                    {/* Alt Satır: DemoPreview */}
                    <div >
                        <DemoPreview/>
                    </div>
                </div>
            </div>
            );
            }