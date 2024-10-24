import { memo } from "react";
import { Button as UIButton } from "@/components/ui/button";
import { SidebarTrigger as UISidebarTrigger } from "@/components/ui/sidebar";


const Button = memo(UIButton);
const SidebarTrigger = memo(UISidebarTrigger);



export  {Button, SidebarTrigger};
