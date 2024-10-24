"use client";
import { EditoMenu, type EditoMenuHandles } from "@/components/editor/content-editable/menu";
import { EditorSlider } from "@/components/editor/editor-slide";
import { ZoomWrapper } from "@/components/editor/zoom-wrapper";
import { ZoomTransform } from "@/components/editor/zoom-wrapper/zoom-transform";
import { Button, SidebarTrigger } from "@/components/ui";
import { useSidebar } from "@/components/ui/sidebar";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { EditorProvider } from "@/providers/editor-provider";
import { useRef } from "react";

export default function Page() {
  const { isMobile, open } = useSidebar();
  const menuRef = useRef<EditoMenuHandles>();

  const ref = useClickOutside(() => {
    menuRef.current?.hideMenu();
  });

  return (
    <div className="rounded-lg w-full ">
      <header
        className={cn("bg-gradient-to-tr from-primary to-purple-500", {
          "rounded-t-lg": !isMobile,
        })}
      >
        <div className="flex items-center w-full  [&>*]:border-white/10 ">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
          <div className="pr-12">
            <h1 className="bg-transparent text-2xl font-bold text-white p-1 h-min">Board</h1>
          </div>
          <div className="px-1 ">
            <Button className="bg-transparent p-1 h-min hover:bg-transparent">Aquivo</Button>
          </div>
          <div className="px-1">
            <Button className="bg-transparent  p-1 h-min hover:bg-transparent">Redimensionar</Button>
          </div>
        </div>
      </header>
      <div className="relative bolinha">
        <ZoomWrapper>
          {(_, scale) => {
            return (
              <>
                <EditorProvider>
                  <div className="h-screen w-full flex items-center overflow-hidden ">
                    <div ref={ref as React.RefObject<HTMLDivElement>} className="bg-red-50  w-[400] mx-auto ">
                      <EditoMenu ref={menuRef as React.RefObject<EditoMenuHandles>} />
                      <ZoomTransform>
                        <EditorSlider scale={scale} />
                      </ZoomTransform>
                    </div>
                  </div>
                </EditorProvider>
              </>
            );
          }}
        </ZoomWrapper>
      </div>
    </div>
  );
}
