"use client";
import { useEffect, useRef, useState } from "react";

const nodes = [
  { name: "Client", x: 65, y: 92, note: "Request / response" },
  { name: "API gateway", x: 220, y: 92, note: "Validate & route" },
  { name: "Worker", x: 385, y: 92, note: "Execute operation" },
  { name: "Database", x: 540, y: 92, note: "Read / persist" },
  { name: "Job queue", x: 385, y: 175, note: "Deferred work" },
];
const routes = ["M65 92H540", "M65 92H220Q295 92 305 134Q310 175 385 175V92H540"];
type Packet = { start: number; path: number; visited: Set<number>; element: SVGCircleElement };

export function SoftwareSystem() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);
  const [stats, setStats] = useState({
    latency: 0,
    rate: 0,
    delivered: 0,
    counts: [0, 0, 0, 0, 0],
  });
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const paths = [...el.querySelectorAll<SVGPathElement>(".request-route")];
    const lengths = paths.map((path) => path.getTotalLength());
    const group = el.querySelector<SVGGElement>(".request-packets")!;
    let packets: Packet[] = [],
      completions: number[] = [];
    const counts = [0, 0, 0, 0, 0];
    let frame = 0,
      lastSpawn = 0,
      lastDraw = 0,
      lastReport = 0,
      start = 0,
      delivered = 0,
      totalTime = 0,
      sequence = 0,
      visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        packets.forEach((p) => p.element.remove());
        packets = [];
      }
    });
    observer.observe(el);
    function draw(time: number) {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden || time - lastDraw < 32) return;
      lastDraw = time;
      if (!start) start = time;
      if (time - lastSpawn > 420) {
        lastSpawn = time;
        const element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        element.setAttribute("r", "3");
        element.setAttribute("fill", sequence % 3 === 0 ? "#bb9cff" : "#8ce8ff");
        group.append(element);
        packets.push({
          start: time,
          path: sequence++ % 3 === 0 ? 1 : 0,
          visited: new Set(),
          element,
        });
      }
      packets = packets.filter((packet) => {
        const fraction = Math.min(1, (time - packet.start) / (packet.path ? 2250 : 1700));
        const point = paths[packet.path].getPointAtLength(fraction * lengths[packet.path]);
        packet.element.setAttribute("cx", String(point.x));
        packet.element.setAttribute("cy", String(point.y));
        nodes.forEach((node, i) => {
          if (!packet.visited.has(i) && Math.hypot(point.x - node.x, point.y - node.y) < 42) {
            packet.visited.add(i);
            counts[i]++;
          }
        });
        if (fraction < 1) return true;
        packet.element.remove();
        delivered++;
        totalTime += time - packet.start;
        completions.push(time);
        return false;
      });
      if (time - lastReport > 500) {
        lastReport = time;
        completions = completions.filter((t) => time - t < 5000);
        setStats({
          latency: delivered ? Math.round(totalTime / delivered) : 0,
          rate: completions.length / Math.max(1, Math.min(5, (time - start) / 1000)),
          delivered,
          counts: [...counts],
        });
      }
    }
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      packets.forEach((p) => p.element.remove());
    };
  }, []);
  return (
    <div className="software-system" ref={root} data-visual="software">
      <div className="system-flow">
        <svg viewBox="0 0 600 220" preserveAspectRatio="none" aria-hidden="true">
          <path d="M65 92H540M385 92V175H305Q275 175 275 145V110" className="system-wire" />
          {routes.map((d) => (
            <path key={d} d={d} className="request-route" fill="none" stroke="transparent" />
          ))}
          <path d="M540 119V207H65V119" className="system-return" />
          <text x="122" y="198">
            RESPONSE
          </text>
          <text x="422" y="163">
            ASYNC
          </text>
          <g className="request-packets" />
        </svg>
        {nodes.map((node, i) => (
          <button
            type="button"
            key={node.name}
            className="system-node"
            data-active={active === i}
            style={{ left: `${node.x / 6}%`, top: `${node.y / 2.2}%` }}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
          >
            <span>0{i + 1}</span>
            {node.name}
          </button>
        ))}
      </div>
      <div className="system-readouts" aria-label="Measured local animation telemetry">
        <div>
          <span>
            {nodes[active].name} / {stats.counts[active]} packets
          </span>
          <strong>{nodes[active].note}</strong>
        </div>
        <div>
          <span>Transit</span>
          <strong>{stats.latency ? `${stats.latency} ms` : "Measuring…"}</strong>
        </div>
        <div>
          <span>Throughput</span>
          <strong>{stats.rate.toFixed(1)} / s</strong>
        </div>
      </div>
    </div>
  );
}
