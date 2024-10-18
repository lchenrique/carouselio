import "./style.css";
import { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Smile } from "lucide-react";
import { cn } from "@/lib/utils";

export const EmojiPicker = ({ onChange }) => {
  const handleEmojiSelect = (emoji) => {
    console.log(emoji);
    onChange?.(emoji?.native);
  };

  return (
    <div className="flex items-center">
      <Popover modal>
        <PopoverTrigger asChild>
          <Button variant="ghost" className={cn("text-base p-0 size-8")}>
            <Smile className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Card className="p-0">
            <CardContent className="p-2 ">
              <Picker onEmojiSelect={handleEmojiSelect} theme="light" dynamicWidth />
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};
