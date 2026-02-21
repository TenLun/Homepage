<script setup lang="ts">
import Typed from 'typed.js';
import { onMounted } from 'vue';


const options = {
  strings: [
    "great",
    "useful",
    "fantastic",
    "awesome",
  ],
  smartbackspace:true,
  shuffle:true,
  typeSpeed: 50,
  backSpeed: 50,
  startDelay: 300,
  loop: true
};

onMounted(() => {new Typed("#typed", options);}) 
</script>

<template>
  <h1>Let's do something <span id="typed"></span></h1>
</template>

<style scoped>
#typed{
  white-space: pre-wrap;
  line-height: 30px;
}
h1{
  text-align: left;
}
</style>