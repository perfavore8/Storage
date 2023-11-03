<template>
  <div class="main">
    <p
      class="my-2 md:my-4 text-sm md:text-base text-slate-500 dark:text-slate-300 text-left"
    >
      {{ $t("Archive.count", { count: total }) }}
    </p>
    <AppTablePreloader :titles="titlesForPreloader" v-if="isLoading" />
    <table class="table" ref="table" v-else>
      <thead>
        <tr class="bar_row">
          <th
            class="bar_item item"
            :class="{ cursor_pointer: title.sortable }"
            :style="{
              width:
                ((collsCount >= 8 ? 100 : collsCount > 3 ? 90 : 80) /
                  collsCount) *
                  title.width +
                '%',
            }"
            v-for="title in documents.titles"
            v-show="
              title.visibleIds ? title.visibleIds?.includes(accountId) : true
            "
            @click="title.sortable ? sort(title.code) : null"
            :key="title"
          >
            <div class="bar_item_group">
              <label>{{ title.name }}</label>
              <button
                class="bar_item_icon"
                :class="{
                  bar_item_icon_up:
                    sorting.order == 'desc' && title.code === sorting.order_by,
                  bar_item_icon_down:
                    sorting.order == 'asc' && title.code === sorting.order_by,
                }"
                v-if="title.sortable"
              ></button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="documents.list.length">
        <template v-for="row in documents.list" :key="row">
          <tr class="row">
            <template v-for="title in documents.titles" :key="title">
              <template
                v-if="
                  title.visibleIds
                    ? title.visibleIds?.includes(accountId)
                    : true
                "
              >
                <td
                  class="item"
                  v-if="title.isDocumentLink"
                  style="padding: 5px 10px 5px 15px"
                >
                  <a
                    target="black"
                    class="underline text-[#8cb4ff] decoration-[#3f3f3faf] underline-offset-2 hover:no-underline"
                    :href="row.document_link"
                  >
                    {{ row[title.code] }}
                  </a>
                </td>
                <td class="item cursor-pointer" v-else>
                  {{ row[title.code] }}
                </td>
              </template>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
    <label v-if="documents.length == 0" class="text">
      {{ $t("global.nothingFound") }}
    </label>
  </div>
  <grid-bottom
    :page="page"
    :show="documents.list.length != 0"
    :showSelector="false"
    :count="meta?.per_page"
    v-if="documents.list.length < meta?.meta?.total"
    @changePage="changePage"
  />
</template>

<script>
import GridBottom from "./GridBottom.vue";
import { useDocuments } from "../composables/documents";
import { computed, onMounted, reactive } from "vue";
import store from "@/store";
import AppTablePreloader from "./AppTablePreloader.vue";
export default {
  components: { GridBottom, AppTablePreloader },
  setup() {
    const {
      documents,
      collsCount,
      getDocuments,
      total,
      fillTitlesList,
      isLoading,
    } = useDocuments();
    onMounted(() => {
      getDocuments();
      fillTitlesList();
    });

    const sorting = reactive({
      order_by: null,
      order: "",
    });

    const accountId = computed(() => store.state.account.account.id);

    const meta = computed(() => store.state.orders.meta);
    const page = computed(() => {
      const obj = {
        first: getPageFromLink(meta.value?.links?.first),
        prev: getPageFromLink(meta.value?.links?.prev),
        current: meta.value?.meta?.current_page,
        next: getPageFromLink(meta.value?.links?.next),
        last: getPageFromLink(meta.value?.links?.last),
      };
      return obj;
    });

    const getPageFromLink = (link) => {
      if (link) {
        return link.split("?page=")[1];
      } else {
        return null;
      }
    };

    const changePage = (val) => {
      const params = { page: val };
      store.commit("updateDocumentsFilters", params);
      getDocuments();
    };

    const sort = (code) => {
      if (sorting.order_by != code) {
        sorting.order = "";
        sorting.order_by = code;
      }
      if (sorting.order === "desc" || !sorting.order) {
        sorting.order = "asc";
      } else if (sorting.order === "asc") {
        sorting.order = "desc";
      }
      store.commit("updateDocumentsFilters", sorting);
      getDocuments();
    };

    const titlesForPreloader = computed(() => {
      return Object.values(documents.titles).reduce((acc, title) => {
        if (title.visibleIds ? title.visibleIds?.includes(accountId) : true)
          acc.push(title.name);
        return acc;
      }, []);
    });

    return {
      documents,
      collsCount,
      sorting,
      sort,
      changePage,
      page,
      total,
      meta,
      accountId,
      isLoading,
      titlesForPreloader,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.bar_row {
  height: 66px;
  .item {
    padding: 10px;
    padding-left: 15px;
    border: 1px solid #c9c9c9;
    @include font(400, 14px, 17px);
    color: #3f3f3f;
    text-align: start;
    min-width: 50px;
  }
  .bar_item {
    background: #e5e5e5;
    @include font(500, 16px, 19px);
    color: #000000;
    vertical-align: middle;
    text-align: start;
    // cursor: pointer;
    label {
      cursor: inherit;
    }

    .bar_item_group {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: start;
      flex-wrap: wrap;
      gap: 10px;

      .bar_item_icon {
        margin: 0 auto;
        height: 16px;
        width: 16px;
        background-color: transparent;
        @include bg_image("@/assets/sort.svg");
        border: none;
        cursor: pointer;
        transition: all 0.2s ease-out;
        &_up {
          @include bg_image("@/assets/sort_up.svg");
        }
        &_down {
          @include bg_image("@/assets/sort_down.svg");
        }
      }
    }
  }
}
.row {
  // cursor: pointer;
}
.cursor_pointer {
  cursor: pointer;
}
.item {
  padding: 10px;
  padding-left: 15px;
  border: 1px solid #c9c9c9;
  @include font(400, 14px, 17px);
  color: #3f3f3f;
  text-align: start;
  min-width: 50px;
}
.table {
  border-collapse: collapse;
  margin: 0 auto;
  // overflow-x: scroll;
  // width: calc(100% + 42px);
  width: 100%;
  // height: 550px;
  // display: block;
  .main-grid-bar {
    z-index: 105;
    position: sticky;
    top: -1px;
  }
}
.main {
  width: 100%;
  margin-top: 40px;
}
.text {
  position: relative;
  top: 20px;
  margin: 0 auto;
  @include font(500, 18px);
}
</style>
