import { computed, reactive, ref, watch } from "vue";
import { useLangConfiguration } from "./langConfiguration";

export function useSystems() {
  const { t } = useLangConfiguration();

  const systems = reactive([
    {
      id: 0,
      name: "amoCRM",
      value: "amoCRM",
      filtersList: [
        {
          id: 1235674,
          name: "entities",
          type: "AppInputSelect",
          value: "",
          minLength: 0,
          show: {
            value: true,
          },
          placeholder: t("Analytics.systemsForReports.entities.placeholder"),
          selected: {},
          list: [
            {
              name: t("Analytics.systemsForReports.entities.trade"),
              value: "trade",
            },
            {
              name: t("Analytics.systemsForReports.entities.contact"),
              value: "contact",
            },
            {
              name: t("Analytics.systemsForReports.entities.company"),
              value: "company",
            },
          ],
        },
        {
          id: 0,
          name: "data",
          type: "AppInputSelect",
          value: "",
          minLength: 0,
          show: {
            value: computed(() => isValueSelected(1235674, "any")),
          },
          placeholder: t("Analytics.systemsForReports.data.placeholder"),
          selected: {},
          list: [
            {
              name: t("Analytics.systemsForReports.data.event"),
              value: "event",
            },
            { name: t("Analytics.systemsForReports.data.data"), value: "data" },
          ],
        },
        {
          id: 1,
          name: "trade",
          type: "AppInputSelect",
          value: "",
          minLength: 0,
          show: {
            value: computed(
              () =>
                isValueSelected(1235674, "trade") && isValueSelected(0, "event")
            ),
          },
          placeholder: t("Analytics.systemsForReports.trade.placeholder"),
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.trade.1"), value: 1 },
            { name: t("Analytics.systemsForReports.trade.2"), value: 2 },
            { name: t("Analytics.systemsForReports.trade.3"), value: 3 },
            { name: t("Analytics.systemsForReports.trade.4"), value: 4 },
            { name: t("Analytics.systemsForReports.trade.5"), value: 5 },
            { name: t("Analytics.systemsForReports.trade.6"), value: 6 },
            { name: t("Analytics.systemsForReports.trade.7"), value: 7 },
          ],
        },
        // {
        //   id: 111111,
        //   name: "stepStart",
        //   value: "",
        //   minLength: 0,
        //   show: {
        //     value: false,
        //     data: [
        //       { id: 1, value: 2 },
        //       { id: 0, value: "event" },
        //       { id: 1235674, value: "trade" },
        //     ],
        //   },
        //   placeholder: "С какого этапа",
        //   selected: {},
        //   list: [
        //     { name: "Этап 1", value: 1 },
        //     { name: "Этап 2", value: 2 },
        //     { name: "Этап 3", value: 3 },
        //     { name: "Этап 4", value: 4 },
        //     { name: "Этап 5", value: 5 },
        //     { name: "Этап 6", value: 6 },
        //     { name: "Этап 7", value: 7 },
        //   ],
        // },
        // {
        //   id: 111112,
        //   name: "stepEnd",
        //   value: "",
        //   minLength: 0,
        //   show: {
        //     value: false,
        //     data: [
        //       { id: 1, value: 2 },
        //       { id: 0, value: "event" },
        //       { id: 1235674, value: "trade" },
        //     ],
        //   },
        //   placeholder: "На какой этап",
        //   selected: {},
        //   list: [
        //     { name: "Этап 1", value: 1 },
        //     { name: "Этап 2", value: 2 },
        //     { name: "Этап 3", value: 3 },
        //     { name: "Этап 4", value: 4 },
        //     { name: "Этап 5", value: 5 },
        //     { name: "Этап 6", value: 6 },
        //     { name: "Этап 7", value: 7 },
        //   ],
        // },
        {
          id: 2,
          name: "trade",
          type: "AppInputSelect",
          value: "",
          minLength: 0,
          show: {
            value: computed(
              () =>
                isValueSelected(1235674, "trade") && isValueSelected(0, "data")
            ),
          },
          placeholder: t("Analytics.systemsForReports.trade2.placeholder"),
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.trade2.1"), value: 1 },
            { name: t("Analytics.systemsForReports.trade2.2"), value: 2 },
            { name: t("Analytics.systemsForReports.trade2.3"), value: 3 },
            { name: t("Analytics.systemsForReports.trade2.4"), value: 4 },
            { name: t("Analytics.systemsForReports.trade2.5"), value: 5 },
            { name: t("Analytics.systemsForReports.trade2.6"), value: 6 },
            { name: t("Analytics.systemsForReports.trade2.7"), value: 7 },
          ],
        },
        {
          id: 3,
          name: "contact",
          type: "AppInputSelect",
          value: "",
          minLength: 0,
          show: {
            value: computed(
              () =>
                isValueSelected(1235674, "contact") &&
                isValueSelected(0, "event")
            ),
          },
          placeholder: t("Analytics.systemsForReports.contact.placeholder"),
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.contact.1"), value: 1 },
            { name: t("Analytics.systemsForReports.contact.2"), value: 2 },
            {
              name: t("Analytics.systemsForReports.contact.3"),
              value: 3,
            },
            { name: t("Analytics.systemsForReports.contact.4"), value: 4 },
            { name: t("Analytics.systemsForReports.contact.5"), value: 5 },
            { name: t("Analytics.systemsForReports.contact.6"), value: 6 },
            { name: t("Analytics.systemsForReports.contact.7"), value: 7 },
            { name: t("Analytics.systemsForReports.contact.8"), value: 8 },
            { name: t("Analytics.systemsForReports.contact.9"), value: 9 },
          ],
        },
        {
          id: 4,
          name: "contact",
          type: "AppInputSelect",
          value: "",
          minLength: 0,
          show: {
            value: computed(
              () =>
                isValueSelected(1235674, "contact") &&
                isValueSelected(0, "data")
            ),
          },
          placeholder: t("Analytics.systemsForReports.contact4.placeholder"),
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.contact4.1"), value: 1 },
            { name: t("Analytics.systemsForReports.contact4.2"), value: 2 },
            { name: t("Analytics.systemsForReports.contact4.3"), value: 3 },
            { name: t("Analytics.systemsForReports.contact4.4"), value: 4 },
            { name: t("Analytics.systemsForReports.contact4.5"), value: 5 },
            { name: t("Analytics.systemsForReports.contact4.6"), value: 6 },
            { name: t("Analytics.systemsForReports.contact4.7"), value: 7 },
            { name: t("Analytics.systemsForReports.contact4.8"), value: 8 },
            { name: t("Analytics.systemsForReports.contact4.9"), value: 9 },
            { name: t("Analytics.systemsForReports.contact4.10"), value: 10 },
          ],
        },
        {
          id: 5,
          name: "company",
          type: "AppInputSelect",
          value: "",
          minLength: 0,
          show: {
            value: computed(
              () =>
                isValueSelected(1235674, "company") &&
                isValueSelected(0, "event")
            ),
          },
          placeholder: t("Analytics.systemsForReports.company.placeholder"),
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.company.1"), value: 1 },
            { name: t("Analytics.systemsForReports.company.2"), value: 2 },
            { name: t("Analytics.systemsForReports.company.3"), value: 3 },
            { name: t("Analytics.systemsForReports.company.4"), value: 4 },
            { name: t("Analytics.systemsForReports.company.5"), value: 5 },
            { name: t("Analytics.systemsForReports.company.6"), value: 6 },
          ],
        },
        {
          id: 6,
          name: "company",
          type: "AppInputSelect",
          value: "",
          minLength: 0,
          show: {
            value: computed(
              () =>
                isValueSelected(1235674, "company") &&
                isValueSelected(0, "data")
            ),
          },
          placeholder: t("Analytics.systemsForReports.company6.placeholder"),
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.company6.1"), value: 1 },
            { name: t("Analytics.systemsForReports.company6.2"), value: 2 },
            { name: t("Analytics.systemsForReports.company6.3"), value: 3 },
            { name: t("Analytics.systemsForReports.company6.4"), value: 4 },
            { name: t("Analytics.systemsForReports.company6.5"), value: 5 },
            { name: t("Analytics.systemsForReports.company6.6"), value: 6 },
            { name: t("Analytics.systemsForReports.company6.7"), value: 7 },
            { name: t("Analytics.systemsForReports.company6.8"), value: 8 },
            { name: t("Analytics.systemsForReports.company6.9"), value: 9 },
            { name: t("Analytics.systemsForReports.company6.10"), value: 10 },
          ],
        },
        {
          id: 7,
          name: "task",
          type: "AppInputSelect",
          value: "",
          minLength: 0,
          show: {
            value: computed(
              () =>
                isValueSelected(1235674, "contact") &&
                isValueSelected(0, "data1")
            ),
          },
          placeholder: t("Analytics.systemsForReports.task.placeholder"),
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.task.1"), value: 1 },
            { name: t("Analytics.systemsForReports.task.2"), value: 2 },
            { name: t("Analytics.systemsForReports.task.3"), value: 3 },
            { name: t("Analytics.systemsForReports.task.4"), value: 4 },
            { name: t("Analytics.systemsForReports.task.5"), value: 5 },
          ],
        },
        {
          id: 8,
          name: "task",
          type: "AppInputSelect",
          value: "",
          minLength: 0,
          show: {
            value: computed(
              () =>
                isValueSelected(1235674, "contact") &&
                isValueSelected(0, "data1")
            ),
          },
          placeholder: t("Analytics.systemsForReports.task8.placeholder"),
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.task8.1"), value: 1 },
            { name: t("Analytics.systemsForReports.task8.2"), value: 2 },
            { name: t("Analytics.systemsForReports.task8.3"), value: 3 },
            { name: t("Analytics.systemsForReports.task8.4"), value: 4 },
            { name: t("Analytics.systemsForReports.task8.5"), value: 5 },
            { name: t("Analytics.systemsForReports.task8.6"), value: 6 },
            { name: t("Analytics.systemsForReports.task8.7"), value: 7 },
            { name: t("Analytics.systemsForReports.task8.8"), value: 8 },
          ],
        },
        {
          id: 200,
          name: "date",
          type: "AppDateRange",
          value: "",
          minLength: 0,
          show: {
            value: computed(
              () =>
                (isValueSelected(1, "any") ||
                  isValueSelected(2, "any") ||
                  isValueSelected(3, "any") ||
                  isValueSelected(4, "any") ||
                  isValueSelected(5, "any") ||
                  isValueSelected(6, "any") ||
                  isValueSelected(7, "any") ||
                  isValueSelected(8, "any")) &&
                isValueSelected(0, "any") &&
                isValueSelected(1235674, "any")
            ),
          },
          placeholder: t("Analytics.systemsForReports.date.placeholder"),
          selected: "-",
          list: [],
        },
        {
          id: 201,
          name: "vortexAndPhase",
          type: "AppMultiSelect",
          value: "",
          minLength: 0,
          show: {
            value: computed(
              () =>
                (isValueSelected(1, "any") ||
                  isValueSelected(2, "any") ||
                  isValueSelected(3, "any") ||
                  isValueSelected(4, "any") ||
                  isValueSelected(5, "any") ||
                  isValueSelected(6, "any") ||
                  isValueSelected(7, "any") ||
                  isValueSelected(8, "any")) &&
                isValueSelected(0, "any") &&
                isValueSelected(1235674, "any")
            ),
          },
          placeholder: t(
            "Analytics.systemsForReports.vortexAndPhase.placeholder"
          ),
          selected: {},
          list: [
            {
              name: t("Analytics.systemsForReports.vortexAndPhase.all"),
              value: "all",
              selected: false,
            },
            {
              name: t("Analytics.systemsForReports.vortexAndPhase.1"),
              value: 1,
              selected: false,
            },
            {
              name: t("Analytics.systemsForReports.vortexAndPhase.2"),
              value: 2,
              selected: false,
            },
            {
              name: t("Analytics.systemsForReports.vortexAndPhase.3"),
              value: 3,
              selected: false,
            },
            {
              name: t("Analytics.systemsForReports.vortexAndPhase.4"),
              value: 4,
              selected: false,
            },
            {
              name: t("Analytics.systemsForReports.vortexAndPhase.5"),
              value: 5,
              selected: false,
            },
            {
              name: t("Analytics.systemsForReports.vortexAndPhase.6"),
              value: 6,
              selected: false,
            },
            {
              name: t("Analytics.systemsForReports.vortexAndPhase.7"),
              value: 7,
              selected: false,
            },
            {
              name: t("Analytics.systemsForReports.vortexAndPhase.8"),
              value: 8,
              selected: false,
            },
          ],
        },
        {
          id: 202,
          name: "responsible",
          type: "AppMultiSelect",
          value: "",
          minLength: 0,
          show: {
            value: computed(
              () =>
                (isValueSelected(1, "any") ||
                  isValueSelected(2, "any") ||
                  isValueSelected(3, "any") ||
                  isValueSelected(4, "any") ||
                  isValueSelected(5, "any") ||
                  isValueSelected(6, "any") ||
                  isValueSelected(7, "any") ||
                  isValueSelected(8, "any")) &&
                isValueSelected(0, "any") &&
                isValueSelected(1235674, "any")
            ),
          },
          placeholder: t("Analytics.systemsForReports.responsible.placeholder"),
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.responsible.1"), value: 1 },
            { name: t("Analytics.systemsForReports.responsible.2"), value: 2 },
            { name: t("Analytics.systemsForReports.responsible.3"), value: 3 },
            { name: t("Analytics.systemsForReports.responsible.4"), value: 4 },
            { name: t("Analytics.systemsForReports.responsible.5"), value: 5 },
          ],
        },
        {
          id: 203,
          name: "tags",
          type: "AppMultiSelect",
          value: "",
          minLength: 0,
          show: {
            value: computed(
              () =>
                (isValueSelected(1, "any") ||
                  isValueSelected(2, "any") ||
                  isValueSelected(3, "any") ||
                  isValueSelected(4, "any") ||
                  isValueSelected(5, "any") ||
                  isValueSelected(6, "any") ||
                  isValueSelected(7, "any") ||
                  isValueSelected(8, "any")) &&
                isValueSelected(0, "any") &&
                isValueSelected(1235674, "any")
            ),
          },
          placeholder: t("Analytics.systemsForReports.tags.placeholder"),
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.tags.1"), value: 1 },
            { name: t("Analytics.systemsForReports.tags.2"), value: 2 },
            { name: t("Analytics.systemsForReports.tags.3"), value: 3 },
            { name: t("Analytics.systemsForReports.tags.4"), value: 4 },
            { name: t("Analytics.systemsForReports.tags.5"), value: 5 },
          ],
        },
        {
          id: 204,
          name: "initiator",
          type: "AppInputSelect",
          value: "",
          minLength: 0,
          show: {
            value: computed(
              () =>
                (isValueSelected(1, "any") ||
                  isValueSelected(2, "any") ||
                  isValueSelected(3, "any") ||
                  isValueSelected(4, "any") ||
                  isValueSelected(5, "any") ||
                  isValueSelected(6, "any") ||
                  isValueSelected(7, "any") ||
                  isValueSelected(8, "any")) &&
                isValueSelected(0, "any") &&
                isValueSelected(1235674, "any")
            ),
          },
          placeholder: t("Analytics.systemsForReports.initiator.placeholder"),
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.initiator.1"), value: 1 },
            { name: t("Analytics.systemsForReports.initiator.2"), value: 2 },
            { name: t("Analytics.systemsForReports.initiator.3"), value: 3 },
            { name: t("Analytics.systemsForReports.initiator.4"), value: 4 },
            { name: t("Analytics.systemsForReports.initiator.5"), value: 5 },
          ],
        },
        {
          id: 302,
          name: "before",
          type: "AppInputSelect",
          value: "",
          placeholder: t("Analytics.systemsForReports.before.placeholder"),
          minLength: 0,
          show: {
            value: computed(
              () =>
                isValueSelected(1, 2) ||
                isValueSelected(1, 3) ||
                isValueSelected(1, 5) ||
                isValueSelected(3, 6) ||
                isValueSelected(3, 7) ||
                isValueSelected(5, 6)
            ),
          },
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.before.1"), value: 1 },
            { name: t("Analytics.systemsForReports.before.2"), value: 2 },
            { name: t("Analytics.systemsForReports.before.3"), value: 3 },
            { name: t("Analytics.systemsForReports.before.4"), value: 4 },
            { name: t("Analytics.systemsForReports.before.5"), value: 5 },
          ],
        },
        {
          id: 303,
          name: "after",
          type: "AppInputSelect",
          value: "",
          placeholder: t("Analytics.systemsForReports.after.placeholder"),
          minLength: 0,
          show: {
            value: computed(
              () =>
                isValueSelected(1, 2) ||
                isValueSelected(1, 3) ||
                isValueSelected(1, 5) ||
                isValueSelected(3, 6) ||
                isValueSelected(3, 7) ||
                isValueSelected(5, 6)
            ),
          },
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.after.1"), value: 1 },
            { name: t("Analytics.systemsForReports.after.2"), value: 2 },
            { name: t("Analytics.systemsForReports.after.3"), value: 3 },
            { name: t("Analytics.systemsForReports.after.4"), value: 4 },
            { name: t("Analytics.systemsForReports.after.5"), value: 5 },
          ],
        },
        {
          id: 304,
          name: "taskStatus",
          type: "AppInputSelect",
          value: "",
          placeholder: t("Analytics.systemsForReports.taskStatus.placeholder"),
          minLength: 0,
          show: {
            value: computed(
              () =>
                (isValueSelected(2, 7) ||
                  isValueSelected(4, 10) ||
                  isValueSelected(6, 10)) &&
                isValueSelected(0, "data")
            ),
          },
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.taskStatus.0"), value: 0 },
            { name: t("Analytics.systemsForReports.taskStatus.1"), value: 1 },
            { name: t("Analytics.systemsForReports.taskStatus.2"), value: 2 },
            { name: t("Analytics.systemsForReports.taskStatus.3"), value: 3 },
          ],
        },
        {
          id: 305,
          name: "taskType",
          type: "AppInputSelect",
          value: "",
          placeholder: t("Analytics.systemsForReports.taskType.placeholder"),
          minLength: 0,
          show: {
            value: computed(
              () =>
                (isValueSelected(2, 7) ||
                  isValueSelected(4, 10) ||
                  isValueSelected(6, 10)) &&
                isValueSelected(0, "data")
            ),
          },
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.taskType.0"), value: 0 },
            { name: t("Analytics.systemsForReports.taskType.1"), value: 1 },
            { name: t("Analytics.systemsForReports.taskType.2"), value: 2 },
            { name: t("Analytics.systemsForReports.taskType.3"), value: 3 },
          ],
        },
        {
          id: 306,
          name: "messageType",
          type: "AppInputSelect",
          value: "",
          placeholder: t("Analytics.systemsForReports.messageType.placeholder"),
          minLength: 0,
          show: {
            value: computed(
              () =>
                isValueSelected(3, 2) ||
                isValueSelected(3, 3) ||
                isValueSelected(3, 5) ||
                isValueSelected(5, 4)
            ),
          },
          selected: {},
          list: [
            { name: t("Analytics.systemsForReports.messageType.1"), value: 1 },
            { name: t("Analytics.systemsForReports.messageType.2"), value: 2 },
          ],
        },
      ],
    },
  ]);

  const isValueSelected = (id, value) => {
    const item = selectedSystem.filtersList?.find((el) => el.id === id);
    if (value === "any") {
      return !!item?.selected?.value;
    } else {
      return item?.selected?.value === value;
    }
  };

  const filterList = (value, list) => {
    return list.filter((item) =>
      item?.name?.toLowerCase()?.includes(value?.toLowerCase())
    );
  };

  const SystemInputValue = ref("");

  const sortedSystems = computed(() => {
    return systems.filter((sys) =>
      sys?.name?.toLowerCase()?.includes(SystemInputValue.value?.toLowerCase())
    );
  });

  const changeSystemInputValue = (value) => {
    SystemInputValue.value = value;
  };

  const selectedSystem = reactive({});
  const selectSystem = (system) => Object.assign(selectedSystem, system);

  const selectedSystemValues = computed(() => {
    const res = [];
    selectedSystem.filtersList?.forEach((filter) => res.push(filter));
    return res;
  });
  watch(
    selectedSystemValues,
    () => {
      selectedSystem.filtersList?.map((filter) => {
        if (filter.show.value === false) {
          if (filter.type == "AppInputSelect" && !!filter.selected.value)
            filter.selected = {};
          if (filter.type == "AppDateRange" && filter.selected !== "-")
            filter.selected = "-";
          if (filter.type == "AppMultiSelect" && filter.selected.length) {
            filter.selected = [];
            filter.list.map((el) => (el.selected = false));
          }
        }
      });
    },
    { deep: true }
  );

  const selectMulti = (option, id) => {
    if (option.value === "all") {
      const item = selectedSystem.filtersList?.find((el) => el.id === id);
      item?.list?.forEach((el) => {
        if (el.value !== "all") el.selected = !option.selected;
      });
    }
    option.selected = !option.selected;
  };

  return {
    systems,
    changeSystemInputValue,
    sortedSystems,
    selectedSystem,
    SystemInputValue,
    selectSystem,
    filterList,
    selectMulti,
  };
}
