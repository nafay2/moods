import { useEffect } from 'react'
import { motion } from 'framer-motion'
import * as T from './Tools'
import LiveBackground from './LiveBackground'

// how the big emoji at the top moves, per mood
const HERO = {
  happy: { animate: { y: [0, -14, 0], rotate: [0, -8, 8, 0] }, transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } },
  cozy: { animate: { rotate: [-4, 4, -4], y: [0, -4, 0] }, transition: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } },
  sad: { animate: { rotate: [-5, 5, -5], y: [0, 3, 0] }, transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } },
  empty: { animate: { x: [-10, 10, -10], opacity: [0.7, 1, 0.7] }, transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } },
  study: { animate: { rotate: [0, -6, 0, 6, 0], y: [0, -6, 0] }, transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } },
  missing: { animate: { scale: [1, 1.12, 1] }, transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } },
  angry: { animate: { x: [0, -6, 6, -6, 6, 0, 0, 0, 0, 0] }, transition: { duration: 2.2, repeat: Infinity } },
  anxious: { animate: { y: [0, -6, 0], scale: [1, 1.04, 1] }, transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } },
  overthinking: { animate: { rotate: [0, 360] }, transition: { duration: 8, repeat: Infinity, ease: 'linear' } },
  quiet: { animate: { opacity: [1, 0.55, 1], scale: [1, 0.96, 1] }, transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' } },
  bored: { animate: { rotate: [0, -12, 12, 0], y: [0, -8, 0] }, transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } },
  sleepless: { animate: { rotate: [-10, 6, -10], filter: ['drop-shadow(0 0 6px #fde385)', 'drop-shadow(0 0 22px #fde385)', 'drop-shadow(0 0 6px #fde385)'] }, transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } },
  clingy: { animate: { scale: [1, 1.15, 1, 1.15, 1], rotate: [0, -8, 0, 8, 0] }, transition: { duration: 2, repeat: Infinity } },
  insecure: { animate: { rotateY: [0, 180, 360] }, transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' } },
  unwell: { animate: { rotate: [-6, 6, -6], y: [0, 2, 0] }, transition: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' } },
  hungry: { animate: { rotate: [0, -15, 15, -15, 0], scale: [1, 1.1, 1] }, transition: { duration: 1.8, repeat: Infinity, repeatDelay: 0.6 } },
  panda: { animate: { rotate: [0, -20, 20, 0], x: [0, -6, 6, 0] }, transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } },
  games: { animate: { y: [0, -10, 0], rotate: [0, 10, -10, 0] }, transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' } },
}

export default function MoodPage({ mood, onBack, onPick }) {
  const dark = !!mood.dark
  const accent = mood.theme.accent

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [mood.id])

  const render = (tool) => {
    switch (tool) {
      case 'notes':
        return <T.Notes notes={mood.notes} dark={dark} />
      case 'vent':
        return <T.Vent accent={accent} />
      case 'space':
        return <T.Space />
      case 'jokes':
        return <T.Jokes dark={dark} />
      case 'cat':
        return <T.CatSays cat={mood.cat} dark={dark} />
      case 'days':
        return <T.Days />
      case 'hug':
        return <T.Hug accent={accent} />
      case 'openWhen':
        return <T.OpenWhen />
      case 'pillow':
        return <T.Pillow />
      case 'sorry':
        return <T.Sorry accent={accent} />
      case 'youreRight':
        return <T.YoureRight />
      case 'punish':
        return <T.Punish accent={accent} />
      case 'breathe':
        return <T.Breathe />
      case 'breatheBox':
        return <T.Breathe box dark={dark} />
      case 'butterflyTap':
        return <T.ButterflyTap accent={accent} />
      case 'unclench':
        return <T.Unclench />
      case 'worryJar':
        return <T.WorryJar accent={accent} />
      case 'breatheSlow':
        return <T.Breathe slow dark={dark} />
      case 'ground':
        return <T.Ground accent={accent} />
      case 'quietButtons':
        return <T.QuietButtons />
      case 'confetti':
        return <T.Confetti accent={accent} />
      case 'pop':
        return <T.Pop />
      case 'memory':
        return <T.MemoryGame />
      case 'whack':
        return <T.WhackPercy />
      case 'tictactoe':
        return <T.TicTacToe />
      case 'catch':
        return <T.CatchTreats />
      case 'pattern':
        return <T.ColourPattern />
      case 'clean':
        return <T.CleanScreen />
      case 'gamesLink':
        return <T.GamesLink onPick={onPick} />
      case 'wyr':
        return <T.WYR />
      case 'question':
        return <T.Question />
      case 'sheep':
        return <T.Sheep />
      case 'attention':
        return <T.Attention accent={accent} />
      case 'steps':
        return <T.Steps accent={accent} />
      case 'break':
        return <T.Break accent={accent} />
      case 'truths':
        return <T.Truths />
      case 'rest':
        return <T.Rest />
      case 'snack':
        return <T.Snack accent={accent} />
      case 'slip':
        return <T.Slip />
      case 'song':
        return <T.Song dark={dark} />
      case 'rain':
        return <T.Rain dark={dark} />
      case 'tiny':
        return <T.Tiny accent={accent} />
      case 'places':
        return <T.Places />
      default:
        return null
    }
  }

  // the cat always sits at the very end, after the text button
  const tools = mood.tools.filter((t) => t !== 'cat')
  const hasCat = mood.tools.includes('cat') || mood.cat

  return (
    <div className={`relative z-10 w-full min-h-screen ${dark ? 'on-dark' : ''}`}>
      <LiveBackground bg={mood.theme.bg} dark={dark} particle={mood.ambient} />

      <div className="fixed top-0 inset-x-0 z-40 safe-top">
        <div className={`h-16 bg-gradient-to-b ${dark ? 'from-forest-900 via-forest-900/70' : 'from-cream via-cream/70'} to-transparent`}>
          <button
            type="button"
            onClick={onBack}
            className={`ml-3 mt-3 rounded-full px-4 py-2 font-body text-sm shadow-sm ${
              dark ? 'bg-white/10 border border-white/20 text-cream' : 'bg-white/85 border border-peony-100 text-forest-700'
            }`}
          >
            ← moods
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-3.5 sm:px-4 pt-20 pb-16 min-w-0">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-7">
          <motion.div
            initial={{ scale: 0.3, rotate: -25, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 11 }}
            className="inline-block"
          >
            <motion.p className="text-6xl inline-block" {...(HERO[mood.id] || HERO.happy)}>
              {mood.emoji}
            </motion.p>
          </motion.div>
          <h1 className={`font-display text-3xl mt-2 ${dark ? 'text-cream' : 'shiny-title'}`}>{mood.label}</h1>
          <p className={`font-body text-[15px] mt-2 max-w-xs mx-auto ${dark ? 'text-cream/80' : 'text-forest-600'}`}>{mood.greeting}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {tools.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: 'spring', stiffness: 140, damping: 18, delay: Math.min(i, 3) * 0.08 }}
            >
              {render(t)}
            </motion.div>
          ))}
        </div>


        {hasCat && mood.cat && <T.CatSays cat={mood.cat} dark={dark} />}

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onBack}
            className={`font-body text-sm underline underline-offset-4 ${dark ? 'text-cream/70 decoration-cream/30' : 'text-forest-600 decoration-peony-300'}`}
          >
            feeling something else? pick another mood
          </button>
        </div>
      </div>
    </div>
  )
}
