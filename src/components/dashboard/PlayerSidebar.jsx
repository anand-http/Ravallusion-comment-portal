"use client";
import { BulbIcon, CourseIcon } from "@/lib/svg_icons";
import { Bookmark } from "lucide-react";
import React, { useEffect, useState } from "react";
import CourseModuleList from "./CourseModuleList";

import { useGetSubscribedPlanCourseQuery } from "@/store/Api/course";
import { useGetPlanDataQuery } from "@/store/Api/home";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCourseId, setFirstVideoId } from "@/store/slice/general";
import { setCourse } from "@/store/slice/course";

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
      dispatch(setCourse(courseData));
    }
    if (subscribedCourse?.modules?.[0].submodules?.[0].videos?.[0]._id) {
      dispatch(setFirstVideoId(subscribedCourse?.modules?.[0].submodules?.[0].videos?.[0]._id));
    }
  }, [subscribedCourseData, dispatch]);

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

// const ActionCard = ({ icon, isActive, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         background: isActive ? "var(--neon-purple)" : "var(--card, #181F2B)",
//         backgroundImage:
//           isActive && "linear-gradient(180deg, #C99BFD 0%, #8574F6 100%)",
//       }}
//       className={`py-4 h-14 flex-grow rounded-lg flex items-center justify-center ${isActive ? "cursor-pointer" : "cursor-not-allowed"}`}
//     >
//       {icon}
//     </div>
//   );
// };

export default PlayerSidebar;
