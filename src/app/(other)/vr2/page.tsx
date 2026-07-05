"use client";
import { useEffect, useRef, useState } from "react";
import { VRPlayer } from "vr-player";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VRPlayer | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const player = new VRPlayer({
      container: containerRef.current,
      webgl: 2,
      renderScale: 2,
    });
    playerRef.current = player;
    player.load("/testvr.mp4");
    const video = player.video;
    video.addEventListener("play", () => setPlaying(true));
    video.addEventListener("pause", () => setPlaying(false));
    video.addEventListener("ended", () => setPlaying(false));
    return () => {
      player.destroy();
      playerRef.current = null;
    };
  }, []);

  const handlePlay = () => {
    playerRef.current?.play().catch(() => {});
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div className="container" ref={containerRef} style={{ width: "100%", height: "100%" }}></div>
      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="播放"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 88,
            height: 88,
            borderRadius: "50%",
            border: "none",
            background: "rgba(0, 0, 0, 0.55)",
            color: "#fff",
            cursor: "pointer",
            backdropFilter: "blur(4px)",
          }}
        >
          <svg viewBox="0 0 24 24" width={40} height={40} fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  );
}
