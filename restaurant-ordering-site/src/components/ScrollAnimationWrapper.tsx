"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollAnimationWrapperProps {
    children: ReactNode;
    animation?: "fade" | "slide-left" | "slide-right";
    className?: string;
}

export default function ScrollAnimationWrapper({
    children,
    animation = "fade",
    className = "",
}: ScrollAnimationWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const animationClass = {
        fade: "scroll-fade-in",
        "slide-left": "scroll-slide-left",
        "slide-right": "scroll-slide-right",
    }[animation];

    return (
        <div ref={ref} className={`${animationClass} ${className}`}>
            {children}
        </div>
    );
}
