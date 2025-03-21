"use client";

import React, { useEffect, useState } from "react";
import CourseModuleList from "./CourseModuleList";

import { useGetSubscribedPlanCourseQuery } from "@/store/Api/course";
import { useGetPlanDataQuery } from "@/store/Api/home";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCourseId, setFirstVideoId } from "@/store/slice/general";

const PlayerSidebar = () => {
  const [planId, setPlanId] = useState(null);
  const dispatch = useDispatch();
  const path = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const { data: plansData } = useGetPlanDataQuery();
  const { data: subscribedCourseData, isLoading } =
    useGetSubscribedPlanCourseQuery(planId, { skip: !planId });

  const subscribedCourse = subscribedCourseData?.data?.course || [];

  useEffect(() => {
    const courseData = subscribedCourseData?.data?.course;

    if (courseData) {
      dispatch(setCourseId(courseData?._id));
    }
    if (subscribedCourse?.modules?.[0]?.submodules?.[0].videos?.[0]?._id) {
      dispatch(setFirstVideoId(subscribedCourse?.modules?.[0]?.submodules?.[0]?.videos?.[0]?._id));
    }
  }, [subscribedCourseData]);

  useEffect(() => {
    if (path.includes("beginner")) {
      setPlanId(plansData?.data?.plans[0]?._id);
    } else {
      setPlanId(plansData?.data?.plans[1]?._id);
    }
  }, [path, plansData]);

  return (
    <>
      <div className="py-4 min-h-screen bg-[#181F2B] rounded-2xl">
        {activeIndex === 0 && (
          <CourseModuleList
            course={subscribedCourse}
            isLoading={isLoading}
            playingVideoId={playingVideoId}
            setPlayingVideoId={setPlayingVideoId}
          />
        )}
      </div>
    </>
  );
};


export default PlayerSidebar;
