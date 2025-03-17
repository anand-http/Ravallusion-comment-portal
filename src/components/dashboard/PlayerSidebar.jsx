"use client";
import { BulbIcon, CourseIcon } from "@/lib/svg_icons";
import { Bookmark } from "lucide-react";
import React, { useEffect, useState } from "react";
import CourseModuleList from "./CourseModuleList";

import {
  useGetBookmarkQuery,
  useGetIntroductoryQuery,
} from "@/store/Api/introAndBookmark";
import { useGetSubscribedPlanCourseQuery } from "@/store/Api/course";
import { useGetPlanDataQuery } from "@/store/Api/home";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCourseId, setFirstVideoId } from "@/store/slice/general";
import { course, setCourse } from "@/store/slice/course";
import { BookmarkedList, IntroductoryList } from "./IntroductoryAndBookmarkList";

const PlayerSidebar = () => {
  const [planId, setPlanId] = useState(null);
  const dispatch = useDispatch();
  const path = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const { data: plansData } = useGetPlanDataQuery();
  const { data } = useGetBookmarkQuery();
  const { data: introductoryData } = useGetIntroductoryQuery();
  const { data: subscribedCourseData, isLoading } =
    useGetSubscribedPlanCourseQuery(planId, { skip: !planId });

  const subscribedCourse = subscribedCourseData?.data?.course || [];

  const introductoryVideos = introductoryData?.data?.introductoryVideos || [];
  const bookmarkedVideos = data?.bookmarks || [];

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
      {/* <div className="flex gap-x-3 mb-4">
        <ActionCard
          icon={<CourseIcon />}
          isActive={activeIndex === 0}
          onClick={() => setActiveIndex(0)}
        />
        <ActionCard
          icon={<BulbIcon />}
          isActive={activeIndex === 1}
        />
        <ActionCard
          icon={<Bookmark />}
          isActive={activeIndex === 2}
        />
      </div> */}

      {/* <div className='py-4 min-h-screen bg-[#181F2B] rounded-2xl'> */}
      <div className="py-4 min-h-screen bg-[#181F2B] rounded-2xl">
        {activeIndex === 0 && (
          <CourseModuleList
            course={subscribedCourse}
            isLoading={isLoading}
            playingVideoId={playingVideoId}
            setPlayingVideoId={setPlayingVideoId}
          />
        )}
        {activeIndex === 1 && (
          <IntroductoryList
            heading={"Introductory videos"}
            subItems={introductoryVideos}
            playingVideoId={playingVideoId}
            setPlayingVideoId={setPlayingVideoId}
          />
        )}
        {activeIndex === 2 && (
          <BookmarkedList
            heading={"Bookmarked videos"}
            subItems={bookmarkedVideos}
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
