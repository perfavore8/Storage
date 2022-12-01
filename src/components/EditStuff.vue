<template>
  <div class="wrapper">
    <div class="bgc">
      <div class="container">
        <div class="header">
          <div class="top">
            <label>Настройки товаров</label>
            <btns-save-close @close="close_edit_stuff" @save="save">
              <template v-slot:close>Назад</template>
            </btns-save-close>
          </div>
          <br />
          <div class="bottom">
            <div class="permits">
              <div class="permit">
                <input
                  type="checkbox"
                  class="checkbox"
                  id="q1"
                  v-model="copyConfing.allow_add_reserve"
                />
                <label for="q1"
                  >Разрешать добавлять товары из резерва в другие сделки</label
                >
              </div>
              <div class="permit">
                <input
                  type="checkbox"
                  class="checkbox"
                  id="q2"
                  v-model="copyConfing.allow_change_price"
                />
                <label for="q2"
                  >Изменить цену у товаров в открытых сделках (по
                  умолчанию)</label
                >
              </div>
              <div class="permit">
                <input
                  type="checkbox"
                  class="checkbox"
                  id="q3"
                  v-model="copyConfing.allow_add_with_zero_count"
                />
                <label for="q3"
                  >Разрешать добавлять в сделки товар с нулевым остатком</label
                >
              </div>
            </div>
            <div class="sync">
              <label>Синхронизация товаров на складе с товарами amoCRM</label>
              <div class="list">
                <div class="label_input">
                  <label
                    >Выберите список товаров из amoCRM для синхронизации</label
                  >
                  <SelectorVue
                    :options_props="sync_list_stuff_options"
                    @select="option_select_sync_list_stuff"
                    :selected_option="sync_list_stuff_selected_option"
                  />
                </div>
                <div class="label_input">
                  <label
                    >Скрытие штатной вкладки amoCRM с товарами. В штатной
                    вкладке с товарами так же можно прикреплять товары к
                    сделкам, но количество товара на складе учитываться
                    учитываться не будет.</label
                  >
                  <SelectorVue
                    :options_props="sync_list_hide_tab_options"
                    @select="option_select_sync_list_hide_tab"
                    :selected_option="sync_list_hide_tab_selected_option"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <h6>Этапы резервирования товаров со склада</h6>
          <div class="small">
            Внимание! В рамках одной воронки этап резерирования должен быть
            раньше этапа списания. Если этап презервирования не выбран, то
            резерирование будет происходить в момент добавления товара в сделку.
          </div>
          <div class="steps">
            <div
              class="label_input"
              v-for="item in copyPipelinesList"
              :key="item"
            >
              <label> Воронка "{{ item?.name }}" </label>
              <SelectorVue
                :options_props="item?.statuses"
                @select="optionSelect"
                :selected_option="item.selectedReserveOff"
              />
            </div>
          </div>
          <h6>Этапы списания товаров со склада</h6>
          <div class="small">
            Внимание! В рамках одной воронки этап списания должен быть позже
            этапа резерирования.
          </div>
          <div class="steps">
            <div
              class="label_input"
              v-for="item in copyPipelinesList"
              :key="item"
            >
              <label> Воронка "{{ item?.name }}" </label>
              <SelectorVue
                :options_props="item?.statuses"
                @select="optionSelect"
                :selected_option="item.selectedWriteOff"
              />
            </div>
          </div>
          <h6>Привязка полей сделок</h6>
          <div class="steps">
            <div
              class="label_input"
              v-for="item in copyLeadFieldsList"
              :key="item"
            >
              <label> Поле "{{ item?.name }}" </label>
              <SelectorVue
                :options_props="item?.fields"
                @select="optionSelect"
                :selected_option="item?.selected"
              />
            </div>
          </div>
        </div>
        <div class="footer">
          <btns-save-close @close="close_edit_stuff" @save="save">
            <template v-slot:close>Назад</template>
          </btns-save-close>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SelectorVue from "@/components/SelectorVue";
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
export default {
  components: {
    SelectorVue,
    BtnsSaveClose,
  },
  data() {
    return {
      copyConfing: {
        reserve_off: [],
        write_off: [],
      },
      copyPipelinesList: [],
      copyLeadFieldsList: [],
    };
  },
  async mounted() {
    await this.$store.dispatch("get_account");
    this.copyConfing = this.$store.state.account.account.config;
    await this.$store.dispatch("getPipelinesList");
    this.copyPipelinesList = this.pipelinesList;
    await this.$store.dispatch("getLeadFieldsList");
    this.copyLeadFieldsList = this.leadFieldsList;
    this.searchSelectedPipelines();
  },
  computed: {
    pipelinesList() {
      const list = [];
      Object.entries(this.$store.state.account.pipelinesList).map((val) => {
        const arr = [];
        Object.entries(val[1].statuses).forEach((stat) =>
          arr.push({ name: stat[1], value: stat[0] })
        );
        val[1].statuses = arr;
        val[1].selectedReserveOff = { name: "Не выбрано", value: -1 };
        val[1].selectedWriteOff = { name: "Не выбрано", value: -1 };
        list.push({ value: val[0], ...val[1] });
      });
      return list;
    },
    leadFieldsList() {
      const list = [];
      Object.entries(this.$store.state.account.leadFieldsList).map((val) => {
        const arr = [];
        Object.entries(val[1].fields).forEach((stat) =>
          arr.push({ name: stat[1], value: stat[0] })
        );
        val[1].fields = arr;
        val[1].selected = { name: "Не выбрано", value: -1 };
        list.push({ value: val[0], ...val[1] });
      });
      return list;
    },
  },
  methods: {
    close_edit_stuff() {
      this.$store.commit("open_close_show_edit_stuff", false);
    },
    searchSelectedInArr(item, arr, code) {
      let res = { name: "Не выбрано", value: -1 };
      arr.forEach((val) => {
        if (val[code] == item) res = val;
      });
      return res;
    },
    searchSelectedPipelines() {
      this.copyPipelinesList.map((val) => {
        if (this.copyConfing.reserve_off[val.value])
          val.selectedReserveOff = this.searchSelectedInArr(
            this.copyConfing.reserve_off[val.value],
            val.statuses,
            "value"
          );
        if (this.copyConfing.write_off[val.value])
          val.selectedWriteOff = this.searchSelectedInArr(
            this.copyConfing.write_off[val.value],
            val.statuses,
            "value"
          );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  pointer-events: all;
  z-index: 9999999;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  .bgc {
    width: 80%;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    margin: 30px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    .container {
      text-align: left;
      width: 80%;
      margin: 30px auto;
      display: flex;
      flex-direction: column;
      .header {
        display: flex;
        flex-direction: column;
        justify-content: start;
        .top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: 1px solid #c9c9c9;
          padding-bottom: 10px;
          label {
            @include font(500, 28px);
          }
        }
        .bottom {
          display: flex;
          flex-direction: column;
          gap: 16px;
          .permits {
            display: flex;
            flex-direction: column;
            gap: 10px;
            .permit {
              label {
                @include font(400, 16px);
              }
            }
          }
          .sync {
            label {
              @include font(500, 16px);
            }
            .list {
              padding: 15px;
              border: 1px solid #c9c9c9;
              border-radius: 5px;
              margin-top: 10px;
              display: flex;
              flex-direction: column;
              gap: 10px;
              .label_input {
                display: flex;
                flex-direction: column;
                gap: 5px;
                label {
                  @include font(400, 14px);
                }

                .v-select {
                  width: calc(100% - 26px) !important;
                  margin-right: 24px;
                  :deep(.title) {
                    width: 100% !important;
                  }
                  :deep(.options) {
                    width: calc(100% + 24px) !important;
                    text-align: left;
                    p {
                      width: calc(100% - 24px) !important;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .content {
        @include font(400, 16px);
        h6 {
          @include font(500, 16px);
        }
        .small {
          @include font(400, 14px);
        }
        .steps {
          display: flex;
          flex-direction: column;
          border: 1px solid #c9c9c9;
          border-radius: 4px;
          margin-top: 30px;
          padding: 10px;
          .label_input {
            display: flex;
            flex-direction: row;
            padding: 10px;
            label {
              width: 40%;
            }
            .v-select {
              width: calc(50% - 26px);
              margin-right: 24px;
              :deep(.title) {
                width: 100%;
              }
              :deep(.options) {
                width: calc(100% + 24px);
                text-align: left;
                p {
                  width: calc(100% - 24px);
                }
              }
            }
          }
        }
      }
      .footer {
        display: flex;
        justify-content: end;
        margin-top: 40px;
      }
    }
  }
}
.checkbox:disabled + label::before {
  background-color: #e9ecef;
  border-color: #b3d7ff;
  cursor: default;
}
</style>
