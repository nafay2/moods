import { useMemo } from 'react'

// Purely CSS-driven drifting petal particles. Cheap, GPU-friendly,
// and respects prefers-reduced-motion via the global stylesheet.
export default function FloatingPetals({ count = 14, variant = 'petal', className = '' }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 10,
        size: 10 + Math.random() * 14,
        driftX: (Math.random() - 0.5) * 120,
        rotate: Math.random() * 360,
      })),
    [count]
  )

  const emoji = variant === 'heart' ? '💗' : variant === 'leaf' ? '🍃' : '🌸'

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-0 ${className}`} aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 animate-drift select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift-x': `${p.driftX}px`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  )
}
