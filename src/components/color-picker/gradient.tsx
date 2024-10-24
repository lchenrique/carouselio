import { useState, useCallback, useEffect, useRef, type SetStateAction } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DualRangeSlider } from "../ui/dual-range";
import { RangeStops } from "./range-stops";
import { GradientAnglePicker } from "./gradient-angle-picket";
import { useToolbarControl } from "@/store/toolbar-control";

type IGradientColorPicker = {
  onChange: (color: string) => void;
  value: string;
};

const getValues = (value: string) => {
  const regex = /linear-gradient\((\d+deg),\s*((?:[^,]+(?:\s+\d+%?)?\s*,?\s*)+)\)/g;

  const matches = regex.exec(value);

  if (matches) {
    const angle = matches[1];
    const colorStops = matches[2].trim().split(/\s*,\s*/); // Divide as cores e stops

    const colors = [];
    const stops = [];

    for (const stop of colorStops) {
      const parts = stop.trim().split(/\s+/); // Divide a cor do stop
      colors.push(parts[0]); // Adiciona a cor
      stops.push(parts[1] || null); // Adiciona o stop ou null se não existir
    }
    const stopsCleeaned = stops.map((stop) => (stop ? Number(stop.replace("%", "")) : 0));

    return { angle: angle.replace("deg", ""), colors, stops: stopsCleeaned };
  }
};
export function GradientColorPicker({ onChange, value }: IGradientColorPicker) {
  const valuesRecived = getValues(value);
  const angleValue = valuesRecived?.angle;
  const colorsValue = valuesRecived?.colors || [];
  const [color1, setColor1] = useState(colorsValue[0] || "#c1e9fb");
  const [color2, setColor2] = useState(colorsValue[1] || "#3498db");

  const [angle, setAngle] = useState(Number(angleValue) || 0);
  const [activeColor, setActiveColor] = useState("color1");
  const [values, setValues] = useState([0, 100]);
  const [stop1, setStop1] = useState(valuesRecived?.stops[0] || values[0]);
  const [stop2, setStop2] = useState(valuesRecived?.stops[1] || values[1]);

  const gradientStyle = {
    background:
      stop1 > stop2
        ? `linear-gradient(${angle}deg, ${color2} ${stop2}%, ${color1} ${stop1}%)`
        : `linear-gradient(${angle}deg, ${color1} ${stop1}%, ${color2} ${stop2}%)`,
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleColorChange = useCallback(
    (color: SetStateAction<string>, colorName: string) => {
      if (colorName === "color1") {
        setColor1(color);
      } else {
        setColor2(color);
      }
    },
    [setColor1, setColor2]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    onChange(gradientStyle.background);
  }, [gradientStyle.background]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (value) {
      setColor1(colorsValue[0] || "#c1e9fb");
      setColor2(colorsValue[1] || "#3498db");
      setAngle(Number(angleValue) || 90);
      setStop1(valuesRecived?.stops[0] || values[0]);
      setStop2(valuesRecived?.stops[1] || values[1]);
    }
  }, [value]);

  return (
    <div className="w-full">
      <HexColorPicker
        color={activeColor === "color1" ? color1 : color2}
        onChange={(color) => {
          handleColorChange(color, activeColor);
        }}
        className="w-full"
        style={{ width: "100%", height: 150 }}
      />
      <RangeStops
        colors={[color1, color2]}
        values={[stop1, stop2]}
        onChange={(v) => {
          setStop1(v[0]);
          setStop2(v[1]);
        }}
        onChangeActive={(value) => {
          if (value === "left") {
            setActiveColor("color1");
            return;
          }
          setActiveColor("color2");
        }}
      />
      {angle}
      <DualRangeSlider value={[angle]} onValueChange={(v) => setAngle(v[0])} min={0} max={360} />

      {/* <div className="w-full h-24 rounded-lg my-4" style={gradientStyle} /> */}
    </div>
  );
}
