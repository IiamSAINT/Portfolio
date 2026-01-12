"use client";

import { Home, LayoutGrid, Folder, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { appleSpring } from "@/lib/animations";

const navItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: User, label: "About", href: "#about" },
    { icon: LayoutGrid, label: "Work", href: "#work" },
    { icon: Folder, label: "Side", href: "#side-projects" },
    { icon: MessageCircle, label: "Contact", href: "#contact" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:block">
            <motion.nav
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex flex-col gap-3 p-2 rounded-[24px] bg-transparent backdrop-blur-[10px] backdrop-saturate-[180%] backdrop-contrast-125 border border-white/[0.08] shadow-2xl shadow-black/10 ring-1 ring-white/[0.05]"
            >
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative group p-3.5 focus:outline-none"
                        >
                            {/* Active Bubble */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeDockItem"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="absolute inset-0 bg-white/10 rounded-[18px] backdrop-blur-sm"
                                />
                            )}

                            {/* Hover Bubble */}
                            {!isActive && (
                                <div className="absolute inset-0 bg-white/5 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            )}

                            {/* Icon */}
                            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                                <Icon
                                    size={24}
                                    className={cn(
                                        "transition-colors duration-300",
                                        isActive ? "text-white" : "text-white/40 group-hover:text-white/90"
                                    )}
                                    strokeWidth={2}
                                />
                            </div>

                            {/* Tooltip */}
                            <span className="absolute left-full ml-5 px-3 py-1.5 bg-black/80 backdrop-blur-xl text-white/90 text-[13px] font-medium rounded-xl opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 border border-white/10 shadow-xl">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </motion.nav>
        </div>
    );
}
