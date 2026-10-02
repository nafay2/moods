import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Bubble({ text, below = false, center = false }) {
  // the outer wrapper handles position/centering; the inner element only animates
  const place = below ? 'top-full mt-2' : 'bottom-full mb-2'
  const align = center ? 'inset-x-0 flex justify-center' : 'left-0'
  return (
    <div className={`pointer-events-none absolute z-50 ${place} ${align}`}>
      <AnimatePresence>
        {text && (
          <motion.div
            initial={{ opacity: 0, y: below ? -6 : 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: below ? 6 : -6, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="popup shrink-0 w-max max-w-[220px] text-center px-3.5 py-2.5 rounded-2xl text-[13px] leading-snug font-body"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Wrap anything in <TapPop messages={[...]}> and tapping it shows a little rotating popup.
export function TapPop({ messages, children, className = '', below = false, hold = 2200 }) {
  const [i, setI] = useState(null)
  const timer = useRef(null)

  const onTap = () => {
    setI((n) => (n === null ? 0 : (n + 1) % messages.length))
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setI(null), hold)
  }

  return (
    <span className={`relative inline-block ${className}`}>
      <Bubble center below={below} text={i !== null ? messages[i] : null} />
      <span role="button" tabIndex={0} onClick={onTap} onKeyDown={(ev) => ev.key === 'Enter' && onTap()} className="cursor-pointer">
        {children}
      </span>
    </span>
  )
}
