type NodePos = {
  id: string;
  label: string;
  sub?: string;
  // percent coords for the center of the node
  x: number;
  y: number;
  w?: number; // width in %
};

type Container = {
  title: string;
  // bounding box in %
  x: number;
  y: number;
  w: number;
  h: number;
};

type Edge = { from: string; to: string };

const NODES: NodePos[] = [
  // Data Preparation
  { id: "DP1", label: "Input files: PDF / Excel", x: 14, y: 12, w: 22 },
  { id: "DP2", label: "Marker conversion", sub: "3rd party", x: 14, y: 26, w: 22 },
  { id: "DP3", label: "Markdown output", x: 14, y: 40, w: 22 },
  { id: "DP4", label: "Low-cost AI categorisation", sub: "3rd party", x: 14, y: 56, w: 22 },
  { id: "DP5", label: "SQLite indexing", sub: "Project implementation", x: 14, y: 84, w: 22 },

  // Master Prompts
  { id: "MP1", label: "Master prompts", x: 50, y: 12, w: 18 },
  { id: "MP2", label: "Add data prompt", x: 38, y: 26, w: 18 },

  // API Layer › Data File Select
  { id: "MP3", label: "Fetch data prompt", x: 70, y: 30, w: 16 },
  { id: "AL1", label: "User prompt", x: 90, y: 30, w: 14 },
  { id: "AL2", label: "Retrieval / API layer", sub: "Project implementation", x: 78, y: 48, w: 22 },
  { id: "AL3", label: "Relevant file selection", x: 78, y: 62, w: 20 },

  // Response Generation
  { id: "RG1", label: "Claude answer generation", sub: "3rd party", x: 84, y: 82, w: 22 },
  { id: "RG2", label: "Final response to user", x: 84, y: 94, w: 22 },
];

const CONTAINERS: Container[] = [
  { title: "Data Preparation", x: 2, y: 4, w: 32, h: 94 },
  { title: "API Layer", x: 60, y: 18, w: 38, h: 80 },
];

const EDGES: Edge[] = [
  { from: "DP1", to: "DP2" },
  { from: "DP2", to: "DP3" },
  { from: "DP3", to: "DP4" },
  { from: "DP4", to: "DP5" },
  { from: "MP1", to: "MP2" },
  { from: "MP1", to: "MP3" },
  { from: "MP2", to: "DP4" }, // cross-container
  { from: "DP5", to: "AL2" }, // cross-container
  { from: "MP3", to: "AL2" },
  { from: "AL1", to: "AL2" },
  { from: "AL2", to: "AL3" },
  { from: "AL3", to: "RG1" },
  { from: "AL1", to: "RG1" },
  { from: "RG1", to: "RG2" },
];

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function QuanteraPipeline() {
  return (
    <div className="relative h-full w-full bg-black">
      {/* glow background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(ellipse_at_20%_-10%,rgba(56,189,248,0.12),transparent_55%)]" />

      {/* Containers */}
      {CONTAINERS.map((c) => (
        <div
          key={c.title}
          className="absolute rounded-xl border border-white/10 bg-white/[0.02]"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: `${c.w}%`,
            height: `${c.h}%`,
          }}
        >
          <span className="absolute -top-2 left-3 bg-black px-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
            {c.title}
          </span>
        </div>
      ))}

      {/* Edges */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <marker
            id="qa-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="rgba(255,255,255,0.55)" />
          </marker>
          <filter id="qa-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {EDGES.map((e, i) => {
          const a = nodeById(e.from);
          const b = nodeById(e.to);
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="0.25"
              vectorEffect="non-scaling-stroke"
              markerEnd="url(#qa-arrow)"
              filter="url(#qa-glow)"
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {NODES.map((n) => (
        <div
          key={n.id}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%`, width: `${n.w ?? 18}%` }}
        >
          <div className="rounded-md border border-white/15 bg-[#0a0a0a] px-2 py-1.5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-[#111] hover:shadow-[0_0_24px_rgba(129,140,248,0.35)]">
            <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/40">
              {n.id}
            </div>
            <div className="mt-0.5 text-[10px] font-medium leading-tight text-white sm:text-[11px]">
              {n.label}
            </div>
            {n.sub && (
              <div className="mt-0.5 text-[8px] italic leading-tight text-white/40">{n.sub}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
