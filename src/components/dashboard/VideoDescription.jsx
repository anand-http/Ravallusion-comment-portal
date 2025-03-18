"use client"
import { BookMark} from '@/lib/svg_icons';
import React, { useEffect, useState, useCallback } from 'react';
// import { useAddBookmarkMutation, useGetBookmarkQuery } from '@/store/Api/introAndBookmark';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const VideoDescription = ({ videoId, title, description, downloadResource, downloadAssignment }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);

  const truncatedText = description?.length > 100
    ? description?.slice(0, 100) + "..."
    : description;
 
  return (
    <div className="text-white">

      <div className="flex justify-between mb-3">
        <h1 className="text-xl font-semibold">{title}</h1>  
      </div>

      <div className="mb-4">
        <p className="text-sm">
          {isExpanded ? (
            description
          ) : (
            truncatedText
          )}
          {description?.length > 100 && (
            <span
              onClick={handleToggle}
              className="text-orange-300 cursor-pointer font-semibold"
            >
              {isExpanded ? " Read less" : " Read more"}
            </span>
          )}
        </p>

      </div>

    </div>
  );
};

export default VideoDescription;  