import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showProfileCard: false,
  subDetail: false,
  introductoryVideosCount: 0,
  bookmarkCount: 0,
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
    setShowProfileCard: (state) => {
      state.showProfileCard = !state.showProfileCard;
    },
    setSubDetail: (state, actions) => {
      state.subDetail = actions.payload;
    },
    setIntroductoryVideoscount: (state, actions) => {
      state.introductoryVideosCount = actions.payload;
    },
    setBookmarkCount: (state, actions) => {
      state.bookmarkCount = actions.payload;
    },
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
  setShowProfileCard, setSubDetail, setIntroductoryVideoscount,
  setBookmarkCount, setSubmoduleId } = generalSlice.actions

export default generalSlice.reducer