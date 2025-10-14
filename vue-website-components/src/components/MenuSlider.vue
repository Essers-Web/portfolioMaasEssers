<template>
  <div class="container">
    <button
        v-for="(label, i) in items"
        :key="i"
        ref="buttons"
    class="menu-button"
    @click="move(i)"
    >
    {{ label }}
    </button>

    <div
        class="indicator"
        :style="{
        width:  indicatorWidth + 'px',
        left:   indicatorLeft  + 'px'
      }"
    ></div>
  </div>
</template>

<script setup>
import {ref, onMounted, nextTick, onUnmounted} from 'vue'

const items = ['Home', 'Contact', 'Info', 'Shop', 'Account']
const activeIndex = ref(0)
const indicatorWidth = ref(0)
const indicatorLeft = ref(0)

const buttons = ref([])

function move(i) {
  activeIndex.value = i
  nextTick(() => {
    const btn = buttons.value[i]
    if (btn) {
      indicatorWidth.value = btn.offsetWidth
      indicatorLeft.value = btn.offsetLeft
    }
  })
}

onMounted(() => {
  move(0)
})

let resizeTimeout = null
let lastWidth = typeof window !== 'undefined' ? window.innerWidth : 0

function onResizeDebounced() {
  const w = window.innerWidth
  if (Math.abs(w - lastWidth) <= 2) return
  lastWidth = w
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => move(activeIndex.value), 120) // debounce
}

onMounted(() => window.addEventListener('resize', onResizeDebounced))
onUnmounted(() => {
  window.removeEventListener('resize', onResizeDebounced)
  clearTimeout(resizeTimeout)
})
</script>


<style scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;
  border: 5px solid white;
  width: 50vw;
  height: 6vw;
  margin-left: 15%;
  border-radius: 3vw;
  background: linear-gradient(
      90deg,
      #ff4e50 0%,
      #f9d423 25%,
      #24c6dc 50%,
      #514A9D 75%,
      #ff4e50 100%
  );
  background-size: 500% 100%;
  animation: gradientShift 7s ease infinite;
}

@keyframes gradientShift {
  0%   { background-position:   0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position:   0% 50%; }
}

.menu-button {
  border: 0.5vw solid white;
  width: 8vw;
  height: 3vw;
  border-radius: 3vw;
  font-size: 1.5vw;
  font-family: Impact, sans-serif;
  background-color: transparent;
  color: white;
  transition: color 0.6s, background-color 0.6s;
  cursor: pointer;
}

.menu-button:hover {
  background-color: white;
  color: #181818;
}

.indicator {
  position: absolute;
  bottom: 0.3vw;
  height: 1vw;
  background-color: white;
  transition: left 0.3s ease, width 0.3s ease;
  border-radius: 1vw;
}
</style>
