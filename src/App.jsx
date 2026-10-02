import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FloatingPetals from './components/FloatingPetals'
import PasswordGate from './components/PasswordGate'
import Home from './components/Home'
import MoodPage from './components/MoodPage'
import { moods } from './data/moods'

const readHash = () => {
  try {
    const id = window.location.hash.replace('#', '')
    return moods.some((m) => m.id === id) ? id : null
  } catch (e) {
    return null
  }
}

export default function App() {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem('unlocked') === '1'
    } catch (e) {
      return false
    }
  })
  // The current mood lives in React state, so switching pages always works.
  // We also add it to the browser history when that's allowed, so the phone's
  // back gesture works too. Some previews block history/address changes; then
  // we just skip that part.
  const [moodId, setMoodId] = useState(readHash)
  const pushed = useRef(false)

  useEffect(() => {
    const on = () => {
      pushed.current = false
      setMoodId(readHash())
    }
    window.addEventListener('popstate', on)
    window.addEventListener('hashchange', on)
    return () => {
      window.removeEventListener('popstate', on)
      window.removeEventListener('hashchange', on)
    }
  }, [])

  const pick = (id) => {
    setMoodId(id)
    try {
      window.history.pushState({ mood: id }, '', `#${id}`)
      pushed.current = true
    } catch (e) {
      pushed.current = false
    }
  }

  const back = () => {
    setMoodId(null)
    if (pushed.current) {
      pushed.current = false
      try {
        window.history.back()
      } catch (e) {
        /* fine, we're already home */
      }
    } else {
      try {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      } catch (e) {
        /* fine */
      }
    }
  }

  const mood = moods.find((m) => m.id === moodId)

  return (
    <div className="grain relative min-h-screen w-full bg-cream overflow-x-hidden">
      {!mood?.dark && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-peony-200/50 blur-3xl" />
          <div className="absolute top-1/3 -right-28 w-72 h-72 rounded-full bg-icy-200/50 blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 w-72 h-72 rounded-full bg-butter-200/40 blur-3xl" />
        </div>
      )}
      <FloatingPetals count={mood ? 6 : 10} variant={mood?.dark ? 'leaf' : 'petal'} />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div key="lock" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <PasswordGate
              onUnlock={() => {
                try {
                  sessionStorage.setItem('unlocked', '1')
                } catch (e) {
                  /* fine */
                }
                setUnlocked(true)
              }}
            />
          </motion.div>
        ) : mood ? (
          <motion.div
            key={mood.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <MoodPage mood={mood} onBack={back} />
          </motion.div>
        ) : (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Home onPick={pick} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
