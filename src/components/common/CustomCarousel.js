"use client";

import { Carousel, CarouselContent } from "../ui/carousel";

const CustomCarousel = ({ children }) => {
  return (
    <div className="relative carousel">
      <Carousel opts={{ loop: true }} className="w-full">
        <CarouselContent className="">{children}</CarouselContent>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
