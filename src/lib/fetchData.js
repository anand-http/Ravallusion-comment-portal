const { cookies } = require("next/headers");

const FetchRequest = async ({ path, isTokenRequired = true }) => {
  let headers = {
    "Content-Type": "application/json",
  };
  if (isTokenRequired) {
    headers.Authorization = `${cookies().get("token")?.value}`;
  }
  // console.log("Headers:", headers);

  try {
    const response = await fetch(`https://revallusion.onrender.com${path}`, {
      method: "GET",
      // headers,
      // cache: "force-cache",
      // cache: "no-store",
    });

    const responseData = await response.json();
    // console.log("Response Data:", responseData);
    if (!response.ok) {
      throw new Error(
        responseData?.message ||
          responseData?.errors ||
          responseData?.error?.message
      );
    }
    console.log({ responseData });
    return { success: true, data: responseData.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};


export const getLandingPageData = async () => {
  const res = await FetchRequest({
    path: "/api/v1/user/home",
    isTokenRequired: false,
  });
  console.log({ res });
  return res;
};



export const getStaticData = async () => {
  const res = await FetchRequest({
    path: "/api/v1/content/page",
    isTokenRequired: false,
  });
  return res;
};
