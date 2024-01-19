import router from "@/router";
import { useSaveLS } from "./saveLS";
import { POTokenName } from "./BaseURL";

export function useCheckPublicOrderAuth() {
  const { getSavedLSParam } = useSaveLS();

  if (
    router.currentRoute.value.name === "publicOrder" &&
    !getSavedLSParam("POAuth") &&
    !getSavedLSParam(POTokenName)
  )
    router.push("publicOrderAuth");
}
