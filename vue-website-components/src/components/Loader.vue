<template>
  <div class="container">
    <div class="loader-wrapper">
      <div class="loader-ring ring-large"></div>
      <div class="loader-ring ring-medium"></div>
      <div class="loader-ring ring-small"></div>
      <div class="loader-text">Loading..</div>
    </div>
  </div>
</template>

<script setup>
// geen script nodig voor deze demo
</script>

<style scoped>
/* Container (houdt Loader mooi in het midden van de pagina/sectie) */
.container {
  width: 40vw;
  height: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Wrapper: relatieve box, gebruikt vw zodat alles schaalt met viewport-breedte */
.loader-wrapper {
  position: relative;
  width: 24vw;   /* totale grootte van de grootste ring */
  height: 24vw;
  min-width: 14vw;  /* optioneel: voorkom dat het té klein wordt op kleine schermen */
  min-height: 14vw;
}

/* Basisring: gecentreerd via top/left + translate, en rotate animatie behoudt translate */
.loader-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  /* translate zorgt voor perfecte centrering; rotate wordt toegevoegd in animatie */
  transform: translate(-50%, -50%) rotate(0deg);
  border-radius: 50%;
  border: 1.6vw solid transparent; /* randdikte schaalbaar met vw */
  border-top-color: #ff3cac;
  animation: spin 1.2s linear infinite;
  box-sizing: border-box;
}

/* Groottes van de ringen (in vw) */
.ring-large {
  width: 24vw;
  height: 24vw;
  z-index: 1;
}

.ring-medium {
  width: 18vw;
  height: 18vw;
  border-top-color: #784ba0;
  animation-duration: 1.6s;
  z-index: 2;
}

.ring-small {
  width: 12vw;
  height: 12vw;
  border-top-color: #2b86c5;
  animation-duration: 2s;
  z-index: 3;
}

/* Animatie: behoud translate en roteer */
@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* Tekst exact in het midden, boven de ringen */
.loader-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: none;
  color: #ddd;
  font-size: 2vw;
  letter-spacing: 0.1vw;
  text-align: center;
  font-weight: 600;
}

/* Optioneel: op zeer smalle schermen iets beperkingen toepassen */
@media (max-width: 420px) {
  .loader-wrapper { width: 36vw; height: 36vw; } /* relatief groter op heel smalle viewports */
  .loader-ring { border: 2.4vw solid transparent; } /* verdikking op mobiel */
  .loader-text { font-size: 3.5vw; }
}
</style>
