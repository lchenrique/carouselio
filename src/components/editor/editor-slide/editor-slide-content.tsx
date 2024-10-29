import { DragableContainer } from "@/components/dragable-container";
import { cn } from "@/lib/utils";
import { useSlideControl } from "@/store/slide-control";
import type { ISlideItems } from "@/types/slide-content";
import { useController, useFormContext } from "react-hook-form";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
