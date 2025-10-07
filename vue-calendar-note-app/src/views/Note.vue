<template>
    <div v-if="addNote" class="addNoteBlock">
    <noteAddBlock v-model:add-note="addNote" v-model:selected-id="selectedId" />
  </div>
    <div v-else class="container">
    <input v-model="searchQuery" type="search" class="search-bar" placeholder="Search note..." />
    <noteBlock @select-id="handleSelectedId" @update:add-note="addNote = $event" :search-query="searchQuery" />
    <button class="add-note" @click="addNoteActive">add note+</button>
  </div>
</template>

<script setup>
import noteBlock from "../components/noteBlock.vue";
import noteAddBlock from "../components/noteAddBlock.vue";
import noteManager from '../noteManager.js'
import {ref,watch} from "vue";

const addNote = ref(false)
const selectedId = ref(null)
const notes = ref([])
const searchQuery = ref("")

function addNoteActive() {
    addNote.value = true
}

function handleSelectedId(id) {
  selectedId.value = id;
  addNote.value = true
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
