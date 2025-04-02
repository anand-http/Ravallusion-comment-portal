import React from "react";

const CourseSkeletonLoader = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      {
        Array(2).fill(0).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-32 h-20 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="flex flex-col gap-2">
              <div className="w-32 h-4 bg-gray-700 rounded-md animate-pulse"></div>
              <div className="w-20 h-3 bg-gray-700 rounded-md animate-pulse"></div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default CourseSkeletonLoader;