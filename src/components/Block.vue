<script setup lang="ts">
import { nextTick, ref, type PropType } from 'vue';

const BlockContainer = ref()

const props = defineProps({
  unit: { type: Number, required: true },
  Position: { type: Object as PropType<[number,number] | undefined>, default:undefined},    //[x,y]
  HWL: { type: Object as PropType<[number,number,number]>, default:[1,1,1]},  //[height,width,lenth]
  HoverHWL: { type: Object as PropType<[number,number,number]>}, //[height,width,lenth]
  Color: { type:String, default:'rgb(39,39,39)'},
})

const UNIT = props.unit;

const HWL = props.HWL
const HoverHWL = props.HoverHWL || props.HWL

const [color, bgcolor] = [ref(props.Color),ref('rgb(39,39,39)')];

const angle = -60; //rotateZ
const angleX = 30; //rotateX

const calculateDimensions = (dimensions:number[]) => {
  var [, width, length] = dimensions.map(value => `${value * UNIT}px`);
  var heightCos = `${dimensions[0] * Math.cos(angleX * (Math.PI/180)) * Math.cos(angle * (Math.PI/180)) * UNIT}px`;
  var heightSin = `${dimensions[0] * Math.cos(angleX * (Math.PI/180)) * Math.sin(angle * (Math.PI/180)) * UNIT}px`;
  return [ width, length, heightCos, heightSin ];
};

const [width, lenth, heightCos, heightSin] = calculateDimensions(props.HWL).map(Value => ref(Value));

const changeHWL = () => {
  BlockContainer.value.onmouseover = () => {
    [color.value,bgcolor.value] = [bgcolor.value,color.value];
    [width.value, lenth.value, heightCos.value, heightSin.value] = calculateDimensions(HoverHWL);
  }
  BlockContainer.value.onmouseout = () => {
    [color.value,bgcolor.value] = [bgcolor.value,color.value];
    [width.value, lenth.value, heightCos.value, heightSin.value] = calculateDimensions(HWL);
  }
}

const changePosition = () => {
  if (props.Position == undefined) {
    BlockContainer.value.style.position = 'relative';
  } else {
    const [x,y] = props.Position.map(value => `${value * UNIT}px`)
    BlockContainer.value.style.position = 'absolute';
    BlockContainer.value.style.left= x;
    BlockContainer.value.style.top= y;
  }
}

if (HoverHWL != HWL ) {
  nextTick(changeHWL)
}

nextTick(changePosition)

</script>

<template>
  <div id="blockContainer" ref="BlockContainer">
    <slot></slot>
  </div>
</template>

<style scoped>
#blockContainer{
  flex-shrink: 0;

  transition: all .4s;
  overflow: visible;

  background-color: v-bind(bgcolor);

  transform: translate(v-bind(heightCos) , v-bind(heightSin));

  height:v-bind(width);
  width:v-bind(lenth);

}
#blockContainer::before{
  content:'';
  position: absolute;
  transform-origin: right;
  transform: skewY( calc( v-bind(angle) * 1deg ) );
  transition: all .4s;
  width: v-bind(heightCos);
  left: calc( -1 * v-bind(heightCos))  ;
  height:v-bind(width);
  background-color: v-bind(bgcolor);
  filter: brightness(0.7);
}
#blockContainer::after{
  content:'';
  position: absolute;
  transform-origin: top;
  transform: skewX( calc( 90deg - v-bind(angle) * 1deg ) );
  transition: all .4s;

  left:0px;
  top: v-bind(width);

  width: v-bind(lenth);
  height:calc( v-bind(heightSin) * -1 );
  background-color: v-bind(bgcolor);
  filter: brightness(1.7);
  z-index: -1;
}

</style>
