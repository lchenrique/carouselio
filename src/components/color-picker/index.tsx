"use client";

import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { presetColors } from "@/lib/colors";

export function ColorPicker({ onChange, value }: { onChange: (value: string) => void; value: string }) {
  const handleColorChange = (newColor: string) => {
    onChange?.(newColor);
  };


  return (
    <div className="w-full">
      
      <HexColorPicker
        color={value}
        onChange={handleColorChange}
        className="w-full"
        style={{ width: "100%", height: 150 }}
      />
    </div>
  );
}
