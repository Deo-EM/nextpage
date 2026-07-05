"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { VRPlayer } from "vr-player";
import styles from "./vr.module.css";

const SRC = "/testvr.mp4";

function formatTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const iconCls = "h-5 w-5 fill-current sm:h-6 sm:w-6";

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className={`${iconCls} translate-x-0.5`} aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} aria-hidden="true">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);

export default function VRPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VRPlayer | null>(null);
  const seekingRef = useRef(false);
  const rafRef = useRef<number>(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 用 rAF 驱动时间更新，与渲染帧同步，避免 timeupdate 频繁触发 setState
  const updateTime = useCallback(() => {
    const player = playerRef.current;
    if (!player || seekingRef.current) {
      rafRef.current = requestAnimationFrame(updateTime);
      return;
    }
    setCurrentTime(player.video.currentTime);
    rafRef.current = requestAnimationFrame(updateTime);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    let destroyed = false;

    (async () => {
      const player = new VRPlayer({
        container: containerRef.current as HTMLDivElement,
        muted: false,
        webgl: 2,
        renderScale: 2,
      });
      playerRef.current = player;
      await player.load(SRC);
      if (destroyed) return;
      const video = player.video;

      // 仅用这些事件来控制播放状态，不再用 timeupdate 驱动 UI
      video.addEventListener("loadedmetadata", () => setDuration(video.duration || 0));
      video.addEventListener("play", () => {
        setIsPlaying(true);
        rafRef.current = requestAnimationFrame(updateTime);
      });
      video.addEventListener("pause", () => {
        setIsPlaying(false);
        cancelAnimationFrame(rafRef.current);
      });
      video.addEventListener("ended", () => {
        setIsPlaying(false);
        cancelAnimationFrame(rafRef.current);
      });

      setDuration(video.duration || 0);
      player.play().catch(() => {});
    })();

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafRef.current);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [updateTime]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    const video = player.video;
    if (video.paused) player.play().catch(() => {});
    else player.pause();
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const player = playerRef.current;
    if (!player) return;
    const t = Number(e.target.value);
    seekingRef.current = true;
    setCurrentTime(t);
    player.video.currentTime = t;
  }, []);

  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;

  // 缓存 formatTime 结果和 inline style，避免每次渲染重建
  const currentTimeStr = useMemo(() => formatTime(currentTime), [currentTime]);
  const durationStr = useMemo(() => formatTime(duration), [duration]);
  const trackStyle = useMemo(
    () => ({
      background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${pct}%, rgba(255,255,255,0.3) ${pct}%, rgba(255,255,255,0.3) 100%)`,
    }),
    [pct],
  );

  return (
    <div className="relative h-dvh w-full select-none overflow-hidden bg-black">
      <div ref={containerRef} className="absolute inset-0" />

      {/* 顶部标识 */}
      <div className="pointer-events-none absolute top-4 left-4 sm:top-6 sm:left-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium tracking-wide text-white/80 backdrop-blur-md sm:text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          360° VR Player
        </span>
      </div>

      {/* 底部可读性渐变 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

      {/* 控件条 */}
      <div className="absolute inset-x-0 bottom-0 px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="pointer-events-auto mx-auto flex max-w-5xl items-center gap-3 rounded-2xl border border-white/20 bg-black/60 px-3 py-2.5 backdrop-blur-md sm:gap-4 sm:px-4 sm:py-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "暂停" : "播放"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 active:scale-95 sm:h-11 sm:w-11"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <span className="w-10 shrink-0 text-center text-xs tabular-nums text-white/80 sm:w-12 sm:text-sm">
            {currentTimeStr}
          </span>

          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            disabled={!duration}
            onChange={handleSeek}
            onPointerUp={() => {
              seekingRef.current = false;
            }}
            onMouseUp={() => {
              seekingRef.current = false;
            }}
            onTouchEnd={() => {
              seekingRef.current = false;
            }}
            aria-label="进度"
            className={`${styles.rangeInput} w-full flex-1`}
            style={trackStyle}
          />

          <span className="w-10 shrink-0 text-center text-xs tabular-nums text-white/50 sm:w-12 sm:text-sm">
            {durationStr}
          </span>
        </div>
      </div>
    </div>
  );
}
