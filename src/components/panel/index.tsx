import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetOverlay,
} from "@/components/ui/sheet";
import { useDrawerControl } from "@/hooks/use-drawer-control";
import { ColorSelector } from "../text-color";
import { gradientColors, presetColors } from "@/lib/colors";
import { Card, CardContent } from "../ui/card";
import { custom } from "zod";
import { ColorPicker } from "../color-picker";
import { GradientColorPicker } from "../color-picker/gradient";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ColorsPanel } from "@/panels/colors.panel";

export function SheetDemo() {
  const { isOpen, toggle , content, title} = useDrawerControl();

  return (
    <Sheet open={isOpen} onOpenChange={toggle}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {content}
        </div>
        <SheetFooter>
          {/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
