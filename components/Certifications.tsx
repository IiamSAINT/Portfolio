"use client";

import { motion } from "framer-motion";
import { Shield, Award, CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Certification {
    name: string;
    issuer: string;
    date: string;
    link: string;
    credentialId?: string;
}

const certifications: Certification[] = [
    {
        name: "CompTIA Security+",
        issuer: "CompTIA",
        date: "2024",
        link: "#",
        credentialId: "COMP00123456789"
    },
    {
        name: "Certified Ethical Hacker (CEH)",
        issuer: "EC-Council",
        date: "2023",
        link: "#",
        credentialId: "ECC987654321"
    },
    {
        name: "Google Cybersecurity Certificate",
        issuer: "Google",
        date: "2023",
        link: "#"
    }
];

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } as any }
};

export default function Certifications() {
    return (
        <section id="certifications" className="relative py-10 px-4 scroll-mt-24">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-4xl mx-auto space-y-8"
            >
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 pl-2">
                    <Shield className="text-white/40" size={28} />
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white/90">
                        Certifications
                    </h2>
                </div>

                {/* Cert Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {certifications.map((cert, index) => (
                        <motion.div key={index} variants={item}>
                            <Link
                                href={cert.link}
                                className="group relative block p-6 h-full rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 backdrop-blur-sm overflow-hidden"
                            >
                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-colors duration-500" />

                                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-start">
                                            <Award className="text-blue-400/80 group-hover:text-blue-400 transition-colors" size={24} />
                                            <ExternalLink className="text-white/20 group-hover:text-white/60 transition-colors opacity-0 group-hover:opacity-100" size={16} />
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-white/90 group-hover:text-white leading-tight">
                                                {cert.name}
                                            </h3>
                                            <p className="text-sm text-white/50 mt-1 font-medium">
                                                {cert.issuer}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-white/40 font-mono">
                                        <span>{cert.date}</span>
                                        {cert.credentialId && (
                                            <span className="group-hover:text-white/60 transition-colors truncate max-w-[120px]">
                                                ID: {cert.credentialId}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
