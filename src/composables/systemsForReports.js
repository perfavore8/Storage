import { computed, reactive, ref, watch } from "vue";

export function useSystems() {
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
          placeholder: "Сущность",
          selected: {},
          list: [
            { name: "Сделка", value: "trade" },
            { name: "Контакт", value: "contact" },
            { name: "Компания", value: "company" },
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
          placeholder: "Данные",
          selected: {},
          list: [
            { name: "События", value: "event" },
            { name: "Данные", value: "data" },
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
          placeholder: "Сделки",
          selected: {},
          list: [
            { name: "Создание", value: 1 },
            { name: "Смена этапа", value: 2 },
            { name: "смена ответственного", value: 3 },
            { name: "добавление примечания", value: 4 },
            { name: "изменение поля", value: 5 },
            { name: "привязка компании", value: 6 },
            { name: "привязка контакта", value: 7 },
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
          placeholder: "Сделки",
          selected: {},
          list: [
            { name: "связанные контакты", value: 1 },
            { name: "связанная компания", value: 2 },
            { name: "примечания", value: 3 },
            { name: "дата создания", value: 4 },
            { name: "дата закрытия (успешно, не успешно этапы)", value: 5 },
            { name: "теги", value: 6 },
            { name: "список задач", value: 7 },
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
          placeholder: "Контакты",
          selected: {},
          list: [
            { name: "создание (дата)", value: 1 },
            { name: "звонок", value: 2 },
            {
              name: "новый чат (сообщение) - список чатов: вк, фб, инста, вотсап, телега, прочие",
              value: 3,
            },
            { name: "отправлено смс", value: 4 },
            { name: "отправлено письмо / получено письмо", value: 5 },
            { name: "смена ответственного", value: 6 },
            { name: "изменение поля / тега", value: 7 },
            { name: "привязка к сделке", value: 8 },
            { name: "привязка к контакту", value: 9 },
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
          placeholder: "Контакты",
          selected: {},
          list: [
            { name: "ответственный", value: 1 },
            { name: "телефон", value: 2 },
            { name: "почта", value: 3 },
            { name: "связанные сделки", value: 4 },
            { name: "связанная компания", value: 5 },
            { name: "должность", value: 6 },
            { name: "пользовательские поля (id)", value: 7 },
            { name: "примечания", value: 8 },
            { name: "теги", value: 9 },
            { name: "список задач", value: 10 },
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
          placeholder: "Компании",
          selected: {},
          list: [
            { name: "привязка к сделке)", value: 1 },
            { name: "привязка к контакту", value: 2 },
            { name: "создание (дата)", value: 3 },
            { name: "звонок", value: 4 },
            { name: "отправлено письмо / получено письмо", value: 5 },
            { name: "изменение поля / тега", value: 6 },
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
          placeholder: "Компании",
          selected: {},
          list: [
            { name: "ответственный", value: 1 },
            { name: "телефон", value: 2 },
            { name: "почта", value: 3 },
            { name: "сайт", value: 4 },
            { name: "связанные контакты", value: 5 },
            { name: "связанные сделки", value: 6 },
            { name: "пользовательские поля (id)", value: 7 },
            { name: "теги", value: 8 },
            { name: "примечания", value: 9 },
            { name: "список задач", value: 10 },
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
          placeholder: "Задачи",
          selected: {},
          list: [
            { name: "создание задачи", value: 1 },
            { name: "изменение задачи (срок)", value: 2 },
            { name: "изменение задачи (тип)", value: 3 },
            { name: "изменение задачи (содержимое)", value: 4 },
            { name: "закрытие задачи (с результатом или без ???)", value: 5 },
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
          placeholder: "Задачи",
          selected: {},
          list: [
            { name: "ответственный", value: 1 },
            { name: "дата создания", value: 2 },
            { name: "дата изменения", value: 3 },
            { name: "дата завершения", value: 4 },
            { name: "тип задачи", value: 5 },
            { name: "содержимое задачи", value: 6 },
            { name: "результат выполнения", value: 7 },
            { name: "связаные компании / контакты / сделки", value: 8 },
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
          placeholder: "Интервал дат",
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
          placeholder: "Воронка и этап",
          selected: {},
          list: [
            { name: "Все", value: "all", selected: false },
            { name: "Этап 1", value: 1, selected: false },
            { name: "Этап 2", value: 2, selected: false },
            { name: "Этап 3", value: 3, selected: false },
            { name: "Этап 4", value: 4, selected: false },
            { name: "Воронка 1", value: 5, selected: false },
            { name: "Воронка 2", value: 6, selected: false },
            { name: "Воронка 3", value: 7, selected: false },
            { name: "Воронка 4", value: 8, selected: false },
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
          placeholder: "Отвественный",
          selected: {},
          list: [
            { name: "Отвественный 1", value: 1 },
            { name: "Отвественный 2", value: 2 },
            { name: "Отвественный 3", value: 3 },
            { name: "Отвественный 4", value: 4 },
            { name: "Отвественный 5", value: 5 },
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
          placeholder: "Теги",
          selected: {},
          list: [
            { name: "Тег 1", value: 1 },
            { name: "Тег 2", value: 2 },
            { name: "Тег 3", value: 3 },
            { name: "Тег 4", value: 4 },
            { name: "Тег 5", value: 5 },
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
          placeholder: "Инициатор события",
          selected: {},
          list: [
            { name: "Инициатор 1", value: 1 },
            { name: "Инициатор 2", value: 2 },
            { name: "Инициатор 3", value: 3 },
            { name: "Инициатор 4", value: 4 },
            { name: "Инициатор 5", value: 5 },
          ],
        },
        {
          id: 302,
          name: "before",
          type: "AppInputSelect",
          value: "",
          placeholder: "До",
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
            { name: "1", value: 1 },
            { name: "2", value: 2 },
            { name: "3", value: 3 },
            { name: "4", value: 4 },
            { name: "5", value: 5 },
          ],
        },
        {
          id: 303,
          name: "after",
          type: "AppInputSelect",
          value: "",
          placeholder: "После",
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
            { name: "1", value: 1 },
            { name: "2", value: 2 },
            { name: "3", value: 3 },
            { name: "4", value: 4 },
            { name: "5", value: 5 },
          ],
        },
        {
          id: 304,
          name: "taskStatus",
          type: "AppInputSelect",
          value: "",
          placeholder: "Статус задачи",
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
            { name: "Открытый", value: 0 },
            { name: "Успешный", value: 1 },
            { name: "Отменен", value: 2 },
            { name: "Удален", value: 3 },
          ],
        },
        {
          id: 305,
          name: "taskType",
          type: "AppInputSelect",
          value: "",
          placeholder: "Тип задачи",
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
            { name: "Открытый", value: 0 },
            { name: "Успешный", value: 1 },
            { name: "Отменен", value: 2 },
            { name: "Удален", value: 3 },
          ],
        },
        {
          id: 306,
          name: "messageType",
          type: "AppInputSelect",
          value: "",
          placeholder: "Тип сообщения",
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
            { name: "Входящий", value: 1 },
            { name: "Исходящий", value: 2 },
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
