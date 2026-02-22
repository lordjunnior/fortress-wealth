const NoiseBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#070A12]" />

      {/* Radial gradients */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 40%, hsl(222 60% 12%) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 20%, hsl(40 40% 8%) 0%, transparent 60%), radial-gradient(ellipse 90% 70% at 50% 90%, hsl(222 50% 8%) 0%, transparent 70%)",
        }}
      />

      {/* Noise pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
};

export default NoiseBackground;
