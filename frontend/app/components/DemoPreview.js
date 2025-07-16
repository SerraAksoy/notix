"use client";
import Image from "next/image";

export default function DemoPreview() {
    return (
        <section className="backdrop-blur-md bg-white bg-opacity-60 p-6 rounded-2xl shadow-lg col-span-1 lg:col-span-1">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="mockup-window border bg-base-100 w-full md:w-2/3 shadow-xl">
                    <div className="p-6 space-y-3">
                        <h2 className="text-xl font-bold text-primary">📓 Not Başlığı: Proje Fikirleri</h2>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                            <li>Gerçek zamanlı eş zamanlı düzenleme</li>
                        </ul>
                        <textarea
                            className="textarea textarea-bordered w-full h-32 mt-3 bg-base-200"
                            placeholder="Fikirlerinizi buraya yazın..."
                            disabled
                        ></textarea>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <div className="avatar-group -space-x-4 mb-2">
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <Image src="/karaca.jpeg" width={48} height={48} alt="Karaca" />
                            </div>
                        </div>
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <Image src="/serra.jpeg" width={48} height={48} alt="Sen" />
                            </div>
                        </div>
                    </div>
                    <p className="text-md font-medium text-gray-700">Karaca ile düzenleniyor...</p>
                    <span className="badge badge-info mt-2 animate-pulse">Canlı eş zamanlı düzenleme</span>
                </div>
            </div>
        </section>
    );x
}