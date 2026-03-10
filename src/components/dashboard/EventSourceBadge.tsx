import { Badge } from "@/components/ui/badge";
import { Instagram, PenLine } from "lucide-react";

interface EventSourceBadgeProps {
  source: "scraped" | "manual";
}

export function EventSourceBadge({ source }: EventSourceBadgeProps) {
  if (source === "scraped") {
    return (
      <Badge variant="secondary" className="gap-1">
        <Instagram className="h-3 w-3" />
        Scraped
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="gap-1 border-primary/30 text-primary">
      <PenLine className="h-3 w-3" />
      Posted
    </Badge>
  );
}
