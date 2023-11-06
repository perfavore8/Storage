import store from "@/store";
import { ref } from "vue";
import { reactive, computed } from "vue";
import { useLangConfiguration } from "./langConfiguration";

export function useStatusesForEntities(stat, setStatuses) {
  const { t } = useLangConfiguration();

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
        name: t("SettingEntities.entStats.new"),
        sort: this.list.at(-4).sort + 1,
      });
      await setStatuses(true);
    },
    del: async function (id) {
      await store.dispatch("ordersPipelinesStatusesDelete", { id: id });
      await setStatuses(true);
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
    sort: function (idx, sort) {
      const prev = idx - 1;
      const next = idx + 1;
      const curSort = this.list[idx].sort;
      const curItem = this.list[idx];
      if (sort === "up" && this.list[prev].sort !== undefined) {
        this.list[idx].sort = this.list[prev].sort;
        this.list[prev].sort = curSort;
        this.list[idx] = this.list[prev];
        this.list[prev] = curItem;
      }
      if (sort === "down" && this.list[next].sort < 100) {
        this.list[idx].sort = this.list[next].sort;
        this.list[next].sort = curSort;
        this.list[idx] = this.list[next];
        this.list[next] = curItem;
      }
    },
  });

  const systemsStatuses = statuses.list.filter((stat) => stat.is_system);
  statuses.reservation.push(systemsStatuses[0]?.id);
  statuses.write_off = systemsStatuses[1]?.id;

  const setSteps = () => {
    const reservation = [];
    statuses.list.forEach((stat) => {
      if (stat.is_write_off) statuses.write_off = stat.id;
      if (stat.is_reserve) reservation.push(stat.id);
    });
    if (reservation.length) statuses.reservation = reservation;
  };
  setSteps();

  const copyName = ref("");
  const copyReserveAndWriteOff = ref([]);
  const setCopy = () => {
    statuses.list.map((stat) => {
      const copyStatName = stat.name;
      const copyStatSort = stat.sort;
      stat.statNameIsChange = computed(() => stat.name != copyStatName);
      stat.statSortIsChange = computed(() => stat.sort != copyStatSort);
    });
    copyName.value = JSON.parse(JSON.stringify(statuses.name));
    copyReserveAndWriteOff.value = JSON.parse(
      JSON.stringify([statuses.reservation, statuses.write_off])
    );
  };
  setCopy();

  const statusesIsChange = computed(
    () => nameIsChange.value || statsIsChange.value
  );

  const nameIsChange = computed(() => copyName.value != statuses.name);

  const statsIsChange = computed(
    () =>
      statuses.list.some(
        (stat) => stat.statNameIsChange || stat.statSortIsChange
      ) || stepsIsChange.value
  );
  const stepsIsChange = computed(
    () =>
      JSON.stringify(copyReserveAndWriteOff.value) !=
      JSON.stringify([statuses.reservation, statuses.write_off])
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
        if (
          !stat.statNameIsChange &&
          !stat.statSortIsChange &&
          !stepsIsChange.value
        )
          return;
        const obj = { id: stat.id };
        if (stat.statNameIsChange) obj.name = stat.name;
        if (stat.statSortIsChange) obj.sort = stat.sort;
        if (stepsIsChange.value) {
          obj.is_write_off = Number(stat.id == statuses.write_off);
          obj.is_reserve = Number(statuses.reservation.includes(stat.id));
        }
        params.push(obj);
      });
      store.dispatch("ordersPipelinesStatusesUpdate", { statuses: params });
    }
    setCopy();
  };

  const delErrorText = ref("");

  return {
    statuses,
    statusesIsChange,
    nameIsChange,
    statsIsChange,
    saveStatuses,
    delErrorText,
  };
}
