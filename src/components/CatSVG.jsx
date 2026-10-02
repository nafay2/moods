const VARIANTS = {
  // the little golden cat that follows her around the site
  gold: { body: '#f3bc3a', ear: '#f3bc3a', inner: '#ffd3e0', patch: null, whisker: '#7a5a10' },
  // Hades: the independent brown-and-greyish tabby
  tortie: { body: '#5b4d41', ear: '#3a3029', ear2: '#7d6f62', inner: '#e3bfb4', patch: null, whisker: '#3a3029', tortie: true },
  // Percy: the clingy baby cat, black and white
  patch: { body: '#ffffff', ear: '#1d1d22', inner: '#ffd3e0', patch: '#1d1d22', whisker: '#55555c' },
}

export default function CatSVG({ className = '', size = 90, variant = 'gold' }) {
  const v = VARIANTS[variant] || VARIANTS.gold
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="60" rx="30" ry="26" fill={v.body} opacity={variant === 'gold' ? 0.9 : 1} stroke={variant === 'patch' ? '#e8e2dc' : 'none'} strokeWidth="1.2" />
      <path d="M25 40 L15 15 L38 32 Z" fill={v.ear} opacity={variant === 'gold' ? 0.9 : 1} />
      <path d="M75 40 L85 15 L62 32 Z" fill={v.ear2 || v.ear} opacity={variant === 'gold' ? 0.9 : 1} />
      {v.tortie && (
        <>
          {/* soft grey-brown patches */}
          <path d="M52 32 C68 34 82 46 80 62 C72 60 62 56 56 46 Z" fill="#8a7a6b" />
          <path d="M20 60 C22 48 30 44 36 46 C34 54 30 62 20 60 Z" fill="#7b6b5d" />
          {/* lighter tan muzzle */}
          <ellipse cx="50" cy="68" rx="13" ry="9" fill="#a89886" />
          {/* tabby forehead stripes */}
          <path d="M50 34 L50 44 M42 36 L44 44 M58 36 L56 44" stroke="#2a2018" strokeWidth="2.4" strokeLinecap="round" />
          {/* cheek stripes */}
          <path d="M22 54 L30 56 M22 60 L30 60 M78 54 L70 56" stroke="#2a2018" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </>
      )}
      {v.patch && <path d="M50 34 C64 34 78 44 79 58 C70 56 60 50 50 34 Z" fill={v.patch} />}
      <path d="M25 40 L20 22 L34 33 Z" fill={v.inner} />
      <path d="M75 40 L80 22 L66 33 Z" fill={v.inner} />
      <circle cx="38" cy="55" r="4.5" fill={v.tortie ? '#1b1410' : '#122b1c'} />
      <circle cx="62" cy="55" r="4.5" fill={v.tortie ? '#1b1410' : '#122b1c'} />
      <circle cx="39.6" cy="53.6" r="1.4" fill="#fff" />
      <circle cx="63.6" cy="53.6" r="1.4" fill="#fff" />
      <path d="M46 64 Q50 68 54 64" stroke="#122b1c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M30 63 L18 60 M30 66 L17 66 M30 69 L19 72" stroke={v.whisker} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M70 63 L82 60 M70 66 L83 66 M70 69 L81 72" stroke={v.whisker} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="34" cy="60" r="4" fill="#ffb3cb" opacity="0.7" />
      <circle cx="66" cy="60" r="4" fill="#ffb3cb" opacity="0.7" />
    </svg>
  )
}
