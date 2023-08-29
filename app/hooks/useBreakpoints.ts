import { useState, useEffect } from "react";

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(1200);
  const resize = () => {
    setBreakpoint(window.innerWidth);
  };

  useEffect(() => {
    setBreakpoint(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return breakpoint;
};
