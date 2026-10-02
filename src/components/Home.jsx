import { motion } from 'framer-motion'
import PeonySVG from './PeonySVG'
import CatSVG from './CatSVG'
import { TapPop } from './EasterEggs'
import { moods } from '../data/moods'
import { daysTogether } from '../data/content'

function greeting() {
  const h = new Date().getHours()
  if (h < 5) return 'Still awake, princess?'
  if (h < 12) return 'Good morning, princess'
  if (h < 17) return 'Good afternoon, princess'
  if (h < 21) return 'Good evening, princess'
  return 'Hey night owl'
}

export default function Home({ onPick }) {
  return (
    <div className="relative z-10 w-full min-h-screen px-4 sm:px-6 pt-14 pb-16">
      <div className="max-w-xl mx-auto text-center">
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
          {moods.map((m, i) => (
            <motion.button
              key={m.id}
              type="button"
              onClick={() => onPick(m.id)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.04, duration: 0.4 }}
              whileTap={{ scale: 0.96 }}
              className={`relative rounded-3xl px-3 py-5 text-center bg-gradient-to-br ${m.theme.card} border border-white/80 shadow-sm overflow-hidden ${
                m.dark ? 'text-cream' : 'text-forest-800'
              }`}
            >
              <span className="block text-4xl mb-2">{m.emoji}</span>
              <span className="block font-display text-lg leading-tight">{m.label}</span>
              <span className={`block font-body text-[12px] mt-1 ${m.dark ? 'text-cream/70' : 'text-forest-600/80'}`}>{m.sub}</span>
            </motion.button>
          ))}
        </div>

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
