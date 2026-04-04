import { useEffect, useRef, useCallback } from "react";
import Hls from "hls.js";

interface HlsVideoBackgroundProps {
  src: string;
  className?: string;
  overlayOpacity?: number;
}

const HlsVideoBackground = ({ src, className = "", overlayOpacity = 0.7 }: HlsVideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const retryInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const forcePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      video.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const initVideo = () => {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");

      // Strategy 1: play on canplaythrough
      video.addEventListener("canplaythrough", forcePlay);
      // Strategy 2: play on loadedmetadata
      video.addEventListener("loadedmetadata", forcePlay);
      // Strategy 5: ended fallback for loop
      video.addEventListener("ended", () => {
        video.currentTime = 0;
        forcePlay();
      });
    };

    initVideo();

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, lowLatencyMode: false });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, forcePlay);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.load();
    }

    // Strategy 3: visibility change
    const onVisibility = () => {
      if (document.visibilityState === "visible") forcePlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Strategy 4: user interaction fallback
    const interactionEvents = ["touchstart", "click", "scroll"];
    interactionEvents.forEach((e) => document.addEventListener(e, forcePlay, { once: true, passive: true }));

    // Strategy 5: 1s interval check
    retryInterval.current = setInterval(forcePlay, 1000);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      interactionEvents.forEach((e) => document.removeEventListener(e, forcePlay));
      if (retryInterval.current) clearInterval(retryInterval.current);
      if (hlsRef.current) hlsRef.current.destroy();
      video.removeEventListener("canplaythrough", forcePlay);
      video.removeEventListener("loadedmetadata", forcePlay);
    };
  }, [src, forcePlay]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        loop
        preload="auto"
      />
      <div
        className="absolute inset-0 bg-background"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
};

export default HlsVideoBackground;
