import { instance, useRedirectToAuth } from "@/composables/BaseURL";
import { useNotification } from "./notification";
import { useLangConfiguration } from "./langConfiguration";
const { t } = useLangConfiguration();

export async function ApiReqFunc(config) {
  const { redirectToErrorPage } = useRedirectToAuth();
  const { addNotification } = useNotification();

  try {
    const response = await instance(config);

    return response;
  } catch (error) {
    const { status } = error.response;
    if (status === 403) redirectToErrorPage();
    if (status === 422)
      addNotification(
        3,
        t("global.error"),
        error.response.data.error || error.response.data.message || ""
      );

    // console.error(error);
    return { error: error.response };
  }
}
