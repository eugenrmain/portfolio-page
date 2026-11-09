"use client";
/* eslint-disable @next/next/no-img-element -- Preoptimized local assets in a static export need no image runtime. */
import { useId, type CSSProperties } from "react";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { ParticleScene } from "@/components/portfolio/particle-scene";
import { mediaPath } from "@/lib/portfolio";
import { useVisibleSvg } from "./use-visible-svg";
import quantera from "@/assets/quantera-logo.png";
import unity from "@/assets/unity-logo.png";

export function FitnessPreview({ expanded = false }: { expanded?: boolean }) {
  const gradient = useId().replace(/:/g, "") + "-pulse";
  const trackRef = useVisibleSvg();
  return (
    <div
      className={`fitness-preview biometric-preview${expanded ? " fitness-dashboard" : ""}`}
      aria-hidden="true"
    >
      <span className="biometric-label">Activity / integration</span>
      <svg
        viewBox="0 0 270 180"
        className="biometric-wave"
        preserveAspectRatio={expanded ? "none" : "xMidYMid meet"}
        style={{ "--pulse-stroke": `url(#${gradient})` } as CSSProperties}
      >
        <defs>
          <linearGradient id={gradient}>
            <stop stopColor="#6edcff" />
            <stop offset="1" stopColor="#a98cff" />
          </linearGradient>
        </defs>
        {[35, 70, 105, 140].map((y) => (
          <path key={y} d={`M0 ${y}H270`} className="pulse-grid" />
        ))}
        <path
          d="M0 92H35L44 84L52 102L63 64L76 125L89 40L103 107L117 82L128 92H158L167 84L176 102L187 64L200 125L213 40L227 107L241 82L252 92H270"
          className="pulse-trace"
        />
        <path
          d="M0 92H35L44 84L52 102L63 64L76 125L89 40L103 107L117 82L128 92H158L167 84L176 102L187 64L200 125L213 40L227 107L241 82L252 92H270"
          className="pulse-signal"
        />
      </svg>
      <div className="biometric-stages">
        {expanded && (
          <svg
            ref={trackRef}
            className="fitness-data-track"
            viewBox="0 0 1000 20"
            preserveAspectRatio="none"
          >
            <path d="M0 10H1000" fill="none" stroke="#94bdff" strokeOpacity="0.28" />
            {[0, 1.2, 2.4].map((delay) => (
              <circle key={delay} r="3" fill="#92e4ff" className="fitness-data-packet">
                <animateMotion
                  path="M0 10H1000"
                  dur="3.6s"
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.08;0.92;1"
                  dur="3.6s"
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </svg>
        )}
        <span>Activity</span>
        <span>API</span>
        <span>Storage</span>
      </div>
    </div>
  );
}
function OpenSourcePreview() {
  return (
    <div className="opensource-preview" aria-hidden="true">
      <GithubLogoIcon weight="fill" />
      <div className="contribution-path">
        {["Explore", "Build", "Contribute"].map((label, i) => (
          <span className="contribution-step" key={label} style={{ animationDelay: `${i * 0.7}s` }}>
            <i />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
export function ProjectPreview({ id }: { id: string }) {
  if (id === "apex")
    return (
      <div className="apex-card-visual" aria-hidden="true">
        <div className="apex-card-brand">
          <img src={mediaPath("/media/apex/icon.svg")} alt="" width="64" height="64" />
          <span>Apex Desktop</span>
        </div>
        <img
          className="apex-card-screen"
          src={mediaPath("/media/apex/home.webp")}
          alt=""
          width="1086"
          height="753"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  if (id === "tape31")
    return (
      <div className="tape31-card-visual" aria-hidden="true">
        <div className="tape31-card-brand">
          <span className="tape31-rec-dot" />
          <span className="tape31-brand-rec">REC</span>
          <span className="tape31-brand-title">TAPE 31</span>
          <span className="tape31-brand-jam">OCT. 31 1997</span>
        </div>
        <img
          className="tape31-card-screen"
          src={mediaPath("/media/tape31/title.webp")}
          alt=""
          width="630"
          height="500"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  if (id === "fitness") return <FitnessPreview />;
  if (id === "opensource") return <OpenSourcePreview />;
  return (
    <div className={`logo-preview logo-preview-${id}`}>
      <div className="preview-grid" />
      {id === "unity" ? (
        <>
          <div
            className="unity-world"
            role="img"
            aria-label="Planetary environment concept artwork"
            style={{ backgroundImage: `url("${mediaPath("/media/unity-world-concept.avif")}")` }}
          />
          <img
            src={unity.src}
            alt="Unity"
            width={unity.width}
            height={unity.height}
            loading="lazy"
            decoding="async"
          />
        </>
      ) : (
        <>
          <ParticleScene kind="globe" className="quantera-globe" />
          <img
            src={quantera.src}
            alt="Quantera"
            width={quantera.width}
            height={quantera.height}
            loading="lazy"
            decoding="async"
          />
        </>
      )}
    </div>
  );
}
