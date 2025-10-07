<template>
  <div class="calendar-wrapper">
    <div class="calendar-header">
      <button class="button-month" @click="prevMonth">&lt;</button>
      <span>{{ monthNames[currentMonth] }} {{ currentYear }}</span>
      <button class="button-month" @click="nextMonth">&gt;</button>
    </div>
    <div class="calendar-grid">
      <div class="calendar-weekday" v-for="day in weekDays" :key="day">
        {{ day }}
      </div>
      <div
          v-for="dateObj in daysInMonth"
          :key="dateObj.key"
          class="calendar-day"
          :class="{
          empty: !dateObj.date,
          today: dateObj.date && isToday(dateObj.date),
          selected: dateObj.date && isSelected(dateObj.date)
        }"
          @click="dateObj.date && selectDay(dateObj.date)"
      >
        {{ dateObj.date ? dateObj.date.getDate() : '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['day-selected'])

const today = new Date()
const selected = ref(null)
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function daysArray(month, year) {
  const date = new Date(year, month, 1)
  const result = []
  const firstDayIndex = date.getDay()
  for (let i = 0; i < firstDayIndex; i++) {
    result.push({ key: `empty-${i}`, date: null })
  }
  while (date.getMonth() === month) {
    result.push({ key: date.toISOString(), date: new Date(date) })
    date.setDate(date.getDate() + 1)
  }
  return result
}

const daysInMonth = computed(() =>
    daysArray(currentMonth.value, currentYear.value)
)

function isToday(date) {
  return date.toDateString() === today.toDateString()
}

function isSelected(date) {
  return selected.value && date.toDateString() === selected.value.toDateString()
}

function selectDay(date) {
  selected.value = date
  emit('day-selected', date)
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function backToToday() {
  currentMonth.value = today.getMonth();
  currentYear.value = today.getFullYear();
  selectDay();
  nextTick(() => {
    const el = document.querySelector('.calendar-day.today');
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

defineExpose({ backToToday });
</script>

<style scoped>
.calendar-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 15vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  box-sizing: border-box;
  padding: 4vw;
}

.calendar-header {
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5vw 1vw;
  background-color: #333;
  color: white;
  font-size: 5vw;
  border-top-left-radius: 15vw;
  border-top-right-radius: 15vw;
}

.button-month{
  border-radius: 15vw;
  background-color: #D34A00;
  width: 13vw;
  height: auto;
  border: #333 solid 1.5vw;
  color: white;
  font-size: 5vw;
}

.calendar-grid {
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
  gap: 0.5vw;
  padding: 0 1vw 1vw;
  overflow-y: auto;
}

.calendar-weekday {
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 2.5vw;
}

.calendar-day {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  font-size: 4vw;
  color: white;
  background-color: #444;
  border-radius: 50%;
  cursor: pointer;
}

.calendar-day.empty {
  background-color: transparent;
  cursor: default;
}

.calendar-day.today {
  color: #D34A00;
  font-weight: bold;
}

.calendar-day.selected {
  background-color: #D34A00;
  color: white;
}
</style>
