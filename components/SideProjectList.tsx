"use client";

import { motion } from "framer-motion";
import { appleSpring } from "@/lib/animations";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface SideProject {
    title: string;
    description: string;
    link: string;
    year: string;
}

const projects: SideProject[] = [
    {
        title: "LinkedIn Tracker",
        description: "Activity Tracking Tool",
        link: "https://github.com/IiamSAINT/LinkedIn-Tracker",
        year: "2024"
    },
    {
        title: "Mini Nmap",
        description: "Network Security Scanner",
        link: "https://github.com/IiamSAINT/mini-nmap",
        year: "2023"
    },
    {
        title: "Python Keylogger",
        description: "Security Research Tool",
        link: "https://github.com/IiamSAINT/keylogger",
        year: "2023"
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
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } as any }
};

export default function SideProjectList() {
    return (
        <section className="space-y-8">
            <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-2xl font-semibold text-white/90 pl-2 tracking-tight"
            >
                Side Projects
            </motion.h3>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col gap-2"
            >
                {projects.map((project) => (
                    <motion.div key={project.title} variants={item}>
                        <Link
                            href={project.link}
                            className="group flex items-center justify-between p-6 rounded-[2rem] bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-white/10 transition-all duration-300 backdrop-blur-xl cursor-pointer"
                        >
                            <div className="flex flex-col gap-1">
                                <h4 className="text-lg font-medium text-white/80 group-hover:text-white transition-colors">
                                    {project.title}
                                </h4>
                                <p className="text-white/40 group-hover:text-white/60 transition-colors font-medium">
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className="text-sm font-medium text-white/20 group-hover:text-white/40 transition-colors">
                                    {project.year}
                                </span>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors group-hover:scale-110 duration-300">
                                    <ArrowUpRight size={18} className="text-white/40 group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
