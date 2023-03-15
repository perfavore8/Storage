<template>
  <AppRadioBtnsGroup
    :selected="notificationSystem.selected"
    :list="notificationSystem.list"
    @select="notificationSystem.select"
  >
    <template
      v-for="(item, idx) in notificationSystem.list"
      :key="item.value"
      #[`item${idx}`]
    >
      <div
        class="icon"
        :style="{ 'background-image': 'url(' + item.iconUrl + ')' }"
      />
    </template>
  </AppRadioBtnsGroup>
</template>

<script>
import { reactive } from "vue";
import AppRadioBtnsGroup from "./AppRadioBtnsGroup.vue";
export default {
  components: { AppRadioBtnsGroup },
  setup() {
    const notificationSystem = reactive({
      selected: {
        name: "",
        value: "telegram",
        iconUrl:
          "https://okeygeek.ru/wp-content/uploads/2020/08/telegram-2048x2048.png",
      },
      list: [
        // {
        //   name: "",
        //   value: "amoCrm",
        //   iconUrl: "https://graph.digiseller.ru/img.ashx?idd=3380359",
        // },
        {
          name: "",
          value: "telegram",
          iconUrl:
            "https://okeygeek.ru/wp-content/uploads/2020/08/telegram-2048x2048.png",
        },
        {
          name: "",
          value: "whatsapp",
          iconUrl: "https://www.svgrepo.com/show/217789/whatsapp.svg",
        },
      ],
      select: (option) => {
        notificationSystem.selected = option;
      },
    });

    return { notificationSystem };
  },
};
</script>

<style lang="scss" scoped>
$size: 24px;
.icon {
  width: $size;
  height: $size;
  background-color: transparent;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}
.btns_group {
  :deep(.btn) {
    height: calc($size + 12px);
  }
  :deep(.selected) {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
