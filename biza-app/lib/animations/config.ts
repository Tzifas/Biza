/**
 * Animation & transition utilities
 */

export const transitionConfig = {
  fast: { duration: 0.15 },
  standard: { duration: 0.3 },
  slow: { duration: 0.5 },
};

export const easeConfig = {
  smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
  snappy: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

// Scroll reveal animation timing
export const scrollRevealConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -100px 0px" },
  transition: { duration: 0.5 },
};
