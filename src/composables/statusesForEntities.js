import { reactive, computed } from "vue";

export function useStatusesForEntities(isNew) {
  const statuses = reactive({
    id: Math.round(Math.random() * 10 ** 9),
    name: "Статус",
    list: [
      { name: "Открытый", value: 0, base: true },
      { name: "Успешный", value: 1, base: true },
      { name: "Отменен", value: 2, base: true },
      { name: "Удален", value: 3, base: true },
    ],
    reservation: 0,
    write_off: 1,
    resIdx: computed(() =>
      statuses.list.indexOf(
        statuses.list.find((el) => el.value === statuses.reservation)
      )
    ),
    woIdx: computed(() =>
      statuses.list.indexOf(
        statuses.list.find((el) => el.value === statuses.write_off)
      )
    ),
    add: function () {
      this.list.splice(1, 0, {
        name: "",
        value: Math.round(Math.random() * 10 ** 9),
      });
    },
    del: function (idx) {
      this.list.splice(idx, 1);
    },
    changeVal: function (field, val) {
      if (this[field] === val) {
        this[field] = null;
      } else {
        this[field] = val;
      }
      if (field === "reservation") {
        if (this.resIdx > this.woIdx) this.write_off = null;
      }
    },
  });

  if (isNew) statuses.isNew = true;

  const copyStatuses = JSON.parse(JSON.stringify(statuses));
  const statusesIsChange = computed(
    () => JSON.stringify(copyStatuses) != JSON.stringify(statuses)
  );

  return { statuses, copyStatuses, statusesIsChange };
}
