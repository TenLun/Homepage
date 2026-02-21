<script setup lang="ts">
import { nextTick, ref, type PropType } from 'vue';
import { calculateDimensions } from '../utils/Calculate';
const emit = defineEmits( ["mouseover","mouseout"] )

const props = defineProps({
  unit: { type: Number, required: true },
  Position: { type: Object as PropType<[number,number] | undefined>, default:undefined},    //[x,y]
  HWL: { type: Object as PropType<[number,number,number]>, default:[1,1,1]},  //[height,width,lenth]
  BgColor: { type:String, default:'rgb(39,39,39)'},
})

const UNIT = props.unit;
const HWL = props.HWL;

const BlockContainer = ref();
const [width, lenth, heightCos, heightSin] = calculateDimensions(HWL).map(Value => ref(Value));

const bgcolor = ref(props.BgColor);
const angleZ = -60; //rotateZ
const angleX = 30; //rotateX

function mouseOverHandler():void{
  emit('mouseover')
};
function mouseOutHandler():void{
  emit('mouseout')
};

const changePosition = () => {
  if (props.Position == undefined) {
    BlockContainer.value.style.position = 'relative';
  } else {
    const [x,y] = props.Position.map(value => `${value * UNIT}px`)
    BlockContainer.value.style.position = 'absolute';
    BlockContainer.value.style.left= x;
    BlockContainer.value.style.top= y;
  }
};
nextTick(changePosition);

defineExpose( { bgcolor, width, lenth, heightCos, heightSin } )
</script>

<template>
  <div @mouseover="mouseOverHandler" @mouseout="mouseOutHandler" id="blockContainer" ref="BlockContainer">
    <slot></slot>
  </div>
</template>

<style scoped>
#blockContainer{
  height:v-bind(width);
  width:v-bind(lenth);
  
  transform: translate(v-bind(heightCos) , v-bind(heightSin));
  
  background-color: v-bind(bgcolor);
  flex-shrink: 0;
  transition: all .4s;
  overflow: visible;
}

#blockContainer::before{
  content:'';

  position: absolute;
  left: calc( -1 * v-bind(heightCos));

  width: v-bind(heightCos);
  height:v-bind(width);

  transform-origin: right;
  transform: skewY( calc( v-bind(angleZ) * 1deg ) );
  
  transition: all .4s;
  background-color: v-bind(bgcolor);
  filter: brightness(0.7);
}
#blockContainer::after{
  content:'';

  position: absolute;
  left:0px;
  top: v-bind(width);
  
  width: v-bind(lenth);
  height:calc( v-bind(heightSin) * -1 );

  transform-origin: top;
  transform: skewX( calc( 90deg - v-bind(angleZ) * 1deg ) );

  transition: all .4s;
  background-color: v-bind(bgcolor);
  filter: brightness(1.7);
  z-index: -1;
}

</style>
