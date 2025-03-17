"use client";

import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

const LandingContainer = ({ children, className, showBg, bg2 }) => {
  useEffect(() => {
    Aos.init({
      duration: 1000, // Animation duration in milliseconds
      offset: 50, // Offset (in pixels) from the original trigger point
      easing: "ease-in-out", // Easing function
      // once: true, // Whether animation should happen only once
    });
  }, []);
  return (
    <div
      data-aos="fade-up"
      className={
        `h-screen w-screen px-4 md:px-[9%] 2xl:px-[10rem] relative overflow-hidden  ` +
        className
      }
    >
      {showBg && (
        <div className="absolute -top-20 2xl:top-0 -left-44 2xl:-left-14 -right-44 bottom-0 background-image"></div>
      )}
      {bg2 && (
        <div className="absolute -left-28 w-[130vw] h-[130vh] bg-cover bg-center bg-[url('/bg2.png')] -z-10 "></div>
      )}
      {children}
    </div>
  );
};

export default LandingContainer;
