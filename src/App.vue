<script setup lang="ts">
import { animate } from 'animejs';
import { nextTick,ref } from 'vue';
import Animation from './components/Animation.vue'
import Block from './components/Block.vue'
//danwei 2.5vw
const UNIT = 2.5
const BG = ref()
const AppContainer = ref()
const ScrollHolder = ref()

var animateArray = [
    [3,1,-5,8,5,8],
    [1,5,6,-5,6,8],

    [3,1,-5,8,9,8],
    [3,1,-5,10,9,10],
    [3,1,-5,12,9,12],

    [3,1,-5,8,13,8],
    [1,5,13,-5,13,8],
    [1,5,15,-5,15,8],

    [1,5,17,-5,17,8],
    [3,1,-5,12,17,12],

    [1,5,21,-5,21,8],
    [1,5,23,-5,23,8],
    [3,1,-5,12,21,12],

    [3,1,-5,8,25,8],
    [1,5,27,-5,27,8],
    [1,5,25,-5,25,8],
]

var drawSVGGrid = (svg: HTMLElement, width: number, height: number, gridSize: number) => {
  for (let x = 0; x <= width; x += gridSize) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', String(x)+'vw');
    line.setAttribute('y1', '-180vw');
    line.setAttribute('x2', String(x)+'vw');
    line.setAttribute('y2', String(height)+'vw');
    line.setAttribute('stroke', '#e0e0e0');
    line.setAttribute('stroke-width', '0.5');
    svg.appendChild(line);
  };
  for (let y = 0; y <= height; y += gridSize) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '-180vw');
    line.setAttribute('y1', String(y)+'vw');
    line.setAttribute('x2', String(width)+'vw');
    line.setAttribute('y2', String(y)+'vw');
    line.setAttribute('stroke', '#e0e0e0');
    line.setAttribute('stroke-width', '0.5');
    svg.appendChild(line);
  }
  drawSVGGrid = null;
};

var entranceAnimation = () => {
  animate(AppContainer.value,{
    delay:"10",
    transform: 'rotateX(30deg) rotateZ(-30deg) ',
    duration: 1000,
  })
  animate(ScrollHolder.value,{
    delay:"15",
    height: '200vh',
    duration: 1000,
  })
  entranceAnimation = null;
}

nextTick(() => {
  var svg = BG.value;
  drawSVGGrid(svg, UNIT*40, UNIT*40, UNIT); // 调用函数绘制网格线
  entranceAnimation()
});

function ScrollPage(scrollY:number){
  var content = AppContainer.value;
  content.style.transform = "rotateX(30deg) rotateZ(-30deg) translateY("+ String(-scrollY) + "px)" ;
}

var ticking = false;
document.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      ScrollPage(window.scrollY);
      ticking = false;
    });
    ticking = true;
  }
});
</script>

<template>
  <!--正文--->
  <div id="wrapper" ref="AppContainer">
    <svg id="background" ref="BG"></svg>
    <div class="animationContainer"><Animation v-for="item in animateArray" :animateVar="item" :unit="UNIT"/></div>
    <Block :Position="[0.1,1,5,5,16]" :unit="UNIT" :Color="'white'"><div>TECH STACK & TOOLS</div></Block>
    <Block :Position="[1,1,1,9,19]" :Hover="[2,1,1,9,19]" :Color="'red'" :unit="UNIT" ><img src="./assets/icons/npm.svg" alt="npm"></Block>
    <Block :Position="[1,1,1,8,19]" :Hover="[2,1,1,8,19]" :Color="'green'" :unit="UNIT" ><img src="./assets/icons/vue.svg" alt="vue"></Block>
    <Block :Position="[1,1,1,7,19]" :Hover="[2,1,1,7,19]" :Color="'deepskyblue'" :unit="UNIT" ><img src="./assets/icons/python.svg" alt="python"></Block>
    <Block :Position="[1,1,1,6,19]" :Hover="[2,1,1,6,19]" :Color="'gold'" :unit="UNIT" ><img src="./assets/icons/js.svg" alt="js"></Block>
    <Block :Position="[1,1,1,5,19]" :Hover="[2,1,1,5,19]" :Color="'orange'" :unit="UNIT" ><img src="./assets/icons/html.svg" alt="html5"></Block>

    <Block :Position="[0.1,1,5,5,21]" :unit="UNIT" :Color="'white'"><div>MY PROJECTS</div></Block>
    <Block :Position="[0.1,6,12,5,23]" :unit="UNIT" :Color="'white'"><div style="width:100%;height:100%">
      <a href="https://github.com/Tenlun/SVG-Generator" target="_blank">
        <img style="object-fit: fill;width:100%;height:100%" loading="lazy" src="https://opengraph.githubassets.com/githubcard/Tenlun/SVG-Generator"></img></a></div></Block>
    <Block :Position="[0.1,6,12,18,23]" :unit="UNIT" :Color="'white'"><div style="width:100%;height:100%">
      <a href="https://github.com/Tenlun/Console" target="_blank">
        <img style="object-fit: fill;width:100%;height:100%" loading="lazy" src="https://opengraph.githubassets.com/githubcard/Tenlun/Console"></img></a></div></Block>
    <Block :Position="[0.1,6,12,5,30]" :unit="UNIT" :Color="'white'"><div style="width:100%;height:100%">
      <a href="https://github.com/Tenlun/Homepage" target="_blank">
        <img style="object-fit: fill;width:100%;height:100%" loading="lazy" src="https://opengraph.githubassets.com/githubcard/Tenlun/Homepage"></img></a></div></Block>

    <Block :Position="[0.1,1,1,19,16]" :Hover="[0.1,6,1,19,16]" :unit="UNIT" :Color="'white'" :Direction="'Aside'"><img src="./assets/icons/npm.svg" alt="npm"><div>Github</div></Block>
  </div>

  <!--滚动条占位--->
  <div id="scrollholder" ref="ScrollHolder"></div>
</template>

<style scoped>
#background{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
#wrapper{
  background-color: rgb(36, 36, 36);
  position:fixed;
  top:0;
  left:0;
  width: 100vw;
  height: 100vh;
}

#scrollholder{
  width: 0vw;
  height: 0vh;
}
</style>
