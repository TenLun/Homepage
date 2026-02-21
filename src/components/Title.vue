<script setup lang="ts">
import { nextTick, ref, type PropType } from 'vue';
import { cos, sin } from '../utils/TriFunction';

const props = defineProps({
  Position: { type: Object as PropType<[number,number] | undefined>, default: undefined },    //[x,y]
});

const Shadow = ref('');
const angleZ = -30; //rotateZ
const angleX = 30; //rotateX

const animateShadow = () => {
    for (var i = 0; i < 9 ; i++){
      Shadow.value += `${ i*cos(angleX) }px ${i*sin(angleZ)}px 0px rgb(20,20,20),`
    }
    Shadow.value += `-9px -9px 0px #CCC`
};
nextTick(animateShadow);
</script>

<template>
  <h1 ref="Title"><slot></slot></h1>
</template>

<style scoped>
h1 {
  text-shadow: v-bind(Shadow);
  text-align: left;
  /* transition: text-shadow 9s ease-in-out; */
}
</style>