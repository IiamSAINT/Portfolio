"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { appleSpring, hoverScale, heavySpring } from "@/lib/animations";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    images: string[];
    link: string;
}

export default function ProjectCard({ title, description, tags, images, link }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Scroll Parallax (Inner Image)
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    // 3D Tilt - Tsubtle but responsive
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set((clientX - left) / width - 0.5);
        y.set((clientY - top) / height - 0.5);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);
    const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    return (
        <motion.div
            ref={cardRef}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative w-full perspective-1000"
        >
            <Link href={link} target="_blank" className="block outline-none">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative bg-[#080808]/40 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50"
                >
                    {/* Glossy Overlay */}
                    <div
                        className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
                    />

                    {/* Dynamic Shine Light */}
                    <motion.div
                        style={{
                            background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.08) 0%, transparent 60%)`
                        }}
                        className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Image Area with Inner Parallax */}
                        <div className="relative h-[300px] lg:h-auto bg-black/20 overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                            {images.length > 0 && (
                                <motion.div
                                    style={{ y: imageY }}
                                    className="absolute inset-[-10%] w-[120%] h-[120%]"
                                >
                                    {images[0].startsWith('#') ? (
                                        <div className="w-full h-full" style={{ backgroundColor: images[0] }}>
                                            <div className="absolute inset-0 bg-black/10" />
                                        </div>
                                    ) : (
                                        // Placeholder visual
                                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black" />
                                    )}
                                </motion.div>
                            )}
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 to-transparent lg:bg-gradient-to-l" />
                        </div>

                        {/* Content Area */}
                        <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center space-y-6 relative z-30">
                            <div>
                                <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors duration-300">
                                    {title}
                                </h3>
                                <p className="mt-4 text-white/50 text-lg leading-relaxed font-medium">
                                    {description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {tags.map(tag => (
                                    <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-sm text-white/70 font-medium backdrop-blur-md">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-4 flex items-center gap-2 text-white/40 text-sm font-medium group-hover:text-white/80 transition-colors">
                                <span>View Project</span>
                                <ExternalLink size={14} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}
