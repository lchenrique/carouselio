"use client";

import { useState, useRef, useEffect } from "react";

interface IRangeStopsProps {
  colors: string[];
  onChange: (values: number[]) => void;
  onChangeActive: (value: "left" | "right") => void;
  values: number[];
}
export function RangeStops({values,  colors, onChange, onChangeActive }: IRangeStopsProps) {
  const [leftValue, setLeftValue] = useState(values[0]||0);
  const [rightValue, setRightValue] = useState(values[0]||100);
  const [dragging, setDragging] = useState<"left" | "right" | null>(null);
  const [active, setActive] = useState<"left" | "right">("left");
  const barRef = useRef<HTMLDivElement>(null);


  const isInverted = leftValue > rightValue;

  const handleMouseDown = (point: "left" | "right") => (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(point);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging || !barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newValue = Math.round(Math.max(0, Math.min(100, (x / rect.width) * 100)));

    if (dragging === "left") {
      setLeftValue(newValue);
    } else {
      setRightValue(newValue);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  useEffect(() => {
    onChange([leftValue, rightValue]);
  }, [leftValue, rightValue, onChange]);

  useEffect(() => {
    onChangeActive(active);
  }, [active, onChangeActive]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setLeftValue(values[0]||0);
    setRightValue(values[1]||100);
  }, []);

  return (
    <div className="w-full max-w-md mb-5 mt-8 mx-autorounded-full relative">
      <div ref={barRef} className="relative h-4  rounded-full   overflow-hidden  cursor-pointer">
        <div
          className={'absolute inset-0'}
          style={{
            background: isInverted
              ? `linear-gradient(90deg, ${colors[1]} ${rightValue}%, ${colors[0]} ${leftValue}%)`
              : `linear-gradient(90deg, ${colors[0]} ${leftValue}%, ${colors[1]} ${rightValue}%)`,
          }}
        />
      </div>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className="absolute -top-5 bottom-0 w-4 h-4 -ml-2 rounded-full   cursor-move"
        style={{ left: `${leftValue}%`, background: colors[0] }}
        onMouseDown={handleMouseDown("left")}
        onClick={() => {
          setActive("left");
        }}
      />
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className="absolute -top-5 bottom-0 w-4 h-4 -ml-2 rounded-full  cursor-move"
        style={{ left: `${rightValue}%`, background: colors[1] }}
        onMouseDown={handleMouseDown("right")}
        onClick={() => {
          setActive("right");
        }}
      />
    </div>
  );
}
