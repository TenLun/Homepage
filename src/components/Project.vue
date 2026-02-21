<script setup lang="ts">
import type { PropType } from 'vue';
import Block from './Block.vue';
const props = defineProps({
  unit: { type: Number, required: true },
  Position: { type: Object as PropType<[number,number] | undefined>, default: undefined },    //[x,y]
  Href:String
})
</script>

<template>
    <Block :Position="props.Position" :HWL="[0.3,6,12]" :unit="props.unit">
    <div style="width:100%;height:100%">
        <a :href="`https://github.com/${props.Href}`" target="_blank">
            <img style="width:100%;height:100%" loading="lazy" :src="`https://opengraph.githubassets.com/githubcard/${props.Href}`" :alt="`${props.Href}`"/>
        </a>
    </div>
    </Block>
</template>