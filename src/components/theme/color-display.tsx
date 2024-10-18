import type { Colors } from "@/lib/pallettes";
import * as React from "react";

export function ColorThemeDisplay({ colors }: { colors: Colors }) {
  return (
    <div className="flex flew-row rounded overflow-clip  cursor-pointer">
      <span
        className="h-4 w-4"
        style={{
          backgroundColor: colors.primary,
        }}
      />
      <span
        className="h-4 w-4"
        style={{
          backgroundColor: colors.secondary,
        }}
      />
      <span
        className="h-4 w-4"
        style={{
          backgroundColor: colors.background,
        }}
      />
    </div>
  );
}
