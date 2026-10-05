import { useEffect, useRef, useState } from 'react'

// Little sparkles wherever she taps. Never blocks taps (pointer-events: none).
export default function TapSparkles() {
  const [bursts, setBursts] = useState([])
  const last = useRef(0)

  useEffect(() => {
    const on = (e) => {
      if (document.documentElement.classList.contains('game-on')) return
      const now = Date.now()
      if (now - last.current < 120) return
      last.current = now
      const id = now + Math.random()
      const parts = Array.from({ length: 7 }, (_, i) => ({
        a: (i / 7) * Math.PI * 2 + Math.random() * 0.6,
        d: 26 + Math.random() * 26,
        e: ['✦', '✧', '•', '✦', '♡'][Math.floor(Math.random() * 5)],
        c: ['#f76b9c', '#63c3d8', '#fbd25e', '#ff8fb3', '#569a68'][Math.floor(Math.random() * 5)],
      }))
      setBursts((b) => [...b.slice(-5), { id, x: e.clientX, y: e.clientY, parts }])
      setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 750)
    }
    window.addEventListener('pointerdown', on, { passive: true })
    return () => window.removeEventListener('pointerdown', on)
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      {bursts.map((b) =>
        b.parts.map((p, i) => (
          <span
            key={`${b.id}-${i}`}
            className="tap-spark"
            style={{
              left: b.x,
              top: b.y,
              color: p.c,
              '--tx': `${Math.cos(p.a) * p.d}px`,
              '--ty': `${Math.sin(p.a) * p.d}px`,
            }}
          >
            {p.e}
          </span>
        ))
      )}
    </div>
  )
}
