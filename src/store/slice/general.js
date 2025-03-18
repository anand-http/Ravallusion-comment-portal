import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  submoduleId: null,
  courseId: null,
  updatedPercentageWatched: 0,
  videoIdOfCurrentVideo: null,
  firstVideoId: null
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSubmoduleId: (state, action) => {
      state.submoduleId = action.payload
    },
    setCourseId: (state, action) => {
      state.courseId = action.payload
    },
    setUpdatedPercentageWatched: (state, action) => {
      state.updatedPercentageWatched = action.payload
    },
    setVideoIdOfcurrentVideo: (state, action) => {
      state.videoIdOfCurrentVideo = action.payload
    },
    setFirstVideoId: (state, action) => {
      state.firstVideoId = action.payload
    },
  },
})

export const { setVideoIdOfcurrentVideo,
  setUpdatedPercentageWatched,
  setCourseId,
  setFirstVideoId,
  setSubmoduleId } = generalSlice.actions

export default generalSlice.reducer