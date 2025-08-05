<script setup lang="ts">
import { animate } from 'animejs';
import { nextTick,ref } from 'vue';
import Animation from './components/Animation.vue'
import Block from './components/Block.vue'

const UNIT = 50;
const DOCHEIGHT = 50; //文档流多少个单位长

const AppContainer = ref()
const ScrollHolder = ref()

var ifMobile = ref(false)

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

var entranceAnimation = () => {
  animate(AppContainer.value,{
    delay:"20",
    transform: 'rotateX(30deg) rotateZ(-30deg) translateX(-20px) translateY(-135px)',
    duration: 1000,
  })
  animate(ScrollHolder.value,{
    delay:"25",
    height: `${UNIT*DOCHEIGHT}px`,
    duration: 1000,
  })
  entranceAnimation = null;
}



nextTick(() => {
  CheckIfMobile()
  entranceAnimation();
  animateArray = null;
});

function ScrollPage(scrollY:number){
  var content = AppContainer.value;
  content.style.transform = `rotateX(30deg) rotateZ(-30deg) translateY(-${scrollY+135}px) translateX(-20px)` ;
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

function CheckIfMobile(){
  ifMobile.value = window.innerHeight < 800 //px
}

window.setInterval(
  ()=>{CheckIfMobile()},
  1000
)

</script>

<template>
  <!--正文--->
  <div id="wrapper" ref="AppContainer">
    <div id="background"></div>
    <div class="animationContainer"><Animation v-for="item in animateArray" :animateVar="item" :unit="UNIT"/></div>
    <Block :Position="[0.1,1,5,5,21]" :unit="UNIT" :Color="'white'"><div>TECH STACK</div></Block>
    <Block :Position="[1,1,1,9,24]" :Hover="[2,1,1,9,24]" :Color="'red'" :unit="UNIT" ><img src="./assets/icons/npm.svg" alt="npm"></Block>
    <Block :Position="[1,1,1,8,24]" :Hover="[2,1,1,8,24]" :Color="'green'" :unit="UNIT" ><img src="./assets/icons/vue.svg" alt="vue"></Block>
    <Block :Position="[1,1,1,7,24]" :Hover="[2,1,1,7,24]" :Color="'deepskyblue'" :unit="UNIT" ><img src="./assets/icons/python.svg" alt="python"></Block>
    <Block :Position="[1,1,1,6,24]" :Hover="[2,1,1,6,24]" :Color="'gold'" :unit="UNIT" ><img src="./assets/icons/js.svg" alt="js"></Block>
    <Block :Position="[1,1,1,5,24]" :Hover="[2,1,1,5,24]" :Color="'orange'" :unit="UNIT" ><img src="./assets/icons/html.svg" alt="html5"></Block>

    <Block :Position="[0.1,1,5,5,26]" :unit="UNIT" :Color="'white'"><div>MY PROJECTS</div></Block>
    <Block :Position="[0.1,6,12,5,28]" :unit="UNIT"><div style="width:100%;height:100%">
      <a href="https://github.com/Tenlun/SVG-Generator" target="_blank">
        <img style="width:100%;height:100%" loading="lazy" src="https://opengraph.githubassets.com/githubcard/Tenlun/SVG-Generator"></img></a></div>
    </Block>
    <Block :MobilePos="[0.1,6,12,5,42]" :Position="[0.1,6,12,18,28]" :unit="UNIT" :IfMobile="ifMobile">
      <div style="width:100%;height:100%">
        <a href="https://github.com/Tenlun/Console" target="_blank">
          <img style="width:100%;height:100%" loading="lazy" src="https://opengraph.githubassets.com/githubcard/Tenlun/Console"></img>
        </a>
      </div>
    </Block>
    <Block :Position="[0.1,6,12,5,35]" :unit="UNIT" ><div style="width:100%;height:100%">
      <a href="https://github.com/Tenlun/Homepage" target="_blank">
        <img style="width:100%;height:100%" loading="lazy" src="https://opengraph.githubassets.com/githubcard/Tenlun/Homepage"></img></a></div>
    </Block>

    <Block :Position="[0.1,1,1,21,21]" :Hover="[0.1,6,1,21,21]" :unit="UNIT" :Color="'rgb(39,39,39)'" :Direction="'Aside'">
      <a :style="`width:${UNIT}px;height:${UNIT}px;left:0px;top:0px`">
        <img style="object-fit: cover; height: 75%;" loading="lazy" src="./assets/icons/discord.svg" alt="discord"></img></a>
      <div style="position: relative; left: 6.25%; white-space: nowrap">Discord (tenlun/otenluno)</div>
    </Block>
    <Block :Position="[0.1,1,1,20,21]" :Hover="[0.1,6,1,20,21]" :unit="UNIT" :Color="'rgb(39,39,39)'" :Direction="'Aside'">
      <a :style="`width:${UNIT}px;height:${UNIT}px;left:0px;top:0px`">
        <img style=" object-fit: cover; height: 75%;" loading="lazy" src="./assets/icons/twitter.svg" alt="twitter"></img></a>
      <div style="position: relative; left: 6.25%; white-space: nowrap">Twitter (Tenlun/@oTenluno)</div>
    </Block>
    <Block :Position="[0.1,1,1,19,21]" :Hover="[0.1,6,1,19,21]" :unit="UNIT" :Color="'rgb(39,39,39)'" :Direction="'Aside'">
      <a :style="`width:${UNIT}px;height:${UNIT}px;left:0px;top:0px`">
        <img style="object-fit: cover; height: 75%;" loading="lazy" src="./assets/icons/github.svg" alt="github"></img></a>
      <div style="position: relative; left: 6.25%; white-space: nowrap">Github (Tenlun/TenLun)</div>
    </Block>
    
    
  </div>

  <!--滚动条占位--->
  <div id="scrollholder" ref="ScrollHolder"></div>
</template>

<style scoped>
#background{
  position: absolute;
  top: -900px;
  left: -200px;
  width: 300vw;
  height: calc(v-bind(DOCHEIGHT*UNIT) * 1px + 900px);
  overflow: visible;
  background-image: url('./assets/background.svg');
}
#wrapper{
  background-color: rgb(36, 36, 36);
  position:fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
}
</style>
