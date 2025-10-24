## 1. Goal of the App
This app is a simple **notes and calendar app** that works **offline**.  
Users can:
- Write and save notes.
- Connect notes to activities.
- Use a calendar to see activities by date.
- Work without internet (all data is saved on the device).

---

## 2. User Roles
- **User**: can create, edit, delete notes and activities.

---

## 3. Main Features
### Notes
- Add new notes (title + text).
- Save and connect notes to activities.
- Search notes by name.
- Edit or delete notes.

### Calendar
- Show daily agenda.
- Add activities to a specific date.
- Scroll through days/months.
- See activities and notes for a chosen date.

### Activities
- Add activity with a name and description.
- Link notes to activities.
- Remove activities.

---

## 4. User Flows
### Create a New Note
1. User clicks **Notes**.
2. User writes note title and text.
3. User clicks **Save and Add to Activity**.
4. Note is saved and shown in the list.

### Link Note to an Activity
1. User selects a note.
2. User picks a date in the calendar.
3. User links the note to that day’s activity.

### Use the Calendar
1. User opens **Calendar**.
2. User selects a day.
3. Activities and notes for that day are shown.

---

## 5. Non-Functional Requirements
- **Storage**: all data is saved in IndexedDB (on device).
- **Offline support**: app works without internet.
- **UI/UX**: simple and clear, dark theme.
- **Performance**: fast search for notes.

---