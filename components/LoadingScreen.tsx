"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    // Configuration for the wave
    const dotCount = 48;
    const radius = 100;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
                >
                    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
                        <svg width="300" height="300" viewBox="-150 -150 300 300" className="overflow-visible">
                            <defs>
                                <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
                                </linearGradient>
                            </defs>

                            {/* Background Glow */}
                            <motion.circle
                                cx="0" cy="0" r="80"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.1, 0.2, 0.1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="fill-blue-500 blur-[60px]"
                            />

                            {/* The Dots */}
                            {Array.from({ length: dotCount }).map((_, i) => {
                                const angle = (i / dotCount) * 2 * Math.PI;

                                return (
                                    <motion.circle
                                        key={i}
                                        r="2"
                                        fill="url(#glow)"
                                        className="drop-shadow-[0_0_4px_rgba(96,165,250,0.6)]"
                                        initial={{
                                            cx: radius * Math.cos(angle),
                                            cy: radius * Math.sin(angle)
                                        }}
                                        animate={{
                                            cx: [
                                                (radius - 15) * Math.cos(angle),
                                                (radius + 15) * Math.cos(angle),
                                                (radius - 15) * Math.cos(angle)
                                            ],
                                            cy: [
                                                (radius - 15) * Math.sin(angle),
                                                (radius + 15) * Math.sin(angle),
                                                (radius - 15) * Math.sin(angle)
                                            ]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: (i / dotCount) * -2 // Negative delay for seamless loop
                                        }}
                                    />
                                );
                            })}

                            {/* Inner Ring (Offset Phase) */}
                            {Array.from({ length: dotCount }).map((_, i) => {
                                const angle = (i / dotCount) * 2 * Math.PI;
                                const innerRadius = radius * 0.5; // Smaller ring

                                return (
                                    <motion.circle
                                        key={`inner-${i}`}
                                        r="1.5"
                                        fill="rgba(255,255,255,0.4)"
                                        initial={{
                                            cx: innerRadius * Math.cos(angle),
                                            cy: innerRadius * Math.sin(angle)
                                        }}
                                        animate={{
                                            cx: [
                                                (innerRadius + 10) * Math.cos(angle),
                                                (innerRadius - 10) * Math.cos(angle),
                                                (innerRadius + 10) * Math.cos(angle)
                                            ],
                                            cy: [
                                                (innerRadius + 10) * Math.sin(angle),
                                                (innerRadius - 10) * Math.sin(angle),
                                                (innerRadius + 10) * Math.sin(angle)
                                            ]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: (i / dotCount) * -2
                                        }}
                                    />
                                );
                            })}

                        </svg>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
