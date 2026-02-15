<script setup lang="ts">
import type { PropType } from 'vue';
import { ref } from 'vue';
import Block from './Block.vue';

const props = defineProps({
  unit: { type: Number, required: true },
  Position: { type: Object as PropType<[number,number] | undefined>, default:undefined},    //[x,y]
  Color: { type:String, default:'rgb(39,39,39)'},
})

const color= ref(props.Color)

</script>

<template>
  <Block :Position="props.Position" :HWL="[0.1,1,1]" :HoverHWL="[1,1,1]" :unit="props.unit" :Color="props.Color">
    <div id="content"><slot></slot></div>
  </Block>
</template>

<style scoped>

#content {
  height: 100%;
  width: 100%;
  transform: translateY(-60px);
  filter:drop-shadow(0px 60px v-bind(color));
  height: 75%; 
  object-fit: cover;
  vertical-align: middle;
  overflow:hidden;
}

#content > img {
  height: 100%;
  width: 100%;
}

</style>