import { Select as SelectShad, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { MouseEvent, ReactNode } from "react";

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: ReactNode; value: string }[];
  className?: string; // Optional custom class name for the Select component.
}

const Select = ({ onChange, value, options, className }: SelectProps) => {
  const handleSelectChange = (value: string) => {
    onChange?.(value);
  };

  return (
    <SelectShad onValueChange={handleSelectChange}>
      <SelectTrigger className={cn(className)}>
        <div className="flex justify-between w-full pr-3 text-foreground">{value}</div>
      </SelectTrigger>
      <SelectContent className="w-full">
        {options.map(({ label, value }) => (
          <SelectItem
            onMouseEnter={(e) => {
              handleSelectChange(value);
            }}
            key={value}
            value={value}
            className="w-full flex justify-between"
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectShad>
  );
};

export default Select;
