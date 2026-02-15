<script setup lang="ts">
import type { PropType } from 'vue';
import Block from './Block.vue';
const props = defineProps({
  unit: { type: Number, required: true },
  Position: { type: Object as PropType<[number,number] | undefined>, default:undefined},    //[x,y]
  Href:String,
  Src:String
})
</script>

<template>
    <a :href="`${props.Href}`">
    <Block :Position="props.Position" :HWL="[0.1,1,1]" :HoverHWL="[0.1,6,1]" :unit="props.unit" :Color="'rgb(39,39,39)'">
      <div id="block-container">
        <div id="image-container" :style="`width:${props.unit}px; height:${props.unit}px;`">
            <img style="object-fit: cover; height: 75%;" loading="lazy" :src="`${props.Src}`" :alt="`${props.Src}`" />
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