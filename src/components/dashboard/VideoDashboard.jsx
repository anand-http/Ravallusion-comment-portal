"use client";

import { SimpleLoader } from "@/components/common/LoadingSpinner";
import Comments from "@/components/dashboard/Comments";
import PlayerSidebar from "@/components/dashboard/PlayerSidebar";
import VideoDescription from "@/components/dashboard/VideoDescription";
import VideoPlayer from "@/components/dashboard/VideoPlayer";
import {
  useGetVideoQuery,
} from "@/store/Api/introAndBookmark";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const VideoDashboard = () => {
  const searchParams = useSearchParams();
  const route = useRouter();
  const id = searchParams.get("videoId");
  const {  firstVideoId } = useSelector((state) => state.general);


  const [videoUrl, setVideoUrl] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const [watchTime, setWatchTime] = useState(0);


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
