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
import { useController, type Control } from "react-hook-form";
import type { ISlideItems } from "@/types/slide-content";
import type { TextContent } from "@/types/text-content";

const SlideContent = ({
  values: defaultValues,
  index,
  scale,
}: {
  values: TextContent[];
  index: number;
  scale: number;
}) => {
  const { theme } = useSlideThemeStore();
  const { field: items } = useController({ name: `slides.${index}.content`, defaultValue: defaultValues });
  const dragItemRef = useRef<HTMLDivElement | null>(null);

  const reorder = <T extends ISlideItems>(list: T[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !items) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const newItems = reorder(items.value, startIndex, endIndex);
    items?.onChange(newItems);
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
                " border h-min p-5  flex  items-center justify-start rounded-md border-dashed drag-ghost",
                items.value?.[rubric.source.index].type
              )}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              style={{
                ...provided.draggableProps.style,
                // maxWidth: provided.draggableProps.style.width / scale,
                // maxHeight: provided.draggableProps.style.height / scale,
                opacity: 0.5,
                overflow: "hidden",
                fontFamily: "Poppins",
                fontWeight: "600",
                touchAction: "pan-y pinch-zoom",
                color: items?.value?.[rubric.source.index].attrs?.color,
              }}
            >
              <h1
                style={{
                  whiteSpace: "wrap",
                  fontSize: items?.value?.[rubric.source.index].type,
                }}
              >
                {items?.value?.[rubric.source.index].value}
              </h1>
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
          >
            {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
            {items?.value?.map((item: TextContent, i: any) => (
              <DragableItem parentIndex={index} item={item} index={i} key={item.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SlideContent;
