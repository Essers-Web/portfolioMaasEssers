<template>
    <div v-if="addNote" class="addNoteBlock">
    <noteAddBlock v-model:add-note="addNote" v-model:selected-id="selectedId" />
  </div>
    <div v-else class="container">
    <input v-model="searchQuery" type="search" class="search-bar" placeholder="Search note..." />
    <noteBlock @select-id="handleSelectedId" @update:add-note="addNote = $event" :search-query="searchQuery" :sellectMode="$route.query.mode === 'select'"/>
    <button v-if="!selectMode" class="add-note" @click="addNoteActive">add note+</button>
  </div>
</template>

<script setup>
import noteBlock from "../components/noteBlock.vue";
import noteAddBlock from "../components/noteAddBlock.vue";
import noteManager from '../noteManager.js'
import {computed, ref, watch,} from "vue";
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()
const selectMode = ref(route.query.mode)
const searchNote = ref(route.query.search || '');
const addNote = ref(false)
const selectedId = ref(null)
const notes = ref([])
const searchQuery = computed({
  get: () => searchNote.value,
  set: (val) => {
    searchNote.value = val;
  }
});

watch(() => route.query.mode, (newMode) => {
  selectMode.value = newMode
})

function addNoteActive() {
    addNote.value = true
}

function handleSelectedId(id) {
  selectedId.value = id;
  const activityId = route.query.activity ?? route.query.activityId ?? route.query.idActivity ?? null;

  if (selectMode.value === 'select') {
    router.push({
      name: 'Calendar',
      query: {
        mode: 'selected',
        id: id,
        activityId: activityId
      }
    });
    selectMode.value = null;
  } else {
    addNote.value = true;
  }
}

const loadNotes = async () => {
  notes.value = await noteManager.getDataNote()
}

watch(addNote, (newVal) => {
  if (newVal === true) {
    loadNotes()
  }
})
</script>

<style scoped>
.select-text {
  justify-self: center;
  align-self: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5vw;
}

.addNoteBlock {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 5vw;
  gap: 3vw
}

.search-bar {
  display: flex;
  width: 70vw;
  font-size: 4vw;
  border-radius: 9vw;
  padding: 2vw;
  align-content: center;
  justify-content: center;
  background-color: #242424;
  border: 1vw solid #D34A00;
  color: white;
}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  display: none;
}

.add-note {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  height: 20vw;
  border-radius: 9vw;
  padding: 2vw;
  align-content: center;
  background-color: #242424;
  border: 1vw solid #D34A00;
  color: white;
  font-size: 6vw;
}

</style>
