import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CatSVG from './CatSVG'
import PeonySVG from './PeonySVG'
import { Bubble } from './EasterEggs'
import { daysTogether } from '../data/content'
import {
  jokes,
  questions,
  wouldYouRather,
  openWhen,
  sorryLevels,
  punishments,
  truths,
  snacks,
  restList,
  groundingSteps,
  tinyThings,
  comfortSongs,
  dreamPlaces,
} from '../data/moods'

// ── small building blocks ─────────────────────────────────────

export function Card({ title, children, dark = false, className = '' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={`w-full min-w-0 max-w-full rounded-3xl px-4 sm:px-5 py-6 text-center ${dark ? 'glass-dark text-cream' : 'glass'} ${className}`}
    >
      {title && (
        <p className={`uppercase tracking-[0.2em] text-[11px] font-body mb-3 ${dark ? 'text-icy-200/80' : 'text-forest-500/80'}`}>
          {title}
        </p>
      )}
      {children}
    </motion.section>
  )
}

export function Btn({ children, onClick, accent, href, small = false, ghost = false, dark = false, className = '' }) {
  const base = `inline-flex max-w-full items-center justify-center gap-2 rounded-full font-body font-medium text-center leading-snug transition-transform active:scale-95 ${
    small ? 'px-5 py-2.5 text-sm' : 'px-7 py-3.5 text-[15px]'
  }`
  const look = ghost
    ? dark
      ? 'border border-white/25 text-cream bg-white/5'
      : 'border border-peony-200 text-forest-700 bg-white/70'
    : `shimmer relative overflow-hidden bg-gradient-to-br ${accent || 'from-peony-400 to-peony-600'} text-white shadow-glow`
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${look} ${className}`}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={`${base} ${look} ${className}`}>
      {children}
    </button>
  )
}

function useCycle(list) {
  // shuffled order, no immediate repeats
  const order = useMemo(() => [...list.keys()].sort(() => Math.random() - 0.5), [list])
  const [i, setI] = useState(0)
  return [list[order[i % order.length]], () => setI((n) => n + 1), i]
}

function useBurst() {
  const [bursts, setBursts] = useState([])
  const fire = (emojis = ['💗', '🌸', '✨', '🦋'], count = 28) => {
    const id = Date.now() + Math.random()
    const parts = Array.from({ length: count }).map((_, k) => ({
      k,
      e: emojis[k % emojis.length],
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      dur: 1.8 + Math.random() * 1.4,
      size: 16 + Math.random() * 18,
      dx: (Math.random() - 0.5) * 140,
    }))
    setBursts((b) => [...b, { id, parts }])
    setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 3600)
  }
  const layer = (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden="true">
      {bursts.map((b) =>
        b.parts.map((p) => (
          <span
            key={`${b.id}-${p.k}`}
            className="absolute top-0 animate-drift select-none"
            style={{
              left: `${p.left}%`,
              fontSize: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
              '--drift-x': `${p.dx}px`,
            }}
          >
            {p.e}
          </span>
        ))
      )}
    </div>
  )
  return [fire, layer]
}

// ── tools ─────────────────────────────────────────────────────

export function Notes({ notes, dark }) {
  const [note, next, i] = useCycle(notes)
  return (
    <Card title="a note from Nafay" dark={dark}>
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className={`font-display italic text-xl leading-snug ${dark ? 'text-cream' : 'text-forest-800'}`}
        >
          “{note}”
        </motion.p>
      </AnimatePresence>
      {notes.length > 1 && (
        <div className="mt-5">
          <Btn small ghost dark={dark} onClick={next}>
            another one ↻
          </Btn>
        </div>
      )}
    </Card>
  )
}

export function Vent({ accent }) {
  const [text, setText] = useState('')
  const [gone, setGone] = useState(false)
  const [fire, layer] = useBurst()

  const letGo = () => {
    if (!text.trim()) return
    fire(['🦋', '🦋', '🌸'], 22)
    setText('')
    setGone(true)
    setTimeout(() => setGone(false), 5000)
  }

  return (
    <Card title="let it out">
      {layer}
      <p className="font-body text-sm text-forest-600 mb-3">
        Type whatever you're feeling. Nobody sees this. Then let it fly away.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="it's okay, write it here..."
        className="block w-full min-w-0 max-w-full rounded-2xl bg-white/80 border border-peony-100 px-4 py-3 font-body text-[15px] text-forest-800 placeholder:text-forest-400/60 outline-none focus:border-peony-300 resize-none"
      />
      <AnimatePresence>
        {gone && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 font-body text-sm italic text-forest-600"
          >
            Gone. You don't have to carry that one anymore. 🦋
          </motion.p>
        )}
      </AnimatePresence>
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        <Btn small ghost onClick={letGo}>
          let it fly away 🦋
        </Btn>
      </div>
    </Card>
  )
}

export function Space() {
  const [open, setOpen] = useState(false)
  return (
    <Card title="need space first?">
      {!open ? (
        <Btn small ghost onClick={() => setOpen(true)}>
          I just need a minute
        </Btn>
      ) : (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-[15px] text-forest-700">
          Take all the time you need. No texts, no pressure. When you're ready, I'll be right here. Same place. Same me. 🤍
        </motion.p>
      )}
    </Card>
  )
}

export function Jokes({ dark }) {
  const [joke, next, i] = useCycle(jokes)
  const [started, setStarted] = useState(false)
  return (
    <Card title="emergency smile" dark={dark}>
      {started && (
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`font-body text-[15px] mb-5 ${dark ? 'text-cream' : 'text-forest-700'}`}
          >
            {joke}
          </motion.p>
        </AnimatePresence>
      )}
      <Btn
        small
        ghost={started}
        dark={dark}
        onClick={() => {
          if (started) next()
          setStarted(true)
        }}
      >
        {started ? 'that was bad, another 😭' : 'make me smile 😌'}
      </Btn>
    </Card>
  )
}

export function CatSays({ cat, dark }) {
  const [i, setI] = useState(null)
  const t = useRef(null)
  const tap = () => {
    setI((n) => (n === null ? 0 : (n + 1) % cat.lines.length))
    clearTimeout(t.current)
    t.current = setTimeout(() => setI(null), 3200)
  }
  const name = cat.who === 'hades' ? 'Hades' : 'Percy'
  return (
    <div className="pt-24 flex justify-center">
      <div className="relative flex flex-col items-center">
        <Bubble center text={i !== null ? cat.lines[i] : null} />
        <motion.button
          type="button"
          onClick={tap}
          whileTap={{ scale: 0.88, rotate: -6 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' } }}
          aria-label={`${name}`}
          className="drop-shadow-md"
        >
          <CatSVG size={70} variant={cat.who === 'hades' ? 'tortie' : 'patch'} />
        </motion.button>
        <span className={`mt-1 font-display italic text-sm ${dark ? 'text-cream/80' : 'text-forest-600'}`}>
          {name} · tap me
        </span>
      </div>
    </div>
  )
}

export function Days() {
  const n = daysTogether()
  return (
    <Card title="us, so far">
      <p className="font-display text-5xl text-peony-600">{n}</p>
      <p className="font-body text-sm text-forest-600 mt-1">days since June 4</p>
      <p className="font-body text-xs text-forest-500/80 mt-3">
        That's about {(n * 24).toLocaleString()} hours of me thinking about you. Roughly. Probably more.
      </p>
    </Card>
  )
}

export function Hug({ accent }) {
  const [p, setP] = useState(0)
  const [done, setDone] = useState(false)
  const raf = useRef(null)
  const start = useRef(0)
  const [fire, layer] = useBurst()
  const HOLD = 2200

  const tick = () => {
    const v = Math.min((performance.now() - start.current) / HOLD, 1)
    setP(v)
    if (v >= 1) {
      setDone(true)
      fire(['🫂', '💗', '💞', '🌸'], 26)
      if (navigator.vibrate) navigator.vibrate(60)
      return
    }
    raf.current = requestAnimationFrame(tick)
  }
  const down = (e) => {
    e.preventDefault()
    setDone(false)
    start.current = performance.now()
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(tick)
  }
  const up = () => {
    cancelAnimationFrame(raf.current)
    if (!done) setP(0)
  }
  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const R = 54
  const C = 2 * Math.PI * R
  return (
    <Card title="virtual hug">
      {layer}
      <p className="font-body text-sm text-forest-600 mb-4">Press and hold the hug. Don't let go too early.</p>
      <div className="relative mx-auto w-36 h-36 select-none" style={{ touchAction: 'none' }}>
        <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
          <circle cx="60" cy="60" r={R} stroke="#ffe9f0" strokeWidth="8" fill="none" />
          <circle
            cx="60"
            cy="60"
            r={R}
            stroke="#f76b9c"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - p)}
          />
        </svg>
        <button
          type="button"
          onPointerDown={down}
          onPointerUp={up}
          onPointerLeave={up}
          onPointerCancel={up}
          onContextMenu={(e) => e.preventDefault()}
          aria-label="hold for a hug"
          className={`absolute inset-4 rounded-full bg-gradient-to-br ${accent} text-5xl flex items-center justify-center shadow-glow`}
          style={{ transform: `scale(${1 + p * 0.08})` }}
        >
          🫂
        </button>
      </div>
      <p className="mt-4 font-body text-sm italic text-forest-600 min-h-[1.25rem]">
        {done ? 'Hug delivered. Nafay felt that one. 🫂' : p > 0 ? 'hugging…' : ''}
      </p>
    </Card>
  )
}

export function OpenWhen() {
  const [open, setOpen] = useState(null)
  return (
    <Card title="open when…">
      <div className="grid grid-cols-1 gap-3">
        {openWhen.map((o, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="rounded-2xl bg-white/80 border border-peony-100 px-4 py-3 text-left"
          >
            <p className="font-body text-sm font-medium text-forest-700 flex items-center gap-2">
              <span>{open === i ? '💌' : '✉️'}</span>
              {o.title}
            </p>
            <AnimatePresence>
              {open === i && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden font-display italic text-[17px] text-forest-800 mt-2"
                >
                  {o.text}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </Card>
  )
}

export function Pillow() {
  const [hits, setHits] = useState(0)
  const [flying, setFlying] = useState([])
  const line =
    hits === 0
      ? 'Tap him. You have unlimited pillows.'
      : hits < 5
      ? 'ow.'
      : hits < 10
      ? 'okay okay, I deserved that.'
      : hits < 20
      ? 'feeling better yet? 😅'
      : hits < 40
      ? 'princess you have a VERY strong arm.'
      : 'he has surrendered. completely. 🏳️'

  const throwIt = () => {
    const id = Date.now() + Math.random()
    setFlying((f) => [...f, id])
    setTimeout(() => setFlying((f) => f.filter((x) => x !== id)), 600)
    setHits((h) => h + 1)
    if (navigator.vibrate) navigator.vibrate(15)
  }

  return (
    <Card title="throw pillows at Nafay">
      <div className="relative h-40 flex items-center justify-center overflow-hidden">
        {flying.map((id) => (
          <motion.span
            key={id}
            initial={{ y: 90, x: (Math.random() - 0.5) * 120, opacity: 1, rotate: 0 }}
            animate={{ y: 0, x: 0, opacity: 0.9, rotate: 260 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute text-4xl pointer-events-none"
          >
            🛏️
          </motion.span>
        ))}
        <motion.button
          type="button"
          key={hits}
          onClick={throwIt}
          animate={hits ? { rotate: [0, -12, 10, -4, 0], scale: [1, 0.9, 1] } : {}}
          transition={{ duration: 0.4 }}
          className="text-7xl select-none"
          aria-label="Nafay"
        >
          {hits >= 40 ? '🏳️' : hits >= 10 ? '😵' : '🙇‍♂️'}
        </motion.button>
      </div>
      <p className="font-display text-3xl text-peony-600">{hits}</p>
      <p className="font-body text-sm italic text-forest-600 mt-1">{line}</p>
    </Card>
  )
}

export function Sorry({ accent }) {
  const [lvl, setLvl] = useState(0)
  const max = sorryLevels.length
  return (
    <Card title="how sorry is Nafay?">
      <div className="h-4 w-full rounded-full bg-white/80 border border-peony-100 overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${accent}`}
          animate={{ width: `${((lvl + 1) / max) * 100}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        />
      </div>
      <p className="font-body text-[15px] text-forest-700 mt-4 min-h-[3rem]">{sorryLevels[lvl]}</p>
      <div className="mt-3">
        {lvl < max - 1 ? (
          <Btn small accent={accent} onClick={() => setLvl((l) => Math.min(l + 1, max - 1))}>
            make him more sorry
          </Btn>
        ) : (
          <Btn small ghost onClick={() => setLvl(0)}>
            reset (he's still sorry)
          </Btn>
        )}
      </div>
    </Card>
  )
}

export function YoureRight() {
  const [stamped, setStamped] = useState(false)
  return (
    <Card title="official ruling">
      <div className="relative h-28 flex items-center justify-center">
        <AnimatePresence>
          {stamped ? (
            <motion.div
              key="stamp"
              initial={{ scale: 2.4, opacity: 0, rotate: -18 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14 }}
              className="border-4 border-peony-500 text-peony-600 rounded-xl px-5 py-2 font-display text-3xl tracking-wide"
            >
              YOU'RE RIGHT
            </motion.div>
          ) : (
            <Btn onClick={() => setStamped(true)}>stamp it 🔨</Btn>
          )}
        </AnimatePresence>
      </div>
      {stamped && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-sm italic text-forest-600">
          Officially right. Nafay agrees. (He is not allowed to disagree today.)
        </motion.p>
      )}
    </Card>
  )
}

export function Punish({ accent }) {
  const [pick, setPick] = useState(null)
  return (
    <Card title="choose his punishment">
      <div className="flex flex-wrap gap-2 justify-center">
        {punishments.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setPick(i)}
            className={`rounded-full px-4 py-2 font-body text-sm border transition-colors ${
              pick === i ? 'bg-peony-100 border-peony-400 text-peony-700' : 'bg-white/80 border-peony-100 text-forest-700'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      {pick !== null && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
          <p className="font-body text-[15px] text-forest-700 mb-4">
            Sentence: Nafay owes you <b>{punishments[pick]}</b>. Non-negotiable.
          </p>
        </motion.div>
      )}
    </Card>
  )
}

export function Breathe({ slow = false, dark = false }) {
  // slow (for sleep): 4-7-8. normal: 4-4-6
  const phases = slow
    ? [
        ['Breathe in', 4, 1.25],
        ['Hold', 7, 1.25],
        ['Breathe out slowly', 8, 0.8],
      ]
    : [
        ['Breathe in', 4, 1.25],
        ['Hold', 4, 1.25],
        ['Breathe out', 6, 0.8],
      ]
  const [on, setOn] = useState(false)
  const [st, setSt] = useState({ ph: 0, left: phases[0][1], rounds: 0 })

  useEffect(() => {
    if (!on) return
    const t = setInterval(() => {
      setSt((s) => {
        if (s.left > 1) return { ...s, left: s.left - 1 }
        const n = (s.ph + 1) % phases.length
        return { ph: n, left: phases[n][1], rounds: s.rounds + (n === 0 ? 1 : 0) }
      })
    }, 1000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on])

  const { ph, left, rounds } = st
  const [label, secs, scale] = phases[ph]
  return (
    <Card title={slow ? 'sleepy breathing (4-7-8)' : 'breathe with me'} dark={dark}>
      <div className="relative mx-auto w-48 h-48 flex items-center justify-center">
        <motion.div
          className={`absolute inset-6 rounded-full ${dark ? 'bg-icy-300/25' : 'bg-gradient-to-br from-icy-200 to-forest-200'}`}
          animate={{ scale: on ? scale : 1 }}
          transition={{ duration: on ? secs : 0.6, ease: 'easeInOut' }}
        />
        <div className="relative">
          <p className={`font-display text-xl ${dark ? 'text-cream' : 'text-forest-800'}`}>{on ? label : 'ready?'}</p>
          {on && <p className={`font-body text-3xl mt-1 ${dark ? 'text-icy-200' : 'text-forest-600'}`}>{left}</p>}
        </div>
      </div>
      <p className={`font-body text-xs mt-2 min-h-[1rem] ${dark ? 'text-cream/60' : 'text-forest-500/80'}`}>
        {rounds > 0 ? `${rounds} round${rounds > 1 ? 's' : ''} done. ${rounds >= 4 ? 'Better? 🤍' : 'Keep going.'}` : ''}
      </p>
      <div className="mt-3">
        <Btn
          small
          ghost={on}
          dark={dark}
          accent={dark ? 'from-icy-400 to-forest-400' : 'from-icy-400 to-forest-400'}
          onClick={() => {
            setOn((v) => !v)
            setSt((s) => ({ ...s, ph: 0, left: phases[0][1] }))
          }}
        >
          {on ? 'stop' : 'start'}
        </Btn>
      </div>
    </Card>
  )
}

export function Ground({ accent }) {
  const [step, setStep] = useState(-1)
  const doneAll = step >= groundingSteps.length
  return (
    <Card title="5 · 4 · 3 · 2 · 1">
      {step < 0 ? (
        <>
          <p className="font-body text-sm text-forest-600 mb-4">A tiny exercise to pull your mind back into the room.</p>
          <Btn small accent={accent} onClick={() => setStep(0)}>
            let's do it
          </Btn>
        </>
      ) : doneAll ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="font-display italic text-xl text-forest-800">You're here. You're okay. I'm proud of you. 🤍</p>
          <div className="mt-4">
            <Btn small ghost onClick={() => setStep(-1)}>
              again
            </Btn>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p className="font-display text-5xl text-forest-600">{groundingSteps[step].n}</p>
            <p className="font-body text-[15px] text-forest-700 mt-2 mb-5">{groundingSteps[step].text}</p>
            <Btn small accent={accent} onClick={() => setStep((s) => s + 1)}>
              done, next →
            </Btn>
          </motion.div>
        </AnimatePresence>
      )}
    </Card>
  )
}

export function QuietButtons() {
  const [sat, setSat] = useState(false)
  return (
    <Card title="only if you want to">
      <p className="font-body text-sm text-forest-600 mb-5">
        No need to say anything. Come back whenever you want.
      </p>
      <div className="grid grid-cols-1 gap-3">
        <Btn ghost onClick={() => setSat(true)}>
          just sit here for a minute
        </Btn>
      </div>
      {sat && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 font-display italic text-lg text-forest-700">
          Okay. We'll just sit. No talking needed. 🌿
        </motion.p>
      )}
    </Card>
  )
}

export function Confetti({ accent }) {
  const [fire, layer] = useBurst()
  const [n, setN] = useState(0)
  return (
    <Card title="celebrate">
      {layer}
      <Btn
        accent={accent}
        onClick={() => {
          fire(['🎉', '💗', '🌸', '✨', '🦋', '🥳'], 36)
          setN((x) => x + 1)
        }}
      >
        throw confetti 🎉
      </Btn>
      <p className="font-body text-sm italic text-forest-600 mt-4 min-h-[1.25rem]">
        {n === 0 ? '' : n < 3 ? 'YAYYY 🥳' : n < 6 ? 'okay you are VERY happy. I love that.' : 'the confetti budget has been exceeded. worth it.'}
      </p>
    </Card>
  )
}

export function Pop() {
  const [running, setRunning] = useState(false)
  useGameMode(running)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(20)
  const [items, setItems] = useState([])
  const [best, setBest] = useState(0)

  useEffect(() => {
    if (!running) return
    const spawn = setInterval(() => {
      const id = Date.now() + Math.random()
      setItems((it) => [...it.slice(-6), { id, x: 6 + Math.random() * 74, y: 6 + Math.random() * 70, s: 38 + Math.random() * 18 }])
      setTimeout(() => setItems((it) => it.filter((p) => p.id !== id)), 1400)
    }, 520)
    const clock = setInterval(() => setTime((t) => t - 1), 1000)
    return () => {
      clearInterval(spawn)
      clearInterval(clock)
    }
  }, [running])

  useEffect(() => {
    if (running && time <= 0) {
      setRunning(false)
      setItems([])
      setBest((b) => Math.max(b, score))
    }
  }, [time, running, score])

  const verdict = score >= 25 ? 'peony popping champion 👑' : score >= 15 ? 'very impressive, princess' : score >= 6 ? 'not bad!' : 'the peonies won this round 😭'

  return (
    <Card title="pop the peonies">
      <div className="relative h-64 rounded-2xl bg-white/60 border border-peony-100 overflow-hidden select-none" style={{ touchAction: 'manipulation' }}>
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
            {time <= 0 && (
              <p className="font-body text-sm text-forest-700">
                You popped <b>{score}</b>. {verdict}
                {best > 0 && <span className="block text-xs text-forest-500/80 mt-1">best: {best}</span>}
              </p>
            )}
            <Btn
              small
              onClick={() => {
                setScore(0)
                setTime(20)
                setRunning(true)
              }}
            >
              {time <= 0 ? 'play again' : 'start (20 seconds)'}
            </Btn>
          </div>
        )}
        <AnimatePresence>
          {items.map((p) => (
            <motion.button
              key={p.id}
              type="button"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.18 }}
              onPointerDown={() => {
                setScore((s) => s + 1)
                setItems((it) => it.filter((q) => q.id !== p.id))
              }}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              aria-label="peony"
            >
              <PeonySVG size={p.s} />
            </motion.button>
          ))}
        </AnimatePresence>
        {running && (
          <p className="absolute top-2 right-3 font-body text-xs text-forest-600">
            {time}s · {score} 🌸
          </p>
        )}
      </div>
    </Card>
  )
}

export function WYR() {
  const [pair, next, i] = useCycle(wouldYouRather)
  const [picked, setPicked] = useState(null)
  return (
    <Card title="would you rather">
      <div className="grid grid-cols-1 gap-3" key={i}>
        {pair.map((opt, k) => (
          <button
            key={k}
            type="button"
            onClick={() => setPicked(k)}
            className={`rounded-2xl px-4 py-3.5 font-body text-[15px] border transition-colors ${
              picked === k ? 'bg-peony-100 border-peony-400 text-peony-700' : 'bg-white/80 border-peony-100 text-forest-700'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {picked !== null && (
        <p className="font-body text-sm italic text-forest-600 mt-3">Interesting choice. Noted. 📝</p>
      )}
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <Btn
          small
          ghost
          onClick={() => {
            setPicked(null)
            next()
          }}
        >
          next one ↻
        </Btn>
      </div>
    </Card>
  )
}

export function Question() {
  const [q, next, i] = useCycle(questions)
  return (
    <Card title="random question">
      <AnimatePresence mode="wait">
        <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-display text-xl text-forest-800">
          {q}
        </motion.p>
      </AnimatePresence>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <Btn small ghost onClick={next}>
          another ↻
        </Btn>
      </div>
    </Card>
  )
}

export function Sheep() {
  const [n, setN] = useState(0)
  const [jump, setJump] = useState(0)
  const line =
    n === 0
      ? "Count Percys instead of sheep. They're cuter."
      : n < 10
      ? `Percy #${n} jumped over the fence.`
      : n < 20
      ? `Percy #${n}… he's getting sleepy too.`
      : n < 30
      ? `Percy #${n}. Your eyes are heavy now. Let them close.`
      : "Okay, Percy fell asleep mid-jump. Your turn now. Goodnight, princess. 🌙"
  return (
    <Card title="count Percys" dark>
      <div className="relative h-32 overflow-hidden">
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-8 border-x-4 border-t-4 border-cream/40 rounded-t-md" />
        <motion.div
          key={jump}
          initial={jump ? { x: -140, y: 0 } : false}
          animate={jump ? { x: [-140, 0, 140], y: [0, -56, 0] } : {}}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 -ml-6"
        >
          <CatSVG size={48} variant="patch" />
        </motion.div>
      </div>
      <p className="font-body text-sm text-cream/85 min-h-[2.5rem]">{line}</p>
      <div className="mt-3">
        <Btn
          small
          ghost
          dark
          onClick={() => {
            setN((x) => x + 1)
            setJump((j) => j + 1)
          }}
        >
          next Percy 🐾
        </Btn>
      </div>
    </Card>
  )
}

export function Attention({ accent }) {
  const [level, setLevel] = useState(3)
  const labels = ['a little', 'some', 'a lot', 'ALL of it', 'ALL OF IT RIGHT NOW']
  const idx = Math.min(level - 1, labels.length - 1)
  return (
    <Card title="attention request form">
      <p className="font-body text-sm text-forest-600 mb-3">How much attention do you need?</p>
      <input
        type="range"
        min={1}
        max={5}
        value={level}
        onChange={(e) => setLevel(Number(e.target.value))}
        className="block w-full min-w-0 accent-peony-500"
      />
      <p className="font-display text-2xl text-peony-600 mt-2">{labels[idx]}</p>
      <p className="font-body text-sm italic text-forest-600 mt-4">
        Request received. Nafay has been notified telepathically. 🐾
      </p>
    </Card>
  )
}

export function Steps({ accent }) {
  const [items, setItems] = useState([])
  const [val, setVal] = useState('')
  const [fire, layer] = useBurst()
  const add = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (!val.trim() || items.length >= 5) return
    setItems((it) => [...it, { t: val.trim(), d: false }])
    setVal('')
  }
  const toggle = (k) => {
    const next = items.map((x, j) => (j === k ? { ...x, d: !x.d } : x))
    setItems(next)
    if (next.length && next.every((x) => x.d)) fire(['✨', '🌸', '💗'], 24)
  }
  const done = items.filter((x) => x.d).length
  return (
    <Card title="tiny steps">
      {layer}
      <p className="font-body text-sm text-forest-600 mb-4">
        Write just the next small thing. Not everything. Up to 5.
      </p>
      <div className="flex gap-2 w-full min-w-0">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          enterKeyHint="done"
          onKeyDown={(e) => {
            if (e.key === 'Enter') add(e)
          }}
          placeholder="one small thing"
          className="flex-1 w-0 min-w-0 rounded-full bg-white/80 border border-peony-100 px-4 py-2.5 font-body text-[15px] outline-none focus:border-peony-300"
        />
        <button type="button" onClick={add} className={`shrink-0 rounded-full px-4 bg-gradient-to-br ${accent} text-white font-body text-sm`}>
          add
        </button>
      </div>
      <div className="mt-4 grid gap-2 text-left">
        {items.map((x, k) => (
          <button
            key={k}
            type="button"
            onClick={() => toggle(k)}
            className="flex items-center gap-3 rounded-2xl bg-white/80 border border-peony-100 px-4 py-3"
          >
            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[11px] ${x.d ? 'bg-forest-400 border-forest-400 text-white' : 'border-forest-300'}`}>
              {x.d ? '✓' : ''}
            </span>
            <span className={`font-body text-[15px] ${x.d ? 'line-through text-forest-400' : 'text-forest-700'}`}>{x.t}</span>
          </button>
        ))}
      </div>
      {items.length > 0 && (
        <p className="font-body text-sm italic text-forest-600 mt-3">
          {done === items.length ? 'ALL DONE. Look at you. I am so proud. 🌸' : `${done} of ${items.length} done. One at a time.`}
        </p>
      )}
    </Card>
  )
}

export function Break({ accent }) {
  const [left, setLeft] = useState(0)
  useEffect(() => {
    if (left <= 0) return
    const t = setTimeout(() => setLeft((l) => l - 1), 1000)
    return () => clearTimeout(t)
  }, [left])
  const mm = String(Math.floor(left / 60)).padStart(1, '0')
  const ss = String(left % 60).padStart(2, '0')
  return (
    <Card title="2-minute break">
      {left > 0 ? (
        <>
          <p className="font-display text-5xl text-forest-700">
            {mm}:{ss}
          </p>
          <p className="font-body text-sm text-forest-600 mt-3">Put the phone down. Stretch. Drink water. Look out a window. I'll wait.</p>
        </>
      ) : (
        <>
          <p className="font-body text-sm text-forest-600 mb-4">Two minutes of doing absolutely nothing. Doctor's orders. (I'm not a doctor.)</p>
          <Btn small accent={accent} onClick={() => setLeft(120)}>
            start break
          </Btn>
        </>
      )}
    </Card>
  )
}

export function Truths() {
  const [i, setI] = useState(0)
  return (
    <Card title={`true thing #${i + 1}`}>
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, rotateY: 70 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -70 }}
          transition={{ duration: 0.35 }}
          className="font-display italic text-xl text-forest-800 min-h-[5rem] flex items-center justify-center"
        >
          {truths[i]}
        </motion.p>
      </AnimatePresence>
      <div className="mt-4 flex justify-center gap-3">
        <Btn small ghost onClick={() => setI((n) => (n - 1 + truths.length) % truths.length)}>
          ←
        </Btn>
        <Btn small ghost onClick={() => setI((n) => (n + 1) % truths.length)}>
          next true thing →
        </Btn>
      </div>
    </Card>
  )
}

export function Rest() {
  const [done, setDone] = useState({})
  const count = Object.values(done).filter(Boolean).length
  return (
    <Card title="get-better checklist">
      <div className="grid grid-cols-1 gap-2 text-left">
        {restList.map((r, k) => (
          <button
            key={k}
            type="button"
            onClick={() => setDone((d) => ({ ...d, [k]: !d[k] }))}
            className="flex items-center gap-3 rounded-2xl bg-white/80 border border-icy-100 px-4 py-3"
          >
            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[11px] ${done[k] ? 'bg-icy-400 border-icy-400 text-white' : 'border-icy-300'}`}>
              {done[k] ? '✓' : ''}
            </span>
            <span className={`font-body text-[15px] ${done[k] ? 'text-forest-400 line-through' : 'text-forest-700'}`}>{r}</span>
          </button>
        ))}
      </div>
      <p className="font-body text-sm italic text-forest-600 mt-3">
        {count === restList.length ? 'Perfect patient. Now sleep. 🤍' : count > 0 ? `${count} done. Proud of you. Keep going.` : ''}
      </p>
    </Card>
  )
}

export function Snack({ accent }) {
  const [spinning, setSpinning] = useState(false)
  const [res, setRes] = useState(null)
  const [show, setShow] = useState(snacks[0])
  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setRes(null)
    let n = 0
    const total = 14 + Math.floor(Math.random() * 8)
    const t = setInterval(() => {
      n++
      const pick = snacks[Math.floor(Math.random() * snacks.length)]
      setShow(pick)
      if (n >= total) {
        clearInterval(t)
        setRes(pick)
        setSpinning(false)
      }
    }, 90)
  }
  return (
    <Card title="what should I eat?">
      <div className="h-20 flex items-center justify-center">
        <motion.p key={show} initial={{ y: 8, opacity: 0.4 }} animate={{ y: 0, opacity: 1 }} className="font-display text-2xl text-forest-800">
          {show}
        </motion.p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Btn small accent={accent} onClick={spin}>
          {spinning ? 'deciding…' : res ? 'spin again' : 'spin 🎰'}
        </Btn>
      </div>
    </Card>
  )
}

export function Slip() {
  return (
    <Card title="official document">
      <div className="rounded-2xl border-2 border-dashed border-forest-300 bg-white/85 px-5 py-6 text-left">
        <p className="font-display text-xl text-forest-800 text-center mb-3">🐼 Panda Permission Slip 🐼</p>
        <p className="font-body text-[15px] text-forest-700 leading-relaxed">
          The bearer of this slip, <b>the princess</b>, is hereby allowed to be lazy, sleepy, snacky and a little bit grumpy for the
          rest of today. No questions will be asked. No productivity is expected. Rolling around is encouraged.
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="font-display italic text-forest-700">Nafay</p>
            <p className="font-body text-[11px] text-forest-500/80">approved 🫡</p>
          </div>
          <div>
            <p className="font-display italic text-forest-700">Hades</p>
            <p className="font-body text-[11px] text-forest-500/80">reluctantly</p>
          </div>
          <div>
            <p className="font-display italic text-forest-700">Percy</p>
            <p className="font-body text-[11px] text-forest-500/80">enthusiastically</p>
          </div>
        </div>
      </div>
    </Card>
  )
}


export function Song({ dark }) {
  return (
    <Card title="your comfort songs" dark={dark}>
      <div className="grid grid-cols-1 gap-3">
        {comfortSongs.map((sng) => (
          <a
            key={sng.title}
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${sng.title} ${sng.artist}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left border ${
              dark ? 'bg-white/5 border-white/15' : 'bg-white/80 border-peony-100'
            }`}
          >
            <span className="text-2xl">🎧</span>
            <span className="flex-1">
              <span className={`block font-display text-lg leading-tight ${dark ? 'text-cream' : 'text-forest-800'}`}>{sng.title}</span>
              <span className={`block font-body text-xs ${dark ? 'text-cream/60' : 'text-forest-500'}`}>{sng.artist}</span>
            </span>
            <span className={`font-body text-xs ${dark ? 'text-icy-200' : 'text-peony-600'}`}>play ▶</span>
          </a>
        ))}
      </div>
    </Card>
  )
}

// Gentle procedural rain: no audio files, works offline, stops when you leave the page.
export function Rain({ dark }) {
  const [on, setOn] = useState(false)
  const ref = useRef(null)

  const start = () => {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    const ctx = new AC()
    const sr = ctx.sampleRate
    const len = sr * 4
    const brown = ctx.createBuffer(1, len, sr)
    const white = ctx.createBuffer(1, len, sr)
    const b = brown.getChannelData(0)
    const w = white.getChannelData(0)
    let last = 0
    for (let i = 0; i < len; i++) {
      const r = Math.random() * 2 - 1
      last = (last + 0.02 * r) / 1.02
      b[i] = last * 3.2
      w[i] = r * (Math.random() < 0.002 ? 1 : 0.25)
    }
    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
    master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.5)

    const s1 = ctx.createBufferSource()
    s1.buffer = brown
    s1.loop = true
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 1100
    s1.connect(lp)
    lp.connect(master)

    const s2 = ctx.createBufferSource()
    s2.buffer = white
    s2.loop = true
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 2600
    bp.Q.value = 0.7
    const g2 = ctx.createGain()
    g2.gain.value = 0.35
    s2.connect(bp)
    bp.connect(g2)
    g2.connect(master)

    s1.start()
    s2.start()
    ref.current = { ctx, master }
  }

  const stop = () => {
    const r = ref.current
    if (!r) return
    r.master.gain.linearRampToValueAtTime(0, r.ctx.currentTime + 0.6)
    setTimeout(() => r.ctx.close(), 700)
    ref.current = null
  }

  useEffect(() => () => stop(), [])

  return (
    <Card title="rainy day mode" dark={dark}>
      <p className={`font-body text-sm mb-4 ${dark ? 'text-cream/75' : 'text-forest-600'}`}>
        You picked rainy days over sunny ones. So here's some rain, on demand. 🌧️
      </p>
      <div className="relative h-16 overflow-hidden mb-4" aria-hidden="true">
        {on &&
          Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className={`absolute top-0 w-px h-5 rounded-full animate-drift ${dark ? 'bg-icy-200/70' : 'bg-icy-400/70'}`}
              style={{ left: `${(i * 37) % 100}%`, animationDuration: `${0.7 + ((i * 13) % 7) / 10}s`, animationDelay: `${(i % 6) * 0.15}s`, animationIterationCount: 'infinite', '--drift-x': '0px' }}
            />
          ))}
        {!on && <p className="text-4xl">🌧️</p>}
      </div>
      <Btn
        small
        ghost={on}
        dark={dark}
        accent="from-icy-400 to-forest-400"
        onClick={() => {
          if (on) stop()
          else start()
          setOn((v) => !v)
        }}
      >
        {on ? 'stop the rain' : 'start the rain'}
      </Btn>
    </Card>
  )
}

export function Tiny({ accent }) {
  const [pick, setPick] = useState(null)
  const [done, setDone] = useState(false)
  const choose = () => {
    let next = pick
    while (next === pick) next = Math.floor(Math.random() * tinyThings.length)
    setPick(next)
    setDone(false)
  }
  return (
    <Card title="one tiny thing">
      {pick === null ? (
        <p className="font-body text-sm text-forest-600 mb-4">Not a to-do list. Just one very small thing, if you feel like it.</p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.p key={pick} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-display italic text-xl text-forest-800 mb-4">
            {tinyThings[pick]}
          </motion.p>
        </AnimatePresence>
      )}
      <div className="flex flex-wrap justify-center gap-3">
        <Btn small ghost={pick !== null} accent={accent} onClick={choose}>
          {pick === null ? 'give me one' : 'a different one'}
        </Btn>
        {pick !== null && !done && (
          <Btn small accent={accent} onClick={() => setDone(true)}>
            did it ✓
          </Btn>
        )}
      </div>
      {done && <p className="font-body text-sm italic text-forest-600 mt-3">That counts. That really counts. 🤍</p>}
    </Card>
  )
}

export function Places() {
  const [open, setOpen] = useState(null)
  return (
    <Card title="your someday list">
      <div className="grid grid-cols-1 gap-3">
        {dreamPlaces.map((pl, i) => (
          <button
            key={pl.name}
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="rounded-2xl bg-white/80 border border-peony-100 px-4 py-3 text-left"
          >
            <p className="font-body text-[15px] font-medium text-forest-700 flex items-center gap-2">
              <span className="text-xl">{pl.emoji}</span>
              {pl.name}
            </p>
            <AnimatePresence>
              {open === i && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden font-body text-sm text-forest-600 mt-2"
                >
                  {pl.line}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
      <p className="font-body text-xs text-forest-500/80 mt-3">You'll see all three one day. Write that down.</p>
    </Card>
  )
}

// ── mini games ────────────────────────────────────────────────

const MEMORY_FACES = [
  { k: 'peony', node: <PeonySVG size={34} /> },
  { k: 'hades', node: <CatSVG size={40} variant="tortie" /> },
  { k: 'percy', node: <CatSVG size={40} variant="patch" /> },
  { k: 'chai', node: '☕' },
  { k: 'icecream', node: '🍦' },
  { k: 'tenders', node: '🍗' },
  { k: 'butterfly', node: '🦋' },
  { k: 'rain', node: '🌧️' },
]

function shuffled(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function MemoryGame() {
  const deal = () => shuffled([...MEMORY_FACES, ...MEMORY_FACES]).map((f, i) => ({ ...f, id: i }))
  const [cards, setCards] = useState(deal)
  const [open, setOpen] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [best, setBest] = useState(null)
  const [fire, layer] = useBurst()
  const lock = useRef(false)

  const won = matched.length === cards.length

  const flip = (i) => {
    if (lock.current || open.includes(i) || matched.includes(i)) return
    const next = [...open, i]
    setOpen(next)
    if (next.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = next
      if (cards[a].k === cards[b].k) {
        const nowMatched = [...matched, a, b]
        setMatched(nowMatched)
        setOpen([])
        if (nowMatched.length === cards.length) {
          fire(['🌸', '✨', '🦋', '💗'], 30)
          setBest((bst) => (bst === null ? moves + 1 : Math.min(bst, moves + 1)))
        }
      } else {
        lock.current = true
        setTimeout(() => {
          setOpen([])
          lock.current = false
        }, 800)
      }
    }
  }

  const restart = () => {
    setCards(deal())
    setOpen([])
    setMatched([])
    setMoves(0)
  }

  return (
    <Card title="memory match">
      {layer}
      <p className="font-body text-sm text-forest-600 mb-4">Find the pairs. Hades and Percy are in there somewhere.</p>
      <div className="grid grid-cols-4 gap-2 max-w-[300px] mx-auto">
        {cards.map((c, i) => {
          const up = open.includes(i) || matched.includes(i)
          return (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => flip(i)}
              whileTap={{ scale: 0.94 }}
              animate={{ rotateY: up ? 0 : 180 }}
              transition={{ duration: 0.3 }}
              aria-label={up ? c.k : 'hidden card'}
              className={`aspect-square rounded-2xl flex items-center justify-center text-3xl border ${
                up
                  ? matched.includes(i)
                    ? 'bg-forest-50 border-forest-200'
                    : 'bg-white border-peony-200'
                  : 'bg-gradient-to-br from-peony-200 to-peony-300 border-white'
              }`}
            >
              {up ? c.node : <span className="text-white/90 text-xl">✿</span>}
            </motion.button>
          )
        })}
      </div>
      <p className="font-body text-sm text-forest-600 mt-4 min-h-[1.25rem]">
        {won ? `All pairs in ${moves} moves. Big brain, princess. 🧠` : `moves: ${moves}`}
        {best !== null && <span className="block text-xs text-forest-500/80">best: {best} moves</span>}
      </p>
      {(won || moves > 0) && (
        <div className="mt-3">
          <Btn small ghost onClick={restart}>
            {won ? 'play again' : 'shuffle & restart'}
          </Btn>
        </div>
      )}
    </Card>
  )
}

export function WhackPercy() {
  const [running, setRunning] = useState(false)
  useGameMode(running)
  const [time, setTime] = useState(25)
  const [score, setScore] = useState(0)
  const [hole, setHole] = useState(null) // { i, who }
  const [msg, setMsg] = useState('')
  const [best, setBest] = useState(0)
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    if (!running) return
    const pop = setInterval(() => {
      setHole({ i: Math.floor(Math.random() * 9), who: Math.random() < 0.25 ? 'hades' : 'percy', id: Math.random() })
    }, 850)
    const clock = setInterval(() => setTime((t) => t - 1), 1000)
    return () => {
      clearInterval(pop)
      clearInterval(clock)
    }
  }, [running])

  useEffect(() => {
    if (running && time <= 0) {
      setRunning(false)
      setHole(null)
      setBest((b) => Math.max(b, score))
    }
  }, [time, running, score])

  const tap = (i) => {
    if (!running || !hole || hole.i !== i) return
    if (hole.who === 'percy') {
      setScore((s) => s + 1)
      setMsg(['got him!', 'boop 🐾', 'Percy is offended', 'again!'][Math.floor(Math.random() * 4)])
    } else {
      setScore((s) => Math.max(0, s - 1))
      setMsg('Hades did NOT want to be booped. −1 😼')
    }
    setHole(null)
  }

  const verdict = score >= 18 ? 'Percy-booping legend 👑' : score >= 10 ? 'very fast, princess' : score >= 4 ? 'Percy escaped a few times' : 'Percy wins this round 😭'

  return (
    <Card title="boop Percy">
      <p className="font-body text-sm text-forest-600 mb-4">Tap Percy when he pops up. Leave Hades alone, he hates it.</p>
      <div className="grid grid-cols-3 gap-2 max-w-[270px] mx-auto select-none" style={{ touchAction: 'manipulation' }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onPointerDown={() => tap(i)}
            aria-label={`hole ${i + 1}`}
            className="relative aspect-square rounded-full bg-gradient-to-b from-forest-100 to-forest-200 border-4 border-forest-200 overflow-hidden"
          >
            <AnimatePresence>
              {hole && hole.i === i && (
                <motion.span
                  key={hole.id}
                  initial={{ y: 50 }}
                  animate={{ y: 4 }}
                  exit={{ y: 50 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex items-end justify-center"
                >
                  <CatSVG size={64} variant={hole.who === 'hades' ? 'tortie' : 'patch'} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
      <p className="font-body text-sm text-forest-600 mt-4 min-h-[1.25rem]">
        {running ? `${time}s · ${score} boops · ${msg}` : played ? `${score} boops. ${verdict}` : ''}
        {!running && best > 0 && <span className="block text-xs text-forest-500/80">best: {best}</span>}
      </p>
      {!running && (
        <div className="mt-3">
          <Btn
            small
            onClick={() => {
              setScore(0)
              setTime(25)
              setMsg('')
              setPlayed(true)
              setRunning(true)
            }}
          >
            {played ? 'play again' : 'start (25 seconds)'}
          </Btn>
        </div>
      )}
    </Card>
  )
}

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]
const winner = (b) => {
  for (const [a, c, d] of LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a]
  return b.every(Boolean) ? 'draw' : null
}

// Percy plays: wins if he can, usually blocks you (he's mischievous, not perfect)
function percyMove(b) {
  const empty = b.map((v, i) => (v ? null : i)).filter((i) => i !== null)
  const tryLine = (mark) =>
    empty.find((i) => {
      const t = [...b]
      t[i] = mark
      return winner(t) === mark
    })
  const win = tryLine('P')
  if (win !== undefined) return win
  const block = tryLine('Y')
  if (block !== undefined && Math.random() < 0.75) return block
  if (b[4] === null && Math.random() < 0.6) return 4
  return empty[Math.floor(Math.random() * empty.length)]
}

export function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [thinking, setThinking] = useState(false)
  const [tally, setTally] = useState({ you: 0, percy: 0, draw: 0 })
  const result = winner(board)

  useEffect(() => {
    if (!result) return
    setTally((t) => ({ ...t, [result === 'Y' ? 'you' : result === 'P' ? 'percy' : 'draw']: t[result === 'Y' ? 'you' : result === 'P' ? 'percy' : 'draw'] + 1 }))
  }, [result])

  const play = (i) => {
    if (board[i] || result || thinking) return
    const next = [...board]
    next[i] = 'Y'
    setBoard(next)
    if (winner(next)) return
    setThinking(true)
    setTimeout(() => {
      setBoard((cur) => {
        const b = [...cur]
        const m = percyMove(b)
        if (m !== undefined) b[m] = 'P'
        return b
      })
      setThinking(false)
    }, 550)
  }

  const status =
    result === 'Y'
      ? 'You beat Percy! He is pretending he let you win. 🌸'
      : result === 'P'
      ? 'Percy wins. He is doing zoomies about it. 🐾'
      : result === 'draw'
      ? 'Draw. Percy demands a rematch.'
      : thinking
      ? 'Percy is thinking… (he is not, he is staring at a wall)'
      : 'Your turn. You are 🌸, Percy is 🐾.'

  return (
    <Card title="tic-tac-toe vs Percy">
      <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
        {board.map((v, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => play(i)}
            whileTap={{ scale: 0.94 }}
            aria-label={v ? (v === 'Y' ? 'you' : 'Percy') : `square ${i + 1}`}
            className="aspect-square rounded-2xl bg-white/85 border border-peony-100 text-4xl flex items-center justify-center"
          >
            {v && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                {v === 'Y' ? '🌸' : '🐾'}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
      <p className="font-body text-sm text-forest-700 mt-4 min-h-[2.5rem]">{status}</p>
      <p className="font-body text-xs text-forest-500/80">
        you {tally.you} · Percy {tally.percy} · draws {tally.draw}
      </p>
      {result && (
        <div className="mt-3">
          <Btn small ghost onClick={() => setBoard(Array(9).fill(null))}>
            rematch
          </Btn>
        </div>
      )}
    </Card>
  )
}

export function GamesLink({ onPick }) {
  return (
    <Card title="mini games">
      <p className="font-body text-sm text-forest-600 mb-4">Memory match, boop Percy, tic-tac-toe and peony popping.</p>
      <Btn onClick={() => onPick && onPick('games')}>open mini games 🎮</Btn>
    </Card>
  )
}

// soft beeps for games (silently skipped if the phone blocks audio)
let _ac = null
function beep(freq = 520, ms = 140) {
  try {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    _ac = _ac || new AC()
    if (_ac.state === 'suspended') _ac.resume()
    const o = _ac.createOscillator()
    const g = _ac.createGain()
    o.type = 'sine'
    o.frequency.value = freq
    g.gain.setValueAtTime(0.0001, _ac.currentTime)
    g.gain.exponentialRampToValueAtTime(0.12, _ac.currentTime + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, _ac.currentTime + ms / 1000)
    o.connect(g)
    g.connect(_ac.destination)
    o.start()
    o.stop(_ac.currentTime + ms / 1000 + 0.05)
  } catch (e) {
    /* no sound, no problem */
  }
}

// While an action game is running, pause the decorative background animations
// and tap sparkles so the phone spends all its effort on the game.
function useGameMode(on) {
  useEffect(() => {
    if (!on) return
    document.documentElement.classList.add('game-on')
    return () => document.documentElement.classList.remove('game-on')
  }, [on])
}

// ── Catch the treats: drag the bowl, catch food, dodge wet clothes ──
// Movement is drawn directly (no React re-render per frame) so it stays smooth.
const GOOD = ['🍗', '🍦', '☕', '🍗', '🍦']
const BAD = '👕'
export function CatchTreats() {
  const [running, setRunning] = useState(false)
  const [played, setPlayed] = useState(false)
  const [time, setTime] = useState(30)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [flash, setFlash] = useState(null)
  const boxRef = useRef(null)
  const bowlRef = useRef(null)
  const layerRef = useRef(null)
  const g = useRef({ items: [], x: 0.5, target: 0.5, w: 300, h: 288, last: 0, spawn: 0, score: 0, raf: 0 })
  useGameMode(running)

  const BOWL = 64 // bowl width in px
  const ITEM = 30 // treat size in px

  const placeBowl = () => {
    const st = g.current
    if (bowlRef.current) bowlRef.current.style.transform = `translate3d(${st.x * st.w - BOWL / 2}px,0,0)`
  }

  const aim = (e) => {
    const r = boxRef.current?.getBoundingClientRect()
    if (!r) return
    const half = BOWL / 2 / r.width
    g.current.target = Math.min(1 - half, Math.max(half, (e.clientX - r.left) / r.width))
  }

  useEffect(() => {
    const box = boxRef.current
    if (box) {
      g.current.w = box.clientWidth
      g.current.h = box.clientHeight
      placeBowl()
    }
  }, [])

  useEffect(() => {
    if (!running) return
    const st = g.current
    const box = boxRef.current
    st.w = box.clientWidth
    st.h = box.clientHeight
    st.last = performance.now()
    st.spawn = 300
    st.score = 0
    const bowlTop = st.h - 58
    const bowlBottom = st.h - 10

    const tick = (now) => {
      const dt = Math.min(40, now - st.last)
      st.last = now
      // bowl glides quickly toward the finger: smooth but responsive
      st.x += (st.target - st.x) * Math.min(1, dt / 45)
      placeBowl()

      st.spawn -= dt
      if (st.spawn <= 0) {
        st.spawn = 480 + Math.random() * 160
        const bad = Math.random() < 0.22
        const el = document.createElement('span')
        el.textContent = bad ? BAD : GOOD[Math.floor(Math.random() * GOOD.length)]
        el.className = 'treat'
        layerRef.current.appendChild(el)
        const x = ITEM / 2 + Math.random() * (st.w - ITEM)
        st.items.push({ el, x, y: -ITEM, v: st.h / (2300 + Math.random() * 900), bad })
      }

      const bowlX = st.x * st.w
      st.items = st.items.filter((it) => {
        it.y += it.v * dt
        const bottom = it.y + ITEM
        if (bottom >= bowlTop && it.y <= bowlBottom && Math.abs(it.x - bowlX) < BOWL / 2 + 6) {
          it.el.remove()
          if (it.bad) {
            st.score = Math.max(0, st.score - 2)
            setFlash('wet clothes! −2 😖')
            beep(180, 220)
            if (navigator.vibrate) navigator.vibrate(40)
          } else {
            st.score += 1
            setFlash(null)
            beep(660, 80)
          }
          setScore(st.score)
          return false
        }
        if (it.y > st.h) {
          it.el.remove()
          return false
        }
        it.el.style.transform = `translate3d(${it.x - ITEM / 2}px,${it.y}px,0)`
        return true
      })
      st.raf = requestAnimationFrame(tick)
    }
    st.raf = requestAnimationFrame(tick)
    const clock = setInterval(() => setTime((t) => t - 1), 1000)
    return () => {
      cancelAnimationFrame(st.raf)
      clearInterval(clock)
      st.items.forEach((it) => it.el.remove())
      st.items = []
    }
  }, [running])

  useEffect(() => {
    if (running && time <= 0) {
      setRunning(false)
      setBest((b) => Math.max(b, score))
    }
  }, [time, running, score])

  const verdict = score >= 30 ? 'snack queen 👑' : score >= 18 ? 'very well fed, princess' : score >= 8 ? 'decent snack haul' : 'the snacks escaped 😭'

  return (
    <Card title="catch the treats">
      <p className="font-body text-sm text-forest-600 mb-3">Slide your finger anywhere in the box to move the bowl. Catch 🍗 🍦 ☕, dodge the wet clothes 👕.</p>
      <div
        ref={boxRef}
        onPointerDown={(e) => {
          if (!running) return // let the start button get its tap
          try {
            e.currentTarget.setPointerCapture(e.pointerId)
          } catch (err) {
            /* fine */
          }
          aim(e)
        }}
        onPointerMove={(e) => running && aim(e)}
        className="relative h-72 rounded-2xl bg-gradient-to-b from-icy-50 to-peony-50 border border-peony-100 overflow-hidden select-none"
        style={{ touchAction: 'none' }}
      >
        <div ref={layerRef} className="absolute inset-0 pointer-events-none" />
        <div ref={bowlRef} className="absolute left-0 bottom-2 w-16 text-center text-[44px] leading-none pointer-events-none" style={{ willChange: 'transform' }}>
          🥣
        </div>
        {running && (
          <p className="absolute top-2 right-3 font-body text-xs text-forest-600 pointer-events-none">
            {time}s · {score} {flash && <span className="text-peony-600">· {flash}</span>}
          </p>
        )}
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
            {played && (
              <p className="font-body text-sm text-forest-700">
                You caught <b>{score}</b>. {verdict}
                {best > 0 && <span className="block text-xs text-forest-500/80 mt-1">best: {best}</span>}
              </p>
            )}
            <Btn
              small
              onClick={() => {
                setScore(0)
                setTime(30)
                setFlash(null)
                setPlayed(true)
                setRunning(true)
              }}
            >
              {played ? 'play again' : 'start (30 seconds)'}
            </Btn>
          </div>
        )}
      </div>
    </Card>
  )
}

// ── Colour pattern: repeat the sequence in her four colours ──
const PADS = [
  { name: 'baby pink', cls: 'from-peony-300 to-peony-500', freq: 392 },
  { name: 'icy blue', cls: 'from-icy-200 to-icy-400', freq: 494 },
  { name: 'forest green', cls: 'from-forest-300 to-forest-500', freq: 587 },
  { name: 'butter yellow', cls: 'from-butter-200 to-butter-400', freq: 659 },
]
export function ColourPattern() {
  const [seq, setSeq] = useState([])
  const [step, setStep] = useState(0)
  const [lit, setLit] = useState(null)
  const [phase, setPhase] = useState('idle') // idle | showing | input | over
  const [best, setBest] = useState(0)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const show = (s) => {
    setPhase('showing')
    timers.current.forEach(clearTimeout)
    timers.current = []
    s.forEach((p, i) => {
      timers.current.push(setTimeout(() => { setLit(p); beep(PADS[p].freq, 260) }, 500 + i * 620))
      timers.current.push(setTimeout(() => setLit(null), 500 + i * 620 + 380))
    })
    timers.current.push(setTimeout(() => { setPhase('input'); setStep(0) }, 500 + s.length * 620))
  }

  const start = () => {
    const s = [Math.floor(Math.random() * 4)]
    setSeq(s)
    show(s)
  }

  const press = (i) => {
    if (phase !== 'input') return
    setLit(i)
    beep(PADS[i].freq, 180)
    setTimeout(() => setLit(null), 180)
    if (i !== seq[step]) {
      setPhase('over')
      setBest((b) => Math.max(b, seq.length - 1))
      beep(150, 400)
      return
    }
    if (step + 1 === seq.length) {
      const s = [...seq, Math.floor(Math.random() * 4)]
      setSeq(s)
      setTimeout(() => show(s), 450)
    } else setStep(step + 1)
  }

  const msg =
    phase === 'idle'
      ? 'Watch the colours light up, then tap them in the same order.'
      : phase === 'showing'
      ? 'watch…'
      : phase === 'input'
      ? `your turn · round ${seq.length}`
      : `Oops! You reached round ${seq.length}. ${seq.length - 1 >= 8 ? 'Your memory is scary good.' : seq.length - 1 >= 4 ? 'Not bad at all, princess.' : 'Percy could do better. (He could not.)'}`

  return (
    <Card title="colour pattern">
      <div className="grid grid-cols-2 gap-3 max-w-[240px] mx-auto">
        {PADS.map((p, i) => (
          <motion.button
            key={p.name}
            type="button"
            onClick={() => press(i)}
            animate={{ scale: lit === i ? 1.08 : 1, opacity: lit === i ? 1 : phase === 'input' ? 0.85 : 0.55 }}
            transition={{ duration: 0.12 }}
            aria-label={p.name}
            className={`aspect-square rounded-3xl bg-gradient-to-br ${p.cls} border-4 ${lit === i ? 'border-white shadow-glow' : 'border-white/50'}`}
          />
        ))}
      </div>
      <p className="font-body text-sm text-forest-700 mt-4 min-h-[2.5rem]">{msg}</p>
      {best > 0 && <p className="font-body text-xs text-forest-500/80">best: round {best}</p>}
      {(phase === 'idle' || phase === 'over') && (
        <div className="mt-3">
          <Btn small onClick={start}>
            {phase === 'over' ? 'try again' : 'start'}
          </Btn>
        </div>
      )}
    </Card>
  )
}

// ── Clean the screen: rub away the blur (her favourite habit) ──
export function CleanScreen() {
  const wrap = useRef(null)
  const canvas = useRef(null)
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)
  const [round, setRound] = useState(0)
  const strokes = useRef(0)
  const lastPt = useRef(null)

  useEffect(() => {
    const c = canvas.current
    const w = wrap.current
    if (!c || !w) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const W = w.clientWidth
    const H = w.clientHeight
    c.width = W * dpr
    c.height = H * dpr
    c.style.width = W + 'px'
    c.style.height = H + 'px'
    const ctx = c.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = 'rgba(200, 205, 210, 0.93)'
    ctx.fillRect(0, 0, W, H)
    for (let i = 0; i < 45; i++) {
      const r = 10 + Math.random() * 38
      ctx.fillStyle = `rgba(${150 + Math.random() * 60},${150 + Math.random() * 60},${160 + Math.random() * 60},0.55)`
      ctx.beginPath()
      ctx.arc(Math.random() * W, Math.random() * H, r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = 'rgba(90,90,100,0.75)'
    ctx.font = '600 14px Poppins, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('this screen is blurry 😖', W / 2, H / 2)
    setPct(0)
    setDone(false)
    strokes.current = 0
  }, [round])

  const measure = () => {
    const c = canvas.current
    const ctx = c.getContext('2d')
    const { data } = ctx.getImageData(0, 0, c.width, c.height)
    let clear = 0
    let total = 0
    for (let i = 3; i < data.length; i += 4 * 16) {
      total++
      if (data[i] < 40) clear++
    }
    const p = Math.round((clear / total) * 100)
    setPct(p)
    if (p >= 82 && !done) {
      setDone(true)
      ctx.clearRect(0, 0, c.width, c.height)
      setPct(100)
      beep(784, 200)
    }
  }

  const rub = (e) => {
    if (done) return
    if (e.type === 'pointermove' && e.buttons === 0 && e.pointerType === 'mouse') return
    const r = canvas.current.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const ctx = canvas.current.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineCap = 'round'
    ctx.lineWidth = 46
    ctx.beginPath()
    const from = lastPt.current || { x, y }
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(x, y)
    ctx.stroke()
    lastPt.current = { x, y }
    if (++strokes.current % 10 === 0) measure()
  }

  return (
    <Card title="clean the screen">
      <p className="font-body text-sm text-forest-600 mb-3">You can't stand a blurry screen. So… rub it clean. 🧽</p>
      <div ref={wrap} className="relative h-52 rounded-2xl overflow-hidden border border-peony-100 select-none" style={{ touchAction: 'none' }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-peony-50 via-cream to-icy-50 px-4">
          <PeonySVG size={70} />
          <p className="font-display italic text-lg text-forest-800 mt-2">Spotless. Just how you like it.</p>
          <p className="font-body text-xs text-forest-500/80 mt-1">(Nafay's jokes are still blurry though.)</p>
        </div>
        <canvas
          ref={canvas}
          onPointerDown={(e) => {
            lastPt.current = null
            rub(e)
          }}
          onPointerMove={rub}
          onPointerUp={() => {
            lastPt.current = null
            measure()
          }}
          className={`absolute inset-0 transition-opacity duration-500 ${done ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>
      <p className="font-body text-sm text-forest-600 mt-3 min-h-[1.25rem]">{done ? 'Sparkling. ✨' : pct > 0 ? `${pct}% clean` : 'use your finger'}</p>
      {done && (
        <div className="mt-2">
          <Btn small ghost onClick={() => setRound((r) => r + 1)}>
            make it blurry again
          </Btn>
        </div>
      )}
    </Card>
  )
}
