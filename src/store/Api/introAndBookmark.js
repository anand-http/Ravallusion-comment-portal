import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Use "/react"

export const introAndBookmarkApi = createApi({
    reducerPath: "introAndBookmarkApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),


    endpoints: (builder) => ({
        getVideo: builder.query({
            query: (videoId) => `video/${videoId}`,
        })
    }),
});

export const {
    useGetVideoQuery,
    useLazyGetVideoQuery } = introAndBookmarkApi; 
