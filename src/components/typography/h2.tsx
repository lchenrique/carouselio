import { cn } from "@/lib/utils";
import type { HTMLAttributes, PropsWithChildren } from "react";

export interface ITypographyH2 extends HTMLAttributes<HTMLHeadingElement> {}

export function TypographyH2({ children, className, style }: ITypographyH2) {
  return (
    <h2 className={cn("scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)} style={style}>
      {children}
    </h2>
  );
}
