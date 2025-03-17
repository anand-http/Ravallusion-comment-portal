"use client";

import Card from "./Card";
import { CheckIcon, ClockIcon, VideoIcon } from "@/lib/svg_icons";
import { motion, useAnimation, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    name: "Module 1",
    description: "Build Your Foundation",
    videos: 12,
    time: "4.5 Hours",
    key_points: [
      "Clearing your fundamentals and unlearning BS",
      "Overcome communication challenges and speak fluently",
      "Common mistakes & roadblocks and how to avoid them",
    ],
  },
  {
    id: 2,
    name: "Module 2",
    description: "Enhance Your Skills",
    videos: 15,
    time: "5.0 Hours",
    key_points: [
      "Deep dive into advanced topics",
      "Practice with real-world scenarios",
      "Master new tools and techniques effectively",
    ],
  },
  {
    id: 3,
    name: "Module 3",
    description: "Achieve Mastery",
    videos: 18,
    time: "6.0 Hours",
    key_points: [
      "Integrating concepts for practical applications",
      "Common pitfalls and troubleshooting techniques",
      "Building confidence and mastering delivery",
    ],
  },
  // {
  //   id: 4,
  //   name: "Module 4",
  //   description: "Achieve Mastery",
  //   videos: 18,
  //   time: "6.0 Hours",
  //   key_points: [
  //     "Integrating concepts for practical applications",
  //     "Common pitfalls and troubleshooting techniques",
  //     "Building confidence and mastering delivery",
  //   ],
  // },
];

const ModuleCard = ({ index, item, progress, range, targetScale, isFirst, inView }) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);


  useEffect(() => {
    if (isFirst && inView && !hasAnimated) {
      // Set initial position
      controls.set({
        y: 100,  // Start from below
        opacity: 0
      });

      // Animate to final position
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }).then(() => {
        setHasAnimated(true);
      });
    }
  }, [isFirst, inView, controls, hasAnimated]);

  return (

    // <div className={`cardContainer ${isFirst ? "mt-[350px] md:mt-[280px] top-[100px] sticky" : "top-[100px]"} sticky 2xl:top-[15rem] px-5 md:px-[7%] 2xl:px-[8%]`}>
    <div className={`cardContainer px-5 md:px-[4%] lg:px-[8%]  ${isFirst ? "mt-[95%] md:mt-[42%] lg:mt-[30%] xl:mt-[20%] top-[6rem] 2xl:top-[12rem]" : "top-[6rem]"}  2xl:top-[12rem]`}>
      <motion.div
        className="card"
        style={{ scale: scale, top: `calc( ${window.innerWidth > 625 ? index * 25 : index * 10}px)` }}
        initial={isFirst ? { y: 200, opacity: 0 } : undefined}
        animate={isFirst ? controls : undefined}
      >
        <Card className="!h-fit gap-7 flex md:!flex-row justify-between py-7 px-4 md:p-[60px] 2xl:p-[70px] items-start flex-wrap md:flex-nowrap ">
          <div className="text-2xl md:text-[35px] 2xl:text-[2.5rem] min-w-[53%] md:font-bold">
            {item.name}
          </div>
          <div className="flex-grow text-xs 2xl:text-sm flex flex-col gap-[30px] ">
            <div className="flex flex-col gap-4 items-start ">
              <h1 className="text-xl lg:text-2xl 2xl:text-[2rem] font-bold ">
                {item.description}
              </h1>
              <div className="flex items-center gap-4 py-2 px-3 text-[var(--light-gray)] bg-[var(--light-black)] rounded-lg">
                <div className="flex items-center gap-1 ">
                  <VideoIcon />
                  <span>{item.videos || "12"} videos</span>
                </div>
                <span className="border-[1px] self-stretch "> </span>
                <div className="flex items-center gap-1">
                  <ClockIcon />
                  <span> {item.time || "4.5 hours"}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {item.key_points.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 font-extralight"
                >
                  <CheckIcon />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

const ModulesList = ({ scrollYProgress, modules, inView }) => {

  return modules && modules.map((item, index) => {
    const targetScale = 1 - (modules.length - index) * 0.01;
    return (
      <ModuleCard
        key={index}
        item={item}
        index={index}
        progress={scrollYProgress}
        range={[index * 0.25, 1]}
        targetScale={targetScale}
        isFirst={index === 0}
        inView={inView}

      />

    );
  });
};

export default ModulesList;