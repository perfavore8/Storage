import { reactive } from "vue";

const list = reactive({
  Contacts: [
    {
      id: 123456,
      name: "Анастасия Иванова",
      position: "менеджер",
      phoneNumber: "123-456-789",
      rating: "8",
    },
    {
      id: 234567,
      name: "Алексей Петров",
      position: "разработчик",
      phoneNumber: "234-567-890",
      rating: "8",
    },
    {
      id: 345678,
      name: "Екатерина Сидорова",
      position: "специалист по маркетингу",
      phoneNumber: "345-678-901",
      rating: "8",
    },
    {
      id: 456789,
      name: "Дмитрий Федоров",
      position: "аналитик",
      phoneNumber: "456-789-012",
      rating: "8",
    },
    {
      id: 567890,
      name: "Ирина Морозова",
      position: "дизайнер",
      phoneNumber: "567-890-123",
      rating: "8",
    },
    {
      id: 678901,
      name: "Максим Королев",
      position: "веб-разработчик",
      phoneNumber: "678-901-234",
      rating: "8",
    },
    {
      id: 789012,
      name: "Оксана Козлова",
      position: "копирайтер",
      phoneNumber: "789-012-345",
      rating: "8",
    },
    {
      id: 890123,
      name: "Александра Егорова",
      position: "HR-менеджер",
      phoneNumber: "890-123-456",
      rating: "8",
    },
    {
      id: 901234,
      name: "Владимир Кузнецов",
      position: "SEO-специалист",
      phoneNumber: "901-234-567",
      rating: "8",
    },
    {
      id: 1123789,
      name: "Сергей Новиков",
      position: "аналитик данных",
      phoneNumber: "012-345-678",
      rating: "3",
    },
    {
      id: 1234890,
      name: "Алина Беляева",
      position: "контент-менеджер",
      phoneNumber: "987-654-321",
      rating: "3",
    },
    {
      id: 1345901,
      name: "Дарья Романова",
      position: "дизайнер интерфейсов",
      phoneNumber: "876-543-210",
      rating: "3",
    },
    {
      id: 1456012,
      name: "Иван Смирнов",
      position: "программист",
      phoneNumber: "765-432-109",
      rating: "8",
    },
    {
      id: 1567123,
      name: "Мария Крылова",
      position: "SMM-менеджер",
      phoneNumber: "654-321-098",
      rating: "8",
    },
    {
      id: 1678234,
      name: "Василий Тихонов",
      position: "специалист по продажам",
      phoneNumber: "543-210-987",
      rating: "8",
    },
    {
      id: 1789345,
      name: "Андрей Колесников",
      position: "исследователь",
      phoneNumber: "432-109-876",
      rating: "3",
    },
    {
      id: 1890456,
      name: "Евгения Ильина",
      position: "маркетолог",
      phoneNumber: "321-098-765",
      rating: "8",
    },
    {
      id: 1901567,
      name: "Глеб Калинин",
      position: "администратор",
      phoneNumber: "210-987-654",
      rating: "8",
    },
    {
      id: 1123045,
      name: "Юлия Сазонова",
      position: "консультант",
      phoneNumber: "109-876-543",
      rating: "8",
    },
    {
      id: 2234156,
      name: "Артем Богданов",
      position: "бизнес-аналитик",
      phoneNumber: "098-765-432",
      rating: "3",
    },
  ],
  Company: [
    {
      id: 123456,
      name: "ООО 'Буринженерия'",
      director: "Бровкин Александр Иванович",
      signatory: "Москва, ул. Пушкина, дом Колотушкина,",
      rating: 0,
    },
    {
      id: 234567,
      name: "ООО 'МГТ-Восток'",
      director: "Рогов Евгений Николаевич",
      signatory: "Краснодар, ул. Пушкинская, д. 7",
      rating: 8,
    },
    {
      id: 345678,
      name: "ООО 'СтройСервис'",
      director: "Карпенко Олег Сергеевич",
      signatory: "Санкт-Петербург, ул. Невский проспект, д. 42",
      rating: 8,
    },
    {
      id: 456789,
      name: "ОАО 'Химэксперт'",
      director: "Крюков Дмитрий Валерьевич",
      signatory: "Новосибирск, ул. Красный проспект, д. 12",
      rating: 7,
    },
    {
      id: 567890,
      name: "ЗАО 'Промстройинвест'",
      director: "Михайлов Алексей Андреевич",
      signatory: "Екатеринбург, ул. Малышева, д. 18",
      rating: 0,
    },
    {
      id: 678901,
      name: "ООО 'Торгстрой'",
      director: "Морозов Сергей Владимирович",
      signatory: "Казань, ул. Баумана, д. 14",
      rating: 3,
    },
    {
      id: 789012,
      name: "АО 'Конструктор'",
      director: "Старцев Анатолий Геннадьевич",
      signatory: "Иркутск, ул. Лермонтова, д. 23",
      rating: 0,
    },
    {
      id: 890123,
      name: "ООО 'Новые технологии'",
      director: "Ковалева Мария Григорьевна",
      signatory: "Уфа, ул. Октябрьской Революции, д. 55",
      rating: 0,
    },
    {
      id: 901234,
      name: "ОАО 'Протон'",
      director: "Петров Василий Иванович",
      signatory: "Калининград, ул. Советская, д. 10",
      rating: 1,
    },
    {
      id: 1123789,
      name: "ЗАО 'Интерстрой'",
      director: "Быков Андрей Игоревич",
      signatory: "Владивосток, ул. Светланская, д. 7",
      rating: 0,
    },
    {
      id: 1234890,
      name: "ООО 'Промпитер'",
      director: "Жуковская Анна Анатольевна",
      signatory: "Магнитогорск, ул. Ленинградская, д. 29",
      rating: 1,
    },
    {
      id: 1345901,
      name: "ООО 'Строй-Проект'",
      director: "Наумов Игорь Владимирович",
      signatory: "Пермь, ул. Кирова, д. 44",
      rating: 0,
    },
    {
      id: 1456012,
      name: "ООО 'Эко-Строй'",
      director: "Курочкин Филипп Игоревич",
      signatory: "Самара, ул. Куйбышева, д. 32",
      rating: 9,
    },
    {
      id: 1567123,
      name: "АО 'Технопарк'",
      director: "Белова Нина Александровна",
      signatory: "Сочи, ул. Курортный проспект, д. 9",
      rating: 3,
    },
    {
      id: 1678234,
      name: "ООО 'Металл-Строй'",
      director: "Гасаченко Сергей Михайлович",
      signatory: "Челябинск, ул. Труда, д. 82",
      rating: 0,
    },
    {
      id: 1789345,
      name: "ОАО 'Инжстрой'",
      director: "Сергеев Олег Юрьевич",
      signatory: "Ростов-на-Дону, ул. Буденновский проспект, д. 14",
      rating: 1,
    },
    {
      id: 1890456,
      name: "ООО 'Автострой'",
      director: "Тихоненко Владимир Владимирович",
      signatory: "Нижний Новгород, ул. Советская, д. 49",
      rating: 0,
    },
    {
      id: 1901567,
      name: "ОАО 'Уралэнерго'",
      director: "Данилов Алексей Викторович",
      signatory: "Тюмень, ул. 50 лет Октября, д. 17",
      rating: 5,
    },
    {
      id: 1123045,
      name: "ООО 'Энергия'",
      director: "Соловьев Дмитрий Геннадьевич",
      signatory: "Томск, ул. Фрунзе, д. 67",
      rating: 0,
    },
    {
      id: 2234156,
      name: "ООО 'СтройМарт'",
      director: "Мельникова Екатерина Александровна",
      signatory: "Красноярск, ул. Чернышевского, д. 19",
      rating: 7,
    },
  ],
});

const clientsList = reactive([]);

export function useClients() {
  const getClientsList = (selectedTabValue) => {
    clientsList.length = 0;
    Object.assign(clientsList, list[selectedTabValue]);
  };
  const getColor = (value) => {
    const green = Math.min(255, Math.round((value * 255) / 50));
    const red = Math.min(255, Math.round(((100 - value) * 255) / 50));
    const blue = 0;
    const color = red * 65536 + green * 256 + blue;
    return "#" + ("00000" + color.toString(16)).slice(-6);
  };

  return { getClientsList, clientsList, getColor };
}
