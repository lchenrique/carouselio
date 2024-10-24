"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface DualRangeSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  labelPosition?: "top" | "bottom";
  label?: (value: number | undefined) => React.ReactNode;
  trackColor?: string;
}

const DualRangeSlider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, DualRangeSliderProps>(
  ({ className, label, labelPosition = "top", trackColor, value = [],  ...props }, ref) => {
    const [initialValue, setInitialValue] = React.useState<number[]>(value)

    React.useEffect(() => {
      setInitialValue(value)
    }, [value])

    const handleChange = (newValue: number[]) => {
      setInitialValue(newValue);
      props.onValueChange?.(newValue);
    };
   
    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
        onValueChange={handleChange}
        value={initialValue}
      >
        <SliderPrimitive.Track
          className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
          style={{
            background: trackColor,
          }}
        >
          <SliderPrimitive.Range className="absolute h-full bg-transparent" />
        </SliderPrimitive.Track>

        {initialValue.map((value, index) => (
          <React.Fragment key={String(index)}>
            <SliderPrimitive.Thumb
              className="relative focus:border-black block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {label && (
                <span
                  className={cn(
                    "absolute flex w-full justify-center",
                    labelPosition === "top" && "-top-7",
                    labelPosition === "bottom" && "top-4"
                  )}
                >
                  {label(value)}
                </span>
              )}
            </SliderPrimitive.Thumb>
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    );
  });
DualRangeSlider.displayName = "DualRangeSlider";

export { DualRangeSlider };
