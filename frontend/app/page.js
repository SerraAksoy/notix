"use client";
import { useRouter } from "next/navigation";
import { useToast } from "./components/ToastContext"; // Eğer burada değilse doğru yoldan import et
import Image from "next/image";
import NedenNotix from "./components/NedenNotix";
import DemoPreview from "./components/DemoPreview";

export default function Home() {
    const router = useRouter();
    const { showToast } = useToast();

    const handleClick = () => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/dashboard");
        } else {
            showToast(" Lütfen önce giriş yapınız.", "error");
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="min-h-screen px-6 pt-24 pb-10 bg-[url('/hero.jpg')] bg-cover bg-center bg-no-repeat relative z-0">
                <div className="hero-overlay bg-white bg-opacity-60 backdrop-blur-md rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    <div className="p-6 rounded-2xl shadow-lg flex flex-col justify-center">
                        <h1 className="text-4xl font-bold text-primary mb-4">
                            Fikirlerini Koru, Hayallerini Yaz
                        </h1>
                        <p className="text-md text-gray-700 mb-6">
                            Notix ile tüm notlarını tek bir yerde sakla, düzenle ve dilediğin an eriş.
                        </p>
                        <button
                            onClick={handleClick}
                            className="btn btn-primary w-full"
                        >
                            Notlarına Git
                        </button>
                    </div>
                    <div className="lg:col-span-2">
                        <NedenNotix/>
                    </div>
                </div>
                <div>
                <DemoPreview />
                </div>
            </div>
        </div>
    );
}