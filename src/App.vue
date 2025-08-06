<script setup lang="ts">
import { animate } from 'animejs';
import { nextTick,ref } from 'vue';
import Animation from './components/Animation.vue'
import Block from './components/Block.vue'
import ScrollHolder from './components/ScrollHolder.vue'
import Project from './components/Project.vue'
import Contact from './components/Contact.vue'

const UNIT = 50;
const DOCHEIGHT = 50; //文档流多少个单位长

const AppContainer = ref()

const IFMOBILE = window.innerWidth < 800

var animateArray = IFMOBILE ? [
  [3,1,-5,8,5,8],
  [1,5,6,-5,6,8],

  [1,5,9,-5,9,8],
  [3,1,-5,12,9,12]
] : [
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
  [1,5,25,-5,25,8]
];

var entranceAnimation = () => {
  animate(AppContainer.value,{
    delay:"20",
    transform: 'rotateX(30deg) rotateZ(-30deg) translateY(-135px) ' + (IFMOBILE ? 'translateX(-200px)' : 'translateX(-20px)'),
    duration: 1000,
  })
  entranceAnimation = null;
}

nextTick(() => {
  entranceAnimation();
  animateArray = null;
});

function ScrollPage(scrollY:number){
  var content = AppContainer.value;
  content.style.transform = `rotateX(30deg) rotateZ(-30deg) translateY(-${scrollY+135}px)` + (IFMOBILE ? ' translateX(-200px)' : ' translateX(-20px)') ;
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
  
  <div id="wrapper" ref="AppContainer">
    <div id="background"></div>
    <div id="animationContainer"><Animation v-for="item in animateArray" :animateVar="item" :unit="UNIT"/></div>

    <!--正文--->
    <div id="content">
    <Block :Position="[0.1,1,5,5,21]" :unit="UNIT" :Color="'white'"><div>TECH STACK</div></Block>
    <Block :Position="[1,1,1,9,24]" :Hover="[2,1,1,9,24]" :Color="'red'" :unit="UNIT" ><img src="./assets/icons/npm.svg" alt="npm"></Block>
    <Block :Position="[1,1,1,8,24]" :Hover="[2,1,1,8,24]" :Color="'green'" :unit="UNIT" ><img src="./assets/icons/vue.svg" alt="vue"></Block>
    <Block :Position="[1,1,1,7,24]" :Hover="[2,1,1,7,24]" :Color="'deepskyblue'" :unit="UNIT" ><img src="./assets/icons/python.svg" alt="python"></Block>
    <Block :Position="[1,1,1,6,24]" :Hover="[2,1,1,6,24]" :Color="'gold'" :unit="UNIT" ><img src="./assets/icons/js.svg" alt="js"></Block>
    <Block :Position="[1,1,1,5,24]" :Hover="[2,1,1,5,24]" :Color="'orange'" :unit="UNIT" ><img src="./assets/icons/html.svg" alt="html5"></Block>

    <Block :Position="[0.1,1,5,5,26]" :unit="UNIT" :Color="'white'"><div>MY PROJECTS</div></Block>
    <Project :Position="[0.1,6,12,5,28]" :unit="UNIT" :Href="'Tenlun/SVG-Generator'" />
    <Project :Position="[0.1,6,12,5,35]" :unit="UNIT" :Href="'Tenlun/Homepage'" />
    <Project :Position="[0.1,6,12,18,28]" :MobilePos="[0.1,6,12,5,42]" :unit="UNIT" :Href="'Tenlun/Console'" :IfMobile="IFMOBILE"  />

    <Contact :Position="[0.1,1,1,21,21]" :Hover="[0.1,6,1,21,21]" :IfMobile="IFMOBILE" :MobilePos="[0.1,6,1,14,21]" :MobileHov="[0.1,6,1,14,21]" :Src="'discord.svg'" :unit="UNIT">Discord (tenlun/otenluno)</Contact>
    <Contact :Position="[0.1,1,1,20,21]" :Hover="[0.1,6,1,20,21]" :IfMobile="IFMOBILE" :MobilePos="[0.1,6,1,13,21]" :MobileHov="[0.1,6,1,13,21]" :Src="'twitter.svg'" :unit="UNIT">Twitter (Tenlun/@oTenluno)</Contact>
    <Contact :Position="[0.1,1,1,19,21]" :Hover="[0.1,6,1,19,21]" :IfMobile="IFMOBILE" :MobilePos="[0.1,6,1,12,21]" :MobileHov="[0.1,6,1,12,21]" :Href="'https://github.com/Tenlun'" :Src="'github.svg'" :unit="UNIT">Github (Tenlun/TenLun)</Contact>
  </div>
  </div>
  <!--滚动条占位--->
  <ScrollHolder :Delay="25" :Height="UNIT*DOCHEIGHT"/>
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
