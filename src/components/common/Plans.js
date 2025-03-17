"use client";

import { useEffect, useState } from "react";
import CustomSkeleton from "./CustomSkeleton";
import { ArrowRight, Check } from "lucide-react";
import { DevicesIcon, VideoIcon } from "@/lib/svg_icons";
import { CustomButton, GlowButton } from "./CustomButton";
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux";
import { setSubDetail } from "@/store/slice/general";
import { handleClick } from "@/lib/rajorpayPayment";
import Cookies from "js-cookie";


// const plans = [
//   {
//     id: 1,
//     heading: "BEGINNER",
//     watch: "Watch on 1 device",
//     access: "Access to all content",
//     quality: "Standard FHD quality",
//     devices: "Watch on Laptop, Mobile, Tab and ipad",
//     price: "5999",
//     validity: "One year validity",
//   },
//   {
//     id: 2,
//     heading: "ADVANCED",
//     watch: "Watch on 1 device",
//     access: "Access to all content",
//     quality: "Standard FHD quality",
//     devices: "Watch on Laptop, Mobile, Tab and ipad",
//     price: "9999",
//     validity: "One year validity",
//   },
// ];


const Plans = ({ plans, showSkeleton = true }) => {


  // console.log(plans);
  const dispatch = useDispatch();
  const router = useRouter();

  const [count, setCount] = useState(1);

  useEffect(() => {
    const updateCountBasedOnScreenSize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 770) {
        setCount(1);
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
  });

  const getValidity = (daysInSeconds) => {
    const days = daysInSeconds / (60 * 60 * 24);
    switch (days) {
      case 365:
        return "One year validity";
      case 180:
        return "Six months validity";
      case 730:
        return "Two years validity";
      default:
        break;
    }
  };


  return (
    <div className="flex-grow flex justify-center relative ">
      {showSkeleton && (
        <>
          <CustomSkeleton
            count={count}
            className="absolute -left-[1rem] md:-left-[4.5rem]  !w-[10%] sm:!w-[25%] md:!w-[12%] lg:!w-[23%]   !h-full"
            skeletonClass="skeleton-left"
          />
          <CustomSkeleton
            count={count}
            className="absolute -right-[1rem] md:-right-[4.5rem] !w-[10%] sm:!w-[25%]  md:!w-[12%] lg:!w-[23%] !h-full"
            skeletonClass="skeleton-right"
          />
        </>
      )}

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 2xl:gap-8">

        <div className="!w-[70vw] sm:!w-[296px] 2xl:!w-[22rem] !h-[438px] 2xl:!h-[31rem] bg-[#131A26] rounded-2xl  py-[30px] 2xl:py-9 flex flex-col plans-card">
          <h1 className="text-lg 2xl:text-xl pb-[30px] px-4 font-semibold border-b-[1px] border-gray-500 2xl:px-6 2xl:pb-9 ">
            {plans[0].plan_type}
          </h1>
          <div className="py-[30px] px-4 flex flex-col 2xl:px-6 2xl:py-9 2xl:gap-6  gap-4  items-start">
            <div className="flex gap-7 text-xs items-center 2xl:gap-9 2xl:text-sm ">
              <span className="text-[9.99px] font-bold border-2 py-[3px] 2xl:py-0 px-[5px] rounded-2xl ">
                X 1
              </span>
              {/* <span>{plans[0].watch}</span> */}
              <span>Watch on 1 device</span>
            </div>
            <div className="flex gap-7 text-xs items-center 2xl:gap-9 2xl:text-sm ">
              <Check className="border-2 rounded-full p-1" size={27} />
              {/* <span>{plans[0].access}</span> */}
              <span>Access to all content</span>
            </div>
            <div className="flex gap-7 text-xs items-center 2xl:gap-9 2xl:text-sm ">
              <div className="relative w-fit">
                <VideoIcon />
                <span className="absolute inset-0 text-[4.667px] top-[1px] left-[5px] 2xl:text-[5px] 2xl:top-[0.1px]">
                  FHD
                </span>
              </div>
              {/* <span>{plans[0].quality}</span> */}
              <span>Standard FHD quality</span>
            </div>
            <div className="flex gap-7 text-xs items-center 2xl:gap-9 2xl:text-sm pr-2">
              <DevicesIcon />
              {/* <span>{plans[0].devices}</span> */}
              <span>Watch on Laptop, Mobile, Tab and ipad</span>
            </div>
          </div>

          {/* <CustomButton onClick={() => router.push(`/login?plan=${plans[0].id}`)} className="!px-4 !py-10  !text-base !rounded-3xl !mt-[30px] !mx-4 !flex-row !justify-between 2xl:!px-5 2xl:!py-11 2xl:!text-lg 2xl:!mx-5   "> */}
          <CustomButton
            onClick={() => {
              handleClick(plans[0].inr_price, plans[0]._id)
            }
            }

            className="!px-4 !py-10  !text-base !rounded-3xl !mt-[30px] !mx-4 !flex-row !justify-between 2xl:!px-5 2xl:!py-11 2xl:!text-lg 2xl:!mx-5 group">
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-semibold 2xl:text-2xl">
                &#8377; {plans[0].inr_price}
              </h1>
              <div className="text-[10px] 2xl:text-sm text-gray-400 font-semibold group-hover:text-white">
                {getValidity(plans[0].validity)}
              </div>
            </div>
            <ArrowRight className="!w-6 !h-6 2xl:!w-7 2xl:!h-7 !p-0" />
          </CustomButton>

        </div>


        <div className="!w-[70vw]  sm:!w-[296px] 2xl:!w-[22rem] !h-[438px] 2xl:!h-[31rem] bg-[#131A26] rounded-2xl  py-[30px] 2xl:py-9 flex flex-col plans-card">
          <h1 className="text-lg 2xl:text-xl pb-[30px] px-4 font-semibold border-b-[1px] 2xl:px-5 border-gray-500 bg-gradient-to-l from-[#C99BFD]/80 to-[var(--neon-purple)] bg-clip-text text-transparent 2xl:pb-9">
            {plans[1].plan_type}
          </h1>
          <div className="py-[30px] px-4 flex flex-col 2xl:px-6 2xl:py-9 2xl:gap-6  gap-4 items-start">
            <div className="flex gap-7 text-xs items-center 2xl:gap-9 2xl:text-sm ">
              <span className="text-[9.99px] font-bold border-2 py-[3px] 2xl:py-0 px-[5px] rounded-2xl ">
                X 1
              </span>
              {/* <span>{plans[1].watch}</span> */}
              <span>Watch on 1 device</span>
            </div>
            <div className="flex gap-7 text-xs items-center 2xl:gap-9 2xl:text-sm ">
              <Check className="border-2 rounded-full p-1" size={27} />
              {/* <span>{plans[1].access}</span> */}
              <span>Access to all content</span>
            </div>
            <div className="flex gap-7 text-xs items-center 2xl:gap-9 2xl:text-sm ">
              <div className="relative w-fit">
                <VideoIcon />
                <span className="absolute inset-0 text-[4.667px] top-[1px] left-[5px] 2xl:text-[5px] 2xl:top-[0.5px]">
                  FHD
                </span>
              </div>
              {/* <span>{plans[1].quality}</span> */}
              <span>Standard FHD quality</span>
            </div>
            <div className="flex gap-7 text-xs items-center 2xl:gap-9 2xl:text-sm pr-2">
              <DevicesIcon />
              {/* <span>{plans[1].devices}</span> */}
              <span>Watch on Laptop, Mobile, Tab and ipad</span>
            </div>
          </div>
          {/* <GlowButton onClick={() => router.push(`/login?plan=${plans[1].id}`) } className="!px-4 !py-10  !text-base !rounded-3xl !mt-[30px] !mx-4 !flex-row !justify-between 2xl:!px-5 2xl:!py-11 2xl:!text-lg 2xl:!mx-5  "> */}
          <GlowButton
            onClick={() => handleClick(plans[1].inr_price, plans[1]._id)}
            className=" group !px-4 !py-10  !text-base !rounded-3xl !mt-[30px] !mx-4 !flex-row !justify-between 2xl:!px-5 2xl:!py-11 2xl:!text-lg 2xl:!mx-5  ">
            <div className="flex flex-col items-start">
              <h1 className="text-xl 2xl:text-2xl font-semibold">
                &#8377; {plans[1].inr_price}
              </h1>
              <div className="text-[10px] 2xl:text-sm text-[#D8D8D8] group-hover:text-white font-semibold ">
                {getValidity(plans[1].validity)}
              </div>
            </div>
            <ArrowRight className="!w-6 !h-6 2xl:!w-7 2xl:!h-7 !p-0" />
          </GlowButton>
        </div>

      </div>
    </div>
  );
};
export default Plans;
