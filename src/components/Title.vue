<script setup lang="ts">
import { nextTick, ref, type PropType } from 'vue';
const props = defineProps({
  Position: { type: Object as PropType<[number,number] | undefined>, default: undefined },    //[x,y]
})

const Title = ref()

const animateShadow = () => {
    for (var i = 0; i<-9 ; i--){
        Title.value.style.textShadow += `${i}px ${i}px 0px #CCC,`
    }
}

nextTick(animateShadow)

</script>

<template>
  <h1 ref="Title"><slot></slot></h1>
</template>

<style scoped>
h1 {
  transition: text-shadow 9s ease-in-out;
}
</style>