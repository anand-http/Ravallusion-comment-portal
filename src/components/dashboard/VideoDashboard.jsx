"use client";

import { SimpleLoader } from "@/components/common/LoadingSpinner";
import Comments from "@/components/dashboard/Comments";
import PlayerSidebar from "@/components/dashboard/PlayerSidebar";
import VideoDescription from "@/components/dashboard/VideoDescription";
import VideoPlayer from "@/components/dashboard/VideoPlayer";
import {
  useGetVideoQuery,
} from "@/store/Api/introAndBookmark";
// import {
//   useGetCourseProgressQuery,
//   useGetVideoProgressQuery,
//   useUpdateVideoProgressMutation,
// } from "@/store/Api/videoProgress";
import {
  setUpdatedPercentageWatched,
  setVideoIdOfcurrentVideo,
} from "@/store/slice/general";
import { current } from "@reduxjs/toolkit";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setVideos, updateVideo } from "@/store/slice/course";

const VideoDashboard = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const route = useRouter();
  const id = searchParams.get("videoId");
  const { courseId, firstVideoId } = useSelector((state) => state.general);

  // const [getVideoQuery, { isLoading: loading }] = useLazyGetVideoQuery();

  const [videoUrl, setVideoUrl] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const [watchTime, setWatchTime] = useState(0);

  // const [updateProgress] = useUpdateVideoProgressMutation();

  // const { data: courseProgress, isLoading: courseProgressLoading } =
  //   useGetCourseProgressQuery(courseId, {
  //     skip: !courseId,
  //   });

  const [videoId, setVideoId] = useState(null);

  const { data, isLoading, error } = useGetVideoQuery(videoId, {
    skip: !videoId,
  });

  // Reset states when videoId changes
  useEffect(() => {
    setVideoUrl(null);
    setThumbnailUrl(null);
  }, [videoId]);

  useEffect(() => {
    if (data?.data?.video) {
      setVideoUrl(data.data.video.videoUrl);
      setThumbnailUrl(data.data.video.thumbnailUrl);
    }
  }, [data, videoId]); // Added videoId as dependency
  // console.log("latest bhar ", latestWatchedVideo);

  useEffect(() => {
    if (firstVideoId) {
      route.push(`?videoId=${firstVideoId}`);
    }
  }, [firstVideoId]);

  useEffect(() => {
    if (id) {
      setVideoId(id);
    }
  }, [id]);

  // useEffect(() => {
  //   // console.log("watch time", watchTime);
  //   const progressUpdate = async () => {
  //     if (watchTime) {
  //       const res = await updateProgress({ id: videoId, watchTime }).unwrap();
  //       dispatch(
  //         setUpdatedPercentageWatched(res?.videoProgress?.percentageWatched)
  //       );
  //       dispatch(setVideoIdOfcurrentVideo(videoId));

  //       dispatch(updateVideo(res.videoProgress));
  //     }
  //   };
  //   progressUpdate();
  // }, [watchTime]);

  // useEffect(() => {
  //   if (courseProgress) {
  //     dispatch(setVideos(courseProgress?.data?.courseProgress));
  //   }
  // }, [courseProgress]);

  // Force video player to remount when videoUrl changes
  const videoPlayerKey = videoUrl || "no-video";
  return (
    <div className="lg:mt-6 flex lg:flex-row flex-col">
      <div className="lg:mr-6 xl:mr-8 w-full lg:w-[70%]">
        <div className="h-[400px] rounded-md">
          {isLoading  ? (
            <SimpleLoader />
          ) : videoUrl ? (
            <VideoPlayer
              videoId={videoId}
              key={videoPlayerKey}
              source={videoUrl}
              poster={thumbnailUrl}
              setWatchTime={setWatchTime}
              watchTime={watchTime}
            />
          ) : (
            // <div className='flex items-center justify-center h-full'>
            //   <p className="text-red-500 font-bold text-2xl">Can&apos;t Play Video</p>
            // </div>
            <SimpleLoader />
          )}
        </div>
        <div className="my-[20px] px-4 lg:px-0">
          <VideoDescription
            downloadResource={data?.data?.video?.resource}
            downloadAssignment={data?.data?.video?.assignment}
            videoId={videoId}
            title={data?.data?.video?.title}
            description={data?.data?.video?.description}
          />
        </div>

        {videoId && (
          <div className="px-4 lg:px-0">
            <Comments videoId={videoId} />
          </div>
        )}
      </div>
      <div className="lg:my-0 lg:w-[30%] px-4 lg:px-0 mt-8 lg:mt-0 rounded-md">
        <PlayerSidebar />
      </div>
    </div>
  );
};

export default VideoDashboard;
