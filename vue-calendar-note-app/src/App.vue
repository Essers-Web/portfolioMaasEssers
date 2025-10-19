<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <div id="app">
    <div class="container-view">
      <router-view></router-view>
    </div>
    <!--note nav-->
    <nav id="nav">
      <div class="nav-highlight" :class="highlightClass"></div>

      <router-link to="/note" class="nav-buttons" active-class="active">
        <svg class="nav-icon" width="31" height="29" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.532 18.4085L10.304 19.4502L11.342 13.5857L23.2374 2.57062C23.4304 2.38981 23.66 2.2463 23.913 2.14836C24.166 2.05042 24.4373 2 24.7114 2C24.9855 2 25.2568 2.05042 25.5098 2.14836C25.7628 2.2463 25.9924 2.38981 26.1854 2.57062L28.3859 4.61546C28.5805 4.79479 28.7349 5.00815 28.8403 5.24323C28.9457 5.47831 29 5.73045 29 5.98511C29 6.23978 28.9457 6.49192 28.8403 6.727C28.7349 6.96207 28.5805 7.17543 28.3859 7.35477L16.532 18.4085Z" stroke="white" stroke-width="2.31353" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M25.874 19.373V25.1603C25.874 25.6719 25.6552 26.1626 25.2659 26.5243C24.8766 26.8861 24.3486 27.0894 23.798 27.0894H4.076C3.52541 27.0894 2.99737 26.8861 2.60805 26.5243C2.21872 26.1626 2 25.6719 2 25.1603V6.83391C2 6.32228 2.21872 5.83161 2.60805 5.46983C2.99737 5.10806 3.52541 4.90482 4.076 4.90482H10.304" stroke="white" stroke-width="2.31353" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>Note
      </router-link>

      <!--calendar nav-->
      <router-link to="/" class="nav-buttons" active-class="active">
        <svg class="nav-icon" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 20.6383C17.4084 20.6383 20.5769 17.4594 20.5769 13.538C20.5769 9.61659 17.4084 6.43768 13.5 6.43768C9.59148 6.43768 6.42303 9.61659 6.42303 13.538C6.42303 17.4594 9.59148 20.6383 13.5 20.6383Z" stroke="white" stroke-width="2.31353" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.5 10.8754V13.538H16.1538" stroke="white" stroke-width="2.31353" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M23.2308 2H3.76923C2.79211 2 2 2.79473 2 3.77507V23.3009C2 24.2812 2.79211 25.076 3.76923 25.076H23.2308C24.2079 25.076 25 24.2812 25 23.3009V3.77507C25 2.79473 24.2079 2 23.2308 2Z" stroke="white" stroke-width="2.31353" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>Calendar
      </router-link>
    </nav>
  </div>



</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const highlightClass = computed(() => {
  return route.path === '/note' ? 'move-left' : 'move-right';
});
</script>


<style scoped>

:global(html),
:global(body),
:global(#app) {
  height: 100vh;
  width: 100%;
  margin: 0;
  top: 0;
  background-color: black;
  color: white;
  font-family: Kanit, sans-serif;
}

.container-view{
  min-height: calc(100vh - 28vw);
  padding-bottom: 28vw;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;

}

#nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 28vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242424;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
  border-radius: 10vw 10vw 0 0;
}

.nav-buttons {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border: 1.5vw solid #D34A00;
  background-color: #242424;
  font-family: Kanit, sans-serif;
  text-decoration: none;
  color: #D34A00;
  height: 15vw;
  width: 40vw;
  border-radius: 10vw;
  margin: 2vw;
  font-size: 4vw;
  padding-bottom: 1vw;
  position: relative;
  z-index: 1;
}

.nav-icon {
  width: 9vw;
  height: auto;
  margin-bottom: 1vw;
  stroke: #D34A00;
}

.nav-icon path {
  stroke: #D34A00;
}

.nav-buttons.active {
  background-color: #D34A00;
  border: 1.5vw solid #D34A00;
  color: white;
}

.nav-buttons.active .nav-icon path {
  stroke: white;
}

.nav-highlight {
  position: absolute;
  height: 15vw;
  width: 39vw;
  background-color: #D34A00;
  border-radius: 10vw;
  transition: transform 0.5s ease;
  z-index: 0;
  border: 2vw solid #D34A00;

}

.move-left {
  transform: translateX(-23vw);
}

.move-right {
  transform: translateX(23vw);
}

</style>
