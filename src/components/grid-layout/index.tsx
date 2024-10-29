'use client';
import { useContentControl } from "@/hooks/use-content-control";
import { cn } from "@/lib/utils";
import type { TextContent } from "@/types/text-content";
import { useState } from "react";
import RGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useControls } from "react-zoom-pan-pinch";
import { GriiItem } from "./grid-item";
import "./style.css";
export interface IGridLayoutProps<T> {
  items: TextContent[];
  parentIndex: number;
  allowOverlap?: boolean;
}

const GridLayout = <T,>({ items, parentIndex, allowOverlap }: IGridLayoutProps<T>) => {
  const setActiveItemId = useContentControl((state) => state.setActiveItemId);
  const activeItemId = useContentControl((state) => state.activeItemId);
  const setIsEditing = useContentControl((state) => state.setIsEditing);

  const [isSelected, setIsSelected] = useState(false);
  const [isResizinng, setIsResizing] = useState(false);
  const [isDraggingClass, setIsDraggingClass] = useState("");
  const { instance } = useControls();

  const layout = items.map((v, i) => ({ i: v.id, x: 0, y: 0, w: 12, h: 12 }));

  const handleSelect = (id: string) => {
    if (id !== activeItemId) {
      setIsEditing(false);
      setActiveItemId(id);
      setIsSelected(true);
    }
  };

  return (
    <>
      <RGridLayout
        className="layout h-96 "
        layout={layout}
        cols={12}
        maxRows={25}
        autoSize
        rowHeight={20}
        width={574}
        containerPadding={[0, 0]}
        margin={[3, 3]}
        draggableHandle=".drag-handle"
        draggableCancel=".drag-cancel"
        transformScale={instance.transformState.scale}
        allowOverlap={allowOverlap}
        isResizable={isSelected}
        onDragStart={(l, old, newItem) => {
          setIsDraggingClass("");
        }}
        onDragStop={() => {
          setIsDraggingClass("");
        }}
        onResizeStart={(layoutItem, newWidth, newHeight) => {
          setIsResizing(true);
        }}
        onResizeStop={(layoutItem, newWidth, newHeight) => {
          setIsResizing(false);
        }}
      >
        {items.map((item, index) => {
          const itemHeight =
            Array.isArray(item.values) && item.values.length ? Math.ceil(Number(item.values[0].attrs?.size) / 18) : 18;
          const id = `${parentIndex}-${index}`;

          const dataGrid = {
            i: id,
            x: 0,
            y: 0, // Usa o Y acumulado
            w: item.type === "image" ? 12 : 12,
            h: itemHeight,
            resizeHandles: ["e", "w", "se", "sw", "ne", "nw"],
          };

          return (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div
              data-grid={dataGrid}
              id={id}
              key={id}
              className={cn(
                "border-transparent  px-1 border drag-handle cursor-move h-full w-full ",
                {
                  "selected border-blue-500": activeItemId === id,
                },
                isDraggingClass
              )}
              onClick={() => {
                handleSelect(id);
              }}
            >
              <GriiItem index={items.indexOf(item)} parentIndex={parentIndex} item={item} />
            </div>
          );
        })}
      </RGridLayout>
    </>
  );
};

export { GridLayout as MyGrid };

