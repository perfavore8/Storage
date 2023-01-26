<template>
  <div class="bottom" :class="{ blur: blur }" v-if="show">
    <template v-if="showBtns">
      <button
        v-if="previous"
        @click="changePage(page - 1)"
        class="btn previous"
      >
        {{ "<" }}
      </button>
      <div class="span">{{ page }}</div>
      <button v-if="next" @click="changePage(page + 1)" class="btn next">
        {{ ">" }}
      </button>
    </template>
    <template v-if="showSelector">
      <selector-vue
        class="count"
        :options_props="count_values"
        :selected_option="{ name: count, value: -1 }"
        @select="change_count"
      />
    </template>
  </div>
</template>

<script>
import SelectorVue from "@/components/SelectorVue.vue";
export default {
  components: {
    SelectorVue,
  },
  props: {
    previous: {
      type: Boolean,
      required: true,
    },
    next: {
      type: Boolean,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    blur: {
      type: Boolean,
      required: false,
      default: false,
    },
    show: {
      type: Boolean,
      required: true,
    },
    showBtns: {
      type: Boolean,
      required: false,
      default: true,
    },
    showSelector: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: { changePage: null, changeCount: null },
  data() {
    return {
      count_values: [],
    };
  },
  async mounted() {
    await this.$store.dispatch("get_account");
    if (this.$store.state.account.user.config.per_pages)
      this.count_values = [
        ...this.$store.state.account.user.config.per_pages,
      ].map((val, idx) => (val = { name: val, value: idx }));
  },
  computed: {},
  methods: {
    changePage(val) {
      this.$emit("changePage", val);
    },
    change_count(option) {
      this.$emit("changeCount", option.name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.bottom {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .btn {
    height: 32px;
    width: 30px;
    color: #3f3f3f;
    background-color: #f0f0f0;
    border-radius: 50%;
    padding: 0;
    transition: 0.2s ease-in-out;
    box-shadow: 0 0 0;
    border: none;
  }
  .btn:hover {
    background-color: hsl(0, 0%, 85%);
  }
  .btn:active {
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.25) inset,
      0 2px 3px rgba(0, 0, 0, 0.25) inset, 0 1px 1px rgba(255, 255, 255, 0.05);
  }
  .next {
    padding-left: 2px;
    padding-bottom: 2px;
  }
  .previous {
    padding-right: 2px;
    padding-bottom: 2px;
  }
  .span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 60px;
    margin: 5px;
    border-radius: 25%/50%;
    background-color: #f0f0f0;
    @include font(400, 16px, 19px);
    color: #3f3f3f;
  }
  .count {
    margin-left: 7px;
    width: 70px;
  }
}
</style>
