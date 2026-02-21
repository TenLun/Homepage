<script setup lang="ts">
import { ref, type PropType } from 'vue';
import Block from './Block.vue';
import { calculateDimensions } from '../utils/Calculate';

const props = defineProps({
  unit: { type: Number, required: true },
  Position: { type: Object as PropType<[number,number] | undefined>, default:undefined},    //[x,y]
  HWL: { type: Object as PropType<[number,number,number]>, default:[0.3,1,1]},  //[height,width,lenth]
  HoverHWL: { type: Object as PropType<[number,number,number]>, default:[0.3,6,1]},  //[height,width,lenth]
  Href:String,
  Src:String
});

const Content = ref();
const HWL = props.HWL
const HoverHWL = props.HoverHWL

function mouseOverHandler(){
  [Content.value.width, Content.value.lenth, Content.value.heightCos, Content.value.heightSin] = calculateDimensions(HoverHWL);
}
function mouseOutHandler(){
  [Content.value.width, Content.value.lenth, Content.value.heightCos, Content.value.heightSin] = calculateDimensions(HWL);
}

</script>

<template>
    <a :href="`${props.Href}`" target="_blank">
    <Block ref="Content" :Position="props.Position" :HWL="HWL" :unit="props.unit" @mouseout="mouseOutHandler" @mouseover="mouseOverHandler">
      <div id="block-container">
        <div id="image-container" :style="`width:${props.unit}px; height:${props.unit}px;`">
            <img loading="lazy" :src="`${props.Src}`" :alt="`${props.Src}`" />
        </div>
        <div id="text"><slot></slot></div>
      </div>
    </Block>
    </a>
</template>

<style scoped>

#image-container {
  transform: rotate(90deg);
  left:0px;top:0px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(39,39,39);
  z-index: 1
}

#image-container > img {
  object-fit: cover;
  height: 75%;
  width: 75%;
}

#block-container{
  height: 100%;
  width: 100%;
  transition: all .4s;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow:hidden;
}

#text{
  top:6.25%;
  position: relative; white-space: nowrap;
  color: white !important;
  transform-origin: center;
  transform: rotate(90deg);
}

</style>