// ─────────────────────────────────────────────────────────────
// Small shared settings. The moods themselves live in moods.js.
// ─────────────────────────────────────────────────────────────

// The day we started talking (used for the "day N of us" counter)
export const START_DATE = '2026-06-04'

export const herName = 'princess'

export const easterEggs = {
  // Hades gives the password hint on the lock screen
  passwordHint: [
    'Hint: it is in the song you once sent me on WhatsApp. 🦋',
    'Listen to it again, princess. 🎧',
  ],
}


export function daysTogether() {
  const start = new Date(`${START_DATE}T00:00:00`)
  const now = new Date()
  const ms = now.setHours(0, 0, 0, 0) - start.getTime()
  return Math.max(1, Math.floor(ms / 86400000) + 1)
}
