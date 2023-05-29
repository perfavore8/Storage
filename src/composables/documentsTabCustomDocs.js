import store from "@/store";
import { reactive } from "vue";
import { useNewDeal } from "./newDeal";

export function useDocumentsTabCustomDocs() {
  const { newDealParams } = useNewDeal();

  const uploadFiles = async (ev) => {
    const files = ev.target.files[0];
    const payload = new FormData();
    payload.append("files", files);
    payload.append("order_id", newDealParams.id);
    await store.dispatch("customDocUpload", payload);
    getCustomDocList();
  };

  const customDocList = reactive([]);
  const getCustomDocList = async () => {
    customDocList.length = 0;
    Object.assign(
      customDocList,
      await store.dispatch("customDocList", { order_id: newDealParams.id })
    );
    customDocList.map((doc) => (doc.isCustom = true));
  };
  const deleteCustomDoc = async (docId) => {
    await store.dispatch("customDocDelete", {
      order_id: newDealParams.id,
      doc_id: docId,
    });
    getCustomDocList();
  };

  return { uploadFiles, customDocList, getCustomDocList, deleteCustomDoc };
}
