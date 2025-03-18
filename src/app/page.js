import AuthNavbar from '@/components/loginSignupFlow/AuthNavbar';
import Login from '@/components/loginSignupFlow/Login';
import React from 'react';

const page = () => {
  return (
    <div className='relative flex items-center justify-center h-screen w-full px-3 md:px-0'>
      <AuthNavbar/>
      <Login/>
    </div>
  )
}

export default page;