<template>
  <div class="wrapper">
    <div class="values">
      <span id="range1"> {{ params.valueOne }} </span>
      <span> &dash; </span>
      <span id="range2"> {{ params.valueTwo }} </span>
    </div>
    <div class="container">
      <div class="slider-track"></div>
      <input
        type="range"
        :min="params.min"
        :max="params.max"
        v-model.number="params.valueOne"
      />
      <input
        type="range"
        :min="params.min"
        :max="params.max"
        v-model.number="params.valueTwo"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, watch } from "vue";
export default {
  props: { initParams: Object },

  setup(props, context) {
    const params = reactive({
      valueOne: 10,
      valueTwo: 50,
      minGap: 10,
      min: 0,
      max: 100,
    });
    onMounted(() => Object.assign(params, props.initParams));

    watch(
      () => [params.valueOne, params.valueTwo],
      (newVal, oldVal) => {
        const isValOneChange = Boolean(newVal[0] - oldVal[0]);
        if (params.valueTwo - params.valueOne <= params.minGap) {
          if (isValOneChange) {
            params.valueOne = params.valueTwo - params.minGap;
          } else {
            params.valueTwo = params.valueOne + params.minGap;
          }
        }
        context.emit("change_value", `${params.valueOne} - ${params.valueTwo}`);
      }
    );

    return {
      params,
    };
  },
};
</script>

<style lang="scss" scoped>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  height: 100vh;
  display: -ms-grid;
  display: grid;
  background-color: #3264fe;
  place-items: center;
}
.wrapper {
  position: relative;
  width: 95vmin;
  background-color: #ffffff;
  padding: 50px 40px 20px 40px;
  border-radius: 10px;
}
.container {
  position: relative;
  width: 100%;
  height: 100px;
  margin-top: 30px;
}
input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  outline: none;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
}
.slider-track {
  background-color: #c4c4c4;
  width: 100%;
  height: 5px;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  border-radius: 5px;
}
input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  height: 5px;
}
input[type="range"]::-moz-range-track {
  -moz-appearance: none;
  height: 5px;
}
input[type="range"]::-ms-track {
  appearance: none;
  height: 5px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 1.7em;
  width: 1.7em;
  background-color: #3264fe;
  cursor: pointer;
  margin-top: -9px;
  pointer-events: auto;
  border-radius: 50%;
}
input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  height: 1.7em;
  width: 1.7em;
  cursor: pointer;
  border-radius: 50%;
  background-color: #3264fe;
  pointer-events: auto;
}
input[type="range"]::-ms-thumb {
  appearance: none;
  height: 1.7em;
  width: 1.7em;
  cursor: pointer;
  border-radius: 50%;
  background-color: #3264fe;
  pointer-events: auto;
}
input[type="range"]:active::-webkit-slider-thumb {
  background-color: #ffffff;
  border: 3px solid #3264fe;
}
.values {
  background-color: #3264fe;
  width: 32%;
  position: relative;
  margin: auto;
  padding: 10px 0;
  border-radius: 5px;
  text-align: center;
  font-weight: 500;
  font-size: 25px;
  color: #ffffff;
}
.values:before {
  content: "";
  position: absolute;
  height: 0;
  width: 0;
  border-top: 15px solid #3264fe;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  margin: auto;
  bottom: -14px;
  left: 0;
  right: 0;
}
</style>
