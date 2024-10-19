import { Draggable, type DraggableStateSnapshot, type DraggableStyle } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import { TypographyH3 } from "../typography/h3";
import { TypographyH2 } from "../typography/h2";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import { Input } from "../ui/input";
import { FloatingToolbar } from "../floting-toolbar";
import { EditableContent } from "../editable-content";
import type { TextContent } from "@/types/text-content";

function DragableItem({ item, index, parentIndex }: { item: TextContent; index: number; parentIndex: number }) {
  function getStyle(style: DraggableStyle | undefined, snapshot: DraggableStateSnapshot) {
    if (!snapshot.dropAnimation) {
      return style;
    }
    const { moveTo, curve, duration } = snapshot.dropAnimation;
    const translate = `translate(-1000px, ${moveTo.y}px)`;
    const rotate = "rotate(0.5turn)";

    return {
      ...style,
      transform: `${translate} }`,
      transition: `all ${curve} ${duration + 1}s`,
    };
  }
  return (
    <>
      <Draggable draggableId={String(item.id)} index={index}>
        {(provided, snapshot) => (
          <>
            <div
              className={cn(
                "group flex items-center  font-semibold select-text w-full border border-transparent  rounded-md"
              )}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              style={{
                ...getStyle(provided.draggableProps.style, snapshot),
              }}
            >
              <GripVertical className="size-5 invisible group-hover:visible text-muted" />
              <EditableContent parentIndex={parentIndex} index={index}  />
            </div>
          </>
        )}
      </Draggable>
    </>
  );
}

export { DragableItem };
