import { useEffect, useState, useCallback, useRef } from 'react'

// Imperative-ish burst of tiny hearts from a point. Used for click feedback.
export function useHeartBurst() {
  const [bursts, setBursts] = useState([])
  const idRef = useRef(0)

  const trigger = useCallback((x, y) => {
    const id = idRef.current++
    const hearts = Array.from({ length: 6 }).map((_, i) => ({
      key: `${id}-${i}`,
      dx: (Math.random() - 0.5) * 60,
      delay: i * 60,
    }))
    setBursts((b) => [...b, { id, x, y, hearts }])
    setTimeout(() => {
      setBursts((b) => b.filter((burst) => burst.id !== id))
    }, 1600)
  }, [])

  const triggerFromEvent = useCallback(
    (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX
      const y = e.touches ? e.touches[0].clientY : e.clientY
      trigger(x, y)
    },
    [trigger]
  )

  const portal = (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden="true">
      {bursts.map((burst) => (
        <div key={burst.id} style={{ position: 'absolute', left: burst.x, top: burst.y }}>
          {burst.hearts.map((h) => (
            <span
              key={h.key}
              className="absolute text-lg animate-heartPop select-none"
              style={{ left: h.dx, animationDelay: `${h.delay}ms` }}
            >
              💗
            </span>
          ))}
        </div>
      ))}
    </div>
  )

  return { triggerFromEvent, portal }
}
