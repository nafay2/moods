export default function PeonySVG({ className = '', size = 160 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.9">
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i * 36 * Math.PI) / 180
          const cx = 100 + Math.cos(angle) * 34
          const cy = 100 + Math.sin(angle) * 34
          return (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx="26"
              ry="36"
              fill="url(#petalGradOuter)"
              transform={`rotate(${(i * 36)} ${cx} ${cy})`}
              opacity="0.85"
            />
          )
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180
          const cx = 100 + Math.cos(angle) * 20
          const cy = 100 + Math.sin(angle) * 20
          return (
            <ellipse
              key={`inner-${i}`}
              cx={cx}
              cy={cy}
              rx="18"
              ry="26"
              fill="url(#petalGradInner)"
              transform={`rotate(${(i * 45)} ${cx} ${cy})`}
            />
          )
        })}
        <circle cx="100" cy="100" r="14" fill="url(#coreGrad)" />
      </g>
      <defs>
        <radialGradient id="petalGradOuter" cx="0.3" cy="0.3" r="0.9">
          <stop offset="0%" stopColor="#fff5f8" />
          <stop offset="60%" stopColor="#ffd3e0" />
          <stop offset="100%" stopColor="#ff8fb3" />
        </radialGradient>
        <radialGradient id="petalGradInner" cx="0.3" cy="0.3" r="0.9">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#ffe9f0" />
          <stop offset="100%" stopColor="#ffb3cb" />
        </radialGradient>
        <radialGradient id="coreGrad" cx="0.3" cy="0.3" r="0.9">
          <stop offset="0%" stopColor="#fde385" />
          <stop offset="100%" stopColor="#f3bc3a" />
        </radialGradient>
      </defs>
    </svg>
  )
}
