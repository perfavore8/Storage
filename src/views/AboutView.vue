<template>
  <div class="app">
    <div class="header">
      <div class="header_left">
        <div class="btns">
          <button class="btns_btn">Остатки</button>
          <button class="btns_btn">Аналитика</button>
          <button class="btns_btn">Документы</button>
          <button class="btns_btn">Архив</button>
          <button class="btns_btn">Инструкции</button>
        </div>
        <div class="radio_btns">
          <div class="radio_btn">
            <input type="radio" name="store1" id="store1" />
            <label for="store1">Все остатки </label>
          </div>
          <div class="radio_btn">
            <input type="radio" name="store1" id="store2" checked />
            <label for="store2">Склад 1</label>
          </div>
          <div class="radio_btn">
            <input type="radio" name="store1" id="store3" />
            <label for="store3">Склад 2</label>
          </div>
          <div class="radio_btn">
            <input type="radio" name="store1" id="store4" />
            <label for="store4">Услуги</label>
          </div>
        </div>
      </div>
      <div class="header_right">
        <div class="ref">
          <div class="ref_1_logo"></div>
          <a>Выгрузка в эксель</a>
        </div>
        <div class="ref">
          <div class="ref_2_logo"></div>
          <a>Синхронизировать товары</a>
        </div>
        <button class="settings_btn"></button>
      </div>
    </div>
    <div class="wrapper">
      <div class="filters">
        <div class="filters_left">
          <input
            type="date"
            id="start"
            name="trip-start"
            value="2018-07-22"
            min="2018-01-01"
            max="2032-12-31"
            aria-required="true"
            aria-invalid="false"
            placeholder="Дата мероприятия"
          />
          <p>Найдено: 6</p>
        </div>
        <div class="filters_right">
          <div class="filter_group">
            <input type="checkbox" name="filter" id="filter" class="checkbox" />
            <label for="filter">Фильтр</label>
          </div>
          <button class="button_1">Перемещение</button>
          <button class="button_2">Добавить</button>
          <button class="button_3">Списать</button>
        </div>
      </div>
      <div class="grid"><Main_grid :data="users" /></div>
    </div>
  </div>
</template>

<script>
import Main_grid from "@/components/Main_grid.vue";

export default {
  components: {
    Main_grid,
  },
  data() {
    return {
      users: [
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
              lat: "-37.3159",
              lng: "81.1496",
            },
          },
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
          company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
          },
        },
        {
          id: 2,
          name: "Ervin Howell",
          username: "Antonette",
          email: "Shanna@melissa.tv",
          address: {
            street: "Victor Plains",
            suite: "Suite 879",
            city: "Wisokyburgh",
            zipcode: "90566-7771",
            geo: {
              lat: "-43.9509",
              lng: "-34.4618",
            },
          },
          phone: "010-692-6593 x09125",
          website: "anastasia.net",
          company: {
            name: "Deckow-Crist",
            catchPhrase: "Proactive didactic contingency",
            bs: "synergize scalable supply-chains",
          },
        },
        {
          id: 3,
          name: "Clementine Bauch",
          username: "Samantha",
          email: "Nathan@yesenia.net",
          address: {
            street: "Douglas Extension",
            suite: "Suite 847",
            city: "McKenziehaven",
            zipcode: "59590-4157",
            geo: {
              lat: "-68.6102",
              lng: "-47.0653",
            },
          },
          phone: "1-463-123-4447",
          website: "ramiro.info",
          company: {
            name: "Romaguera-Jacobson",
            catchPhrase: "Face to face bifurcated interface",
            bs: "e-enable strategic applications",
          },
        },
        {
          id: 4,
          name: "Patricia Lebsack",
          username: "Karianne",
          email: "Julianne.OConner@kory.org",
          address: {
            street: "Hoeger Mall",
            suite: "Apt. 692",
            city: "South Elvis",
            zipcode: "53919-4257",
            geo: {
              lat: "29.4572",
              lng: "-164.2990",
            },
          },
          phone: "493-170-9623 x156",
          website: "kale.biz",
          company: {
            name: "Robel-Corkery",
            catchPhrase: "Multi-tiered zero tolerance productivity",
            bs: "transition cutting-edge web services",
          },
        },
        {
          id: 5,
          name: "Chelsey Dietrich",
          username: "Kamren",
          email: "Lucio_Hettinger@annie.ca",
          address: {
            street: "Skiles Walks",
            suite: "Suite 351",
            city: "Roscoeview",
            zipcode: "33263",
            geo: {
              lat: "-31.8129",
              lng: "62.5342",
            },
          },
          phone: "(254)954-1289",
          website: "demarco.info",
          company: {
            name: "Keebler LLC",
            catchPhrase: "User-centric fault-tolerant solution",
            bs: "revolutionize end-to-end systems",
          },
        },
        {
          id: 6,
          name: "Mrs. Dennis Schulist",
          username: "Leopoldo_Corkery",
          email: "Karley_Dach@jasper.info",
          address: {
            street: "Norberto Crossing",
            suite: "Apt. 950",
            city: "South Christy",
            zipcode: "23505-1337",
            geo: {
              lat: "-71.4197",
              lng: "71.7478",
            },
          },
          phone: "1-477-935-8478 x6430",
          website: "ola.org",
          company: {
            name: "Considine-Lockman",
            catchPhrase: "Synchronised bottom-line interface",
            bs: "e-enable innovative applications",
          },
        },
        {
          id: 7,
          name: "Kurtis Weissnat",
          username: "Elwyn.Skiles",
          email: "Telly.Hoeger@billy.biz",
          address: {
            street: "Rex Trail",
            suite: "Suite 280",
            city: "Howemouth",
            zipcode: "58804-1099",
            geo: {
              lat: "24.8918",
              lng: "21.8984",
            },
          },
          phone: "210.067.6132",
          website: "elvis.io",
          company: {
            name: "Johns Group",
            catchPhrase: "Configurable multimedia task-force",
            bs: "generate enterprise e-tailers",
          },
        },
        {
          id: 8,
          name: "Nicholas Runolfsdottir V",
          username: "Maxime_Nienow",
          email: "Sherwood@rosamond.me",
          address: {
            street: "Ellsworth Summit",
            suite: "Suite 729",
            city: "Aliyaview",
            zipcode: "45169",
            geo: {
              lat: "-14.3990",
              lng: "-120.7677",
            },
          },
          phone: "586.493.6943 x140",
          website: "jacynthe.com",
          company: {
            name: "Abernathy Group",
            catchPhrase: "Implemented secondary concept",
            bs: "e-enable extensible e-tailers",
          },
        },
        {
          id: 9,
          name: "Glenna Reichert",
          username: "Delphine",
          email: "Chaim_McDermott@dana.io",
          address: {
            street: "Dayna Park",
            suite: "Suite 449",
            city: "Bartholomebury",
            zipcode: "76495-3109",
            geo: {
              lat: "24.6463",
              lng: "-168.8889",
            },
          },
          phone: "(775)976-6794 x41206",
          website: "conrad.com",
          company: {
            name: "Yost and Sons",
            catchPhrase: "Switchable contextually-based project",
            bs: "aggregate real-time technologies",
          },
        },
        {
          id: 10,
          name: "Clementina DuBuque",
          username: "Moriah.Stanton",
          email: "Rey.Padberg@karina.biz",
          address: {
            street: "Kattie Turnpike",
            suite: "Suite 198",
            city: "Lebsackbury",
            zipcode: "31428-2261",
            geo: {
              lat: "-38.2386",
              lng: "57.2232",
            },
          },
          phone: "024-648-3804",
          website: "ambrose.net",
          company: {
            name: "Hoeger LLC",
            catchPhrase: "Centralized empowering task-force",
            bs: "target end-to-end models",
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap");

@mixin _600 {
  @media (max-width: 600px) {
    @content;
  }
}

@mixin bg_image($url, $size: 100% 100%) {
  background-size: $size;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url($url);
}

@mixin font($w, $s, $h) {
  font-family: "Inter";
  font-style: normal;
  font-weight: $w;
  font-size: $s;
  line-height: $h;
}

.app {
  width: 100vw;
  height: 100%;

  display: flex;
  flex-direction: column;
  user-select: none;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &_left {
    .btns {
      display: flex;
      flex-direction: row;
      gap: 12px;
      .btns_btn {
        height: 49px;
        padding: 13px;
        cursor: pointer;
        box-sizing: border-box;
        border: 1px solid #5aa1c9;
        border-radius: 4px;
        color: #5aa1c9;
        background: white;

        @include font(400, 18px, 22px);
      }
    }
    .radio_btns {
      display: flex;
      flex-direction: row;
      gap: 16px;
      margin-top: 14px;
      .radio_btn {
        > input {
          display: none;
        }
        > label {
          display: inline-block;
          cursor: pointer;
          position: relative;
          padding-left: 25px;
          margin-right: 0;
          line-height: 18px;
          user-select: none;
          color: #3f3f3f;
          @include font(400, 18px, 30px);
        }
        > label:before {
          content: "";
          display: inline-block;
          width: 19px;
          height: 19px;
          position: absolute;
          left: 0;
          bottom: 6px;
          background: #ffffff;
          border: 1px solid #c9c9c9;
          border-radius: 50%;
        }
        > input:checked + label:before {
          @include bg_image("../assets/Ellipse_2.svg", 40% 40%);
        }
      }
    }
  }

  &_right {
    display: flex;
    flex-direction: row;
    gap: 25px;
    .ref {
      display: flex;
      flex-direction: row;
      align-items: center;
      max-height: 18px;
      gap: 8px;
      .ref_1_logo {
        width: 18px;
        height: 18px;
        @include bg_image("../assets/export.svg");
        transform: rotate(180deg);
      }
      .ref_2_logo {
        width: 18px;
        height: 18px;
        @include bg_image("../assets/sync.svg");
      }
    }
    a {
      cursor: pointer;
      text-decoration-line: underline;
      @include font(400, 18px, 30px);
    }
    .settings_btn {
      width: 18px;
      height: 18px;
      border: none;
      background-color: transparent;
      @include bg_image("../assets/gear.svg");
      margin-right: 10px;
    }
  }
}
.wrapper {
  .filters {
    display: flex;
    flex-direction: row;
    margin-top: 60px;
    justify-content: space-between;
    &_left {
      display: flex;
      flex-direction: column;
      gap: 19px;

      input {
        position: relative;
        width: 112px;
        height: 34px;
        background: #c9c9c9;
        border-radius: 4px;
        border: none;
        color: #3f3f3f;
        outline: none;
        @include font(400, 16px, 19px);
      }
      input::-webkit-datetime-edit-fields-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      input::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        appearance: none;
      }
      p {
        color: #757575;
        @include font(400, 16px, 19px);
      }
    }
    &_right {
      display: flex;
      flex-direction: row;
      gap: 18px;

      .filter_group {
        display: flex;
        flex-direction: row;
        margin-top: 16px;
        max-height: 20px;

        .checkbox {
          position: absolute;
          z-index: -1;
          opacity: 0;
          margin: 10px 0 0 20px;
        }
        .checkbox + label {
          position: relative;
          padding: 0 0 0 63px;
          cursor: pointer;
          color: #3f3f3f;
          @include font(400, 16px, 19px);
        }
        .checkbox + label:before {
          content: "";
          position: absolute;
          top: -4px;
          left: 0;
          width: 54px;
          height: 23px;
          border-radius: 20px;
          background: #c4c4c4;
          transition: 0.2s;
        }
        .checkbox + label:after {
          content: "";
          position: absolute;
          top: -1px;
          left: 4px;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #fff;
          transition: 0.2s;
        }
        .checkbox:checked + label:before {
          background: #757575;
        }
        .checkbox:checked + label:after {
          left: 33px;
        }
      }

      button {
        width: 148px;
        height: 49px;
        cursor: pointer;
        color: #ffffff;
        border-radius: 4px;
        border: none;
        @include font(400, 18px, 22px);
      }
      .button_1 {
        background: #757575;
      }
      .button_2 {
        background: #5aa1c9;
      }
      .button_3 {
        background: #599f68;
      }
    }
  }
  .grid {
  }
}
</style>
