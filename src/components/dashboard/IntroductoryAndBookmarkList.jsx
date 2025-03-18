import { OrangePlay } from "@/lib/svg_icons";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const LessonCard = ({
  videoId,
  thumbnail,
  title,
  description,
  duration,
  isplaying,
  bookmark = false,
  onPlay,
}) => {
  const route = useRouter();
  const [progress, setProgress] = useState(0);

  // const [deleteBookmark] = useDeleteBookmarkMutation();
  const { courseId, updatedPercentageWatched, videoIdOfCurrentVideo } =
    useSelector((state) => state.general);

  // const videos = useSelector((state) => state.course.videos);

  // const MapVideos = objectToMap(videos);
  // const currentVideoData = MapVideos.get(videoId);

  // const currentVideoIndex = [...MapVideos.keys()].indexOf(videoId);
  // const previousVideoData = [...MapVideos.values()][currentVideoIndex - 1];
  // console.log("Previous Video Data", previousVideoData);

  // const isVideoUnlocked =
  //   currentVideoData?.isCompleted || previousVideoData?.isCompleted;

  // const { data: courseProgress } = useGetCourseProgressQuery(courseId);

  // useEffect(() => {
  //   const foundVideo = courseProgress?.data?.courseProgress?.find(
  //     (video) => video.video === videoId
  //   );
  //   console.log(foundVideo);
  //   if (foundVideo) {
  //     setProgress(foundVideo?.percentageWatched);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (updatedPercentageWatched && videoId === videoIdOfCurrentVideo) {
  //     setProgress(updatedPercentageWatched);
  //   }
  // }, [updatedPercentageWatched, videoId, videoIdOfCurrentVideo]);

  const path = usePathname();
  const fetchVideo = () => {
    const level = path.includes("beginner") ? "beginner" : "advanced";
    route.push(`/player-dashboard/${level}?videoId=${videoId}`);
    onPlay();
  };
  // const removeBookmark = async () => {
  //   try {
  //     const res = await deleteBookmark({ bookmarkedId });
  //     toast(res.message);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div
      className="flex gap-x-3 items-center cursor-pointer px-3"
    >
      <div
        className={`rounded-t-xl rounded-b-lg w-36 h-20 relative`}
        onClick={fetchVideo}
      >

        <Image
          src={thumbnail}
          alt="video"
          fill
          className={`rounded-t-xl rounded-b-lg ${isplaying && "brightness-50"
            }`}
        />
        <span
          style={{
            background: "rgba(0, 0, 0, 0.50)",
            backdropFilter: "blur(5.400000095367432px)",
          }}
          className="px-1 py-[2px] text-[10px] absolute top-2 right-2 rounded-sm "
        >
          {duration || "00:00:00"}
        </span>



        {isplaying && (
          <span className="absolute font-semibold text-orange-300 text-[10px] bottom-2 left-1 flex gap-x-1 items-center">
            <span>
              <OrangePlay />
            </span>{" "}
            Now Playing
          </span>
        )}

        {/* Progress Bar */}
        {/* <div className="absolute rounded-t-xl z-50 bottom-0 w-full h-[6px] bg-gray-300 rounded-full mt-1 overflow-hidden">
          <div
            className="h-full bg-orange-300"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div> */}

      </div>

      <div className="flex-grow w-32">
        <h1 className="text-xs font-normal mb-1 truncate whitespace-nowrap">
          {isplaying ? (
            <span className="text-sm text-orange-300">Opening file</span>
          ) : (
            title
          )}
        </h1>

        <p className="text-[10px] truncate whitespace-nowrap">
          {isplaying ? "" : description}
        </p>
      </div>
      {/* {bookmark && (
        <button onClick={removeBookmark}>
          <Bookmarked width="16" height="16" />
        </button>
      )} */}
    </div>
  );
};
