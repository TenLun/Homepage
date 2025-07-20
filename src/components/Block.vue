<template>
  <div id="blockContainer" ref="BlockContainer">
    <div id="block" ref="Block"><slot></slot></div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, type PropType } from 'vue';

const BlockContainer = ref()
const Block = ref()

//position [height,width,lenth,x,y,color] Direction "LEFT,FRONT"
const props = defineProps({
  Position: { type: Object as PropType<number[]>, required: true ,default:[1,1,1,1,1]},
  Color: { type:String, default:'rgb(39,39,39)'},
  unit: { type: Number, required: true },
  Hover: Object as PropType<number[]>,
  Direction: String 
})

const UNIT = props.unit;
const angle = -60; //rotateZ
const angleX = 30; //rotateX
const calculateDimensions = (dimensions:number[]) => {
  var [, width, length, x, y] = dimensions.map(value => `${value * UNIT}vw`);
  var heightCos = `${dimensions[0] * Math.cos(angleX * (Math.PI/180)) * Math.cos(angle * (Math.PI/180)) * UNIT}vw`;
  var heightSin = `${dimensions[0] * Math.cos(angleX * (Math.PI/180)) * Math.sin(angle * (Math.PI/180)) * UNIT}vw`;
  return [ width, length, x, y, heightCos, heightSin ];
};

//todo 鼠标悬浮动画，前方文字类型，颜色
const [width, lenth, x, y, heightCos, heightSin] = calculateDimensions(props.Position).map(Value => ref(Value))
const [color, bgcolor] = [ref(props.Color),ref('rgb(39,39,39)')];


function el(){
  if (props.Direction == "Front"){
    Block.value.style.transform = window.getComputedStyle(BlockContainer.value,":after").transform;
    Block.value.style.position = window.getComputedStyle(BlockContainer.value,":after").position;
    Block.value.style.top = window.getComputedStyle(BlockContainer.value,":after").top;
  }
  if (props.Hover == undefined) return;
  BlockContainer.value.onmouseover = () => {
    [color.value,bgcolor.value] = [bgcolor.value,color.value];
    [width.value, lenth.value, x.value, y.value, heightCos.value, heightSin.value] = calculateDimensions(props.Hover);
  }
  BlockContainer.value.onmouseout = () => {
    [width.value, lenth.value, x.value, y.value, heightCos.value, heightSin.value] = calculateDimensions(props.Position);
  }
}

nextTick(el)

</script>

<style>
#blockContainer{
  transition: all .4s;
  transform: translate(v-bind(heightCos) , v-bind(heightSin));
  position: absolute;
  height:v-bind(width);
  width:v-bind(lenth);
  left:v-bind(x);
  top:v-bind(y);
  background-color: v-bind(bgcolor);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
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
#block{
  overflow:hidden;
}
#block > * {
  transform: translateY(-60px);
  filter:drop-shadow(0px 60px v-bind(color));

}
#block > img {
  width: 75%; 
  height: 75%; 
  object-fit: cover;
  vertical-align: middle;
}
</style>
