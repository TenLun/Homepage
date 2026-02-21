<script setup lang="ts">
import { ref, type PropType } from 'vue';
import { calculateDimensions } from '../utils/Calculate';
import Block from './Block.vue';

const props = defineProps({
  unit: { type: Number, required: true },
  Position: { type: Object as PropType<[number,number] | undefined>, default:undefined},    //[x,y]
  HWL: { type: Object as PropType<[number,number,number]>, default:[0.2,1,1]},  //[height,width,lenth]
  HoverHWL: { type: Object as PropType<[number,number,number]>}, //[height,width,lenth]
  Color: { type: String, default:'rgb(39,39,39)'},
  ImgSrc: {type: String}
})

const HWL = props.HWL;
const HoverHWL = props.HoverHWL || [props.HWL[0]*10,props.HWL[1],props.HWL[2]];

const Content = ref()
const color = ref(props.Color);

function mouseOverHandler(){
  [Content.value.bgcolor, color.value] = [color.value, Content.value.bgcolor];
  [Content.value.width, Content.value.lenth, Content.value.heightCos, Content.value.heightSin] = calculateDimensions(HoverHWL);
}
function mouseOutHandler(){
  [Content.value.bgcolor, color.value] = [color.value, Content.value.bgcolor];
  [Content.value.width, Content.value.lenth, Content.value.heightCos, Content.value.heightSin] = calculateDimensions(HWL);
}
</script>

<template>
  <Block @mouseover="mouseOverHandler" @mouseout="mouseOutHandler" ref="Content" :Position="props.Position" :HWL="HWL" :unit="props.unit">
    <div id="wrapper">
      <img :src="`${props.ImgSrc}`" :alt="`${props.ImgSrc}`">
      <span id="content"><slot></slot></span>
    </div>
  </Block>
</template>

<style scoped>

#wrapper {
  transition: all .4s;
  height: 100%;
  width: 100%;
  overflow:hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  gap:7px;
  object-fit: cover;
  vertical-align: middle;
}

#wrapper > img {
  transform: translateY(-60px);
  filter:drop-shadow(0px 60px v-bind(color));
  height: 75%; 
  object-fit: cover;
  vertical-align: middle;
}

#content{
  transform: translateY(-60px);
  filter:drop-shadow(0px 60px v-bind(color));
}

</style>