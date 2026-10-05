import { useMemo } from 'react'
import FloatingPetals from './FloatingPetals'

// A living background: shifting gradient, drifting glow blobs, rising bubbles,
// twinkling sparkles and the mood's own floating particles. Pure CSS animation
// (cheap on phones) and it calms down when the phone asks for reduced motion.
export default function LiveBackground({ bg = 'from-peony-50 via-cream to-icy-50', dark = false, particle = '🌸' }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => ({
        left: (i * 37 + 7) % 100,
        size: 10 + ((i * 13) % 26),
        dur: 11 + ((i * 7) % 9),
        delay: -((i * 2.3) % 14),
      })),
    []
  )
  const sparkles = useMemo(
    () =>
      Array.from({ length: dark ? 26 : 16 }, (_, i) => ({
        left: (i * 53 + 11) % 100,
        top: (i * 29 + 5) % 100,
        size: dark ? 2 + (i % 3) : 6 + (i % 4) * 2,
        dur: 2.2 + ((i * 3) % 5) * 0.6,
        delay: -((i * 1.7) % 6),
      })),
    [dark]
  )

  const blobColors = dark
    ? ['bg-icy-400/20', 'bg-forest-400/25', 'bg-butter-300/15', 'bg-peony-400/15', 'bg-icy-300/15']
    : ['bg-peony-300/45', 'bg-icy-300/45', 'bg-butter-300/40', 'bg-forest-200/40', 'bg-peony-200/50']

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${bg} bg-shift`} />
      {blobColors.map((c, i) => (
        <span key={i} className={`live-blob live-blob-${i} ${c}`} />
      ))}
      {bubbles.map((b, i) => (
        <span
          key={`b${i}`}
          className={`bubble ${dark ? 'bubble-dark' : ''}`}
          style={{ left: `${b.left}%`, width: b.size, height: b.size, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
        />
      ))}
      {sparkles.map((s, i) => (
        <span
          key={`s${i}`}
          className={dark ? 'star' : 'sparkle'}
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }}
        />
      ))}
      <FloatingPetals count={10} emoji={particle} />
    </div>
  )
}
