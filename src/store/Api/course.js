import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),


    endpoints: (builder) => ({
        getSubscribedPlanCourse: builder.query({
            query: (planId) => `course/getSubscribedPlanCourse/${planId}`
        }),
        assignmentSubmit : builder.mutation({
            query: (body) => ({
                url: "submitted-assignment",
                method: "POST",
                credentials: "include",
                body,
            }),
        }),
        uploadFile: builder.mutation({
            query: (body) => ({
                url: "submitted-assignment/upload-answer",
                method: "POST",
                credentials: "include",
                body,
            }),
        })
       
    }),
})

export const { useGetSubscribedPlanCourseQuery,useAssignmentSubmitMutation,useUploadFileMutation} = courseApi;