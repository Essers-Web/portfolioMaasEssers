import localforage from 'localforage'

const KEY = 'fictionFile'

const noteManager = {
    async getDataNote() {
        try {
            const blob = await localforage.getItem(KEY)
            if (!blob) return []
            const text = await blob.text()
            return JSON.parse(text)
        } catch (err) {
            console.error('getDataNote error', err)
            return []
        }
    },

    async safeDataNote(fiction) {
        try {
            let existing = await this.getDataNote()
            if (!Array.isArray(existing)) existing = []

            const index = existing.findIndex(n => n.id === fiction.id)
            if (index !== -1) {
                existing[index] = fiction
            } else {
                existing.push(fiction)
            }

            const blob = new Blob([JSON.stringify(existing)], { type: 'application/json' })
            await localforage.setItem(KEY, blob)
            console.log('Fiction opgeslagen (upsert):', fiction)
        } catch (err) {
            console.error('safeDataNote error', err)
        }
    },

    async deleteNoteById(id) {
        try {
            let existing = await this.getDataNote()
            if (!Array.isArray(existing)) existing = []
            const filtered = existing.filter(n => n.id !== id)
            const blob = new Blob([JSON.stringify(filtered)], { type: 'application/json' })
            await localforage.setItem(KEY, blob)
            console.log(`Note ${id} verwijderd uit storage`)
        } catch (err) {
            console.error('deleteNoteById error', err)
        }
    }
}

export default noteManager


