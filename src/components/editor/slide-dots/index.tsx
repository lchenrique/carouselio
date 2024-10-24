"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const SlideDots = ({
  indexs,
  activeIndex,
  onChange,
}: {
  activeIndex: number;
  indexs: number[];
  onChange: (index: number) => void;
}) => {
  return (
    <ul className="flex gap-1 items-center absolute bottom-5 left-1/2 -translate-x-1/2  z-50">
      {indexs.map((index) => {
        return (
          <li key={index}>
            <Button
              onClick={() => {
                onChange(index);
              }}
              size="icon"
              variant="outline"
              className={cn("w-full rounded-full bg-muted transition-all   size-4 z-10 ", {
                "bg-primary hover:bg-primary": index === activeIndex,
                "hover:bg-background": index !== activeIndex,
              })}
            />
          </li>
        );
      })}
    </ul>
  );
};
