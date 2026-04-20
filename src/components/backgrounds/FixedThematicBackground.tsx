import React from "react";

interface Props {
  image: string;
  /** Overlay strength: heavy (default) keeps text dominant, soft lets imagery breathe */
  intensity?: "heavy" | "medium" | "soft";
}

const overlayMap = {
  heavy: "linear-gradient(rgba(5,8,8,0.92), rgba(5,8,8,0.96))",
  medium: "linear-gradient(rgba(5,8,8,0.82), rgba(5,8,8,0.90))",
  soft: "linear-gradient(rgba(5,8,8,0.70), rgba(5,8,8,0.82))",
};

/**
 * Fixed cinematic background image used across heavy editorial pages.
 * Mirrors the standard established on /soberania-organica/toxicos-ocultos.
 */
const FixedThematicBackground: React.FC<Props> = ({ image, intensity = "medium" }) => {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `${overlayMap[intensity]}, url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default FixedThematicBackground;
