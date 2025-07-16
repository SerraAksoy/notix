"use client";
import { motion } from "framer-motion";

const features = [
    {
        title: "Not Defteri Oluştur",
        description: "Kişisel veya grup not defterleri oluştur.",
    },
    {
        title: "Gerçek Zamanlı Düzenleme",
        description: "Arkadaşlarınla aynı anda düzenleme yap.",
    },
    {
        title: "Tema Seçimi",
        description: "DaisyUI ile temanı istediğin gibi değiştir.",
    },
    {
        title: "Görsel Notlar",
        description: "Resimli notlarla zengin içerik oluştur.",
    },
];

export default function NedenNotix() {
    return (
        <section className="backdrop-blur-md bg-white bg-opacity-60 p-6 rounded-2xl shadow-lg col-span-1 lg:col-span-1">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold">Neden Notix?</h2>
                <p className="text-gray-500 mt-2">Not tutmanın en kolay ve eğlenceli yolu.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50, rotate: -3 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.15 }}
                        viewport={{ once: true }}
                        className="bg-yellow-100 p-6 rounded-lg shadow-md rotate-[-2deg] hover:rotate-0 transition-transform"
                    >
                        <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}