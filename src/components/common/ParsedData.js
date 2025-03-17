"use client";

import { createMarkup } from "@/lib/functions";

const ParsedData = ({ data }) => {

  return (
    <div
      className="[&>h1]:text-2xl md:[&>h1]:text-3xl [&>h1]:font-bold [&>p]:text-base md:[&>p]:text-lg [&>p]:text-[var(--light-gray)] py-[40px] md:py-[60px]"
      dangerouslySetInnerHTML={createMarkup(data)}
    />
  );
};

export default ParsedData;
