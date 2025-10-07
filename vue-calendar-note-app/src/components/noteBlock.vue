<template>
<div class="container">
  <ul class="note-block">
    <li class="note" @click="openNote(note)" v-for="note in filteredNotes" :key="note.id">
      {{ note.title }}
    </li>
  </ul>
</div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, computed } from 'vue'
import noteManager from '../noteManager.js'

const props = defineProps({
  addNote: Boolean,
  searchQuery: String
})

const notes = ref([])

const filteredNotes = computed(() => {
  if (!props.searchQuery) return notes.value || []

  const query = props.searchQuery.toLowerCase()
  return (notes.value || []).filter(note =>
      note.title.toLowerCase().includes(query)
  )
})

const loadNotes = async () => {
  notes.value = await noteManager.getDataNote()
}

const emit = defineEmits(['update:addNote', 'select-id'])

function openNote(noteItem) {
  emit("update:addNote", true)
  emit("select-id", noteItem.id)
}

onMounted(() => {
  loadNotes()
})
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.note-block {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 80vw;
  height: 85vw;
  background: #242424;
  border: 1vw solid #D34A00;
  border-radius: 10vw;
  gap:3vw;
  padding:2vw;
  overflow: scroll;
}

.note{
  display: flex;
  justify-content: center;
  align-items: center;
  background: #D34A00;
  width: 80vw;
  min-height: 10vw;
  list-style: none;
  border-radius: 5vw;
  font-size: 4vw;
}
</style>