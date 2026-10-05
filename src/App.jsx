import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import FloatingPetals from './components/FloatingPetals'
import PasswordGate from './components/PasswordGate'
import TapSparkles from './components/TapSparkles'
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
  // how many pages deep we are from the home screen (for the "← moods" button)
  const depth = useRef(0)

  useEffect(() => {
    const on = () => {
      const id = readHash()
      if (!id) depth.current = 0
      else depth.current = Math.max(0, depth.current - 1)
      setMoodId(id)
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
      depth.current += 1
    } catch (e) {
      /* history blocked in this preview: page still switches */
    }
  }

  const back = () => {
    setMoodId(null)
    const d = depth.current
    depth.current = 0
    if (d > 0) {
      try {
        window.history.go(-d) // always all the way back to the moods list
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
    <MotionConfig reducedMotion="user">
    <div className="grain relative min-h-screen w-full bg-cream overflow-x-hidden">
      <TapSparkles />
      {!unlocked && <FloatingPetals count={12} />}

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
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          >
            <MoodPage mood={mood} onBack={back} onPick={pick} />
          </motion.div>
        ) : (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Home onPick={pick} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  )
}
