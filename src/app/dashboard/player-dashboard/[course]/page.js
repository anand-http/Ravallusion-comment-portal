import PageLoader from '@/components/common/PageLoader'
import VideoDashboard from '@/components/dashboard/VideoDashboard'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div className='h-screen w-full'>
      <Suspense fallback={<PageLoader />}>
        <VideoDashboard />
      </Suspense>
    </div>
  )
}

export default page;