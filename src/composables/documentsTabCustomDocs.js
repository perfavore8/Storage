import store from "@/store";
import { reactive } from "vue";
import { useNewDeal } from "./newDeal";
import { ref } from "vue";
import { isPublicOrder } from "@/components/PublicOrder";

export function useDocumentsTabCustomDocs() {
  const { newDealParams } = useNewDeal();

  const isUpload = ref(false);

  const uploadFiles = async (ev) => {
    isUpload.value = true;
    const files = ev.target.files[0];
    const payload = new FormData();
    payload.append("files", files);
    payload.append("order_id", newDealParams.id);
    await store.dispatch(
      isPublicOrder.value ? "POCustomDocUpload" : "customDocUpload",
      payload
    );
    isUpload.value = false;
    getCustomDocList();
  };

  const customDocList = reactive([]);
  const getCustomDocList = async () => {
    customDocList.length = 0;
    Object.assign(
      customDocList,
      await store.dispatch(
        isPublicOrder.value ? "POCustomDocList" : "customDocList",
        { order_id: newDealParams.id }
      )
    );
    customDocList.map((doc) => (doc.isCustom = true));
  };
  const deleteCustomDoc = async (docId) => {
    await store.dispatch(
      isPublicOrder.value ? "POCustomDocDelete" : "customDocDelete",
      {
        order_id: newDealParams.id,
        doc_id: docId,
      }
    );
    getCustomDocList();
  };

  return {
    uploadFiles,
    customDocList,
    getCustomDocList,
    deleteCustomDoc,
    isUpload,
  };
}
