import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const videoProgressApi = createApi({
  reducerPath: "videoProgressApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/video-progress" }),
  tagTypes: ["VideoProgress"],

  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (id) => `/course/${id}`,
      providesTags: [{ type: "VideoProgress", id: "LIST" }],
    }),

    getVideoProgress: builder.query({
      query: (id) => `/${id}`,
      providesTags: (_, __, id) => {
        const individualTag = [{ type: "VideoProgress", id: id }];
        return individualTag;
      },
    }),

    updateVideoProgress: builder.mutation({
      query: ({ id, watchTime }) => ({
        url: `/${id}`,
        method: "PUT",
        credentials: "include",
        body: { watchTime },
      }),
    }),
  }),
});

export const {
  useUpdateVideoProgressMutation,
  useGetVideoProgressQuery,
  useGetCourseProgressQuery,
} = videoProgressApi;
