"use client";

import { motion } from "framer-motion";
import { Terminal, Shield, Cpu, Code2 } from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } as any }
};

export default function About() {
    return (
        <section id="about" className="relative py-20 px-4 scroll-mt-24">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-4xl mx-auto space-y-12"
            >
                {/* Header */}
                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white/90">
                        About <span className="text-white/40">Me</span>
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
                        I explore the intersection of security, intelligence, and development.
                    </p>
                </div>

                {/* Content Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {/* Bio Card */}
                    <motion.div variants={item} className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm shadow-xl hover:bg-white/[0.05] transition-colors duration-300">
                        <Terminal className="text-white/70 mb-4" size={32} />
                        <h3 className="text-xl font-semibold text-white/90 mb-3">Cybersecurity & Ethical Hacking</h3>
                        <p className="text-white/50 leading-relaxed mb-4">
                            As a cybersecurity student, I specialize in <span className="text-white/80">Ethical Hacking</span>, <span className="text-white/80">Web Application Security</span>, and <span className="text-white/80">API Testing</span>. My goal is to secure organizations by identifying vulnerabilities before they can be exploited.
                        </p>
                    </motion.div>

                    {/* AI/ML Card */}
                    <motion.div variants={item} className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm shadow-xl hover:bg-white/[0.05] transition-colors duration-300">
                        <Cpu className="text-white/70 mb-4" size={32} />
                        <h3 className="text-xl font-semibold text-white/90 mb-3">AI & Machine Learning</h3>
                        <p className="text-white/50 leading-relaxed mb-4">
                            I have a deep interest in <span className="text-white/80">Mathematics</span> and am actively exploring the AI and ML fields. I leverage these technologies to build smarter tools and automate complex workflows.
                        </p>
                    </motion.div>

                    {/* Dev Card */}
                    <motion.div variants={item} className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm shadow-xl hover:bg-white/[0.05] transition-colors duration-300 md:col-span-2">
                        <Code2 className="text-white/70 mb-4" size={32} />
                        <h3 className="text-xl font-semibold text-white/90 mb-3">Fullstack Development</h3>
                        <p className="text-white/50 leading-relaxed">
                            Beyond security, I am a proficient <span className="text-white/80">Fullstack Developer</span> capable of building robust web applications. I combine my security knowledge with development skills to create secure-by-design systems.
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
