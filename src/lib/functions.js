"use client";

import DOMPurify from "dompurify";

export const createMarkup = (html) => {
  if (typeof window !== "undefined") {
    return { __html: DOMPurify.sanitize(html) };
  }
  return { __html: html }; // Fallback for server-side rendering
};

export const mapToObject = (map) => Object.fromEntries(map);
export const objectToMap = (obj) => new Map(Object.entries(obj));
