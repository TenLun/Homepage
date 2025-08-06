<template>
  <div ref="Bar"></div>
</template>

<script setup lang="ts">
import { animate } from 'animejs';
import { ref, nextTick, type PropType } from 'vue';


const props = defineProps({
  animateVar : { type: Object as PropType<number[]>, required: true }, //animateVar [height,width,orgin_x,origin_y,final_x,final_y]
  unit: { type: Number, required: true }
})

const UNIT = props.unit

const Bar = ref()

var startAnime = ()=>{
    let obj = document.createElement('div');
    [obj.style.width, obj.style.height, obj.style.left, obj.style.top] = props.animateVar.map(Value => String(Value*UNIT) + 'px' )
    obj.style.position = 'absolute'
    obj.style.backgroundColor = 'azure'
    let element = Bar.value;
    element.appendChild(obj);

    animate(obj,{
        delay:'10',
        left: UNIT * props.animateVar[4] + "px",
        top: UNIT * props.animateVar[5] + "px",
        duration: 1000,
        onComplete:function(){startAnime = null} //垃圾回收
    })
}
nextTick(startAnime);

</script>
