"use client";

import { useEffect, useRef, useState } from "react";
import { useVisibleSvg } from "./use-visible-svg";

function usePreviewTelemetry() {
  const root = useRef<HTMLDivElement>(null);
  const [sample, setSample] = useState([24, 37, 48, 42, 63, 28]);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(element);
    const timer = setInterval(() => {
      if (!visible || document.hidden) return;
      const time = performance.now() / 2300;
      setSample(
        [24, 37, 48, 42, 63, 28].map((base, index) =>
          Math.round(base + Math.sin(time + index * 1.7) * (index === 2 ? 4 : 14)),
        ),
      );
    }, 900);
    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);
  return { root, sample };
}

export function ApexTelemetry() {
  const { root, sample } = usePreviewTelemetry();
  return (
    <div className="apex-telemetry" ref={root} aria-label="Illustrative hardware telemetry">
      <span className="apex-visual-label">Hardware / preview</span>
      <div className="apex-gauges">
        {["CPU", "GPU", "Memory"].map((name, index) => (
          <div className={`apex-gauge gauge-${index}`} key={name}>
            <svg viewBox="0 0 80 80" aria-hidden="true">
              <circle cx="40" cy="40" r="33" className="gauge-track" />
              <circle
                cx="40"
                cy="40"
                r="33"
                pathLength="100"
                className="gauge-value"
                strokeDasharray={`${sample[index]} 100`}
              />
            </svg>
            <div>
              <strong>
                {sample[index]}
                <small>%</small>
              </strong>
              <span>{name}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="apex-throughput" aria-hidden="true">
        {["Compute", "Media I/O", "Memory"].map((name, index) => (
          <div key={name}>
            <span>{name}</span>
            <i>
              <b style={{ transform: `scaleX(${sample[index + 3] / 100})` }} />
            </i>
          </div>
        ))}
      </div>
      <span className="apex-visual-note">Simulated telemetry / native Windows utility</span>
    </div>
  );
}

const stages = [
  {
    name: "WinUI 3 Frontend",
    code: "01 / Interface",
    detail:
      "A native Windows 11 interface built with C# and WinUI 3 exposes optimization, organization, compression, and monitoring tools.",
  },
  {
    name: "P/Invoke & Win32 APIs",
    code: "02 / Native interop",
    detail:
      "P/Invoke connects managed .NET code to Win32 APIs for system performance, organization, and data management operations.",
  },
  {
    name: "Async Media Compression & Telemetry Engine",
    code: "03 / Processing",
    detail:
      "Asynchronous local media compression runs alongside real-time hardware telemetry tracking, keeping long-running work separate from the interface.",
  },
];

export function ApexProject() {
  const wires = useVisibleSvg();
  const [view, setView] = useState("demo");
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const progressRef = useRef(0);
  useEffect(() => {
    if (!running || view !== "demo") return;
    const start = performance.now() - progressRef.current * 50;
    const timer = setInterval(() => {
      const value = Math.min(100, Math.round((performance.now() - start) / 50));
      progressRef.current = value;
      setProgress(value);
      if (value === 100) setRunning(false);
    }, 100);
    return () => clearInterval(timer);
  }, [running, view]);
  return (
    <div className="apex-project">
      <div className="demo-toolbar">
        <div className="demo-switch" role="group" aria-label="Apex project view">
          {["demo", "architecture"].map((name) => (
            <button
              type="button"
              key={name}
              aria-pressed={view === name}
              onClick={() => {
                setView(name);
                setRunning(false);
              }}
            >
              {name === "demo" ? "Demo" : "Architecture"}
            </button>
          ))}
        </div>
        <span className="demo-project-name">Apex / Native Windows systems</span>
      </div>
      {view === "demo" ? (
        <div className="apex-demo-grid">
          <ApexTelemetry />
          <div className="apex-compression">
            <span className="panel-kicker">Asynchronous media workflow</span>
            <h3>
              Local work.
              <br />
              Responsive interface.
            </h3>
            <ol className="apex-job-stages">
              {["Queue media input", "Compress asynchronously", "Complete local operation"].map(
                (name, index) => (
                  <li key={name} data-active={progress >= index * 50}>
                    <span>0{index + 1}</span>
                    {name}
                    <i />
                  </li>
                ),
              )}
            </ol>
            <div
              className="apex-job-progress"
              role="progressbar"
              aria-label="Compression workflow preview"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
            <div className="apex-job-status">
              <span aria-live="polite">
                {progress === 100
                  ? "Preview complete"
                  : running
                    ? "Running preview"
                    : progress
                      ? "Preview paused"
                      : "Ready to preview"}
              </span>
              <span>{progress}%</span>
            </div>
            <button
              type="button"
              className="glass-action"
              onClick={() => {
                if (progress === 100) {
                  progressRef.current = 0;
                  setProgress(0);
                }
                setRunning(!running);
              }}
            >
              {running
                ? "Pause preview"
                : progress === 100
                  ? "Replay workflow"
                  : progress
                    ? "Resume preview"
                    : "Run compression preview"}
            </button>
          </div>
        </div>
      ) : (
        <div className="apex-architecture">
          <span className="panel-kicker">Managed interface → native operations</span>
          <div className="apex-stage-track">
            <svg ref={wires} viewBox="0 0 900 200" preserveAspectRatio="none" aria-hidden="true">
              <path d="M150 100H750" />
              <circle r="3">
                <animateMotion dur="3s" repeatCount="indefinite" path="M150 100H750" />
              </circle>
              <circle r="2">
                <animateMotion
                  dur="3s"
                  begin="-1.5s"
                  repeatCount="indefinite"
                  path="M150 100H750"
                />
              </circle>
            </svg>
            {stages.map((item, index) => (
              <button
                type="button"
                key={item.name}
                aria-pressed={stage === index}
                onClick={() => setStage(index)}
                onPointerEnter={() => setStage(index)}
                onFocus={() => setStage(index)}
              >
                <span>{item.code}</span>
                <strong>{item.name}</strong>
                <i aria-hidden="true">{["{ }", "↔", "⌁"][index]}</i>
              </button>
            ))}
          </div>
          <div className="apex-stage-detail" aria-live="polite">
            <h3>{stages[stage].name}</h3>
            <p>{stages[stage].detail}</p>
          </div>
        </div>
      )}
      <p className="apex-demo-note">
        Interactive workflow simulation with illustrative telemetry. This preview does not read your
        hardware or compress your files.
      </p>
    </div>
  );
}
