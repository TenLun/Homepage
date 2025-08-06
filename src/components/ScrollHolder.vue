<script setup lang="ts">
import { animate } from 'animejs';
import { ref, nextTick } from 'vue';

const ScrollHolder = ref()
const props = defineProps({
  Delay:Number,
  Height:Number
})

nextTick(() => {
    animate(ScrollHolder.value,{
    delay:`${props.Delay}`,
    height: `${props.Height}px`,
    duration: 1000,
})});

</script>

<template>
    <div ref="ScrollHolder"></div>
</template>