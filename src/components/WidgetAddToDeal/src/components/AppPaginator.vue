<template>
  <div class="grid">
    <button
      @click="prev()"
      v-if="page.current != page.first && page.prev != null"
      class="a"
    >
      {{ "<" }}
    </button>
    <button
      @click="first()"
      v-if="page.current != page.first && page.prev != page.first"
      class="b"
    >
      {{ page.first }}
    </button>
    <button
      @click="prev()"
      v-if="page.current != page.first && page.prev != null"
      class="c"
    >
      {{ page.prev }}
    </button>
    <button class="current d">{{ page.current }}</button>
    <button
      @click="next()"
      v-if="page.current != page.last && page.next != null"
      class="e"
    >
      {{ page.next }}
    </button>
    <button
      @click="last()"
      v-if="page.current != page.last && page.next != page.last"
      class="f"
    >
      {{ page.last }}
    </button>
    <button
      @click="next()"
      v-if="page.current != page.last && page.next != null"
      class="g"
    >
      {{ ">" }}
    </button>
  </div>
</template>

<script>
export default {
  props: { page: Object },
  emits: {
    changePage(payload) {
      return payload > 0 && typeof payload === "number";
    },
  },
  setup(props, context) {
    const first = () => context.emit("changePage", props.page.first);
    const prev = () => context.emit("changePage", props.page.current - 1);
    const next = () => context.emit("changePage", props.page.current + 1);
    const last = () => context.emit("changePage", props.page.last);

    return { prev, first, next, last };
  },
};
</script>

<style lang="scss" scoped>
button {
  min-width: 32px;
  height: 32px;
  border-radius: 0.375rem;
  background-color: rgb(241, 245, 249);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  outline-color: #cbd5e1;
  border: none;
}
button:hover {
  background-color: rgb(226 232 240);
}
.grid {
  display: grid;
  gap: 0.75rem;
  grid-template-areas: "a b c d e f g";
  grid-template-columns: repeat(7, 1fr);
}
.a {
  grid-area: a;
}
.b {
  grid-area: b;
}
.c {
  grid-area: c;
}
.d {
  grid-area: d;
}
.e {
  grid-area: e;
}
.f {
  grid-area: f;
}
.g {
  grid-area: g;
}
.current {
  background-color: rgb(226 232 240);
}
</style>
