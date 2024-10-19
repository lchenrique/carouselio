"use client";
import {
  DndContext,
  type DragEndEvent
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { cn } from "@/lib/utils";
import { useSlideControl } from "@/store/slide-control";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import type { TextContent } from "@/types/text-content";
import { GripVertical } from "lucide-react";
import { useController, useFormContext } from "react-hook-form";
import { EditableContent } from "../editable-content";

const SortableItemComponent = ({
  content,
  zoomLevel,
  index,
  parentIndex,
}: {
  content: TextContent;
  zoomLevel: number;
  index: number;
  parentIndex: number;
}) => {
  const { theme } = useSlideThemeStore();
  const { setSwipe } = useSlideControl();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: content.id,
  });

  const style = {
    zIndex: isDragging ? 9999 : undefined,
    transform: transform ? `translate3d(${transform.x / zoomLevel}px, ${transform.y / zoomLevel}px, 0)` : undefined,
    transition,
  };

  return (
    <div className="relative">
      <li
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn("w-full flex group items-center group opacity-100", {
          "opacity-90 z-[99999]": isDragging,
        })}
        onMouseEnter={() => {
          setSwipe(false);
        }}
        onMouseLeave={() => {
          setSwipe(true);
        }}
      >
        <div {...listeners} className={cn("handle h-min ")} style={{ cursor: "grab" }}>
          <GripVertical color={theme.secondary} strokeWidth={1} className="opacity-50 " />
        </div>
        <EditableContent index={index} parentIndex={parentIndex} />
      </li>
    </div>
  );
};
const DragableContainer = ({ itemsData, scale, index }: { itemsData: TextContent[]; scale: number; index: number }) => {
  const { control } = useFormContext();
  const contentItemsId = `slides.${index}.contentItems`;
  const { field: contentItems } = useController({ name: contentItemsId, control });


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      const oldIndex = itemsData.findIndex((item) => item.id === active.id);
      const newIndex = itemsData.findIndex((item) => item.id === over.id);

      const newItems = [...itemsData];
      const [reorderedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, reorderedItem);

      contentItems.onChange(newItems);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
      <div className="drag-ghost h-full relative " style={{ transformOrigin: "0 0" }}>
        <SortableContext items={itemsData} strategy={verticalListSortingStrategy}>
          <ul className="h-full">
            {itemsData.map((item, i) => (
              <SortableItemComponent index={i} parentIndex={index} key={item.id} content={item} zoomLevel={scale} />
            ))}
          </ul>
        </SortableContext>
      </div>
    </DndContext>
  );
};

export { DragableContainer };

