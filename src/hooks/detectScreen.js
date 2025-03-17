"use client"
import { useState, useEffect } from "react";

function useSmallScreen() {
    const [isClient, setIsClient] = useState(false)

    const [isSmallScreen, setIsSmallScreen] = useState();

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        isClient && setIsSmallScreen(window.innerWidth <= 768)
    }, [isClient])

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return isSmallScreen;
}

export default useSmallScreen;