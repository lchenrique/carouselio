import { Swiper, SwiperSlide, type SwiperProps, useSwiper, type SwiperRef } from "swiper/react";
import { Pagination, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import { useController, useFormContext, type Control } from "react-hook-form";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import { cn } from "@/lib/utils";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { Controls } from "./controls";
import { Button } from "../ui/button";
import { getDefaultColor, TextContentHeadingType, type TextContent } from "@/types/text-content";
import type { ISlideItems } from "@/types/slide-content";
import SlideContent from "../carousel/content";
import { EditableContent } from "../editable-content";
import CardContent from "../carousel/card";
import { useSlideControl } from "@/store/slide-control";

const SwiperCarousel = ({
  children,
  size,
  ...props
}: // biome-ignore lint/suspicious/noExplicitAny: <explanation>
SwiperProps & { size: any; }) => {
  const [sizeSc, scaleSc] = useState(size);
  const {swipe, setSwipe} = useSlideControl();
  const [pan, setPan] = useState(false);
  const { theme } = useSlideThemeStore();
  const [zoomLevel, setZoomLevel] = useState(1);
  const swiperRef = useRef<SwiperRef | null>(null);

  const [active, setActive] = useState(swiperRef.current?.swiper.activeIndex || 0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setPan(true);
        setSwipe(false);
      }
    };

    // Função para detectar quando a tecla é liberada
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setPan(false);
        setSwipe(true);
      }
    };

    // Função para detectar o clique do mouse
    const handleClick = (event: MouseEvent) => {
      if (pan) {
        setPan(true);
        setSwipe(false);
      }
    };

    // Adiciona os event listeners para keydown, keyup e click
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("click", handleClick);

    // Limpa os event listeners ao desmontar o componente
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("click", handleClick);
    };
  }, [pan]);

  useEffect(() => {
    scaleSc(size);
  }, [size]);

  useEffect(() => {
    if (swiperRef.current && active !== undefined) {
      swiperRef.current?.swiper?.slideTo(active);
    }
  }, [active]);


  const {control} = useFormContext()

  const { field: slides } = useController({
    control,
    name: "slides",
  });

  return (
    <div  className="h-full genius-slides">
      <TransformWrapper
        initialScale={1}
        doubleClick={{
          mode: "reset",
        }}
        panning={{
          disabled: !pan,
          excluded: ["title", "sub", "drag-ghost", "ql-container", ],
        }}
        onZoom={(e) => {
          setZoomLevel(e.state.scale);
        }}
      >
        {({ zoomIn, zoomOut, resetTransform, instance,  ...rest }) => (
          <>
            <Controls onZoomIn={zoomIn} onZoomOut={zoomOut} />
            <ul className="flex gap-1 items-center absolute bottom-5 left-1/2 -translate-x-1/2  z-50">
              {Array.isArray(slides.value) &&
                slides.value.map((item, i: number) => {
                  return (
                    <li key={item.id}>
                      <Button
                        onClick={() => {
                          setActive(i);
                          resetTransform();
                        }}
                        size="icon"
                        variant="outline"
                        className={cn("w-full rounded-full bg-muted transition-all   size-4 z-10 ", {
                          "bg-primary hover:bg-primary": i === active,
                          "hover:bg-background": i !== active,
                        })}
                      />
                    </li>
                  );
                })}
            </ul>

            <TransformComponent
              contentStyle={{
                height: "100%",
                width: "100%",
                cursor: pan?"grab":"inherit"              }}
              wrapperStyle={{
                height: "100%",
                position: "relative",
                overflow: "visible",
                width: "100%",
                
              }}
            >

              <Swiper
                slidesPerView={"auto"}
                spaceBetween={10}
                centeredSlides
              
                className="genius-swiper-slides"
                breakpoints={{
                  940: {
                    slidesPerView: 1,
                    spaceBetween: 150,
                  },
                  1080: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                }}
                ref={swiperRef}
                onSlideChange={(swiper) => {
                  setActive(swiper.activeIndex);
                }}
              >
                {Array.isArray(slides.value) &&
                  slides.value.map((item, index) => (
                    <SwiperSlide
                      key={String(index)}
                      className={cn("", {
                        "swiper-no-swiping": pan || !swipe,
                        "opacity-40 ": active !== index,
                        "have-more": slides.value.length > 1,
                      })}
                      style={{
                        transition: "opacity 0.7s ease",
                      }}
                      onClick={() => {
                        setActive(index);
                      }}
                    >
                      <CardContent
                        scale={zoomLevel}
                        index={index}
                        item={item}
                        size={sizeSc}
                        key={String(index)}
                        className={cn("relative", {
                          "pointer-events-none": active !== index || pan,
                          
                        })}
                       
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>

            </TransformComponent>
          </>

        )}

      </TransformWrapper>
    </div>
  );
};export { SwiperCarousel };
