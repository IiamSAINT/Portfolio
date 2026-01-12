"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { appleSpring, tapScale } from "@/lib/animations";

export default function FloatingCTA() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href="#contact" className="fixed bottom-8 right-8 z-50 hidden md:block">
            <motion.button
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: isHovered ? 1.05 : 1, opacity: 1 }}
                whileTap={{ scale: tapScale }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative flex items-center px-7 py-4 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 shadow-2xl shadow-black/80 overflow-hidden group"
            >
                {/* Subtle Gradient Backing */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glossy Overlay */}
                <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/10 to-transparent rounded-t-full pointer-events-none" />

                <span className="relative z-10 text-[15px] font-medium text-white/90 mr-3 tracking-wide group-hover:text-white transition-colors">
                    Say Hello
                </span>

                <motion.span
                    animate={{ rotate: isHovered ? 20 : 0, scale: isHovered ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative z-10 text-xl"
                >
                    ✨
                </motion.span>
            </motion.button>
        </Link>
    );
}
