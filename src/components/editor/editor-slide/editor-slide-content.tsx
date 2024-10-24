import { DragableContainer } from "@/components/dragable-container";
import { cn } from "@/lib/utils";
import type { ISlideItems } from "@/types/slide-content";
import { useController, useFormContext } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import { useSlideControl } from "@/store/slide-control";
import { useControls } from "react-zoom-pan-pinch";

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
    //   onSlideChange={() => console.log("slide change")}
    //   onSwiper={(swiper) => console.log(swiper)}
      className="overflow-visible"
      wrapperClass="w-[400px]"
      style={{
        overflow: "visible",
        height: 400,
        width: 400,
      }}
    >
      {field.value?.map((item, i) => (
        <SwiperSlide
          className={cn({
            "swiper-no-swiping": true,
          })}
          style={{
            overflow: "visible",
            height: 400,
            width: 400,
          }}
          key={item.id}
        >
          <div className="bg-slate-50 w-full h-full p-3">
            <DragableContainer index={i}  itemsData={item.contentItems} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
