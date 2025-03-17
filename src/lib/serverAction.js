const { cookies } = require("next/headers");

const MutationRequest = async ({
  method,
  path,
  body,
  isTokenRequired = true,
}) => {
  let headers = {
    "Content-Type": "application/json",
  };
  if (isTokenRequired) {
    headers.Authorization = `${cookies().get("token")?.value}`;
  }
  // console.log("Headers:", headers);

  try {
    const response = await fetch(`https://revallusion.onrender.com${path}`, {
      method,
      //   headers,
      body,
    });
    console.log("response", response);

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(
        responseData?.message ||
          responseData?.errors ||
          responseData?.error?.message
      );
    }
    return { success: true, data: responseData };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const submitQuery = async (body) => {
  const res = await MutationRequest({
    method: "POST",
    path: "/api/v1/query",
    body,
    isTokenRequired: false,
  });
  console.log(res);
  return res;
};
