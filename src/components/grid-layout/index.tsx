import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import { GripVertical } from "lucide-react";
import { useState, type Ref } from "react";
import RGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useControls } from "react-zoom-pan-pinch";
import { ContentEditable } from "../editor/content-editable";
import "./style.css";

export interface IGridLayoutProps<T> {
  items: T & { id: string }[];
  parentIndex: number;
  allowOverlap?: boolean;
}

const GridLayout = <T,>({ items, parentIndex, allowOverlap }: IGridLayoutProps<T>) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const { theme } = useSlideThemeStore();
  const { instance } = useControls();
  const [layout, setLayout] = useState(
    Array.from({ length: 12 }).map((v, i) => ({ i: String(i + 1), x: 0, y: 0, w: 12, h: 12 }))
  );

  const handleDubleClick = () => {
    setIsEditing(true);
  };

  const hamdleOnClick = (index: number) => {
    setActive(index);
    setIsSelected(true);
  };

  const ref = useClickOutside(() => {
    setIsEditing(false);
    setIsSelected(false);
  });

  return (
    <RGridLayout
      className="layout h-96"
      layout={layout}
      cols={12}
      maxRows={18}
      autoSize
      verticalCompact
      rowHeight={20}
      width={376}
      containerPadding={[0, 0]}
      margin={[3, 3]}
      draggableHandle=".drag-handle"
      draggableCancel=".drag-cancel"
      transformScale={instance.transformState.scale}
      innerRef={ref as Ref<HTMLDivElement>}
      allowOverlap={allowOverlap}
    >
      {(() => {
        let currentY = 0; // Inicia a posição Y

        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        return items.map((item: any, index) => {
            let itemHeight = Math.ceil(Number(item.values[0].attrs.size) / 18) || 1; // Calcula a altura padrão do item

            // Se o índice do item for 1 (segundo item), dobra a altura
            if (index === 1) {
              itemHeight *= 2;
            }
      
            const dataGrid = {
              i: String(index),
              x: 0,
              y: currentY, // Usa o Y acumulado
              w: 12,
              h: itemHeight,
              minH: itemHeight,
              resizeHandles: ["e", "w", "n", "s", "se", "sw", "ne", "nw"],
            };
      
            currentY += itemHeight;
          return (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div
              id={item.id}
              key={String(index)}
              data-grid={dataGrid}
              className={cn(
                "group/grid-item drag-handle border border-transparent cursor-move hover:border-primary/10",
                {
                  "border border-red-500 grid-item-selected": isSelected && index === active,
                }
              )}
              onDoubleClick={handleDubleClick}
              onClick={() => hamdleOnClick(index)}
              style={{ height: "auto" }}
            >
              <div className="drag-handle absolute right-0 opacity-0 top-1/2 -translate-y-1/2 group-hover/grid-item:opacity-100 group-hover/grid-item:visible">
                <GripVertical color={theme.secondary} strokeWidth={1} className="opacity-50 " />
              </div>
              <div className=" w-full drag-cancel cursor-text">
                <ContentEditable index={index} parentIndex={parentIndex} />
              </div>
            </div>
          );
        });
      })()}
    </RGridLayout>
  );
};export { GridLayout as MyGrid };

