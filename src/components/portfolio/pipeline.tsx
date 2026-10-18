"use client";
import { useVisibleSvg } from "@/components/portfolio/use-visible-svg";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { pipelineNodes, pipelineEdges, type PipelineNodeId } from "@/lib/pipeline";

type Wire = { from: PipelineNodeId; to: PipelineNodeId; path: string };
const positions: Record<PipelineNodeId, [number, number, number]> = {
  DP1: [14, 12, 22],
  DP2: [14, 26, 22],
  DP3: [14, 40, 22],
  DP4: [14, 56, 22],
  DP5: [14, 84, 22],
  MP1: [50, 12, 18],
  MP2: [38, 26, 18],
  MP3: [70, 30, 16],
  AL1: [90, 30, 14],
  AL2: [78, 48, 22],
  AL3: [78, 62, 20],
  RG1: [84, 82, 22],
  RG2: [84, 94, 22],
};
const nodeNotes: Partial<Record<PipelineNodeId, string>> = {
  DP2: "3rd party",
  DP4: "3rd party",
  DP5: "Project implementation",
  AL2: "Project implementation",
  RG1: "3rd party",
};

export function QuanteraPipeline() {
  const root = useRef<HTMLDivElement>(null);
  const visual = useVisibleSvg();
  const uid = useId().replace(/:/g, "");
  const [wires, setWires] = useState<Wire[]>([]);
  const [hovered, setHovered] = useState<PipelineNodeId | null>(null);
  const [focused, setFocused] = useState<PipelineNodeId | null>(null);
  const [selected, setSelected] = useState<PipelineNodeId | null>(null);
  const active = hovered ?? focused ?? selected;
  const related = new Set<PipelineNodeId>(active ? [active] : []);
  for (const [from, to] of pipelineEdges) {
    if (from === active || to === active) {
      related.add(from);
      related.add(to);
    }
  }
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let disposed = false;
    function measure() {
      if (!element || disposed) return;
      const bounds = element.getBoundingClientRect();
      const mobile = bounds.width < 600;
      const boxes = new Map(
        pipelineNodes.map((node) => {
          const box = element.querySelector(`[data-node="${node.id}"]`)!.getBoundingClientRect();
          return [
            node.id,
            { x: box.x - bounds.x, y: box.y - bounds.y, w: box.width, h: box.height },
          ];
        }),
      );
      setWires(
        pipelineEdges.map(([from, to]) => {
          const a = boxes.get(from)!,
            b = boxes.get(to)!;
          const sameGroup =
            pipelineNodes.find((node) => node.id === from)!.group ===
            pipelineNodes.find((node) => node.id === to)!.group;
          const ax = a.x + a.w / 2,
            ay = a.y + a.h / 2,
            bx = b.x + b.w / 2,
            by = b.y + b.h / 2;
          let path: string;
          if (mobile) {
            if (sameGroup && to !== "MP3" && !(from === "AL1" && to === "RG1")) {
              path = `M ${ax} ${a.y + a.h} L ${bx} ${b.y - 5}`;
            } else {
              const right = from === "AL1" || from === "MP1",
                lane = right ? bounds.width - 12 : 12;
              const sx = right ? a.x + a.w : a.x,
                tx = right ? b.x + b.w + 5 : b.x - 5;
              path = `M ${sx} ${ay} C ${lane} ${ay}, ${lane} ${ay}, ${lane} ${ay + 16} L ${lane} ${by - 16} Q ${lane} ${by} ${tx} ${by}`;
            }
          } else {
            const dx = bx - ax,
              dy = by - ay;
            const source = Math.min(
              a.w / 2 / Math.max(Math.abs(dx), 0.001),
              a.h / 2 / Math.max(Math.abs(dy), 0.001),
            );
            const target = Math.min(
              b.w / 2 / Math.max(Math.abs(dx), 0.001),
              b.h / 2 / Math.max(Math.abs(dy), 0.001),
            );
            const length = Math.hypot(dx, dy);
            path = `M ${ax + dx * source} ${ay + dy * source} L ${bx - dx * target - (dx / length) * 4} ${by - dy * target - (dy / length) * 4}`;
          }
          return { from, to, path };
        }),
      );
    }
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    element.querySelectorAll("[data-node]").forEach((node) => observer.observe(node));
    void document.fonts.ready.then(measure);
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, []);
  return (
    <div
      className="pipeline-widget"
      ref={root}
      role="group"
      aria-label="Quantera pipeline architecture"
      aria-describedby={uid + "-description"}
      onPointerDown={(event) => {
        if (!(event.target as Element).closest("[data-node]")) {
          setSelected(null);
          setFocused(null);
          (document.activeElement as HTMLElement)?.blur();
        }
      }}
    >
      <p className="sr-only" id={uid + "-description"}>
        PDF and Excel files are converted to markdown, categorised by a low-cost model, and indexed
        in SQLite. Master prompts supply preparation and retrieval prompts. The API retrieves
        relevant files using the user query, then Claude generates the final response. Focus or
        select a stage to highlight its direct connections.
      </p>
      <svg ref={visual} className="pipeline-wires" aria-hidden="true">
        <defs>
          <marker
            id={uid + "-arrow"}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 1 1 L 9 5 L 1 9" fill="none" stroke="context-stroke" strokeWidth="1.5" />
          </marker>
        </defs>
        {wires.map((wire) => (
          <path
            key={wire.from + wire.to}
            data-edge={wire.from + "-" + wire.to}
            data-active={active === wire.from || active === wire.to}
            d={wire.path}
            markerEnd={`url(#${uid}-arrow)`}
          />
        ))}
        {wires.map((wire, index) => (
          <circle
            key={"packet-" + wire.from + wire.to}
            r={active === wire.from || active === wire.to ? 2 : 1.2}
            fill="#b4d4ff"
            opacity={active === wire.from || active === wire.to ? 0.85 : 0.3}
          >
            <animateMotion
              dur={`${4 + (index % 3)}s`}
              begin={`${index * -0.7}s`}
              repeatCount="indefinite"
              path={wire.path}
            />
          </circle>
        ))}
      </svg>
      {(
        [
          ["preparation", "Data preparation"],
          ["prompts", "Prompts"],
          ["response", "API layer"],
        ] as const
      ).map(([group, title]) => (
        <div data-ui className={"pipeline-group pipeline-" + group} key={group}>
          <p className="pipeline-group-title">{title}</p>
          {pipelineNodes
            .filter((node) => node.group === group)
            .map((node) => (
              <button
                type="button"
                key={node.id}
                className="pipeline-node"
                data-ui
                data-node={node.id}
                data-active={active === node.id}
                data-related={related.has(node.id)}
                aria-pressed={selected === node.id}
                style={
                  {
                    "--node-x": positions[node.id][0] + "%",
                    "--node-y": positions[node.id][1] + "%",
                    "--node-width": positions[node.id][2] + "%",
                  } as CSSProperties
                }
                onPointerEnter={(event) => {
                  if (event.pointerType !== "touch") setHovered(node.id);
                }}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setFocused(node.id)}
                onBlur={() => setFocused(null)}
                onClick={() => setSelected(selected === node.id ? null : node.id)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setSelected(null);
                    setFocused(null);
                    event.currentTarget.blur();
                  }
                }}
              >
                <code className="pipeline-node-code">{node.id}</code>
                <span className="pipeline-node-label">{node.label}</span>
                {nodeNotes[node.id] && (
                  <span className="pipeline-node-note">{nodeNotes[node.id]}</span>
                )}
              </button>
            ))}
        </div>
      ))}
    </div>
  );
}
