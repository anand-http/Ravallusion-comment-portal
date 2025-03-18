"use client";

import { BulbIcon, CrownIcon, EllipseOfSearch, Gear, HamburgerMenu, Logout, NeonElipse } from '@/lib/svg_icons'
import { ArrowRight, ChevronDown, ChevronUp, X, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { setShowProfileCard } from '@/store/slice/general';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '@/store/Api/auth';
import { toast } from 'react-toastify';


const DashboardNavbar = () => {

  const [show, setShow] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className={`rounded-none md:rounded-xl  bg-[#181F2B] w-full p-4 lg:px-8 lg:py-4 flex items-center justify-between relative`}>
      {openSidebar && <SideBar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />}
      <h1 className='text-2xl italic font-bold'>Ravallusion</h1>

      <div className='flex gap-x-2 items-center'>

        <BoxComponent show={show} icon={<CrownIcon />} title={"Advanced"} title1={"Photoshop"} title2={"Premier pro"} href={'/player-dashboard/advanced'} />


        <BoxComponent show={show} icon={<Gear />} title={"Beginner"} title1={"Photoshop"} title2={"Premier pro"} href={'/player-dashboard/beginner'} />

        <BoxComponent show={show} icon={<Logout />} title={"Logout"} isLogout={true} />

        <div onClick={() => setOpenSidebar(true)} className='p-3 border relative cursor-pointer lg:hidden border-[var(--neon-purple)] bg-[#040C19] '>
          <EllipseOfSearch />
          <HamburgerMenu width={24} />
        </div>

      </div>
    </div>
  )
}

const SideBar = ({ openSidebar, setOpenSidebar }) => {
  const sidebarVariants = {
    open: {
      x: 0, // Sidebar slides into view
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
    closed: {
      x: "-100%", // Sidebar slides out of view
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };
  const show = false;
  const backdropVariants = {
    open: { opacity: 1, pointerEvents: "auto" },
    closed: { opacity: 0, pointerEvents: "none" },
  };
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
        initial="closed"
        animate={openSidebar ? "open" : "closed"}
        variants={backdropVariants}
        onClick={() => setOpenSidebar(false)}
      />

      <motion.div className="absolute bg-[var(--Surface)] w-72 pt-12 pb-8 px-4 h-screen top-0 left-0 z-20 lg:hidden"
        initial="closed"
        animate={openSidebar ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-2xl italic font-bold">Ravallusion</h1>

          <div onClick={() => setOpenSidebar(false)}>
            <X />
          </div>
        </div>

        <div className='flex flex-col gap-y-4'>
          <BoxComponentMobile href={"/player-dashboard/advanced"} show={show} icon={<CrownIcon />} title={"Advanced"} title1={"Photoshop"} title2={"Premier pro"} setOpenSidebar={setOpenSidebar}/>
          <BoxComponentMobile href={"/player-dashboard/beginner"} show={show} icon={<Gear />} title={"Beginner"} title1={"Photoshop"} title2={"Photoshop"} setOpenSidebar={setOpenSidebar}/>
          <BoxComponentMobile show={show} icon={<Logout />} title={"Logout"} isLogout={true}  />
        </div>
      </motion.div>
    </>
  )
}


const BoxComponent = ({ icon, title, isLogout, title1, title2, show, href }) => {
  const [isOpenBoxDropdown, setIsOpenBoxDropdown] = useState(false);
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const handleClick = async () => {
    if (isLogout) {
      try {
        const res = await logout().unwrap();
        if (res.success) {
          router.push('/');
        }
      } catch (error) {
        console.log(error)
        toast.error(error?.data?.message);
      }
    } else {
      setIsOpenBoxDropdown((prev) => !prev);
    }
  };

  return (

    <div className="relative hidden lg:block">
      <div
        onClick={handleClick}
        className={`px-4 py-3 flex flex-col bg-[#040C19] border-x border-t ${isOpenBoxDropdown ? '' : 'border-b'
          } border-[var(--neon-purple)] cursor-pointer relative`}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2 items-center">
            {icon}
            <span className="text-sm font-semibold">
              {show && !isOpenBoxDropdown ? "" : title}
            </span>
          </div>

          {isLogout ? (
            ""
          ) : (
            <div className="cursor-pointer ml-3">
              {isOpenBoxDropdown ? <ChevronUp /> : <ChevronDown />}
            </div>
          )}

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
            <NeonElipse />
          </div>
        </div>
      </div>

      {isOpenBoxDropdown && (
        <BoxDropdown
          href={href}
          title1={title1}
          title2={title2}
          setIsOpenBoxDropdown={setIsOpenBoxDropdown}
        />
      )}
    </div>
  );
};


const BoxComponentMobile = ({ setOpenSidebar, icon, title, isLogout, title1, title2, show, href }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  const [logout] = useLogoutMutation();

  const handleClick = async () => {
    if (isLogout) {
      try {
        const res = await logout().unwrap();
        if (res.success) {
          router.push('/');
        }
      } catch (error) {
        console.log(error)
        toast.error(error?.data?.message);
      }
    }
    else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className={`px-4 py-3 flex flex-col bg-[#040C19] border-x border-t ${isOpen ? '' : 'border-b'
          } border-[var(--neon-purple)] cursor-pointer relative`}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2 items-center">
            {icon}
            <span className="text-sm font-semibold">{show && !isOpen ? "" : title}</span>
          </div>
          {isLogout ? (
            ""
          ) : (
            <div className="cursor-pointer ml-3">
              {isOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
          )}
        </div>

        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center'>
          <NeonElipse />
        </div>

        {isOpen && (
          <BoxDropdown setIsOpenBoxDropdown={setIsOpen} title1={title1} title2={title2} href={href} setOpenSidebar={setOpenSidebar} />
        )}
      </div>
    </div>
  );
};

const BoxDropdown = ({ title1, title2, href, setOpenSidebar, setIsOpenBoxDropdown }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
    setIsOpenBoxDropdown(false);
    setOpenSidebar(false);

  }
  return (
    <motion.div
      className="absolute top-full left-0 right-0 w-full border-x border-b border-[var(--neon-purple)] bg-[#040C19] px-4 py-2 z-10 overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex flex-col gap-y-2">
        <button className="text-xs text-white flex justify-between items-center" onClick={handleClick}>
          {title1} <ArrowRight size={21} />
        </button>

        <button className="text-xs text-white flex justify-between items-center" onClick={handleClick}>
          {title2} <ArrowRight size={21} />
        </button>
      </div>
    </motion.div>
  );
};

export default DashboardNavbar;