import Image from "next/image";
import { useEffect, useState } from "react";
import { CrossIcon, MinusIcon } from "@/lib/svg_icons";
import { LessonCard } from "./IntroductoryAndBookmarkList";
import { motion } from 'framer-motion';
import Link from "next/link";
import { Button } from "../ui/button";
import { CustomButton } from "../common/CustomButton";
import { SimpleLoader } from "../common/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import CourseSkeletonLoader from "../common/CourseSkeletonLoader";

const CourseModuleList = ({ course, isLoading, playingVideoId, setPlayingVideoId }) => {
    const modules = course?.modules;

    const heading = course?.title || "Course";

    return (
        <>
            <h1 className='text-lg font-semibold mb-7 px-3'>{heading}</h1>

            <div className='flex flex-col gap-y-7'>

                {
                    isLoading ? <CourseSkeletonLoader /> :

                        modules && modules.map((items, i) => (
                            <CourseCard
                                playingVideoId={playingVideoId}
                                setPlayingVideoId={setPlayingVideoId}
                                title={items.name} videoCount={items.videoCount || 0} submodules={items.submodules} img={items.thumbnailUrl} key={i} />
                        ))
                }

            </div>
        </>
    )

}


const CourseCard = ({ title, img, videoCount, submodules, playingVideoId, setPlayingVideoId }) => {
    // console.log("subsmodule",submodules)
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            {!isExpanded ? (
                <div
                    className="flex gap-x-3 px-3 items-center cursor-pointer"
                    onClick={handleExpand}
                >
                    <div className="rounded-xl w-40 h-20 relative">
                        <Image
                            src={img}
                            alt="video png"
                            fill
                            style={{ borderRadius: "12px", objectFit: "cover" }}
                        />
                        <span
                            style={{
                                background: "rgba(0, 0, 0, 0.50)",
                                backdropFilter: "blur(5.4px)",
                            }}
                            className="px-1 py-[2px] text-[10px] absolute top-2 right-2 rounded-sm"
                        >
                            {videoCount} videos
                        </span>
                    </div>

                    <div className="flex-grow w-32">
                        <h1 className="text-xs font-normal mb-1 ">{title}</h1>
                        <p className="text-[10px] truncate whitespace-nowrap">
                            {videoCount} videos
                        </p>
                    </div>

                </div>
            ) : (
                <CourseCardExpand
                    title={title}
                    img={img}
                    submodules={submodules}
                    videoCount={videoCount}
                    onCollapse={handleExpand}
                    playingVideoId={playingVideoId}
                    setPlayingVideoId={setPlayingVideoId}
                />
            )}
        </>
    );
};


const CourseCardExpand = ({ title, img, videoCount, submodules, onCollapse, setPlayingVideoId, playingVideoId }) => {
    const params = useSearchParams();
    const videoId = params.get("videoId");
    const [dropdownStates, setDropdownStates] = useState({});

    useEffect(() => {
        if (videoId) {
            setPlayingVideoId(videoId);
        }
    }, [videoId])

    const toggleDropdown = (index) => {

        setDropdownStates((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <div className="flex flex-col gap-y-2">
            {/* module heading */}

            <div
                style={{ background: "linear-gradient(180deg, rgba(201, 155, 253, 0.49) 0%, rgba(133, 116, 246, 0.49) 100%)" }}
                className="flex gap-x-2 items-center cursor-pointer px-3 py-2"
            >
                <div className="rounded-lg w-16 h-12 relative">
                    <Image
                        src={img}
                        alt="video png"
                        fill
                        style={{ borderRadius: "16px", objectFit: "cover" }}
                    />
                </div>

                <div className="flex-grow">
                    <h1 className="text-xs font-normal mb-1 ">{title}</h1>
                    <p className="text-[8px]">{videoCount} videos</p>
                </div>

                <button
                    onClick={onCollapse}
                    className="ml-auto"
                >
                    <CrossIcon />
                </button>
            </div>



            {/* Submodule */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
            >
                {submodules &&
                    submodules.map((item, i) => (

                        <div key={item._id} className="flex flex-col">
                            {dropdownStates[item._id] ? (

                                // Submodule headings
                                <div className="flex gap-x-2 my-4 items-center cursor-pointer px-2 pb-2 border-b border-gray-700">

                                    <div className="rounded-lg w-14 h-10 relative">
                                        <Image
                                            // src={item.thumbnailUrl}
                                            src={item.thumbnailUrl}
                                            alt="video png"
                                            fill
                                            style={{ borderRadius: "8px", objectFit: "cover" }}
                                        />
                                    </div>

                                    <div className="flex-grow w-32">
                                        <h1 className="text-xs mb-1">{item.name}</h1>
                                        <p className="text-[8px] text-gray-300 ">{item.videoCount || 0} videos</p>
                                    </div>

                                    <button
                                        onClick={() => toggleDropdown(item._id)}
                                        className="text-xs text-red-500 underline ml-auto"
                                    >
                                        <MinusIcon />
                                    </button>
                                </div>
                            ) : (

                                //Submodule 
                                <div
                                    className="flex gap-x-3 px-3 items-center cursor-pointer my-3"
                                    onClick={() => toggleDropdown(item._id)}
                                >
                                    <div className="bg-blue-400 rounded-xl w-40 h-20 relative">
                                        <Image
                                            src={item.thumbnailUrl}
                                            alt="video png"
                                            fill
                                            style={{ borderRadius: "12px", objectFit: "cover" }}
                                        />
                                        <span
                                            style={{
                                                background: "rgba(0, 0, 0, 0.50)",
                                                backdropFilter: "blur(5.4px)",
                                            }}
                                            className="px-1 py-[2px] text-[10px] absolute top-2 right-2 rounded-sm"
                                        >
                                            {item.videoCount || 0} videos
                                        </span>
                                    </div>

                                    <div className="flex-grow w-32">
                                        <h1 className="text-xs font-normal mb-1">
                                            {item.name}
                                        </h1>
                                        <p className="text-[10px] truncate whitespace-nowrap">
                                            {item.videoCount || 0} videos
                                        </p>
                                    </div>
                                </div>
                            )}


                            {dropdownStates[item._id] && (
                                // Lessons to watch 
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col gap-y-3"
                                >
                                    {item?.videos &&
                                        item?.videos.map((lesson, j) => (
                                            <LessonCard
                                                key={j}
                                                isplaying={playingVideoId === lesson?._id}
                                                onPlay={() => setPlayingVideoId(lesson?._id)}
                                                videoId={lesson._id}
                                                title={lesson.title || "I am Title"}
                                                thumbnail={lesson?.thumbnailUrl}
                                                duration={`${String(lesson?.duration?.hours ?? 0).padStart(2, "0")}:${String(lesson?.duration?.minutes ?? 0).padStart(2, "0")}:${String(lesson?.duration?.seconds ?? 0).padStart(2, "0")}`}
                                            />

                                        ))}
                                </motion.div>
                            )}
                        </div>
                    ))}
            </motion.div>
        </div >
    );
};



export default CourseModuleList;