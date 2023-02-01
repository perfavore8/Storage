<template>
  <Teleport to="body">
    <div class="backdrop" @click="close()" />
  </Teleport>
  <div class="wrapper">
    <header class="header">
      <h1>Настройки импорта</h1>
      <button class="btn cross" @click="close()"></button>
    </header>
    <main class="main">
      <div class="top">
        <div class="template">
          <SelectorVue
            :options_props="templates.list"
            :selected_option="templates.selected"
            @select="selectTempate"
          />
          <input
            class="input"
            type="text"
            v-model="templates.newTemplateName"
            v-if="templates.selected.showTemplateName"
          />
        </div>
        <div class="compare" v-if="isAnyCompares">
          <SelectorVue
            :options_props="addOrUpdateFields.list"
            :selected_option="addOrUpdateFields.selected"
            @select="addOrUpdateFields.select"
          />
        </div>
      </div>
      <div class="table" ref="gridRef">
        <template v-for="(row, i) in tableData">
          <div
            class="item"
            :class="{ title: i == 0 }"
            v-for="item in row"
            :key="item"
          >
            {{ item }}
          </div>
        </template>

        <div class="item" v-for="i in gridCount" :key="i">
          <ImportStuffSelector
            :options_props="importStuffFields"
            :selected_option="
              templates.selected.selectedFields
                ? templates.selected.selectedFields[i - 1]
                : {}
            "
            @toggleShowOptions="toggleShowOptions"
            @select="(option) => selectStuffField(option, i - 1)"
          />
          <template
            v-if="templates.selected.selectedFields[i - 1].value !== -1"
          >
            <input
              type="checkbox"
              class="checkbox"
              :id="'ImportStuff' + i"
              v-model="templates.selected.compares[i - 1]"
            />
            <label :for="'ImportStuff' + i"> Сравнивать поле </label>
          </template>
        </div>
      </div>
    </main>
    <footer class="footer">
      <BtnsSaveClose @close="close" @save="save" />
    </footer>
  </div>
</template>

<script>
import store from "@/store";
import BtnsSaveClose from "./BtnsSaveClose.vue";
import ImportStuffSelector from "./ImportStuffSelector.vue";
import SelectorVue from "./SelectorVue.vue";
import { useImportStuffFields } from "@/composables/importStuffFields";
import { reactive, ref } from "@vue/reactivity";
import { computed, onMounted, watch } from "@vue/runtime-core";
export default {
  components: { SelectorVue, ImportStuffSelector, BtnsSaveClose },
  setup() {
    const {
      selectedImportStuffFields,
      importStuffFields,
      fillSelectedImportStuffFields,
    } = useImportStuffFields();

    const templates = reactive({
      newTemplateName: "",
      selected: {
        name: "Без шаблона",
        value: 0,
        showTemplateName: false,
        compares: [],
        selectedFields: [],
      },
      list: [
        {
          name: "Без шаблона",
          value: 0,
          showTemplateName: false,
          compares: [],
          selectedFields: [],
        },
        {
          name: "Новый шаблон",
          value: 1,
          showTemplateName: true,
          compares: [],
          selectedFields: [],
        },
        {
          name: "Шаблон 1",
          value: 2,
          showTemplateName: false,
          compares: [],
          selectedFields: [
            { name: "Не импортировать поле", value: -1, code: "not to import" },
            { name: "Не импортировать поле", value: -1, code: "not to import" },
            { name: "Не импортировать поле", value: -1, code: "not to import" },
            { name: "Не импортировать поле", value: -1, code: "not to import" },
            { name: "Не импортировать поле", value: -1, code: "not to import" },
          ],
        },
      ],
    });

    watch(templates, () =>
      templates.selected?.showTemplateName
        ? null
        : (templates.newTemplateName = "")
    );

    templates.selected = templates.list[0];
    templates.list.find((item) => item.value == 1).selectedFields =
      selectedImportStuffFields;
    templates.list.find((item) => item.value == 0).selectedFields =
      selectedImportStuffFields;

    const selectTempate = (option) => (templates.selected = option);

    onMounted(async () => {
      const { templates: importStuffTemplates } = await store.dispatch(
        "importStuffTemplates"
      );
      importStuffTemplates.map((template) => {
        template.showTemplateName = false;
        template.value = Math.round(Math.random() * 100000);
        template.selectedFields?.map((field) => (field.value = field.code));
        templates.list.push(template);
      });
    });

    const isSavedTemplate = computed(
      () => templates.selected.value !== 0 && templates.selected.value !== 1
    );

    const gridRef = ref(null);

    const importStuff = computed(() => store.state.products.importStuff);
    const tableData = computed(() => {
      return importStuff.value.data;
    });
    const gridCount = tableData.value[0].length;
    fillSelectedImportStuffFields(gridCount);

    const toggleShowOptions = (value) => {
      value
        ? (gridRef.value.style.overflowX = "hidden")
        : (gridRef.value.style.overflowX = "scroll");
    };

    const checkIsSavedTemplate = () => {
      if (isSavedTemplate.value) {
        templates.newTemplateName = templates.selected.name;
        const fields = templates.selected.selectedFields;
        templates.selected = templates.list.find((item) => item.value == 1);
        templates.selected.selectedFields = fields;
      }
    };

    const selectStuffField = (option, idx) => {
      checkIsSavedTemplate();
      templates.selected.selectedFields[idx] = option;
    };

    const close = () => store.commit("openCloseImportStuff");

    const save = () => {
      const selectedFields = [];
      templates.selected.selectedFields.forEach((field, idx) => {
        const item = {
          name: field.name,
          code: field.code,
          copare: templates.selected.compares[idx] ? true : false,
        };
        selectedFields.push(item);
      });
      const params = {
        file: importStuff.value.file,
        isNewTempate: templates.selected.value == 1,
        templateName: templates.newTemplateName
          ? templates.newTemplateName
          : templates.selected.name,
        selectedFields: selectedFields,
      };
      if (isAnyCompares)
        params["addOrUpdateFields"] = addOrUpdateFields.selected;
      store.dispatch("importStart", params);
      close();
    };

    const isAnyCompares = computed(() =>
      templates.selected.compares.some((val) => val)
    );
    watch(isAnyCompares, checkIsSavedTemplate);

    const addOrUpdateFields = reactive({
      selected: { name: "только добавлять", value: "add" },
      list: [
        { name: "только добавлять", value: "only add" },
        { name: "только обновлять", value: "only update" },
        { name: "добавлять и обновлять", value: "add and update" },
      ],
      select: (option) => (addOrUpdateFields.selected = option),
    });

    return {
      gridCount,
      templates,
      selectTempate,
      close,
      toggleShowOptions,
      gridRef,
      tableData,
      selectStuffField,
      selectedImportStuffFields,
      importStuffFields,
      save,
      isAnyCompares,
      addOrUpdateFields,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  pointer-events: all;
  z-index: 9999;
  width: fit-content;
  max-width: 70%;
  @include font(400, 16px);
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  outline: 0;
  box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
  text-align: left;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    padding: 12px 32px;
    border-bottom: 2px solid #dee2e6;
    > h1 {
      margin: 0;
      @include font(500, 20px);
    }
    .cross {
      background-color: transparent;
      width: 16px;
      height: 16px;
      transition: transform 0.15s ease-in-out;
      @include bg_image("@/assets/cross_black.svg", 100% 100%);
    }
    .cross:hover {
      transform: rotate(90deg);
    }
  }
  .main {
    padding: 32px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .template {
        display: flex;
        flex-direction: row;
        gap: 16px;
        .input {
          width: 50%;
        }
      }
      .compare {
      }
    }
    .table {
      border-collapse: collapse;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(v-bind(gridCount), auto);
      // max-width: 100vw;
      overflow-x: scroll;
      overflow-y: visible;
      // overflow: scroll;
      .title {
        @include font(700, 16px);
        background-color: rgba(0, 0, 0, 0.1) !important;
        padding-bottom: 20px !important;
        text-align: center !important;
      }
      .item {
        padding: 12px 16px;
        border: 1px solid #c9c9c9;
        text-align: left;
        > .v-select {
          min-width: 100px;
          width: fit-content;
        }
        > .checkbox + label {
          margin-top: 8px;
        }
        > .checkbox {
          left: 50vw;
          top: 50vh;
        }
      }
    }
  }
  .footer {
    border-top: 2px solid #dee2e6;
    padding: 12px 32px;
    display: flex;
    justify-content: end;
  }
}
.backdrop {
  background-color: transparent;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 800;
}
</style>
