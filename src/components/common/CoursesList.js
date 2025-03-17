"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import CourseCard from "./CourseCard";
import CustomSkeleton from "./CustomSkeleton";
import CarouselWrapper from "./CarouselWrapper";

const courses = [
  {
    id: 1,
    title: "Advanced VFX",
    description: "Learn advanced VFX course with use to gain more knowledge",
    views: "192K",
    likes: "80K",
    imageUrl: "/URL_of_image_for_Advanced_VFX.jpeg",
  },
  {
    id: 2,
    title: "Ultra 3D Earth",
    description: "Learn advanced VFX course with use to gain more knowledge",
    views: "192K",
    likes: "80K",
    imageUrl: "/URL_of_image_for_Ultra_3D_Earth.jpeg",
  },
  {
    id: 3,
    title: "Colorful Glitch Effects",
    description: "Learn advanced VFX course with use to gain more knowledge",
    views: "192K",
    likes: "80K",
    imageUrl: "/URL_of_image_for_Colorful_Glitch_Effects.jpeg",
  },
  {
    id: 4,
    title: "FX Console Plugin",
    description: "Learn advanced VFX course with use to gain more knowledge",
    views: "192K",
    likes: "80K",
    imageUrl: "/URL_of_image_for_FX_Console_Plugin.jpeg",
  },
  {
    id: 5,
    title: "Realistic Raindrop Effect",
    description: "Learn advanced VFX course with use to gain more knowledge",
    views: "192K",
    likes: "80K",
    imageUrl: "/URL_of_image_for_Realistic_Raindrop_Effect.jpeg",
  },
  {
    id: 6,
    title: "Cinematic Title Design",
    description: "Learn advanced VFX course with use to gain more knowledge",
    views: "192K",
    likes: "80K",
    imageUrl: "/URL_of_image_for_Cinematic_Title_Design.jpeg",
  },

];


const CoursesList = ({ data }) => {
  const [count, setCount] = useState(2);
  const screenWidth = window.innerWidth;

  useEffect(() => {
    const updateCountBasedOnScreenSize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1024) {
        setCount(2);
      } else if (screenWidth >= 640) {
        setCount(3);
      } else {
        setCount(2);
      }
    };

    // Run the function on initial render
    updateCountBasedOnScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", updateCountBasedOnScreenSize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateCountBasedOnScreenSize);
    };
  },[]);


  const firstThreeCourses = data.slice(0, 3);
  const lastThreeCourses = data.slice(3);

  return (
    <div className="flex-grow relative">
      <CustomSkeleton
        count={count}
        className="absolute !-left-7 sm:!-left-[11%] md:!-left-[7rem] !w-[10%] sm:!w-24 2xl:!w-[rem]  !h-full"
        skeletonClass="skeleton-left"
      />
      <CustomSkeleton
        count={count}
        className="absolute !-right-7 sm:!-right-[11%] md:!-right-[7rem] !w-[10%] sm:!w-24 !h-full"
        skeletonClass="skeleton-right"
      />

      {
        screenWidth < 768 ?
          (
            <>
              <div
                className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 px-[7%] md:px-0"
              >
                < CarouselWrapper autoScrollInterval={3000} navigation={true} >

                  {firstThreeCourses.map((course,index) => (
                    <CourseCard key={index} course={course} />
                  ))}
                </CarouselWrapper>

              </div>
              
              <div
                className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 px-[7%] md:px-0"
              >
                < CarouselWrapper autoScrollInterval={3000} navigation={true} className="mt-5" >

                  {lastThreeCourses.map((course,index) => (
                    <CourseCard key={index} course={course} />
                  ))}
                </CarouselWrapper>

              </div>

            </>


          ) :

          (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-[7%] md:px-0"
            >
              {data.map((course,index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          )

      }


    </div >
  );
};

export default CoursesList;
