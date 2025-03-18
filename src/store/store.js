import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./slice/general";
import { authApi } from "./Api/auth";
import { setupListeners } from "@reduxjs/toolkit/query";
import { homeApi } from "./Api/home";
import { introAndBookmarkApi } from "./Api/introAndBookmark";
import { courseApi } from "./Api/course";
import { commentsApi } from "./Api/comments";
// import { videoProgressApi } from "./Api/videoProgress";
// import { course } from "./slice/course";

export const store = configureStore({
  reducer: {
    general: generalReducer,

    [authApi.reducerPath]: authApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [introAndBookmarkApi.reducerPath]: introAndBookmarkApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(homeApi.middleware)
      .concat(introAndBookmarkApi.middleware)
      .concat(courseApi.middleware)
      .concat(commentsApi.middleware)
});

setupListeners(store.dispatch);
