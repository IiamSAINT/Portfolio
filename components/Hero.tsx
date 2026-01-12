"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { appleSpring, heavySpring } from "@/lib/animations";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const yImage = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative flex flex-col items-center justify-center min-h-[85vh] text-center pt-20 pb-10 overflow-hidden"
        >
            {/* Liquid Profile Container */}
            <motion.div
                style={{ y: yImage, opacity }}
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 30, mass: 1.5 }}
                className="relative z-10 mb-10 group"
            >
                <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 p-1.5 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/20"
                >
                    <div className="relative w-full h-full rounded-full overflow-hidden shadow-inner bg-black">
                        <Image
                            src="/profile.jpg"
                            alt="Profile Picture"
                            fill
                            className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                            priority
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Main Typography */}
            <motion.div
                style={{ y: yText, opacity }}
                className="relative z-10 flex flex-col items-center justify-center gap-4 px-4"
            >
                <div className="flex items-baseline justify-center gap-3 sm:gap-4 md:gap-6 text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight">
                    {/* "I'm" - Normal Font, Fade In */}
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 4.5, duration: 0.8, ease: "easeOut" }}
                        className="text-white/40 font-title"
                    >
                        I'm
                    </motion.span>

                    {/* "SAINT" - Fancy Font, Typewriter */}
                    <motion.div
                        className="flex items-center text-white font-[var(--font-outfit)]"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15,
                                    delayChildren: 5.0, // Starts after "I'm" has mostly faded in
                                }
                            }
                        }}
                    >
                        {Array.from("SAINT").map((char, index) => (
                            <motion.span
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 10, rotateX: 90 },
                                    visible: { opacity: 1, y: 0, rotateX: 0 }
                                }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                        {/* Blinking Cursor */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear", delay: 5.0 }}
                            className="w-1 h-8 sm:h-12 md:h-20 bg-blue-500 ml-1 sm:ml-2 rounded-full"
                        />
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 30, mass: 1.5, delay: 6.0 }} // Delayed until after name
                    className="text-lg md:text-xl text-white/50 font-medium tracking-wide max-w-2xl mx-auto leading-relaxed text-center"
                >
                    Cybersecurity Engineer | Fullstack Developer | AI & ML
                    <br className="hidden md:block" />
                    <span className="text-white/80"> Securing frontiers while building intelligent systems.</span>
                </motion.p>
            </motion.div>
        </section>
    );
}
