<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { cos, sin } from '../utils/TriFunction';

const Shadow = ref('');
const angleZ = -30; //rotateZ
const angleX = 30; //rotateX
const UNIT = 50; //rotateX

const animateShadow = () => {
    for (var i = 0; i < 9 ; i++){
      Shadow.value += `${ i*cos(angleX)*cos(90+angleZ)*-1}px ${i*cos(angleX)*sin(90+angleZ)}px 0px rgb(133,133,133),`
    }
    Shadow.value += `0px 0px 0px #000`
};
nextTick(animateShadow);
</script>

<template>
  <h1 ref="Title"><slot></slot></h1>
</template>

<style scoped>
h1 {
  height: calc(v-bind(UNIT)*1px);
  margin: 0px !important;
  text-shadow: v-bind(Shadow);
  text-align: left;
  /* transition: text-shadow 9s ease-in-out; */
}
</style>