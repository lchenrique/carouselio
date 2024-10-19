import { Sparkles, CaseSensitive, SwatchBook, PanelsTopLeft, Grid3X3, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const BoradTool = () => {
  return (
    <>
    <div className="flex flex-col gap-1 p-2 bg-background rounded-full my-auto">
      <Button size="icon" variant="ghost" className="rounded-full">
        <Sparkles />
      </Button>
      <Button size="icon" variant="ghost" className="rounded-full">
        <CaseSensitive />
      </Button>
      <Button size="icon" variant="ghost" className="rounded-full">
        <SwatchBook />
      </Button>
      <Button size="icon" variant="ghost" className="rounded-full">
        <PanelsTopLeft />
      </Button>
      <Button size="icon" variant="ghost" className="rounded-full">
        <Grid3X3 />
      </Button>
      <Button size="icon" variant="ghost" className="rounded-full">
        <ArrowRight />
      </Button>
    </div>
    
    </>

  );
};
