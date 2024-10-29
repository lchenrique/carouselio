"use client";
import { useEffect, useRef } from "react";

const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    if (typeof window !== "undefined") 
      document.addEventListener("mousedown", handleClickOutside);

    return () => {
      
      if (typeof window !== "undefined") 
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export { useClickOutside };
