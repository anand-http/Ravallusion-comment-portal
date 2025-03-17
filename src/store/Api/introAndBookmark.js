import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Use "/react"

export const introAndBookmarkApi = createApi({
    reducerPath: "introAndBookmarkApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),


    tagTypes: ["Bookmark"],
    endpoints: (builder) => ({
        getIntroductory: builder.query({
            query: () => "video/introductory-videos",
        }),
        getVideo: builder.query({
            query: (videoId) => `video/${videoId}`,
        }),
        getBookmark: builder.query({
            query: () => "bookmark",
            providesTags: [{ type: "Bookmark", id: "LIST" }],
        }),
        addBookmark: builder.mutation({
            query: (body) => ({
                url: "bookmark",
                method: "POST",
                credentials: "include",
                body,
            }),
            invalidatesTags: [{ type: "Bookmark", id: "LIST" }],
        }),
        deleteBookmark: builder.mutation({
            query: ({ bookmarkedId }) => ({
                url: `bookmark/${bookmarkedId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: [{ type: "Bookmark", id: "LIST" }],
        }),
    }),
});

export const { useGetIntroductoryQuery,
    useGetVideoQuery, 
    useLazyGetVideoQuery,
    useGetBookmarkQuery,
    useAddBookmarkMutation,
    useDeleteBookmarkMutation } = introAndBookmarkApi; 
