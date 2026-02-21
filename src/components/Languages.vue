<script setup lang="ts">
import type { PropType } from 'vue';
import { nextTick, ref } from 'vue';
import { calculateDimensions } from '../utils/Calculate';
import Block from './Block.vue';

const props = defineProps({
  unit: { type: Number, required: true },
  Position: { type: Object as PropType<[number,number] | undefined>, default:undefined},    //[x,y]
  HWL: { type: Object as PropType<[number,number,number]>, default:[0.1,1,1]},  //[height,width,lenth]
  HoverHWL: { type: Object as PropType<[number,number,number]>}, //[height,width,lenth]
  Color: { type: String, default:'rgb(39,39,39)'},
  ImgSrc: {type: String}
})

const HWL = props.HWL
const HoverHWL = props.HoverHWL || [props.HWL[0]*10,props.HWL[1],props.HWL[2]];

const Content = ref()
const color = ref(props.Color);
const bgColor = ref('rgb(39,39,39)')

function mouseOverHandler(){
  Content.value.bgcolor = color.value;
  [Content.value.width, Content.value.lenth, Content.value.heightCos, Content.value.heightSin] = calculateDimensions(HoverHWL);
}
function mouseOutHandler(){
  Content.value.bgcolor = bgColor.value;
  [Content.value.width, Content.value.lenth, Content.value.heightCos, Content.value.heightSin] = calculateDimensions(HWL);
}


</script>

<template>
  <Block @mouseover="mouseOverHandler" @mouseout="mouseOutHandler" ref="Content" :Position="props.Position" :HWL="HWL" :unit="props.unit">
    <div id="content"><img :src="`${props.ImgSrc}`" :alt="`${props.ImgSrc}`"></div>
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