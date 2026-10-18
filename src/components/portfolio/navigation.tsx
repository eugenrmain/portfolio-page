"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, ListIcon } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
const MobileNavigation = dynamic(() => import("./mobile-navigation"));
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";
import { useScrollProgress } from "./scroll-progress";
import { mediaPath } from "@/lib/portfolio";

const links = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
];
function Clock() {
  const [time, setTime] = useState<{ utc: string; local: string; zone: string } | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const format = (zone: string) =>
        new Intl.DateTimeFormat("en-GB", {
          timeZone: zone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
      const zone =
        new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Stockholm", timeZoneName: "short" })
          .formatToParts(now)
          .find((p) => p.type === "timeZoneName")?.value || "CET";
      setTime({ utc: format("UTC"), local: format("Europe/Stockholm"), zone });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="telemetry-clock" aria-label="Current time">
      <span>{time?.utc || "--:--:--"} UTC</span>
      <span>
        {time?.local || "--:--:--"} {time?.zone || "CET/CEST"}
      </span>
    </div>
  );
}
export function Navigation() {
  const header = useRef<HTMLElement>(null);
  useScrollProgress(() => header.current?.toggleAttribute("data-scrolled", scrollY > 24));
  const [open, setOpen] = useState(false);
  const [menuReady, setMenuReady] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  return (
    <header ref={header} className="site-header telemetry-header">
      <GlowingEffect />
      <div className="telemetry-top">
        <a className="wordmark" href="#home" aria-label="er. — Eugen Ranow, home">
          <span className="name-mark">
            er<span>.</span>
          </span>
        </a>
        <span className="telemetry-coordinates">
          STOCKHOLM, SE <span>{"// 59.33° N, 18.06° E"}</span>
        </span>
        <Clock />
        <a className="availability" href="#contact">
          <i aria-hidden="true" />
          Open to internships
        </a>
        <Button
          ref={menuRef}
          className="telemetry-menu"
          variant="ghost"
          size="icon"
          aria-label="Open navigation"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => {
            setMenuReady(true);
            setOpen(true);
          }}
        >
          <ListIcon weight="light" />
        </Button>
        {menuReady && (
          <MobileNavigation
            open={open}
            onOpenChange={setOpen}
            links={links}
            returnFocus={() => menuRef.current?.focus()}
          />
        )}
      </div>
      <div className="telemetry-bottom">
        <a href="#home" className="telemetry-name">
          Eugen Ranow <span>/ Portfolio</span>
        </a>
        <nav aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href="#contact">
            Contact <ArrowUpRightIcon weight="light" />
          </a>
          <a
            href={mediaPath("/Eugen_Ranow_CV.pdf")}
            download="Eugen_Ranow_CV.pdf"
            aria-label="Download CV"
          >
            CV ↓
          </a>
        </nav>
      </div>
    </header>
  );
}
