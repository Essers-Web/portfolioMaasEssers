<template>
  <div class="scroller-wrapper">
    <button @click="() => current = (current + n - 1) % n" class="nav prev">←</button>

    <div
        ref="track"
        class="track"
        @touchstart.passive="e => touchX = e.touches[0].clientX"
        @touchmove.passive="e => {
        const d = touchX - e.touches[0].clientX;
        if (Math.abs(d) > 60) { current = (current + (d>0?1:n-1)) % n; touchX = null; }
      }"
        @touchend.passive="() => touchX = null"
    >
      <div
          v-for="(photo, i) in photos"
          :key="i"
          class="slide"
          :style="{ backgroundImage: `url(${photo})` }"
      ></div>
    </div>

    <button @click="() => current = (current + 1) % n" class="nav next">→</button>

    <div class="dots">
      <span
          v-for="(_, i) in photos"
          :key="i"
          :class="{ active: i === current }"
          @click="() => current = i"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const photos = [
  new URL('@/assets/photo1.jpg', import.meta.url).href,
  new URL('@/assets/photo2.jpg', import.meta.url).href,
  new URL('@/assets/photo3.jpg', import.meta.url).href,
  new URL('@/assets/photo4.jpg', import.meta.url).href,
];

const track = ref(null);
const current = ref(0);
const n = photos.length;
let touchX = null;

watch(current, () => {
  const el = track.value;
  if (el) el.scrollLeft = el.clientWidth * current.value;
});
</script>

<style scoped>
.scroller-wrapper {
  position: relative;
  width: 100vw;
  max-width: 1200px;
  margin: 2vw auto;
  overflow: hidden;
}

.track {
  display: flex;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overflow: hidden;
}

.slide {
  flex: 0 0 100%;
  height: 50vw;
  background: center/cover no-repeat;
  scroll-snap-align: start;
  border-radius: 5vw;
}

.nav{
  position: absolute;
  top: 50%; transform: translateY(-50%);
  width: 5vw; height: 5vw;
  background: rgba(255, 255, 255, 0.85);
  border: none; border-radius: 50%;
  font-size: 5vw; color: #333;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 10;
  box-shadow: 0 0.5vw 1.2vw rgba(0,0,0,0.15);
  transition: transform .2s, background .2s;
}

.nav:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
}

.prev{ left: 1vw;}
.next{ right: 1vw;}

.dots{
  text-align: center;
  margin-top: 1vw;
}

.dots span {
  display: inline-block;
  width: 1.5vw; height: 1.5vw;
  margin: 0 6px;
  background: #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: background .3s;
}

.dots span.active {
  background: #333;
}





</style>
