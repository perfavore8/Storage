<template>
  <div class="wrapper">
    <input type="text" class="input" v-model="inputValue" @click="openList()" />
    <template v-if="list.length && showList">
      <div class="backdrop" @click="closeList()" />
      <ul class="list">
        <li
          class="item"
          v-for="item in list"
          :key="item.value"
          @click="selectItem(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  props: {
    list: Array,
    countLettersReq: { type: Number, required: false, default: () => 0 }, // кол-во символов для отправки запроса
    requestDelay: { type: Number, required: false, default: () => 300 }, // <--  миллисекунды
  },
  setup(props, context) {
    const inputValue = ref("");

    const timer = ref(null);

    const changeInputValue = () => {
      clearTimeout(timer.value);
      if (inputValue.value.length >= props.countLettersReq) {
        timer.value = setTimeout(() => {
          context.emit("changeInputValue", inputValue.value);
        }, props.requestDelay);
      }
    };

    watch(inputValue, () => changeInputValue());

    const showList = ref(false);
    const closeList = () => (showList.value = false);
    const openList = () => ((showList.value = true), changeInputValue());

    const selectItem = (item) => {
      context.emit("select", item);
      closeList();
    };

    return { inputValue, showList, closeList, openList, selectItem };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  .input {
  }
  .backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    z-index: 49;
  }
  .list {
    z-index: 50;
    list-style-type: none;
    .item {
    }
  }
}
</style>
