<template>
  <div id="blockContainer" ref="BlockContainer">
    <div id="block" ref="Block"><slot></slot></div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, type PropType } from 'vue';

const BlockContainer = ref()
const Block = ref()

const props = defineProps({
  Position: { type: Object as PropType<number[]>, required: true ,default:[1,1,1,1,1]}, //[height,width,lenth,x,y,color]
  Color: { type:String, default:'rgb(39,39,39)'},
  unit: { type: Number, required: true },
  Hover: Object as PropType<number[]>,
  MobilePos: Object as PropType<number[]>,
  Direction: String,
  IfMobile: Boolean,
})

const UNIT = props.unit;
const angle = -60; //rotateZ
const angleX = 30; //rotateX
const calculateDimensions = (dimensions:number[]) => {
  var [, width, length, x, y] = dimensions.map(value => `${value * UNIT}px`);
  var heightCos = `${dimensions[0] * Math.cos(angleX * (Math.PI/180)) * Math.cos(angle * (Math.PI/180)) * UNIT}px`;
  var heightSin = `${dimensions[0] * Math.cos(angleX * (Math.PI/180)) * Math.sin(angle * (Math.PI/180)) * UNIT}px`;
  return [ width, length, x, y, heightCos, heightSin ];
};

const [width, lenth, x, y, heightCos, heightSin] = calculateDimensions(props.Position).map(Value => ref(Value));
const [color, bgcolor] = [ref(props.Color),ref('rgb(39,39,39)')];
const ifMobile = ref(props.IfMobile);

function init(){
  if (props.Direction == "Aside"){
    [Block.value.style.width,Block.value.style.height] = [width.value,lenth.value];
    Block.value.style.transform = `translate(${UNIT}px) rotateZ(90deg)`;
    Block.value.style.transformOrigin = `top left`;
  }
  if (ifMobile.value && props.MobilePos != undefined ){
    [width.value, lenth.value, x.value, y.value, heightCos.value, heightSin.value] = calculateDimensions(props.MobilePos);
  }
  if (props.Hover == undefined) return;
  BlockContainer.value.onmouseover = () => {
    [color.value,bgcolor.value] = [bgcolor.value,color.value];
    [width.value, lenth.value, x.value, y.value, heightCos.value, heightSin.value] = calculateDimensions(props.Hover);
    if (props.Direction == "Aside") [Block.value.style.width,Block.value.style.height] = [width.value,lenth.value];
  }
  BlockContainer.value.onmouseout = () => {
    [color.value,bgcolor.value] = [bgcolor.value,color.value];
    [width.value, lenth.value, x.value, y.value, heightCos.value, heightSin.value] = calculateDimensions(props.Position);
    if (props.Direction == "Aside") [Block.value.style.width,Block.value.style.height] = [width.value,lenth.value];
  }
}

nextTick(init)

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
  transition: all .4s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height:100%;
  overflow:hidden;
}

#block > img {
  transform: translateY(-60px);
  filter:drop-shadow(0px 60px v-bind(color));
  height: 75%; 
  object-fit: cover;
  vertical-align: middle;
}

#block > a {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: v-bind(color);
  z-index: 1
}
</style>
