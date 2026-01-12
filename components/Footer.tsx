"use client";

import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-20 text-center space-y-8">
            <div className="flex items-center justify-center gap-6 text-gray-600">
                <Link href="#" className="hover:text-white transition-colors"><Twitter size={20} /></Link>
                <Link href="#" className="hover:text-white transition-colors"><Instagram size={20} /></Link>
                <Link href="#" className="hover:text-white transition-colors"><Github size={20} /></Link>
                <Link href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></Link>
            </div>
            <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} Saint. All rights reserved.
            </p>
        </footer>
    );
}
