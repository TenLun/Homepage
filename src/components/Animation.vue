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
const obj = document.createElement('div');

var startAnime = ()=>{
  
  [obj.style.width, obj.style.height, obj.style.left, obj.style.top] = props.animateVar.map(Value => String(Value*UNIT) + 'px' )
  obj.style.position = 'absolute'
  obj.style.backgroundColor = 'azure'
  Bar.value.appendChild(obj);
  firstAnime();
  startAnime = null;
}

var firstAnime = ()=>{
  animate(obj,{
    //delay:'10',
    left: UNIT * props.animateVar[4] + "px",
    top: UNIT * props.animateVar[5] + "px",
    duration: 1000,
    onComplete:function(){secondAnime();firstAnime = null;} //垃圾回收
  })
}
var secondAnime = ()=>{
  animate(obj,{
    keyframes: [
      {left: (UNIT * props.animateVar[4] + 'px')},
      {left: (UNIT * (props.animateVar[4] - 33) + 'px')}
    ],
    ease: "linear",
    duration: 9000,
    onComplete:function(){thirdAnime();secondAnime = null;} //垃圾回收
  })
}
var thirdAnime = ()=>{
  obj.style.left = UNIT * (props.animateVar[4] + 33) + 'px';
  animate(obj,{
    left: (UNIT * (props.animateVar[4] - 33) + 'px'),
    ease: "linear",
    duration: 9000,
    loop:true
  })
}
nextTick(startAnime);

</script>
