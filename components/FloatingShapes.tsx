"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function FloatingShapes() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            {/* Floating blob 1 */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-20 right-20 w-64 h-64"
            >
                <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full backdrop-blur-3xl border border-white/5" />
            </motion.div>

            {/* Floating blob 2 */}
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-40 left-10 w-80 h-80"
            >
                <div className="w-full h-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full backdrop-blur-3xl border border-white/5" />
            </motion.div>

            {/* Floating blob 3 */}
            <motion.div
                style={{ y: y3 }}
                className="absolute top-1/2 left-1/3 w-48 h-48"
            >
                <div className="w-full h-full bg-gradient-to-bl from-cyan-500/10 to-blue-500/10 rounded-full backdrop-blur-3xl border border-white/5" />
            </motion.div>

            {/* Small floating circles */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-amber-500/10 to-pink-500/10 rounded-full backdrop-blur-2xl border border-white/5"
            />
        </div>
    );
}
