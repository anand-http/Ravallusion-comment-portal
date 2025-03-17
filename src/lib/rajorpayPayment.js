"use client";
import { toast } from "react-toastify";

const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

export const handleClick = async (amount, plansId) => {

    // console.log("ammoutn", amount, "id", plansId);
    // Load Razorpay script if not already loaded
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // Create order
    const response = await fetch("/api/v1/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: plansId }),
    });
    const res = await response.json();
    if (!response.ok) {
        toast.warning(res.message)
        return;
    }
    const { data: { order } } = res;

    // Fetch Razorpay key
    const response2 = await fetch("/api/v1/order/get-key");
    const { data } = await response2.json();
    const key_id = data?.key;


    const options = {
        key: key_id, // Replace with your Razorpay key_id
        amount: order.inr_price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Anand uchiha",
        description: "Test Transaction",
        order_id: order.order_id, // This is the order_id created in the backend
        callback_url: "/api/v1/order/verify-payment", // You", // Your success URL
        prefill: {
            name: "Sakura anand uchiha",
            email: "Sarada.uchiha@example.com",
            contact: "9999999999",
        },
        theme: {
            color: "#b19cd9",
        },
    };

    // console.log("dsdsd", window.Razorpay);

    const rzp = new window.Razorpay(options);
    rzp.open();
};