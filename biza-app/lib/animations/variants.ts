/**
 * Reusable Framer Motion animation variants
 * Subtle & professional animations
 */

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const cardVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  hover: {
    y: -4,
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
    transition: {
      duration: 0.2,
    },
  },
};

export const buttonVariants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.15 },
  },
  tap: {
    scale: 0.98,
  },
};

export const scaleInVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const slideUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const slideRightVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const fadeInVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export const pulseVariants = {
  animate: {
    opacity: [1, 0.6, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};
