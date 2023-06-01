import store from "@/store";
import { ref } from "vue";
import { reactive, computed } from "vue";

export function useStatusesForEntities(stat, setStatuses) {
  const statuses = reactive({
    id: stat.id,
    name: stat.name,
    isNew: !stat.is_system,
    list: stat.statuses,
    reservation: [],
    write_off: 2,
    resIdx: computed(() =>
      statuses.list.indexOf(
        [...statuses.list]
          .reverse()
          .find((el) => statuses.reservation.includes(el.value))
      )
    ),
    woIdx: computed(() =>
      statuses.list.indexOf(
        statuses.list.find((el) => el.value === statuses.write_off)
      )
    ),
    add: async function () {
      await store.dispatch("ordersPipelinesStatusesAdd", {
        pipeline_id: this.id,
        name: "новый статус",
        sort: this.list.at(-4).sort + 1,
      });
      setStatuses();
    },
    del: function (id) {
      store.dispatch("ordersPipelinesStatusesDelete", { id: id });
      setStatuses();
    },
    changeVal: function (field, val) {
      if (field === "reservation") {
        if (this.resIdx > this.woIdx) this.write_off = null;
        const idx = this.reservation.indexOf(val);
        if (idx > -1) {
          this.reservation.splice(idx, 1);
        } else {
          this.reservation.push(val);
        }
      } else {
        if (this[field] === val) {
          this[field] = null;
        } else {
          this[field] = val;
        }
      }
    },
  });

  statuses.reservation.push(
    statuses.list.find((el) => el.name === "Открытый").id
  );
  statuses.write_off = statuses.list.find((el) => el.name === "Успешный").id;

  const copyName = ref("");
  const setCopy = () => {
    statuses.list.map((stat) => {
      const copyStatName = stat.name;
      const copyStatSort = stat.sort;
      stat.statNameIsChange = computed(() => stat.name != copyStatName);
      stat.statSortIsChange = computed(() => stat.sort != copyStatSort);
    });
    copyName.value = JSON.parse(JSON.stringify(statuses.name));
  };
  setCopy();

  const statusesIsChange = computed(
    () => nameIsChange.value || statsIsChange.value
  );

  const nameIsChange = computed(() => copyName.value != statuses.name);

  const statsIsChange = computed(() =>
    statuses.list.some((stat) => stat.statNameIsChange || stat.statSortIsChange)
  );

  const saveStatuses = () => {
    if (!nameIsChange.value && !statsIsChange.value) return;
    if (nameIsChange.value)
      store.dispatch("ordersPipelinesUpdate", {
        id: statuses.id,
        name: statuses.name,
      });
    if (statsIsChange.value) {
      const params = [];
      statuses.list.forEach((stat) => {
        if (!stat.statNameIsChange && !stat.statSortIsChange) return;
        const obj = { id: stat.id };
        if (stat.statNameIsChange) obj.name = stat.name;
        if (stat.statSortIsChange) obj.sort = stat.sort;
        params.push(obj);
      });
      store.dispatch("ordersPipelinesStatusesUpdate", { statuses: params });
    }
    setCopy();
  };

  return {
    statuses,
    statusesIsChange,
    nameIsChange,
    statsIsChange,
    saveStatuses,
  };
}
