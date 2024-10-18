import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

export function Controls(props: { onZoomIn: (value: number) => void; onZoomOut: (value: number) => void }) {
  return (
    <div className="flex gap-3 items-center absolute bottom-5 right-5 z-50">
      <Button size="icon" variant="outline" onClick={() => props.onZoomOut(0.3)} className="text-xs font-semibold">
        <Minus className="size-3" />
      </Button>

      {/* <span>{displayPercentage}%</span> */}

      <Button size="icon" variant="outline" onClick={() => props.onZoomIn(0.3)} className="text-xs font-semibold">
        <Plus className="size-3" />
      </Button>
    </div>
  );
}
