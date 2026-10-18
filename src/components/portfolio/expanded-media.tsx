"use client";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { QuanteraPipeline } from "@/components/portfolio/pipeline";
import { mediaPath } from "@/lib/portfolio";
export default function ExpandedMedia({
  view,
  open,
  onOpenChange,
}: {
  view: "demo" | "architecture";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="media-dialog sm:max-w-[1200px]">
        <DialogTitle>Quantera AI - Indexing pipeline</DialogTitle>
        <DialogDescription>
          {view === "demo"
            ? "Recorded demonstration of the financial document dataset."
            : "System architecture and document indexing flow."}
        </DialogDescription>
        {view === "demo" ? (
          <video
            className="expanded-video"
            src={mediaPath("/media/quantera-demo.mp4")}
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          <QuanteraPipeline />
        )}
      </DialogContent>
    </Dialog>
  );
}
