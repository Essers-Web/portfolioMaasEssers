<template>
  <div class="container">
    <div v-if="activityRows.length === 0" class="no-activitie">
      No activities for this day.
    </div>
    <div v-else class="activities-grid">
      <div
          v-for="(row, rowIndex) in activityRows"
          :key="rowIndex"
          class="activity-row"
      >
        <div
            v-for="(activity, i) in row"
            :key="activity.ID"
            class="activity-item"
            @click="activitySetting(activity.title, activity.ID)"
        >
          {{ activity.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { loadMaps, loadActivityData, saveActivityData } from "../idManager.js"

const props = defineProps({
  selectedDate: {
    type: Date,
    default: null
  },
  allActivities: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['getActivity'])
const activities = ref([])

const activityRows = computed(() => {
  const rows = []
  for (let i = 0; i < activities.value.length; i += 2) {
    rows.push(activities.value.slice(i, i + 2))
  }
  return rows
})

async function refreshLocalActivities() {
  if (!props.selectedDate) {
    activities.value = []
    return
  }
  const key = props.selectedDate.toISOString().slice(0, 10)
  activities.value = props.allActivities[key] || []
}

onMounted(async () => {
  await loadMaps()
  const saved = await loadActivityData()
  for (const [key, value] of Object.entries(saved)) {
    props.allActivities[key] = value
  }
  await refreshLocalActivities()
})

watch(() => props.selectedDate, () => {
  refreshLocalActivities()
})

watch(() => props.allActivities, () => {
  refreshLocalActivities()
}, { deep: true })

watch(activities, async list => {
  if (!props.selectedDate) return
  const key = props.selectedDate.toISOString().slice(0, 10)
  props.allActivities[key] = list
  await saveActivityData(JSON.parse(JSON.stringify(props.allActivities)))
}, { deep: true })

function activitySetting(title, ID) {
  emit('getActivity', title, ID)
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.activities-grid {
  display: flex;
  flex-direction: column;
  gap: 1vw;
  overflow-y: auto;
  height: 35vw;
}

.activity-row {
  display: flex;
  gap: 1vw;
}

.activity-item {
  flex: 1;
  width: 35vw;
  height: 9vw;
  font-size: 3vw;
  justify-content: center;
  align-items: center;
  border-radius: 5vw;
  background-color: #D34A00;
  display: flex;
  overflow: auto;
}

.no-activitie {
  margin-top: -3vw;
  color: #ccc;
  font-size: 5vw;
  text-align: center;
  width: 100%;
}
</style>

