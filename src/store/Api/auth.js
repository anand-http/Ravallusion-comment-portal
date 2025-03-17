import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),

    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (body) => ({
                url: "admin/staff/sign-in",
                method: "POST",
                body,
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "user/logout",
                method: "DELETE",
            })
        }),

    })
})


export const { useSigninMutation ,useLogoutMutation} = authApi;