<template>
  <transition name="modal_window">
    <div v-if="show_table_settings" class="table_setings">
      <table-settings :selectedWH="selectedWH" />
    </div>
  </transition>
  <transition name="modal_window">
    <div v-if="show_edit_stuff" class="edit_staff">
      <EditStuffTest v-if="isTest" />
      <edit-stuff v-else />
    </div>
  </transition>
  <transition name="modal_window">
    <div v-if="show_product_category" class="product_category">
      <product-category />
    </div>
  </transition>
  <transition name="modal_window">
    <div v-if="showThirdPpartyIntegrations" class="thirdPpartyIntegrations">
      <ThirdPpartyIntegrations />
    </div>
  </transition>
  <transition name="modal_window">
    <div v-if="showSyncSettings" class="SyncSettings">
      <SyncSettings />
    </div>
  </transition>
  <transition name="modal_window">
    <div v-if="showImportStuff" class="import_stuff">
      <ImportStuff />
    </div>
  </transition>
  <transition name="modal_window">
    <div v-if="show_product_properties" class="product_properties">
      <product-properties />
    </div>
  </transition>
  <transition name="modal_window">
    <div v-if="showAccountSattings" class="AccountSattings">
      <AccountSattings />
    </div>
  </transition>
  <transition name="modal_window">
    <div v-if="show_new_position" class="new_position">
      <new-position :currentItems="currentItems" @close="updateProducts" />
    </div>
  </transition>
  <transition name="modal_window">
    <div v-if="show_cancel_position" class="cancel_position">
      <cancel-position :currentItems="currentItems" @close="updateProducts" />
    </div>
  </transition>
  <transition name="modal_window">
    <div v-if="showMoveProductsBetweenWhs" class="move_products_between_whs">
      <MoveProductsBetweenWhs
        :currentItems="currentItems"
        @close="updateProducts"
      />
    </div>
  </transition>
  <transition name="modal_window">
    <div v-if="show_document_setting" class="document_setting">
      <document-setting />
    </div>
  </transition>
</template>

<script>
import TableSettings from "@/components/TableSettings.vue";
import EditStuff from "@/components/EditStuff.vue";
import EditStuffTest from "@/components/EditStuffTest.vue";
import NewPosition from "@/components/NewPosition.vue";
import CancelPosition from "@/components/CancelPosition";
import DocumentSetting from "@/components/DocumentSetting.vue";
import ProductCategory from "@/components/ProductCategory.vue";
import ProductProperties from "@/components/ProductProperties.vue";
import ThirdPpartyIntegrations from "@/components/ThirdPpartyIntegrations.vue";
import SyncSettings from "@/components/SyncSattings.vue";
import MoveProductsBetweenWhs from "@/components/MoveProductsBetweenWhs.vue";
import ImportStuff from "@/components/ImportStuff.vue";
import AccountSattings from "@/components/AccountSattings.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    TableSettings,
    EditStuff,
    EditStuffTest,
    NewPosition,
    CancelPosition,
    DocumentSetting,
    ProductCategory,
    ProductProperties,
    ThirdPpartyIntegrations,
    SyncSettings,
    MoveProductsBetweenWhs,
    ImportStuff,
    AccountSattings,
  },
  props: {
    selectedWH: Object,
    currentItems: Array,
  },

  computed: {
    ...mapGetters([
      "show_table_settings",
      "show_filter",
      "show_edit_stuff",
      "show_new_position",
      "show_cancel_position",
      "show_document_setting",
      "show_product_category",
      "show_product_properties",
      "showThirdPpartyIntegrations",
      "showAccountSattings",
      "showSyncSettings",
      "showEditPrice",
      "showMoveProductsBetweenWhs",
      "showImportStuff",
    ]),
    isTest() {
      return (
        this.$store.state.account?.account?.id == 1 ||
        this.$route.query.test === "salesUp"
      );
    },
  },

  methods: {
    updateProducts() {
      this.$emit("updateProducts");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal_window-enter-active,
.modal_window-leave-active {
  transition: opacity 0.2s ease-in-out;
  z-index: 999;
}
.modal_window-enter-from,
.modal_window-leave-to {
  opacity: 0;
}
</style>
