<template>
  <div class="date_range">
    <input
      type="date"
      :value="
        dateStart
          ? pattern('/', '-', dateStart)
          : pattern('/', '-', dateRange?.split('-')[0])
      "
      @input="
        $emit(
          'update:dateStart',
          pattern('-', '/', $event.target.value)?.split('-').join('/')
        ),
          $emit(
            'update:dateRange',
            pattern('-', '/', $event.target.value)?.split('-').join('/') +
              '-' +
              dateRange?.split('-')[1]
          )
      "
    />
    <span> - </span>
    <input
      type="date"
      :value="
        dateEnd
          ? pattern('/', '-', dateEnd)
          : pattern('/', '-', dateRange?.split('-')[1])
      "
      @input="
        $emit(
          'update:dateEnd',
          pattern('-', '/', $event.target.value)?.split('-').join('/')
        ),
          $emit(
            'update:dateRange',
            dateRange?.split('-')[0] +
              '-' +
              pattern('-', '/', $event.target.value)?.split('-').join('/')
          )
      "
    />
  </div>
</template>

<script>
export default {
  props: {
    dateStart: {
      type: String,
      required: false,
    },
    dateEnd: {
      type: String,
      required: false,
    },
    dateRange: {
      type: String,
      required: false,
    },
  },
  setup() {
    const pattern = (from, to, date) => {
      return date?.split(from)?.join(to);
    };

    return { pattern };
  },
};
</script>

<style lang="scss" scoped>
.date_range {
  container-type: inline-size;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin: 0 3px;
  font-size: 16px;
  input::-webkit-datetime-edit-day-field,
  input::-webkit-datetime-edit-month-field,
  input::-webkit-datetime-edit-year-field {
    background: transparent;
    color: #3f3f3f;
  }
  input::-webkit-datetime-edit-day-field:focus,
  input::-webkit-datetime-edit-month-field:focus,
  input::-webkit-datetime-edit-year-field:focus {
    color: black;
  }
  input:focus {
    outline: 1px solid #c4c4c4;
  }
  input {
    position: relative;
    width: 100%;
    height: 34px;
    background: white;
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    color: #3f3f3f;
    outline: none;
    font-size: 7cqw;
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
}
</style>
