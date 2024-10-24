import { Button, type ButtonProps } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ToggleProps } from "@radix-ui/react-toggle";
import type { ComponentProps } from "react";

export const BubbleButtonGroup =  (props: ComponentProps<typeof ToggleGroup>) => {
    return <ToggleGroup   {...props}/>
}


export const BubbleButton =  (props:  ComponentProps<typeof ToggleGroupItem>) => {
    return <ToggleGroupItem size="sm"  className="data-[state=true]:text-primary  data-[state=true]:bg-muted"     {...props}/>
}