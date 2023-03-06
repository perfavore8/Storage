import { computed, reactive, ref, watch } from "vue";

export function useSystems() {
  const systems = reactive([
    {
      id: 0,
      name: "amoSRM",
      value: "amoSRM",
      filtersList: [
        {
          id: 1235674,
          name: "entities",
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
          value: "",
          minLength: 0,
          show: {
            value: false,
            data: [{ id: 1235674, value: "any" }],
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
          value: "",
          minLength: 0,
          show: {
            value: false,
            data: [
              { id: 0, value: "event" },
              { id: 1235674, value: "trade" },
            ],
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
        {
          id: 111111,
          name: "stepStart",
          value: "",
          minLength: 0,
          show: {
            value: false,
            data: [
              { id: 1, value: 2 },
              { id: 0, value: "event" },
              { id: 1235674, value: "trade" },
            ],
          },
          placeholder: "С какого этапа",
          selected: {},
          list: [
            { name: "Этап 1", value: 1 },
            { name: "Этап 2", value: 2 },
            { name: "Этап 3", value: 3 },
            { name: "Этап 4", value: 4 },
            { name: "Этап 5", value: 5 },
            { name: "Этап 6", value: 6 },
            { name: "Этап 7", value: 7 },
          ],
        },
        {
          id: 111112,
          name: "stepEnd",
          value: "",
          minLength: 0,
          show: {
            value: false,
            data: [
              { id: 1, value: 2 },
              { id: 0, value: "event" },
              { id: 1235674, value: "trade" },
            ],
          },
          placeholder: "На какой этап",
          selected: {},
          list: [
            { name: "Этап 1", value: 1 },
            { name: "Этап 2", value: 2 },
            { name: "Этап 3", value: 3 },
            { name: "Этап 4", value: 4 },
            { name: "Этап 5", value: 5 },
            { name: "Этап 6", value: 6 },
            { name: "Этап 7", value: 7 },
          ],
        },
        {
          id: 2,
          name: "trade",
          value: "",
          minLength: 0,
          show: {
            value: false,
            data: [
              { id: 0, value: "data" },
              { id: 1235674, value: "trade" },
            ],
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
          value: "",
          minLength: 0,
          show: {
            value: false,
            data: [
              { id: 0, value: "event" },
              { id: 1235674, value: "contact" },
            ],
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
          value: "",
          minLength: 0,
          show: {
            value: false,
            data: [
              { id: 0, value: "data" },
              { id: 1235674, value: "contact" },
            ],
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
          ],
        },
        {
          id: 5,
          name: "company",
          value: "",
          minLength: 0,
          show: {
            value: false,
            data: [
              { id: 0, value: "event" },
              { id: 1235674, value: "company" },
            ],
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
          value: "",
          minLength: 0,
          show: {
            value: false,
            data: [
              { id: 0, value: "data" },
              { id: 1235674, value: "company" },
            ],
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
          ],
        },
        {
          id: 7,
          name: "task",
          value: "",
          minLength: 0,
          show: {
            value: false,
            data: [{ id: 0, value: "event1" }],
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
          value: "",
          minLength: 0,
          show: {
            value: false,
            data: [{ id: 0, value: "data1" }],
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
      ],
    },
  ]);

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
    selectedSystem.filtersList?.forEach((filter) => res.push(filter.selected));
    return res;
  });
  watch(
    selectedSystemValues,
    () => {
      selectedSystem.filtersList?.map((filter) => {
        let res = true;
        filter?.show?.data?.forEach((dat) => {
          const item = selectedSystem.filtersList?.find(
            (el) => el.id === dat.id
          );
          if (filter.show) {
            if (dat.value === "any") {
              res = res && !!item?.selected?.value;
            } else {
              res = res && item?.selected?.value === dat.value;
            }
          }
        });
        filter.show.value = res;
      });
    },
    { deep: true }
  );

  return {
    systems,
    changeSystemInputValue,
    sortedSystems,
    selectedSystem,
    SystemInputValue,
    selectSystem,
    filterList,
  };
}
