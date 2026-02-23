// ─── Sovereign Motion System ───
// Coordinated, controlled animation primitives.
// "Controle é mais sofisticado que espetáculo."

export const ease = {
  sovereign: [0.22, 1, 0.36, 1] as const,
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
};

// Standard entry animation for all sections
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.sovereign },
  },
};

// Stagger container
export const stagger = (staggerDelay = 0.08) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

// Child item for stagger containers
export const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.sovereign },
  },
};

// Hero word reveal with blur
export const wordReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const wordChild = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: ease.sovereign },
  },
};

// Horizontal reveal (for dividers, lines)
export const lineReveal = (delay = 0) => ({
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay, ease: ease.smooth },
  },
});

// Slide from left (for trail items)
export const slideInLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay, ease: ease.sovereign },
  },
});

// Viewport trigger config
export const viewportOnce = { once: true, margin: "-80px" as const };
