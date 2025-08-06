<script setup lang="ts">
import type { PropType } from 'vue';
import Block from './Block.vue';
const props = defineProps({
  unit: { type: Number, required: true },
  Position: { type: Object as PropType<number[]>,default:[1,1,1,1,1]}, //[height,width,lenth,x,y,color]
  MobilePos: Object as PropType<number[]>,
  IfMobile: { type:Boolean, default:false },
  Href:String
})
</script>

<template>
    <Block :MobilePos="props.MobilePos" :Position="props.Position" :IfMobile="props.IfMobile" :unit="props.unit">
    <div style="width:100%;height:100%">
        <a :href="`https://github.com/${props.Href}`" target="_blank">
            <img style="width:100%;height:100%" loading="lazy" :src="`https://opengraph.githubassets.com/githubcard/${props.Href}`"/>
        </a>
    </div>
    </Block>
</template>