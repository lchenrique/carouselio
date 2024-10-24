"use client";

import { useState } from "react";
import Image from "next/image";
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";
import { Resizable } from "re-resizable";
export function ResizableImage() {
  return (
    <div className=" w-full flex  ">
      <div className="bg-red-300 relative m-1 hover:border-primary rounded-lg border group/resize ">
        <div className="h-2 w-2 bg-primary  absolute  -top-1 -right-1 z-[999] pointer-events-none opacity-0 group-hover/resize:opacity-100" />
        <div className="h-2 w-2 bg-primary  absolute  -top-1 -left-1 z-[999] pointer-events-none opacity-0 group-hover/resize:opacity-100" />
        <div className="h-2 w-2 bg-primary  absolute  -bottom-1 -right-1 z-[999] pointer-events-none opacity-0 group-hover/resize:opacity-100" />
        <div className="h-2 w-2 bg-primary  absolute  -bottom-1 -left-1 z-[999] pointer-events-none opacity-0 group-hover/resize:opacity-100" />

        <Resizable
          style={{
            background: "#f0f0f0",
            backgroundSize: "cover",
            backgroundImage: "url('http://github.com/lchenrique.png')",
          }}
          defaultSize={{
            width: 320,
            height: 320,
          }}
       />
      </div>
    </div>
  );
}
