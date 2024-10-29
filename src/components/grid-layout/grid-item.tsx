"use client";
import { useContentControl } from "@/hooks/use-content-control";
import type { ContentValuesImage, TextContent } from "@/types/text-content";
import { ContentEditable } from "../editor/content-editable";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const GriiItem = ({ item, index, parentIndex }: { item: TextContent; index: number; parentIndex: number }) => {
  const isEditing = useContentControl((state) => state.isEditing);
  const activeItemId = useContentControl((state) => state.activeItemId);
  const setIsEditing = useContentControl((state) => state.setIsEditing);
  const [lastTap, setLastTap] = useState(0);

  const id = `${parentIndex}-${index}`;

  useEffect(() => {
    if (activeItemId !== id) {
      setIsEditing(false);
    }
  }, [activeItemId, id, setIsEditing]);

  const handleTap = () => {
    const currentTime = Date.now();
    const tapDelay = 300; // Tempo entre toques em milissegundos

    if (currentTime - lastTap < tapDelay) {
      if (id === activeItemId && !isEditing) setIsEditing(true);
    }

    setLastTap(currentTime);
  };

  return (
    <div
      id={id}
      key={id}
      className={cn("group/grid-item z-[2] w-full ", {
        "selected drag-handle": isEditing && activeItemId === id,
        "drag-cancel cursor-text ": isEditing && activeItemId === id,
      })}
      style={{
        height: "100%",
        background: item.type === "image" ? `url(${(item.values as ContentValuesImage).value})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onDoubleClick={()=> {
        if (id === activeItemId && !isEditing) setIsEditing(true);
      }}
      onTouchStart={handleTap}
    >
      {!item.type && id && <ContentEditable index={index} parentIndex={parentIndex} />}
    </div>
  );
};
