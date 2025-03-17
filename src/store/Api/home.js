import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const homeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),

    endpoints: (builder) => ({
        getLandingPageData: builder.query({
            query: () => `user/home`
        }),
        getHeroSection: builder.query({
            query: () => `content/hero-section`
        }),
        getLandingCarousel: builder.query({
            query: () => `content/carousal`
        }),
        getLatestTutorial: builder.query({
            query: () => `content/latest-tutorials`
        }),
        getMentorData: builder.query({
            query: () => `content/mentor`
        }),
        getCurriculum: builder.query({
            query: () => `content/mentor/curriculum`
        }),
        getModule: builder.query({
            query: () => `module`
        }),
        getPlanData: builder.query({
            query: () => `content/plan`
        }),
        getCertificate: builder.query({
            query: () => `content/certificate`
        }),
        getFaq: builder.query({
            query: () => `content/faq`
        }),

        getStaticData: builder.query({
            query: () => `content/page`
        }),
        getPricingPolicy: builder.query({
            query: () => `content/page/pricing-policy`
        }),
        getTermsAndCondition: builder.query({
            query: () => `content/page//terms-and-conditions`
        }),
        getPrivacyPolicy: builder.query({
            query: () => `content/page/privacy-policy`
        }),
        getRefundPolicy: builder.query({
            query: () => `content/page/refund-policy`
        }),
        getAboutUs: builder.query({
            query: () => `content/page/about-us`
        })
    })
})


export const { useGetLandingPageDataQuery,
    useGetStaticDataQuery,
    useGetCertificateQuery,
    useGetFaqQuery,
    useGetLandingCarouselQuery,
    useGetLatestTutorialQuery,
    useGetHeroSectionQuery,
    useGetModuleQuery,
    useGetCurriculumQuery,
    useGetMentorDataQuery,
    useGetPlanDataQuery,
    useGetAboutUsQuery,
    useGetPricingPolicyQuery,
    useGetPrivacyPolicyQuery,
    useGetTermsAndConditionQuery,
    useGetRefundPolicyQuery,

} = homeApi;