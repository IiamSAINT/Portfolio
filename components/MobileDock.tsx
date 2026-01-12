"use client";

import { Home, LayoutGrid, Folder, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: User, label: "About", href: "#about" },
    { icon: LayoutGrid, label: "Work", href: "#work" },
    { icon: Folder, label: "Side", href: "#side-projects" },
    { icon: MessageCircle, label: "Contact", href: "#contact" },
];

export default function MobileDock() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 block md:hidden w-auto">
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.5 }}
                className="flex items-center gap-1 p-2 rounded-full bg-transparent backdrop-blur-[10px] backdrop-saturate-[180%] backdrop-contrast-125 border border-white/[0.08] shadow-2xl shadow-black/10 ring-1 ring-white/[0.1]"
            >
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative group p-3 focus:outline-none"
                        >
                            {/* Active Bubble */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeMobileDockItem"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="absolute inset-0 bg-white/15 rounded-full"
                                />
                            )}

                            {/* Icon */}
                            <div className="relative z-10">
                                <Icon
                                    size={22}
                                    className={cn(
                                        "transition-colors duration-300",
                                        isActive ? "text-white" : "text-white/60 group-active:text-white"
                                    )}
                                    fill={isActive ? "currentColor" : "none"}
                                />
                            </div>
                        </Link>
                    );
                })}
            </motion.nav>
        </div>
    );
}
