<template>
  <input v-model="title" class="title-bar" maxlength="30" placeholder="title" />
  <textarea v-model="note" maxlength="1300" class="add-block" placeholder="notes: Max 400 words"/>
  <div class="button-container">
    <button class="safe-button" @click="saveDataNote">save</button>
    <button class="delete-button" @click="deleteDataNote">delete</button>
  </div>

</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import noteManager from '../noteManager.js'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  addNote: Boolean,
  selectedId: String
})

const emit = defineEmits(['update:add-note', 'update:selected-id' ])

const title = ref("")
const note = ref("")


const saveDataNote = async () => {
  try {
    const idToUse = props.selectedId || uuidv4()



    const fiction = {
      id: idToUse,
      title: title.value|| "unnamed",
      note: note.value
    }

    await noteManager.safeDataNote(fiction)

    title.value = ""
    note.value = ""

    emit('update:add-note', false)
    emit('update:selected-id', null)
  } catch (err) {
    console.error("saveDataNote error", err)
  }
}

const loadNoteById = async (id) => {
  const notes = await noteManager.getDataNote()
  const selected = notes.find(n => n.id === id)
  if (selected) {
    title.value = selected.title
    note.value = selected.note
    console.log("Loaded note:", { title: title.value, note: note.value })
  } else {
    alert("is not found")
  }
}

const deleteDataNote = async (id) => {

}

watch(
    () => props.selectedId,
    (newId) => {
      if (newId) loadNoteById(newId)
      else {
        title.value = ""
        note.value = ""
      }
    },
    { immediate: true }
)
</script>

<style scoped>
.add-block {
  display: flex;
  width: 80vw;
  height: 120vw;
  background: #242424;
  border: 1vw solid #D34A00;
  border-radius: 10vw;
  color: white;
  font-size: 4vw;
  padding: 4vw;
  resize: none;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.add-block textarea::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.title-bar {
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

.button-container {
  display: flex;
  flex-direction: row;
  padding: 4vw;
}

.safe-button {
  display: flex;
  width: 70vw;
  height: 15vw;
  font-size: 6vw;
  border-radius: 9vw;
  background-color: #D34A00;
  border: 1vw solid #D34A00;
  color: white;
  justify-content: center;
  align-items: center;
}

.delete-button {
  display: flex;
  width: 15vw;
  height: 15vw;
  font-size: 6vw;
  border-radius: 9vw;
  background-color: #D34A00;
  border: 1vw solid #D34A00;
  color: white;
  justify-content: center;
  align-items: center;
}

</style>