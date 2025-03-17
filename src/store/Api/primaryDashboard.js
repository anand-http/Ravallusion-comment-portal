import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const primaryDashboardApi = createApi({
    reducerPath: "primaryDashboardApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
    endpoints: (builder) => ({
        getCarouselImg: builder.query({
            query: () => `dashboard/carousal`
        }),
        getModuleOnPrimaryDashboard: builder.query({         
            query: () => `dashboard/content`
        }),
    })
})

export const { useGetCarouselImgQuery,useGetModuleOnPrimaryDashboardQuery } = primaryDashboardApi;