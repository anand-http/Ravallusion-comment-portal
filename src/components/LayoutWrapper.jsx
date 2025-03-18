'use client'
import React from 'react'
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

const LayoutWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <ToastContainer />
      {children}
    </Provider >
  )
}
export default LayoutWrapper;