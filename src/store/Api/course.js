import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),


    endpoints: (builder) => ({
        getSubscribedPlanCourse: builder.query({
            query: (planId) => `course/getSubscribedPlanCourse/${planId}`
        })
    }),
})

export const { useGetSubscribedPlanCourseQuery } = courseApi;