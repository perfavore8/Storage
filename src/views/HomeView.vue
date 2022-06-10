<template>
  <table>
    <tr class="bar_row">
      <td class="bar_item" v-for="param in params" :key="param">
        <div class="bar_item_row">
          <div>{{ param }}</div>
          <button v-show="param" class="bar_item_icon"></button>
        </div>
      </td>
    </tr>
    <tr>
      <td class="item" v-for="(filter, idx) in params.length" :key="idx">
        <div class="filter" v-show="idx != params.length - 1">
          <button @click="changeComparison(idx)">
            <div
              class="icon"
              :class="{
                tilde: comparisons[idx] == 1,
                equal: comparisons[idx] == 2,
                more: comparisons[idx] == 3,
                more_or_equal: comparisons[idx] == 4,
              }"
            ></div>
          </button>
          <input v-model="filterValue[idx]" type="text" />
        </div>
      </td>
    </tr>
    <tr v-for="user in users" :key="user">
      <td v-for="(item, idx) in user" :key="idx" class="item">{{ item }}</td>
      <td class="item"><div class="edit_icon"></div></td>
    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {
      show_settings: false,
      show_filter: false,
      params: [
        "Название",
        "Группа",
        "Артикул",
        "На складе",
        "В резерве",
        "Цена",
        "Себестоимость",
        "Описание",
        "Единицы измерений",
        "Изменение",
        "Свободно для резерва",
        "",
      ],
      users: [
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
          a1: "11",
          a2: "22",
          email1: "Sincere@april.biz",
          phone2: "1-770-736-8031 x56442",
          website3: "hildegard.org",
        },
        {
          id: 2,
          name: "Ervin Howell",
          username: "Antonette",
          email: "Shanna@melissa.tv",
          phone: "010-692-6593 x09125",
          website: "anastasia.net",
          a1: "1",
          a2: "2",
          email1: "Sincere@april.biz",
          phone2: "1-770-736-8031 x56442",
          website3: "hildegard.org",
        },
        {
          id: 3,
          name: "Clementine Bauch",
          username: "Samantha",
          email: "Nathan@yesenia.net",
          phone: "1-463-123-4447",
          website: "ramiro.info",
          a1: "1",
          a2: "2",
          email1: "Sincere@april.biz",
          phone2: "1-770-736-8031 x56442",
          website3: "hildegard.org",
        },
        {
          id: 4,
          name: "Patricia Lebsack",
          username: "Karianne",
          email: "Julianne.OConner@kory.org",
          phone: "493-170-9623 x156",
          website: "kale.biz",
          a1: "1",
          a2: "2",
          email1: "Sincere@april.biz",
          phone2: "1-770-736-8031 x56442",
          website3: "hildegard.org",
        },
        {
          id: 5,
          name: "Chelsey Dietrich",
          username: "Kamren",
          email: "Lucio_Hettinger@annie.ca",
          phone: "(254)954-1289",
          website: "demarco.info",
          a1: "1",
          a2: "2",
          email1: "Sincere@april.biz",
          phone2: "1-770-736-8031 x56442",
          website3: "hildegard.org",
        },
        {
          id: 6,
          name: "Mrs. Dennis Schulist",
          username: "Leopoldo_Corkery",
          email: "Karley_Dach@jasper.info",
          phone: "1-477-935-8478 x6430",
          website: "ola.org",
          a1: "1",
          a2: "2",
          email1: "Sincere@april.biz",
          phone2: "1-770-736-8031 x56442",
          website3: "hildegard.org",
        },
        {
          id: 7,
          name: "Kurtis Weissnat",
          username: "Elwyn.Skiles",
          email: "Telly.Hoeger@billy.biz",
          phone: "210.067.6132",
          website: "elvis.io",
          a1: "1",
          a2: "2",
          email1: "Sincere@april.biz",
          phone2: "1-770-736-8031 x56442",
          website3: "hildegard.org",
        },
        {
          id: 8,
          name: "Nicholas Runolfsdottir V",
          username: "Maxime_Nienow",
          email: "Sherwood@rosamond.me",
          phone: "586.493.6943 x140",
          website: "jacynthe.com",
          a1: "1",
          a2: "2",
          email1: "Sincere@april.biz",
          phone2: "1-770-736-8031 x56442",
          website3: "hildegard.org",
        },
        {
          id: 9,
          name: "Glenna Reichert",
          username: "Delphine",
          email: "Chaim_McDermott@dana.io",
          phone: "(775)976-6794 x41206",
          website: "conrad.com",
          a1: "1",
          a2: "2",
          email1: "Sincere@april.biz",
          phone2: "1-770-736-8031 x56442",
          website3: "hildegard.org",
        },
        {
          id: 10,
          name: "Clementina DuBuque",
          username: "Moriah.Stanton",
          email: "Rey.Padberg@karina.biz",
          phone: "024-648-3804",
          website: "ambrose.net",
          a1: "1",
          a2: "2",
          email1: "Sincere@april.biz",
          phone2: "1-770-736-8031 x56442",
          website3: "hildegard.org",
        },
      ],
      coll: [],
      count: 3,
      page: 1,
      filterValue: [],
      updateKey: 0,
      comparisons: [],
    };
  },
  watch: {
    count() {
      if (this.count < 0) {
        this.count = 0;
      }
    },
    paginatedData: {
      handler: function () {
        this.updateKey += 1;
      },
      deep: true,
    },
    comparisons: {
      handler: function () {
        this.comparisons.forEach((val, i) => {
          val > 4 ? (this.comparisons[i] = 1) : val;
        });
      },
      deep: true,
    },
    data: {
      handler: function () {
        this.comparisons = [];
        this.fillColls();
        this.filterValue = [];
        this.page = 1;
      },
      deep: true,
    },
  },
  computed: {
    paginatedData() {
      return this.users.slice(
        this.page * this.count - this.count,
        this.page * this.count
      );
    },
  },
  mounted() {
    this.fillColls();
  },
  methods: {
    fillColls() {
      this.coll = Object.keys(this.users[0]);
      this.coll.forEach(() => {
        this.comparisons.push(1);
      });
    },
    changeComparison(idx) {
      this.comparisons[idx] = this.comparisons[idx] + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap");
@mixin font($w, $s, $h) {
  font-family: "Inter";
  font-style: normal;
  font-weight: $w;
  font-size: $s;
  line-height: $h;
}
@mixin bg_image($url, $size: 100% 100%) {
  background-size: $size;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url($url);
}
.edit_icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  @include bg_image("../assets/edit.svg");
}
.bar_row {
  height: 66px;
}
.bar_item {
  padding: 10px;
  display: flex;
  background: #e5e5e5;
  outline: 1px solid #c9c9c9;
  @include font(500, 16px, 19px);
  color: #000000;
  vertical-align: middle;
  cursor: pointer;
}
.bar_item_row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.bar_item_icon {
  height: 16px;
  width: 16px;
  background-color: transparent;
  @include bg_image("../assets/sort.svg");
  border: none;
}
.item {
  padding: 10px;
  outline: 1px solid #c9c9c9;
  @include font(400, 14px, 17px);
  color: #3f3f3f;
  text-align: start;
  height: 58px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
}
.filter {
  display: flex;
  flex-direction: row;
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 54px;
    height: 35px;
    background: #757575;
    border-radius: 4px;
    border: none;
    z-index: 2;
    cursor: pointer;

    .icon {
      width: 35px;
      height: 35px;
    }
  }
  > input {
    width: 100%;
    height: 35px;
    background: #ffffff;
    border: 0.5px solid #c4c4c4;
    border-radius: 4px;
    margin-left: -5px;
    padding-left: 7px;
    @include font(400, 14px, 17px);
    outline: none;
  }
}
.tilde {
  @include bg_image("../assets/tilde.svg", 40% 40%);
}
.equal {
  @include bg_image("../assets/equal.svg", 30% 30%);
}
.more {
  @include bg_image("../assets/more.svg", 40% 40%);
}
.more_or_equal {
  @include bg_image("../assets/more_or_equal.svg", 60% 60%);
}
* {
  box-sizing: border-box;
}

html,
body {
  padding: 0;
  margin: 0;
}

body {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    "Helvetica", "Arial", sans-serif;
}

table {
  min-width: 98vw;
  width: auto;
  flex: 1;
  display: grid;
  border-collapse: collapse;
  margin: 0 auto;
  grid-template-columns: repeat(12, auto);
  gap: 1px;
}

tr {
  display: contents;
}

.resize-handle {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: black;
  opacity: 0;
  width: 3px;
  cursor: col-resize;
}

th:hover .resize-handle {
  opacity: 0.3;
}
</style>
