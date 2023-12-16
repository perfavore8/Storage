import router from "@/router";
import { useSaveLS } from "./saveLS";

export function useCheckPublicOrderAuth() {
  const { getSavedLSParam } = useSaveLS();

  if (
    router.currentRoute.value.name === "publicOrder" &&
    !getSavedLSParam("POAuth")
  )
    router.push("publicOrderAuth");
}
