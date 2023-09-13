<template>
  <div class="bgc">
    <button
      class="bg-slate-400 bg-opacity-90 p-2 h-fit w-fit rounded-xl absolute left-0 hover:shadow-sm hover:drop-shadow-md outline-none focus-visible:drop-shadow-md"
      @click="close()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 18h3.75a5.25 5.25 0 1 0 0-10.5H5M7.5 4L4 7.5L7.5 11"
        />
      </svg>
    </button>
    <div class="container">
      <div class="header">
        <div class="top">
          <label>Настройка статусов</label>
        </div>
      </div>
      <div class="content">
        <table class="rows">
          <tr class="row">
            <th class="item item_field title">
              <div class="copy_fields">
                <span>Название</span>
              </div>
            </th>
            <th class="item item_type">Статус</th>
            <th class="item" />
          </tr>

          <tr
            class="row"
            :class="{ load: is_loading }"
            v-for="{ statuses, statusesIsChange, saveStatuses } in statusesList"
            :key="statuses.id"
          >
            <td class="item">
              <input
                type="text"
                class="input new_item_input"
                v-model="statuses.name"
              />
            </td>
            <td class="item selectors">
              <div class="type_selector_options pt-6">
                <transition-group name="list" mode="out-in">
                  <template
                    v-for="(stat, idx) in statuses.list"
                    :key="stat.value"
                  >
                    <div
                      class="type_selector_option gap-2"
                      v-if="stat.type !== 3"
                    >
                      <div class="grid grid-cols-2 min-w-[40px]">
                        <template v-if="!stat.is_system">
                          <button
                            class="up leading-[1] h-min flex justify-center items-center w-fit"
                            @click="statuses.sort(idx, 'up')"
                            v-if="idx !== 1"
                          >
                            <span
                              class="material-icons-outlined text-[#757575]"
                            >
                              expand_less
                            </span>
                          </button>
                          <div v-else></div>
                          <button
                            class="down leading-[1] h-min flex justify-center items-center w-fit"
                            @click="statuses.sort(idx, 'down')"
                            v-if="statuses.list[idx + 1].sort < 100"
                          >
                            <span
                              class="material-icons-outlined rotate-180 text-[#757575]"
                            >
                              expand_less
                            </span>
                          </button>
                          <div v-else></div>
                        </template>
                      </div>
                      <input type="text" class="input" v-model="stat.name" />
                      <div class="relative">
                        <div
                          v-if="idx === 0"
                          class="absolute -top-full -translate-y-2 left-1/2 -translate-x-1/2 text-slate-600"
                          title="Резервация"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                          >
                            <g
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-width="1.5"
                            >
                              <path
                                d="M21 7v-.63c0-1.193 0-1.79-.158-2.27a3.045 3.045 0 0 0-1.881-1.937C18.493 2 17.914 2 16.755 2h-9.51c-1.159 0-1.738 0-2.206.163a3.046 3.046 0 0 0-1.881 1.936C3 4.581 3 5.177 3 6.37V15m18-4v9.374c0 .858-.985 1.314-1.608.744a.946.946 0 0 0-1.284 0l-.483.442a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0l-.483-.442a.946.946 0 0 0-1.284 0c-.623.57-1.608.114-1.608-.744V19"
                              />
                              <path
                                stroke-linejoin="round"
                                d="m9.5 10.4l1.429 1.6L14.5 8"
                              />
                              <path d="M7.5 15.5H9m7.5 0H12" />
                            </g>
                          </svg>
                        </div>
                        <input
                          type="checkbox"
                          class="checkbox"
                          :id="idx + 'nb1' + statuses.id"
                          :disabled="stat.sort > 99"
                          :checked="statuses.reservation.includes(stat.value)"
                          @change="
                            statuses.changeVal('reservation', stat.value)
                          "
                        />

                        <label :for="idx + 'nb1' + statuses.id"></label>
                      </div>
                      <div class="relative">
                        <div
                          v-if="idx === 0"
                          class="absolute -top-full -translate-y-2 left-1/2 -translate-x-1/2 text-slate-600"
                          title="Списание"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-width="1.5"
                              d="m14 8l-4 4m0-4l4 4m-6.5 3.5H9m7.5 0H12M21 7v-.63c0-1.193 0-1.79-.158-2.27a3.045 3.045 0 0 0-1.881-1.937C18.493 2 17.914 2 16.755 2h-9.51c-1.159 0-1.738 0-2.206.163a3.046 3.046 0 0 0-1.881 1.936C3 4.581 3 5.177 3 6.37V15m18-4v9.374c0 .858-.985 1.314-1.608.744a.946.946 0 0 0-1.284 0l-.483.442a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0l-.483-.442a.946.946 0 0 0-1.284 0c-.623.57-1.608.114-1.608-.744V19"
                            />
                          </svg>
                        </div>
                        <input
                          type="checkbox"
                          class="checkbox"
                          :id="idx + 'nb2' + statuses.id"
                          :disabled="statuses.resIdx > idx - 1"
                          :checked="statuses.write_off === stat.value"
                          @change="statuses.changeVal('write_off', stat.value)"
                        />

                        <label :for="idx + 'nb2' + statuses.id"></label>
                      </div>
                      <button
                        class="del_button"
                        :style="{
                          visibility: stat.is_system ? 'hidden' : 'visible',
                        }"
                        @click="statuses.del(stat.id)"
                      ></button>
                    </div>
                  </template>
                </transition-group>
                <button @click="statuses.add()" class="add_button"></button>
              </div>
            </td>
            <td class="item del_sell">
              <button
                @click="addStatuses()"
                v-if="!statuses.isNew"
                class="add_new_button"
                style="position: static; width: 18px; height: 18px"
              ></button>
              <button
                v-else
                class="del_btn"
                @click="removeStatuses(statuses.id)"
              />
              <button
                class="btn btn_save btn_blue"
                v-if="statusesIsChange"
                @click="saveStatuses()"
              >
                Сохранить
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { useStatusesForEntities } from "@/composables/statusesForEntities";
import { onMounted, reactive } from "vue";
export default {
  components: {},
  setup(props, context) {
    onMounted(() => {
      setStatuses();
    });

    const setStatuses = async () => {
      const stats = await store.dispatch("ordersPipelinesList", {});
      stats.forEach((stat) => stat.statuses.map((s) => (s.value = s.id)));
      statusesList.length = 0;
      stats.forEach((stat) =>
        statusesList.push(useStatusesForEntities(stat, setStatuses))
      );
    };
    const statusesList = reactive([]);
    const addStatuses = async () => {
      await store.dispatch("ordersPipelinesAdd", { name: "Статус" });
      setStatuses();
    };
    const removeStatuses = async (id) => {
      await store.dispatch("ordersPipelinesDelete", { id: id });
      setStatuses();
    };

    const close = () => context.emit("toggleStatuses");

    return { statusesList, addStatuses, removeStatuses, close };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";

.bgc {
  position: relative;
  width: 100%;
  background-color: #fff;
  background-clip: padding-box;
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
        padding-bottom: 16px;
        label {
          @include font(500, 28px);
        }
      }
    }
    .content {
      .rows {
        border: 1px solid #c9c9c9;
        border-collapse: collapse;
        // width: min-content;
        .title {
          font-size: 16px;
        }
        .row:first-child {
          .item {
            padding-bottom: 20px;
            text-align: center;
          }
          .item:last-child {
            position: relative;
          }
        }
        .load {
          filter: blur(5px);
          user-select: none;
        }
        .row {
          .box {
            text-align: center !important;
          }
          .btn_save_all {
            white-space: nowrap;
            position: absolute;
            right: 0;
            top: -75%;
            height: min-content;
            width: min-content;
            @include font(400, 12px);
          }
          .item {
            padding: 10px;
            border: 1px solid #c9c9c9;
            text-align: left;
            .copy_fields {
              display: flex;
              gap: 10px;
              .v-select {
                :deep(.title) {
                  height: 28px !important;
                }
                :deep(.options) {
                  margin-top: 8px;
                }
              }
            }
            .error {
              border-color: rgba(219, 54, 71);
              box-shadow: 0 0 0 4px rgba(219, 54, 71, 0.25);
            }
          }
          .item_field {
            width: 30%;
            text-align: center;
          }
          .item_type {
            width: 50%;
            // min-width: 280px;
          }
          .item_icon {
            text-align: center;
            min-width: 60px;
            max-width: 60px;
          }
          .item:last-child {
            width: 0.1%;
            max-width: 54px;
            border-right: none;
            min-width: 34px;
          }
          .new_item_input {
          }
          .del_btn {
            height: 18px;
            width: 18px !important;
            cursor: pointer;
            background: #dc3545;
            border: none;
            border-radius: 4px;
            @include bg_image("@/assets/cross.svg", 50%);
          }
          .selectors {
            .v-select {
              width: 100% !important;
              :deep(.title) {
                width: 100% !important;
              }
              :deep(.options) {
                text-align: left;
              }
            }
            .type_selector_options {
              display: flex;
              flex-direction: column;
              margin-top: 5px;
              gap: 5px;
              .type_selector_option {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                .input {
                  width: calc(100% - 30px);
                  height: 24px !important;
                  @include font(400, 14px, 18px);
                }
                .del_button {
                  cursor: pointer;
                  width: 18px;
                  height: 18px;
                  min-width: 18px;
                  background: #dc3545;
                  border: none;
                  border-radius: 4px;
                  @include bg_image("@/assets/cross.svg", 50%);
                }
              }
              .add_button {
                cursor: pointer;
                margin-top: 8px;
                width: 40px;
                height: 20px;
                background: #4e964d;
                border: none;
                border-radius: 4px;
                @include bg_image("@/assets/plus.svg", 30%);
              }
            }
          }
        }
      }
      .add_new_button {
        cursor: pointer;
        margin-top: 8px;
        position: absolute;
        right: 4px;
        width: 34px;
        height: 34px;
        background: #4e964d;
        border: none;
        border-radius: 4px;
        @include bg_image("@/assets/plus.svg", 50%);
      }
      .input {
        // height: 34px;
        padding: 6px 12px;
        background-color: white;
        border: 1px solid #ced4da;
        appearance: none;
        border-radius: 4px;
        transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        @include font(400, 16px, 20px);
      }
      .input:focus {
        color: #212529;
        background-color: white;
        border-color: #86b7fe;
        outline: 0;
        box-shadow: 0 0 0 4px rgb(13 110 253 / 25%);
      }
      .del_sell {
        position: relative;
        .btn_save {
          position: absolute;
          color: #000;
          left: 110%;
          top: calc(50% - 15px);
          height: min-content;
          width: min-content;
          @include font(400, 12px);
        }
      }
      .bar_item_icon {
        margin: 0 auto;
        height: 16px;
        width: 16px;
        background-color: transparent;
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
      .checkbox + label::before {
        width: 1em;
        height: 1em;
        background-color: #fff;
        border: 1px solid #adb5bd;
        margin-right: 0;
      }
      .checkbox:checked + label::before {
        border-color: #0b76ef;
        background-color: #0b76ef;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
      }
      .checkbox:not(:disabled):active + label::before {
        background-color: #b3d7ff;
        border-color: #b3d7ff;
      }
      .checkbox:disabled + label::before {
        background-color: #e9ecef;
        border-color: #b3d7ff;
        cursor: default;
      }
      @keyframes fadeIn {
        0% {
          opacity: 0;
          transform: scale(0.5) translateY(-50%);
        }
        50% {
          transform: scaleX(1.2) translateY(-50%);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(-50%);
        }
      }
      @keyframes fadeOut {
        0% {
          opacity: 1;
          transform: scale(1) translateY(-50%);
        }
        50% {
          opacity: 0.8;
          transform: scaleX(1.2) translateY(-50%);
        }
        80% {
          opacity: 0.5;
        }
        100% {
          opacity: 0;
          transform: scale(0.5) translateY(-50%);
        }
      }
      .in {
        transform-origin: center;
        animation: fadeIn 0.1s ease-out forwards;
      }
      .out {
        transform-origin: center;
        animation: fadeOut 0.15s ease-out forwards;
      }
    }
    .footer {
      display: flex;
      justify-content: end;
      margin-top: 60px;
    }
  }
}

.input {
  background-color: white;
  border: none;
  border-bottom: 1px solid #ced4da;
  appearance: none;
}
.input:focus {
  color: #212529;
  background-color: white;
  border-color: #86b7fe;
  outline: 0;
  // box-shadow: 0 0 0 4px rgb(13 110 253 / 25%);
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}
.list-leave-active {
  position: absolute;
}
</style>
