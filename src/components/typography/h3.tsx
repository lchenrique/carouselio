import { cn } from "@/lib/utils";
import type { HTMLAttributes, PropsWithChildren } from "react";

export interface ITypographyH3 extends HTMLAttributes<HTMLHeadingElement> {}

export function TypographyH3({ children, className, style }: ITypographyH3) {
  return (
    <h3 className={cn("scroll-m-20 text-lg  tracking-tight", className)} style={style}>
      {children}
    </h3>
  );
}
