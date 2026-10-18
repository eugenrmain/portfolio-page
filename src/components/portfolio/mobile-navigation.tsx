"use client";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { mediaPath } from "@/lib/portfolio";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
export default function MobileNavigation({
  open,
  onOpenChange,
  links,
  returnFocus,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: { href: string; label: string }[];
  returnFocus: () => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="mobile-sheet"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocus();
        }}
      >
        <SheetHeader>
          <SheetTitle>Eugen Ranow</SheetTitle>
          <SheetDescription>Work, background, and contact.</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="mobile-links">
          {[...links, { href: "#contact", label: "Contact" }].map((link) => (
            <a key={link.href} href={link.href} onClick={() => onOpenChange(false)}>
              {link.label}
              <ArrowUpRightIcon weight="light" />
            </a>
          ))}
          <a
            href={mediaPath("/Eugen_Ranow_CV.pdf")}
            download="Eugen_Ranow_CV.pdf"
            onClick={() => onOpenChange(false)}
          >
            Download CV ↓
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
