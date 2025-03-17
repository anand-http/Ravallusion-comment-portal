import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const CarouselWrapper = ({ navigation = false, children, autoScrollInterval = 3000 ,className=""}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = React.Children.count(children);
    const slideRef = useRef(null);

    // Function to navigate to the next slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    // Function to navigate to the previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
        );
    };

    // Auto-scroll functionality
    useEffect(() => {
        const autoScroll = setInterval(() => {
            nextSlide();
        }, autoScrollInterval);

        return () => clearInterval(autoScroll);
    }, [currentIndex, autoScrollInterval]);

    // Dynamic styling for slides
    const slideStyles = {
        transform: `translateX(-${currentIndex * 100}%)`,
        transition: "transform 0.5s ease-in-out",
    };

    return (
        <div className={`relative w-full overflow-hidden ${className}`}>
            {/* Slider Container */}
            <div
                ref={slideRef}
                className="flex w-full"
                style={slideStyles}
            >
                {React.Children.map(children, (child, index) => (
                    <div className="w-full flex-shrink-0">{child}</div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {
                navigation && (
                    <>
                        <button
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-900"
                            onClick={prevSlide}
                        >
                            <ChevronLeft/>
                        </button>
                        <button
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-900"
                            onClick={nextSlide}
                        >
                            <ChevronRight/>
                        </button>
                    </>

                )
            }

        </div>
    );
};

export default CarouselWrapper;
