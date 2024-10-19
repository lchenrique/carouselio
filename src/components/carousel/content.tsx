"use client";
import { useEffect, useRef, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DragStart,
  type DropResult,
  type ResponderProvided,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import { GripVertical } from "lucide-react";
import { TypographyH2 } from "../typography/h2";
import { TypographyH3 } from "../typography/h3";
import { DragableItem } from "./dragable-item";
import { useController, useFormContext, type Control } from "react-hook-form";
import type { ISlideItems } from "@/types/slide-content";
import type { TextContent } from "@/types/text-content";
import { useSlideControl } from "@/store/slide-control";

const SlideContent = ({ values, index, scale }: { values: TextContent[]; index: number; scale: number }) => {
  const { control, getValues, watch } = useFormContext();
  const { theme } = useSlideThemeStore();
  const {swipe, setSwipe} = useSlideControl();
  const contentItemsId = `slides.${index}.contentItems`;
  const { field: contentItems } = useController({ name: contentItemsId, control });
  const dragItemRef = useRef<HTMLDivElement | null>(null);

  const reorder = (list: TextContent[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !values) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    
    if (startIndex === endIndex) return;

    const newItems = reorder(values, startIndex, endIndex);
    contentItems?.onChange(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="list"
        direction="vertical"
        type="list"
        ignoreContainerClipping
        renderClone={(provided, snapshot, rubric) => {
          const transform = provided.draggableProps.style?.transform;
          if (transform && provided.draggableProps?.style) {
            const x = transform.split(",")[0].replace("translate(", "").replace("px", "");
            const t = `translateY(${transform.split(",")[1]}`;
            provided.draggableProps.style.transform = t;
          }
          return (
            <div
              data-isDraging={snapshot.isDragging}
              className={cn(
                " border h-min p-3 w-full rounded-md border-dashed bg-primary/60 drag-ghost",
                contentItems.value?.[rubric.source.index].type
              )}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              style={{
                ...provided.draggableProps.style,
                overflow: "hidden",
                touchAction: "pan-y pinch-zoom",
                // maxWidth: provided.draggableProps.style.width / scale,
                // maxHeight: provided.draggableProps.style.height / scale,
              }}
            >
             
            </div>
          );
        }}
      >
        {(provided, snapshot) => (
          <div
            ref={(ref) => {
              dragItemRef.current = ref;
              return provided.innerRef(ref);
            }}
            {...provided.droppableProps}
            className="flex w-full flex-col justify-start items-center"
             id="dragArea"
             onMouseLeave={(e) => {
                setSwipe(true);
            }}
            onMouseEnter={(e) => {
                setSwipe(false);
             }}
          >
            {values?.map((content, i) => (
              <DragableItem parentIndex={index} item={content} index={i} key={content.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default SlideContent;
