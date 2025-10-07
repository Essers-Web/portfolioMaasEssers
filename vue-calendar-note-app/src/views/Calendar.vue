<template>
  <div class="container">
    <div class="button-container">
      <button class="back-today-button" @click="goToToday">today</button>
      <button class="add-button" @click="addActivity" :disabled="!selectedDate">+</button>
    </div>
    <div class="Calendar-block">
      <CalendarComponent
          ref="calendarRef"
          @day-selected="handleDateSelected"
      />
    </div>
    <div class="Calendar-activities">
      <CalendarActivitiesComponent
          :selectedDate="selectedDate"
          :allActivities="allActivities"
          @get-activity="handleGetActivity"
      />
    </div>
    <div class="Calendar-activities-settings">
      <SettingActivity
          :title="activity.title"
          :ID="activity.ID"
          :allActivities="allActivities"
          :selectedDate="selectedDate"
          @titleChanged="handleTitleChanged"
          @databaseRefreshed="updateActivities"
      />
    </div>
    <div class="space-blank"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CalendarComponent from '../components/calendarComponent.vue'
import CalendarActivitiesComponent from '../components/calendarActivitiesComponent.vue'
import SettingActivity from '../components/settingActivity.vue'
import { getOrCreateId, loadActivityData, saveActivityData } from '../idManager.js'

const calendarRef    = ref(null)
const selectedDate  = ref(null)
const allActivities = ref({})
const activity      = ref({ title: '', ID: '' })

onMounted(async () => {
  allActivities.value = await loadActivityData()
})

async function updateActivities(newData) {
  allActivities.value = JSON.parse(JSON.stringify(newData))
}

function handleDateSelected(date) {
  selectedDate.value = date
  activity.value     = { title: '', ID: '' }
}

async function addActivity() {
  if (!selectedDate.value) {
    selectedDate.value = new Date()
    calendarRef.value?.backToToday?.()
  }

  const key = selectedDate.value.toISOString().slice(0, 10)
  if (!allActivities.value[key]) allActivities.value[key] = []

  let input = prompt('Voer een titel in voor de activiteit (max 20 tekens):')
  if (!input || !input.trim()) {
    input = 'Unnamed'
  } else if (input.trim().length > 20) {
    alert('Titel te lang, alleen de eerste 20 tekens worden gebruikt.')
    input = input.trim().slice(0, 20)
  } else {
    input = input.trim()
  }

  const index = allActivities.value[key].length
  const ID    = await getOrCreateId(input, index)

  allActivities.value[key].push({ title: input, ID })
  activity.value = { title: input, ID }
  await saveActivityData(allActivities.value)
}

function goToToday() {
  calendarRef.value?.backToToday?.()
}

function handleGetActivity(title, ID) {
  activity.value = { title, ID }
}

async function handleTitleChanged(newTitle, ID) {
  for (const dateKey in allActivities.value) {
    const list = allActivities.value[dateKey]
    const idx  = list.findIndex(a => a.ID === ID)
    if (idx !== -1) {
      list[idx].title = newTitle
      break
    }
  }
  if (activity.value.ID === ID) {
    activity.value.title = newTitle
  }
  await saveActivityData(allActivities.value)
}
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Calendar-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vw;
  width: 90vw;
  background-color: #242424;
  border-radius: 15vw;
}

.Calendar-activities,
.Calendar-activities-settings {
  display: flex;
  height: 40vw;
  width: 90vw;
  margin: 3vw;
  background-color: #242424;
  border-radius: 15vw;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 5vw;
  padding-bottom: 2vw;
}

.back-today-button,
.add-button {
  width: 15vw;
  height: 10vw;
  border-radius: 15vw;
  background-color: #D34A00;
  border: none;
  color: white;
  font-size: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-button {
  animation: pulse 1.2s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.15); }
}

.space-blank {
  width: 100%;
  height: 8vw;
}
</style>

