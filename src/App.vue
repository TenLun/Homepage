<script setup lang="ts">
import { animate } from 'animejs';
import { nextTick,ref } from 'vue';
import Animation from './components/Animation.vue'
import Languages from './components/Languages.vue'
import ScrollHolder from './components/ScrollHolder.vue'
import Project from './components/Project.vue'
import Contact from './components/Contact.vue'
import Title from './components/Title.vue';
import Typing from './components/Typing.vue';

const UNIT = 50;
const DOCHEIGHT = 60; //文档流多少个单位长
const AppContainer = ref()
const angleZ = -30; //rotateZ
const angleX = 30; //rotateX

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
  [1,5,25,-5,25,8]
];

var entranceAnimation = () => {
  animate(AppContainer.value,{
    delay:"10",
    transform: `rotateX(${angleX}deg) rotateZ(${angleZ}deg) translateY(-135px)`,
    duration: 1000,
  })
  entranceAnimation = null;
}

nextTick(() => {
  entranceAnimation();
  animateArray = null;
});

function ScrollPage( scrollY: number ): void {
  var content = AppContainer.value;
  content.style.transform = `rotateX(${angleX}deg) rotateZ(${angleZ}deg) translateY(-${scrollY+135}px)`;
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
    <h1>Hi,I'm</h1>
    <div id="animationContainer"><Animation v-for="item in animateArray" :animateVar="item" :unit="UNIT"/></div>
    <Typing/>
    <!--正文--->
    <div id="content">
      <Title :unit="UNIT" :Color="'white'">TECH STACK</Title>
      <div id="Languages-display">
        <Languages :HWL="[0.2,1,2]" :Color="'#CB3837'" :unit="UNIT"  :ImgSrc="'./src/assets/icons/npm.svg'">NPM</Languages>
        <Languages :HWL="[0.2,1,2]" :Color="'#40B17F'" :unit="UNIT" :ImgSrc="'./src/assets/icons/vue.svg'">Vue3</Languages>
        <Languages :HWL="[0.2,1,3]" :Color="'#3766AB'" :unit="UNIT"  :ImgSrc="'./src/assets/icons/python.svg'">Python</Languages>
        <Languages :HWL="[0.2,1,4]" :Color="'#F7DF1E'" :unit="UNIT"  :ImgSrc="'./src/assets/icons/js.svg'">JavaScript</Languages>
        <Languages :HWL="[0.2,1,3]" :Color="'#E34F26'" :unit="UNIT"  :ImgSrc="'./src/assets/icons/html.svg'" >HTML5</Languages>
      </div>

      <Title :unit="UNIT" :Color="'white'">MY PROJECTS</Title>
      <div id="Project-display">
        <Project :unit="UNIT" :Href="'Tenlun/SVG-Generator'" />
        <Project :unit="UNIT" :Href="'Tenlun/Homepage'" />
        <Project :unit="UNIT" :Href="'Tenlun/Console'" />
      </div>

      <Title :unit="UNIT" :Color="'white'">CONTACTS</Title>
      <div id="Contact-display">
        <Contact :Href="'mailto:tenlun@outlook.com'" :Src="'outlook.svg'" :unit="UNIT">Outlook (tenlun@outlook.com)</Contact>
        <Contact :Href="'https://discordapp.com/users/827701073585373184'":Src="'discord.svg'" :unit="UNIT">Discord (tenlun/otenluno)</Contact>
        <Contact :Href="'https://x.com/Tenlun'" :Src="'twitter.svg'" :unit="UNIT">Twitter (Tenlun/@oTenluno)</Contact>
        <Contact :Href="'https://github.com/Tenlun'" :Src="'github.svg'" :unit="UNIT">Github (Tenlun/TenLun)</Contact>
        <Contact :HoverHWL="[0.3,7,1]" :Href="'https://t.me/Tenlun'" :Src="'telegram.svg'" :unit="UNIT">Telegram (Tenlun Kaiki/@oTenLuno)</Contact>
      </div>
    </div>
  </div>
  <!--滚动条占位--->
  <ScrollHolder :Delay="25" :Height="UNIT*DOCHEIGHT"/>
</template>

<style scoped>
#wrapper{
  background-color: rgb(36, 36, 36);
  position:fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
}

#animationContainer{
  width: 100vw;
  height: 100vh;
}

#content{
  position: absolute;
  left:0px;
  top: calc(v-bind(UNIT)*23px);
}

#background{
  position: absolute;
  top: -900px;
  left: -400px;
  width: 300vw;
  height: calc(v-bind(DOCHEIGHT*UNIT) * 1px + 900px);
  overflow: visible;
  background-image: url('./assets/background.svg');
}

#Languages-display,#Project-display,#Contact-display{
  margin-top: calc(v-bind(UNIT)*1px);
  margin-bottom: calc(v-bind(UNIT)*1px);
  margin-left: calc(v-bind(UNIT)*1px);
  margin-right: calc(v-bind(UNIT)*3px);
  display: flex;
  flex-wrap: wrap;
  gap: calc(v-bind(UNIT) * 1px);
}
</style>
