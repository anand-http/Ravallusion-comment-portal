'use client'
import React, { useRef, useState } from 'react';

const OTPInput = ({ onComplete }) => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        
        if (!/^\d*$/.test(value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Keep only the last digit
        setOtp(newOtp);
        
        // Move to next input field if value exists
        if (value && index < otp.length - 1) {
            setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
        }
        
        // Check if all digits are filled
        if (newOtp.every(digit => digit !== "")) {
            onComplete && onComplete(newOtp.join(""));
        }
    };

    const handleKeyDown = (e, index) => {
        // Handle backspace
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                // If current input is empty and backspace is pressed,
                // move to previous input and clear its value
                const newOtp = [...otp];
                newOtp[index - 1] = "";
                setOtp(newOtp);
                inputRefs.current[index - 1]?.focus();
            } else {
                // Clear current input
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
        // Handle left arrow
        else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        // Handle right arrow
        else if (e.key === "ArrowRight" && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
        const digits = pastedData.replace(/\D/g, "").split("");
        
        const newOtp = [...otp];
        digits.forEach((digit, idx) => {
            if (idx < otp.length) newOtp[idx] = digit;
        });
        setOtp(newOtp);
        
        // Focus on the next empty input or the last input
        const nextEmptyIndex = newOtp.findIndex(digit => digit === "");
        const focusIndex = nextEmptyIndex === -1 ? otp.length - 1 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
        
        if (newOtp.every(digit => digit !== "")) {
            onComplete && onComplete(newOtp.join(""));
        }
    };

    return (
        <div className="flex space-x-2">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    className="outline-none w-10 h-10 md:w-12 md:h-12 text-center bg-[#091528] text-white border border-gray-400 rounded-md font-semibold"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    maxLength={1}
                    inputMode="numeric"
                    pattern="\d*"
                />
            ))}
        </div>
    );
};

export default OTPInput;