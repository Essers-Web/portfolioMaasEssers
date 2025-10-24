import { v4 as uuidv4 } from 'uuid';
import localforage from 'localforage';

const activityData = {};
const activityIdMap = new Map();
const activityCountMap = new Map();

export async function saveMaps() {
    await localforage.setItem('activityIdMap', [...activityIdMap.entries()]);
    await localforage.setItem('activityCountMap', [...activityCountMap.entries()]);
}

export async function loadMaps() {
    const idMapData = await localforage.getItem('activityIdMap');
    const countMapData = await localforage.getItem('activityCountMap');
    if (Array.isArray(idMapData)) {
        for (const [key, value] of idMapData) {
            activityIdMap.set(key, value);
        }
    }
    if (Array.isArray(countMapData)) {
        for (const [key, value] of countMapData) {
            activityCountMap.set(key, value);
        }
    }
}

export async function saveActivityData(allActivities) {
    const plainActivities = JSON.parse(JSON.stringify(allActivities));
    await localforage.setItem('activityData', plainActivities);
}

export async function loadActivityData() {
    const data = await localforage.getItem('activityData');
    if (data && typeof data === 'object') {
        Object.assign(activityData, data);
    }
    return activityData;
}

export function getActivityData() {
    return activityData;
}

export async function deleteActivityId(idToDelete) {
    let foundKey = null;
    for (const [key, value] of activityIdMap.entries()) {
        if (value === idToDelete) {
            foundKey = key;
            break;
        }
    }

    if (!foundKey) {
        console.warn("Geen overeenkomstige record gevonden voor id:", idToDelete);
        return await loadActivityData();
    }

    activityIdMap.delete(foundKey);
    const lastDash = foundKey.lastIndexOf('-');
    if (lastDash !== -1) {
        const baseKey = foundKey.substring(0, lastDash);
        activityCountMap.delete(baseKey);
    }

    for (const dateKey in activityData) {
        activityData[dateKey] = activityData[dateKey].filter(a => a.ID !== idToDelete);
        if (activityData[dateKey].length === 0) {
            delete activityData[dateKey];
        }
    }

    await saveMaps();
    await saveActivityData(activityData);

    const reloadedData = await loadActivityData();
    return reloadedData;
}

export async function getOrCreateId(activity, index) {
    const key = `${activity}-${index}`;
    let count = activityCountMap.get(key) || 0;
    count++;
    activityCountMap.set(key, count);

    const newId = uuidv4();
    activityIdMap.set(`${key}-${count}`, newId);
    await saveMaps();
    return newId;
}



