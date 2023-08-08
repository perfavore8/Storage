import { instance, useRedirectToAuth } from "@/composables/BaseURL";

export async function ApiReqFunc(config) {
  const { redirectToErrorPage } = useRedirectToAuth();

  try {
    const response = await instance(config);

    return response;
  } catch (error) {
    const { status } = error.response;
    if (status === 403) redirectToErrorPage();

    // console.error(error);
    return { error: error.response };
  }
}
