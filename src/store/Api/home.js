import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const homeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),

    endpoints: (builder) => ({
        getPlanData: builder.query({
            query: () => `content/plan`
        }),

    })
})


export const {
    useGetPlanDataQuery,
} = homeApi;