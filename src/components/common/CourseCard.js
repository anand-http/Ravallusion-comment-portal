import { Like, Views } from "@/lib/svg_icons";
import Image from "next/image";
import Card from "./Card";
import VideoPlayer from "../dashboard/VideoPlayer";
import CustomDialog from "./CustomDialog";
import { useState } from "react";

const CourseCard = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { title, description, videoUrl, thumbnailUrl } = course.video;
  console.log(videoUrl);

  return (
    <Card className={"group cursor-pointer hover:scale-95 hover:rotate-1 relative h-[310px]"} onClick={() => setIsOpen(true)}>
      <Image
        src={thumbnailUrl}
        alt={title}
        width={1000}
        height={1000}
        className="w-full h-40 2xl:!h-48 object-cover rounded-2xl"
      />

      <CustomDialog open={isOpen} close={() => setIsOpen(false)}>
        <div className="flex items-center justify-center ">

          <div className="w-[300px] md:w-[600px] h-auto">
            <VideoPlayer source={videoUrl} poster={thumbnailUrl} />
          </div>
        </div>
      </CustomDialog>


      <div className="flex flex-col gap-2 2xl:gap-4 h-auto">

        <div>
          <div className="h-auto">
            <h3 className="text-lg 2xl:text-2xl font-bold leading-tight line-clamp-2">{title}</h3>
          </div>

          <div className="mt-2">
            <p className="text-gray-400 text-xs 2xl:text-base line-clamp-2">{description}</p>
          </div>
        </div>


        <div className="absolute bottom-3">
          <span className="flex items-center space-x-1 text-xs 2xl:text-sm text-gray-400">
            <Views />
            <span>{"270k"}</span>
          </span>
        </div>




        {/* <div className="flex items-center gap-2  absolute bottom-0">
          <span className="flex items-center space-x-1 text-xs 2xl:text-sm ">
            <Views />
            <span>{"270k"}</span>
          </span>
         <span className="flex items-center space-x-1">
            <Like />
            <span>{likes}</span>
          </span> 
      </div>
      */}

      </div>

    </Card >
  );
};

export default CourseCard;
