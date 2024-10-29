"use client";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ContentEditable } from "../content-editable";
import { cn } from "@/lib/utils";
import { DragableContainer } from "@/components/dragable-container";
import { FormProvider, useForm } from "react-hook-form";
import { EditorSlideContent } from "./editor-slide-content";
import { fakeInitialData } from "./fake-initial-data";
import { ZoomTransform } from "../zoom-wrapper/zoom-transform";
import { SheetDemo } from "@/components/panel";
import { EditoMenu, type EditoMenuHandles } from "../content-editable/menu";
import { forwardRef, useRef } from "react";

export const EditorSlider = forwardRef(
  (
    { children, className, scale }: React.HTMLAttributes<HTMLDivElement> & { scale: number },
    ref: React.ForwardedRef<EditoMenuHandles>
  ) => {
    const form = useForm({
      defaultValues: {
        slides: fakeInitialData,
        textColor: "#000",
      },
    });
    const menuRef = useRef<EditoMenuHandles>();
    const handleClickWindow = () => {
      menuRef.current?.hideMenu();
    };
    return (
      <FormProvider {...form}>
        <ZoomTransform>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleClickWindow();
            }}
          >
            <EditorSlideContent />
          </div>
        </ZoomTransform>
      </FormProvider>
    );
  }
);
