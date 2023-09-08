<template>
  <div class="grid" :class="{ blur: isLoading }">
    <label v-if="archive_list.length == 0" class="text">
      Ничего не найдено
    </label>
    <template v-else>
      <table class="table2 hidden md:table">
        <thead>
          <tr class="row title">
            <td
              v-for="field in fields"
              :key="field.code"
              class="item dark:bg-slate-800"
            >
              {{ field.name }}
            </td>
            <td class="item dark:bg-slate-800"></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in archive_list" :key="item.id" class="row">
            <template v-for="field in fields" :key="field">
              <td class="item dark:bg-slate-700">
                <span v-if="field.code.split('.').length < 2">
                  {{ item.fields[field.code] }}
                </span>
                <span v-else>
                  <template v-if="item.fields[field.code.split('.')[0]]">
                    {{
                      field.code.split(".")[1] == "cost"
                        ? item.fields[field.code.split(".")[0]][
                            field.code.split(".")[1]
                          ] +
                          " " +
                          item.fields[field.code.split(".")[0]].currency
                        : item.fields[field.code.split(".")[0]][
                            field.code.split(".")[1]
                          ]
                    }}
                  </template>
                </span>
              </td>
            </template>
            <td class="item dark:bg-slate-700">
              <div
                class="edit_icon"
                @click="unarchive_data(item)"
                title="Разархивирование товара"
              >
                <span class="material-icons"> ios_share </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="md:hidden mx-auto grid grid-cols-1 gap-6 mt-3 sm:grid-cols-2">
        <template v-for="i in 10" :key="i">
          <div
            v-for="item in archive_list"
            :key="item.id"
            class="container px-5 py-3 max-w-xs rounded-xl bg-gray-50 dark:bg-slate-800 dark:text-slate-100 shadow-md flex flex-col items-center gap-y-3 relative"
          >
            <div
              class="edit_icon absolute right-3 top-3"
              @click="unarchive_data(item)"
            >
              <span
                class="material-icons dark:text-slate-300"
                style="font-size: 18px"
              >
                ios_share
              </span>
            </div>
            <div class="flex flex-row gap-4">
              <h6 class="font-bold">{{ item.fields.article }}</h6>
              <span>№ {{ item.fields.batch }}</span>
            </div>
            <div class="text-sm">
              <span>{{ item.fields.name }}</span>
            </div>
          </div>
        </template>
      </div>
    </template>
    <grid-bottom
      class="bottom"
      :page="page"
      :blur="show_edit_modal"
      :show="products?.length != 0"
      :count="count"
      v-if="showGridBottom"
      @changePage="changePage"
      @changeCount="changeCount"
    />
  </div>
</template>

<script>
import GridBottom from "@/components/GridBottom.vue";
import { computed, onMounted, ref, watch } from "vue";
import store from "@/store";
export default {
  components: {
    GridBottom,
  },

  props: { config: Object },

  setup(props) {
    const isLoading = ref(false);

    onMounted(async () => {
      store.commit("toggleIsNavBarDisabled", true);
      isLoading.value = true;
      await store.dispatch("get_account");
      await getConfigData();
      isLoading.value = false;
      store.commit("toggleIsNavBarDisabled", false);
    });

    watch(
      () => props.config.value,
      () => getConfigData()
    );

    const getConfigData = async () => {
      await Promise.all([
        store.dispatch(props.config.stateListReqName, { is_archive: 1 }),
        store.dispatch(props.config.stateFieldsReqName),
      ]);
    };

    const fields = computed(() =>
      store.state[props.config.stateFieldName || props.config.stateName][
        props.config.stateFieldsName
      ]
        .filter((el) => props.config.fields.includes(el.code))
        .sort((a, b) =>
          props.config.fields.indexOf(a.code) >
          props.config.fields.indexOf(b.code)
            ? 1
            : -1
        )
    );

    const meta = computed(
      () => store.state[props.config.stateName][props.config.stateMetaName]
    );

    const archive_list = computed(
      () => store.state[props.config.stateName][props.config.stateListName]
    );

    const showGridBottom = computed(
      () => meta.value.meta?.total >= meta.value.meta?.per_page
    );

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
    const changeCount = async (count) => {
      await store.dispatch("update_user", { per_page: count });
      drop_page();
    };
    const drop_page = () => {
      changePage(1);
    };
    const changePage = (val) => {
      store.dispatch(props.config.stateListReqName, {
        is_archive: 1,
        page: val,
      });
    };
    const unarchive_data = async (item) => {
      if (!isLoading.value) {
        isLoading.value = true;
        const res = {
          products: [
            {
              id: item.id,
              fields: item.fields,
              is_archive: 0,
            },
          ],
        };
        await store.dispatch("update_product", res);
        await store.dispatch(props.config.stateListReqName, { is_archive: 1 });
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      fields,
      archive_list,
      showGridBottom,
      page,
      changeCount,
      changePage,
      unarchive_data,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.table2 {
  border: 1px solid #c9c9c9;
  border-collapse: collapse;
  border-radius: 20px;
  width: 100%;
  @include font(400, 16px);
  .title {
    @include font(500, 16px);
    background-color: rgba(0, 0, 0, 0.15) !important;
    .item {
      padding-bottom: 20px !important;
      text-align: center !important;
    }
  }
  .row:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .row {
    .item {
      padding: 10px;
      border: 1px solid #c9c9c9;
      // border-top: 2px solid #c9c9c9;
      text-align: left;

      @apply dark:text-white dark:border-gray-600 dark:border-2;
    }
  }
}
.edit_icon {
  width: 20px;
  height: 20px;
  margin: 0 auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #757575;

  @apply dark:text-slate-400;
  // @include bg_image("@/assets/export.svg");
  // transform: rotate(180deg);
}
.count {
  margin-top: 20px;
  margin-left: 5px;
  margin-bottom: 150px;
  height: 26px;
  width: 100px;
}
.text {
  margin: 0 auto;
  @include font(500, 18px);
}
.blur {
  filter: blur(5px);
}
</style>
