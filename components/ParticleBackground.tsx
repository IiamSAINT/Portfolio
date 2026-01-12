"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Parallax Effect
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]); // Move down 200px over the full scroll range

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight + 200); // Extra height for parallax movement

        // Particle Configuration
        const particleCount = Math.min(Math.floor((width * height) / 6000), 300); // Increased density
        const connectionDistance = 150;
        const mouseParams = { x: -1000, y: -1000, radius: 200 };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 0.5;
            }

            update() {
                // Move
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse interaction (Repel slightly for "disturbance" effect)
                const dx = mouseParams.x - this.x;
                const dy = mouseParams.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseParams.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseParams.radius - distance) / mouseParams.radius;
                    const directionX = forceDirectionX * force * 0.5;
                    const directionY = forceDirectionY * force * 0.5;

                    // Gentle push away
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                const dx = this.x - mouseParams.x;
                const dy = this.y - mouseParams.y;
                const distToMouse = Math.sqrt(dx * dx + dy * dy);

                // Highlight logic
                const isNearMouse = distToMouse < mouseParams.radius;
                const alpha = isNearMouse ? 0.8 : 0.3; // Brighter when near
                const size = isNearMouse ? this.size * 1.5 : this.size; // Larger when near

                ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();
            }
        }

        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        // Check if connection is near mouse for highlight
                        const mouseDx = particles[i].x - mouseParams.x;
                        const mouseDy = particles[i].y - mouseParams.y;
                        const distToMouse = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

                        ctx.beginPath();
                        let opacity = 0.1 * (1 - distance / connectionDistance);

                        // Boost opacity if near mouse
                        if (distToMouse < mouseParams.radius) {
                            opacity = 0.5 * (1 - distance / connectionDistance); // Much brighter connections
                            ctx.lineWidth = 1.5;
                        } else {
                            ctx.lineWidth = 0.5;
                        }

                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Connect to mouse
                const dx = particles[i].x - mouseParams.x;
                const dy = particles[i].y - mouseParams.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseParams.radius) {
                    ctx.beginPath();
                    // Intense mouse connection
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * (1 - distance / mouseParams.radius)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouseParams.x, mouseParams.y);
                    ctx.stroke();
                }
            }

            requestAnimationFrame(animate);
        }

        animate();

        // Event Listeners
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight + 200;
        };
        const handleMouseMove = (e: MouseEvent) => {
            mouseParams.x = e.clientX;
            mouseParams.y = e.clientY;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            style={{ y, top: -200 }}
            className="fixed inset-0 -z-10 bg-black pointer-events-none h-[calc(100vh+200px)]"
        />
    );
}
