<template>
  <div class="wrapper" v-if="true">
    <div class="main">
      <table class="table" ref="table">
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
              @click="title.sortable ? sort(title.value) : null"
              :key="title"
            >
              <div class="bar_item_group">
                <label>{{ title.name }}</label>
                <button
                  class="bar_item_icon"
                  :class="{
                    bar_item_icon_up:
                      sorting.order == 'desc' &&
                      title.value === sorting.order_by,
                    bar_item_icon_down:
                      sorting.order == 'asc' &&
                      title.value === sorting.order_by,
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
                <td
                  class="item"
                  v-if="title.code === 'name'"
                  style="padding: 5px 10px 5px 15px"
                >
                  <a
                    target="black"
                    class="underline text-[#8cb4ff] decoration-[#3f3f3faf] underline-offset-2 hover:no-underline"
                    :href="'https://' + row.document_link"
                  >
                    {{ row.name }}
                  </a>
                </td>
                <td class="item cursor-pointer" v-else>
                  {{ row[title.code] }}
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
      <label v-if="documents.length == 0" class="text">
        Ничего не найдено
      </label>
    </div>
    <grid-bottom
      :page="page"
      :show="documents.list.length != 0"
      :showSelector="false"
      :count="meta?.per_page"
      @changePage="changePage"
    />
  </div>
</template>

<script>
import GridBottom from "./GridBottom.vue";
import { computed, reactive } from "vue";
import store from "@/store";
export default {
  components: { GridBottom },
  setup() {
    const documents = reactive({
      titles: [
        {
          name: "Название документа",
          code: "name",
          width: 1,
          sortable: true,
        },
        {
          name: "Название заказа",
          code: "oreder_name",
          width: 1,
          sortable: true,
        },
        {
          name: "Клиент",
          code: "client",
          width: 1,
          sortable: true,
        },
        {
          name: "Кто сформировал",
          code: "form_name",
          width: 1,
          sortable: true,
        },
        {
          name: "Когда сформировал",
          code: "form_date",
          width: 1,
          sortable: true,
        },
      ],
      list: [
        {
          name: "Google",
          document_link: "google.com",
          oreder_name: "Заказ 1",
          client: "Клиент 1",
          form_name: "Кто-то",
          form_date: "Когла-то",
        },
        {
          name: "Google",
          document_link: "google.com",
          oreder_name: "Заказ 2",
          client: "Клиент 2",
          form_name: "Кто-то",
          form_date: "Когла-то",
        },
        {
          name: "Google",
          document_link: "google.com",
          oreder_name: "Заказ 3",
          client: "Клиент 3",
          form_name: "Кто-то",
          form_date: "Когла-то",
        },
      ],
    });

    const sorting = reactive({
      order_by: null,
      order: "",
    });

    const collsCount = computed(() => documents.titles.length);

    const documentsRaw = computed(() => store.state.documents.documents);
    const meta = computed(() => store.state.orders.meta);
    const page = computed(() => {
      const obj1 = {
        first: getPageFromLink(meta.value?.first_page_url),
        prev: getPageFromLink(meta.value?.prev_page_url),
        current: meta.value?.current_page,
        next: getPageFromLink(meta.value?.next_page_url),
        last: getPageFromLink(meta.value?.last_page_url),
      };
      obj1;
      const obj = {
        first: 1,
        prev: 1,
        current: 1,
        next: 1,
        last: 1,
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

    const fillDocuments = () => {
      documents.list = [];
      documentsRaw.value.forEach((document) => {
        const obj = {
          name: document.name,
          oreder_name: document.oreder_name,
          form_name: document.form_name,
          form_date: document.form_date,
        };
        documents.list.push(obj);
      });
    };

    const getDocuments = async () => {
      await store.dispatch("getDocuments", store.state.documents.filters);
      fillDocuments();
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
      } else {
        if (sorting.order === "asc") sorting.order = "desc";
      }
      store.commit("updateDocumentsFilters", sorting);
      getDocuments();
    };

    return { documents, collsCount, sorting, sort, changePage, page };
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
}
.text {
  position: relative;
  top: 20px;
  margin: 0 auto;
  @include font(500, 18px);
}
</style>
