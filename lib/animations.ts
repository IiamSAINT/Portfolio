export const appleSpring = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
};

export const heavySpring = {
    type: "spring",
    stiffness: 200,
    damping: 30,
    mass: 1.5,
};

export const hoverScale = {
    scale: 1.02,
    transition: appleSpring,
};

export const tapScale = 0.96;

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const fadeInUp = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: appleSpring
    },
};
