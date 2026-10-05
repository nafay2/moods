import { useEffect } from 'react'
import { motion } from 'framer-motion'
import * as T from './Tools'

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
    <div className={`relative z-10 w-full min-h-screen bg-gradient-to-b ${mood.theme.bg} ${dark ? 'on-dark' : ''}`}>

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

      <div className="w-full max-w-md mx-auto px-3.5 sm:px-4 pt-20 pb-16 min-w-0">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-7">
          <motion.p
            initial={{ scale: 0.6, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 12 }}
            className="text-6xl"
          >
            {mood.emoji}
          </motion.p>
          <h1 className={`font-display text-3xl mt-2 ${dark ? 'text-cream' : 'text-forest-800'}`}>{mood.label}</h1>
          <p className={`font-body text-[15px] mt-2 max-w-xs mx-auto ${dark ? 'text-cream/80' : 'text-forest-600'}`}>{mood.greeting}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {tools.map((t) => (
            <div key={t}>{render(t)}</div>
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
