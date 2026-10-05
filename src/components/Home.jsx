import { motion } from 'framer-motion'
import PeonySVG from './PeonySVG'
import CatSVG from './CatSVG'
import { TapPop } from './EasterEggs'
import { moods } from '../data/moods'
import { daysTogether } from '../data/content'
import { useHeartBurst } from './FloatingHearts'
import LiveBackground from './LiveBackground'

function greeting() {
  const h = new Date().getHours()
  if (h < 5) return 'Still awake, princess?'
  if (h < 12) return 'Good morning, princess'
  if (h < 17) return 'Good afternoon, princess'
  if (h < 21) return 'Good evening, princess'
  return 'Hey night owl'
}

export default function Home({ onPick }) {
  const { triggerFromEvent, portal } = useHeartBurst()
  // tiny pause so the heart burst is visible before the page changes
  const go = (id, e) => {
    triggerFromEvent(e)
    setTimeout(() => onPick(id), 220)
  }
  return (
    <div className="relative z-10 w-full min-h-screen px-4 sm:px-6 pt-14 pb-16">
      {portal}
      <LiveBackground bg="from-peony-50 via-cream to-icy-50" particle="🌸" />
      <div className="relative z-10 max-w-xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="flex justify-center">
          <TapPop below messages={['Hi princess. 🌸', 'Whatever the mood, there is a page for it.', 'Even the panda one. 🐼']}>
            <PeonySVG size={78} className="drop-shadow-[0_0_30px_rgba(255,143,179,0.45)]" />
          </TapPop>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display italic text-lg text-peony-600 mt-3"
        >
          {greeting()} 🦋
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="font-display text-[2rem] leading-tight text-forest-800 mt-1 text-shadow-soft"
        >
          How are you feeling right now?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-body text-sm text-forest-600/80 mt-2"
        >
          Pick one. There are no wrong answers. You can always change your mind.
        </motion.p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {moods.filter((m) => !m.games).map((m, i, list) => (
            <motion.button
              key={m.id}
              type="button"
              onClick={(e) => go(m.id, e)}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.3 + i * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.92, rotate: i % 2 ? 2 : -2 }}
              className={`${list.length % 2 && i === list.length - 1 ? 'col-span-2' : ''} shimmer relative rounded-3xl px-3 py-5 text-center bg-gradient-to-br ${m.theme.card} border border-white/80 shadow-sm overflow-hidden ${
                m.dark ? 'text-cream' : 'text-forest-800'
              }`}
            >
              <motion.span
                className="block text-4xl mb-2"
                animate={{ y: [0, -5, 0], rotate: [0, i % 2 ? 7 : -7, 0] }}
                transition={{ duration: 2.6 + (i % 4) * 0.4, repeat: Infinity, ease: 'easeInOut', delay: (i % 5) * 0.3 }}
              >
                {m.emoji}
              </motion.span>
              <span className="block font-display text-lg leading-tight">{m.label}</span>
              <span className={`block font-body text-[12px] mt-1 ${m.dark ? 'text-cream/70' : 'text-forest-600/80'}`}>{m.sub}</span>
            </motion.button>
          ))}
        </div>

        <motion.button
          type="button"
          onClick={(e) => go('games', e)}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="games-glow shimmer relative overflow-hidden mt-3 w-full rounded-3xl px-4 py-4 flex items-center justify-center gap-3 bg-gradient-to-r from-icy-100 via-peony-100 to-butter-100 border border-white/80 shadow-sm text-forest-800"
        >
          <motion.span className="text-3xl" animate={{ rotate: [0, -12, 12, 0], y: [0, -3, 0] }} transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1 }}>
            🎮
          </motion.span>
          <span className="text-left">
            <span className="block font-display text-lg leading-tight">Mini games</span>
            <span className="block font-body text-[12px] text-forest-600/80">memory, boop Percy, tic-tac-toe, peonies</span>
          </span>
        </motion.button>

        <div className="mt-12 flex items-end justify-center gap-10">
          <TapPop messages={["Hades is judging your mood choice. Silently. 😼", 'Hades says: pick panda. Panda is the superior mood.']}>
            <span className="flex flex-col items-center">
              <CatSVG size={54} variant="tortie" />
              <span className="font-display italic text-xs text-forest-600 mt-1">Hades</span>
            </span>
          </TapPop>
          <p className="font-body text-xs text-forest-500/80 pb-6">
            day <b className="text-peony-600">{daysTogether()}</b> of us 💗
          </p>
          <TapPop messages={['Percy heard you have his energy lately. He is very proud. 🐾', 'My mama is also sometimes a panda and only Nafay knows it 😋']}>
            <span className="flex flex-col items-center">
              <CatSVG size={54} variant="patch" />
              <span className="font-display italic text-xs text-forest-600 mt-1">Percy</span>
            </span>
          </TapPop>
        </div>
      </div>
    </div>
  )
}
