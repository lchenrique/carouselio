import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ContentEditable } from "../content-editable";
import { cn } from "@/lib/utils";
import { DragableContainer } from "@/components/dragable-container";
import { FormProvider, useForm } from "react-hook-form";
import { EditorSlideContent } from "./editor-slide-content";
import { fakeInitialData } from "./fake-initial-data";


export const EditorSlider = ({
  children,
  className,
  scale,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { scale: number }) => {
  const form = useForm({
    defaultValues: {
      slides: fakeInitialData,
    },
  });

  return (
    <FormProvider {...form}>
         
        <EditorSlideContent />
      
    </FormProvider>
  );
};
