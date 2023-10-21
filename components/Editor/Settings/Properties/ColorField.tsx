import { GradientPicker } from "@/components/ui/color_picker";
import React from "react";

export type ColorFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
};

export const ColorField: React.FC<ColorFieldProps> = ({ value, onChange }) => {
  return (
    <div className="border rounded-e-md">
      <GradientPicker
        className="rounded-s-none border-none w-full"
        background={value}
        setBackground={onChange}
      />
    </div>
  );
};