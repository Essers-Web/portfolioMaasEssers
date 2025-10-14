<script setup>
import MenuSlider from "@/components/MenuSlider.vue";
import Loader from "@/components/Loader.vue";
import PictureScroller from "@/components/PictureScroller.vue";
import logIn from "@/components/LogIn.vue";
</script>

<template>
  <div id="app">
    <PictureScroller/><!--put component here from components    example:<Loader/> -->
  </div>
</template>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  background-color: #181818;
  font-family: sans-serif;
}
</style>

