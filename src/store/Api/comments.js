import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentsApi = createApi({
    reducerPath: "commentsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),

    tagTypes: ["comments"],
    endpoints: (builder) => ({
        getVideoComments: builder.query({
            query: (videoId) => `comment/video/${videoId}`,
            providesTags: (_, __, videoId) => [{ type: "comments", id: videoId }],
        }),
        createComment: builder.mutation({
            query: ({ body, videoId }) => ({
                url: `comment/video/${videoId}`,
                method: "POST",
                body,
            }),
            invalidatesTags: (_, __, { videoId }) => [{ type: "comments", id: videoId }]
        }),
        createReply: builder.mutation({
            query: ({ body, commentId }) => ({
                url: `comment/${commentId}/reply`,
                method: "PUT",
                body,
            }),
            async onQueryStarted({ commentId,videoId }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        commentsApi.util.invalidateTags([
                            { type: "comments", id: videoId },
                            { type: "comments", id: commentId }])
                    );
                } catch (error) {
                    console.error("Error replying to comment:", error);
                    toast.error(error?.data?.message || "Failed to reply to comment");
                }
            }
        }),

        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `comment/${commentId}`,
                method: "DELETE",
            }),
            async onQueryStarted(commentId, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        commentsApi.util.invalidateTags([{ type: "comments" }])
                    );
                } catch (error) {
                    console.error("Error deleting comment:", error);
                    toast.error(error?.data?.message || "Failed to delete comment");
                }
            }
        }),

    }),
})

export const { useDeleteCommentMutation, useCreateReplyMutation, useGetVideoCommentsQuery, useCreateCommentMutation } = commentsApi;