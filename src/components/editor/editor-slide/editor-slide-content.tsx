import { DragableContainer } from "@/components/dragable-container";
import { cn } from "@/lib/utils";
import type { ISlideItems } from "@/types/slide-content";
import { useController, useFormContext } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import { useSlideControl } from "@/store/slide-control";
import { useControls } from "react-zoom-pan-pinch";
import { useEditorContext } from "@/providers/editor-provider";
import { useBgControl } from "@/hooks/use-bg-control copy";
import { useEffect } from "react";

export const EditorSlideContent = () => {
  const { swipe } = useSlideControl();
  const { control } = useFormContext<{ slides: ISlideItems[] }>();
  const contentId = "slides";
  const { field } = useController({ name: contentId, control });



  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      modules={[Pagination]}

    //   onSwiper={(swiper) => console.log(swiper)}
      className="overflow-visible"
      wrapperClass="w-[600px]"
      style={{
        overflow: "visible",
        height: 600,
        width: 600,
      }}
    >
      {field.value?.map((item, i) => (
        <SwiperSlide
          className={cn({
            "swiper-no-swiping": true,
          })}
          style={{
            overflow: "visible",
            height:600,
            width:600,
          }}
          key={item.id}
        >
         
            <DragableContainer index={i}  itemsData={item.contentItems} />
          
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
