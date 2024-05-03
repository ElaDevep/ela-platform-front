'use client'

import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    if(window!=undefined){
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const handleResize = () => {
    if(window!=undefined){
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
  };

  return { width, height };
};

export default useScreenSize;