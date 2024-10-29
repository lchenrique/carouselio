"use client";
import { EditoMenu, type EditoMenuHandles } from "@/components/editor/content-editable/menu";
import { EditorSlider } from "@/components/editor/editor-slide";
import { ZoomWrapper } from "@/components/editor/zoom-wrapper";
import { ZoomTransform } from "@/components/editor/zoom-wrapper/zoom-transform";
import { SheetDemo } from "@/components/panel";
import { Button, SidebarTrigger } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useContentControl } from "@/hooks/use-content-control";
import { cn } from "@/lib/utils";
import { EditorProvider } from "@/providers/editor-provider";
import { memo, useRef } from "react";

const Editor = memo(() => {
  const setActiveItemId = useContentControl((state) => state.setActiveItemId);
  const setIsEditing = useContentControl((state) => state.setIsEditing);
  const { isMobile, open } = useSidebar();

  const menuRef = useRef<EditoMenuHandles>();

  const handleClickBehind = () => {
    menuRef.current?.hideMenu();
    setActiveItemId(null);
    setIsEditing(false);
  };

  return (
    <>
      <EditorProvider>
        <ZoomWrapper>
          {(_, scale) => {
            return (
              <>
                <div
                  className={cn("h-[calc(100vh-40px)] w-screen relative ", {
                    "w-[calc(100vw-256px)] ml-auto": !isMobile && open,
                  })}
                >
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                  <div className="w-full border h-full overflow-hidden " onClick={handleClickBehind}>
                    {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <SheetDemo />
                      <EditoMenu ref={menuRef as React.RefObject<EditoMenuHandles>} />
                    </div>
                    <EditorSlider scale={scale} />
                  </div>
                </div>
              </>
            );
          }}
        </ZoomWrapper>
      </EditorProvider>
    </>
  );
});

export default function Page() {
  const { isMobile } = useSidebar();

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
        <Editor />
      </div>
    </div>
  );
}
