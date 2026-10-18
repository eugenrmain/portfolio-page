"use client";
import { useEffect, useRef, useState } from "react";
import { CopyIcon, CheckIcon } from "@phosphor-icons/react";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState("Copy email");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setState("Copied!");
    } catch {
      setState("Copy unavailable");
    }
    timer.current = setTimeout(() => setState("Copy email"), 2400);
  }
  return (
    <button type="button" className="glass-action copy-email" onClick={copy}>
      <span aria-hidden="true">{state === "Copied!" ? <CheckIcon /> : <CopyIcon />}</span>
      <span role="status" aria-live="polite">
        {state}
      </span>
    </button>
  );
}
