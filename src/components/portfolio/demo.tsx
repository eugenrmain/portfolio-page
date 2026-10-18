"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon, PauseIcon, ArrowsOutIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
const ExpandedMedia = dynamic(() => import("./expanded-media"));
import { mediaPath } from "@/lib/portfolio";
import { QuanteraPipeline } from "@/components/portfolio/pipeline";

type DemoView = "demo" | "architecture";

export function QuanteraDemo() {
  const [view, setView] = useState<DemoView>("demo");
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [expandedReady, setExpandedReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause();
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [view]);
  async function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
        setError(false);
      } catch {
        setError(true);
      }
    } else video.pause();
  }
  return (
    <>
      <div className="demo-shell">
        <div className="demo-toolbar" data-ui>
          <div className="demo-switch" role="group" aria-label="Quantera project view">
            <button type="button" aria-pressed={view === "demo"} onClick={() => setView("demo")}>
              Demo
            </button>
            <button
              type="button"
              aria-pressed={view === "architecture"}
              onClick={() => {
                videoRef.current?.pause();
                setView("architecture");
              }}
            >
              Architecture
            </button>
          </div>
          <span className="demo-project-name">Quantera / Indexing pipeline</span>
        </div>
        <div className={"demo-media" + (view === "architecture" ? " demo-architecture" : "")}>
          {view === "demo" ? (
            <>
              <video
                ref={videoRef}
                src={mediaPath("/media/quantera-demo.mp4")}
                poster={mediaPath("/media/quantera-poster.webp")}
                preload="none"
                playsInline
                muted
                loop={false}
                controls={playing}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onError={() => setError(true)}
                aria-label="Quantera demo: querying an indexed financial dataset"
              />
              {!playing && (
                <button
                  type="button"
                  className="demo-play"
                  onClick={toggleVideo}
                  aria-label="Play Quantera demo"
                >
                  <span>
                    <PlayIcon weight="fill" />
                  </span>
                  <span>Play Quantera demo</span>
                </button>
              )}
            </>
          ) : (
            <QuanteraPipeline />
          )}
        </div>
        <div className="demo-bottom" data-ui>
          <p>
            {view === "demo"
              ? "Querying an indexed financial dataset."
              : "From PDF and Excel files to a grounded answer."}
          </p>
          <div className="demo-actions">
            {view === "demo" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleVideo}
                aria-label={playing ? "Pause demo" : "Play demo"}
              >
                {playing ? <PauseIcon weight="light" /> : <PlayIcon weight="light" />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                videoRef.current?.pause();
                setExpandedReady(true);
                setExpanded(true);
              }}
              aria-label="Expand Quantera media"
            >
              <ArrowsOutIcon weight="light" />
            </Button>
          </div>
        </div>
        {error && (
          <p className="media-error" role="status">
            The video could not play.{" "}
            <a href={mediaPath("/media/quantera-demo.mp4")}>Open the video file</a> or switch to
            Architecture.
          </p>
        )}
        {expandedReady && <ExpandedMedia view={view} open={expanded} onOpenChange={setExpanded} />}
      </div>
    </>
  );
}
