<script setup lang="ts">
import type { PropType } from 'vue';
import Block from './Block.vue';
const props = defineProps({
  unit: { type: Number, required: true },
  Position: { type: Object as PropType<number[]>,default:[1,1,1,1,1]}, //[height,width,lenth,x,y,color]
  Hover: { type: Object as PropType<number[]>,default:[1,1,1,1,1]}, //[height,width,lenth,x,y,color]
  MobilePos: Object as PropType<number[]>,
  MobileHov: Object as PropType<number[]>,
  IfMobile: { type:Boolean, default:false },
  Href:String,
  Src:String
})
</script>

<template>
    <a :href="`${props.Href}`">
    <Block :IfMobile="props.IfMobile" :MobileHov="props.MobileHov" :MobilePos="props.MobilePos" :Position="props.Position" :Hover="props.Hover" :unit="props.unit" :Color="'rgb(39,39,39)'" :Direction="'Aside'">
        <div id="image-container" :style="`width:${props.Position[2]*props.unit}px; height:${props.Position[1]*props.unit}px;  left:0px;top:0px`">
            <img style="object-fit: cover; height: 75%;" loading="lazy" :src="`${props.Src}`" :alt="`${props.Src}`" />
        </div>
        <div style="position: relative; left: 6.25%; white-space: nowrap"><slot></slot></div>
    </Block>
    </a>
</template>

<style scoped>
#image-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(39,39,39);
  z-index: 1
}
</style>