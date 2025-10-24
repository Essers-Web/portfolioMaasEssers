<template>
  <div class="container" v-if="isFilled(currentTitle) && isFilled(ID)">
    <div class="row-container">
      <button class="delete-button" @click="deleteActivity"> delete </button>
      <button class="add-note-button" @click="goToNote">{{buttonText}}</button>
    </div>
    <button @click="changeTitle" class="button-title">{{ currentTitle }}</button>
    <button class="search-note-button" @click="searchNote">Note: {{ currentNoteTitle }}</button>
  </div>
  <div class="container" v-else>
    <p class="replace-text">Select an activity</p>
  </div>
</template>

<script setup>
import { ref, watch, computed} from 'vue'
import {deleteActivityId, saveActivityData, loadActivityData, loadMaps, getActivityData} from "../idManager.js"
import { useRouter } from 'vue-router'
import noteManager from '../noteManager.js';

const router = useRouter()
const props = defineProps({
  title: String,
  ID: String,
  selectedDate: Date,
  allActivities: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['titleChanged', 'databaseRefreshed'])
const currentTitle = ref(props.title || '')
const currentNoteId = ref(null)
const currentNoteTitle = ref('')
const buttonText = computed(() => {
  return currentNoteId.value || currentNoteTitle.value ? 'Change note' : 'Add note';
});

watch(
    () => [props.ID, props.title],
    () => {
      currentNoteId.value = null;
      currentNoteTitle.value = '';
    }
);

function searchNote() {
  router.push({
    name: 'Note',
    query: {
      search: currentNoteTitle.value || ''
    }
  });
}

function formatLocalDate(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  return `${year}-${month}-${day}`;
}

watch(() => props.title, newTitle => {
  currentTitle.value = newTitle || ''
})

function goToNote() {
  router.push({
    name: 'Note',
    query: {
      mode: 'select',
      activity: props.ID
    }
  });
}

function isFilled(str) {
  return str && str.trim().length > 0
}

async function changeTitle() {
  const nieuweTitel = prompt('Voer een nieuwe titel in:', currentTitle.value)
  if (!nieuweTitel || !nieuweTitel.trim()) return

  const limitedTitle = nieuweTitel.trim().slice(0, 20)
  currentTitle.value = limitedTitle

  emit('titleChanged', currentTitle.value, props.ID)
}



async function deleteActivity() {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  if (!isFilled(currentTitle.value) || !isFilled(props.ID)) return;
  const confirmDelete = confirm(`Weet je zeker dat je "${currentTitle.value}" wilt verwijderen?`);

  if (!confirmDelete) return;
  await deleteActivityId(props.ID, props.index || 0);
  if (!(props.selectedDate instanceof Date)) return;

  const key = formatLocalDate(props.selectedDate);
  const all = await loadActivityData();
  const newActivities = {...all};

  if (newActivities[key]) {
    newActivities[key] = newActivities[key].filter(a => a.ID !== props.ID);
    if (newActivities[key].length === 0) delete newActivities[key];
  }

  await saveActivityData(newActivities);
  await sleep(500);
  await loadMaps();

  const refreshed = await loadActivityData();
  const updated = JSON.parse(JSON.stringify(refreshed));

  emit('databaseRefreshed', updated);
  emit('titleChanged', null, props.ID);
}

async function getNoteFromActivity() {
  await loadActivityData();
  const data = getActivityData();

  let noteId = null;

  outer: for (const dateKey in data) {
    const activities = data[dateKey];
    for (const act of activities) {
      if (act.ID === props.ID) {
        if (act.notes && act.notes.length > 0) {
          noteId = act.notes[0];
        }
        break outer;
      }
    }
  }

  console.log('Gevonden note-ID uit storage:', noteId);
  return noteId;
}

async function getNoteData() {
  if (!currentNoteId.value) return null;

  try {
    const allNotes = await noteManager.getDataNote();
    const note = allNotes.find(n => n.id === currentNoteId.value);

    if (!note) return null;

    currentNoteTitle.value = note.title;
    return note;
  } catch (err) {
    console.error('getNoteData error', err);
    return null;
  }
}

watch(
    () => props.ID,
    async (newId) => {
      if (!newId) return;

      currentNoteId.value = await getNoteFromActivity();

      if (currentNoteId.value) {
        await getNoteData();
      }
    },
    { immediate: true }
);

</script>

<style scoped>
.container {
  display: flex;
  align-content: center;
  width: 100%;
  justify-content: center;
  gap: 1vw;
}

.replace-text {
  margin-top: -3vw;
  color: #ccc;
  font-size: 5vw;
  text-align: center;
  width: 100%;
}

.button-title {
  display: flex;
  font-size: 5vw;
  border-radius: 9vw;
  height: 12vw;
  padding: 2vw;
  align-content: center;
  justify-content: center;
  background-color: #242424;
  border: 1vw solid #D34A00;
  color: white;
}

p {
  font-size: 3vw;
}

.row-container {
  display: flex;
  flex-direction: row;
  gap: 10vw;
}

.delete-button {
  display: flex;
  width: 30vw;
  font-size: 4vw;
  border-radius: 9vw;
  padding: 2vw;
  align-content: center;
  justify-content: center;
  background-color: #242424;
  border: 1vw solid #D34A00;
  color: white;
}

.add-note-button {
  display: flex;
  width: 30vw;
  font-size: 4vw;
  border-radius: 9vw;
  padding: 2vw;
  align-content: center;
  justify-content: center;
  background-color: #242424;
  border: 1vw solid #D34A00;
  color: white;
}

.search-note-button {
  display: flex;
  width: auto;
  max-width: 90vw;
  font-size: 4vw;
  border-radius: 9vw;
  padding: 2vw;
  align-content: center;
  justify-content: center;
  background-color: #242424;
  border: 1vw solid #D34A00;
  color: white;
}
</style>

