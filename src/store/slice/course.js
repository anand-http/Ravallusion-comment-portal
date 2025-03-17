import { mapToObject } from "@/lib/functions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: {},
  videos: {},
  
};
export const course = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      const courseData = action.payload;
      state.course = courseData;
      console.log("video progress course", courseData);
    },

    setVideos: (state, action) => {
      const videoProgress = action.payload;

      if (!state.course?._id) {
        return;
      }
      console.log("video progress: ", videoProgress);
      const progressMap = new Map();

      let sequence = 0;
      state.course.modules?.forEach((module) => {
        module.submodules?.forEach((submodule) => {
          submodule.videos?.forEach((video) => {
            sequence++;
            progressMap.set(video._id, {
              sequence: sequence,
            });
          });
        });
      });

      videoProgress?.forEach((item) => {
        const existingVideo = progressMap.get(item.video);
        if (existingVideo) {
          existingVideo.percentageWatched = item.percentageWatched;
          existingVideo.lastPosition = item.lastPosition;
          existingVideo.isCompleted = item.isCompleted;
        }
      });

      state.videos = mapToObject(progressMap);
    },

    updateVideo: (state, action) => {
      const videoProgress = action.payload;
      const existingVideo = state.videos[videoProgress.video];
      if (existingVideo) {
        existingVideo.percentageWatched = videoProgress.percentageWatched;
        existingVideo.lastPosition = videoProgress.lastPosition;
        existingVideo.isCompleted = videoProgress.isCompleted;
      }
    },
  },
});

export const { setVideos, setCourse, updateVideo } = course.actions;

export default course.reducer;
