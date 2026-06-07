// Renders a single small geometric figure as inline SVG — used to build
// matrix-style Abstract Reasoning items (shape, fill pattern, color, rotation)
// without needing any image assets.

const PATHS = {
  circle:   <circle cx="24" cy="24" r="18" />,
  square:   <rect x="6" y="6" width="36" height="36" />,
  triangle: <polygon points="24,6 44,40 4,40" />,
  diamond:  <polygon points="24,4 44,24 24,44 4,24" />,
  star: (
    <polygon points="24,3 29.5,17.5 45,18.5 33,29 36.5,44.5 24,36 11.5,44.5 15,29 3,18.5 18.5,17.5" />
  ),
  flower: (
    <g>
      <circle cx="24" cy="13" r="9" />
      <circle cx="35" cy="24" r="9" />
      <circle cx="24" cy="35" r="9" />
      <circle cx="13" cy="24" r="9" />
      <circle cx="24" cy="24" r="6" />
    </g>
  ),
  cross: (
    <polygon points="17,4 31,4 31,17 44,17 44,31 31,31 31,44 17,44 17,31 4,31 4,17 17,17" />
  ),
  moon: <path d="M30,4 A20,20 0 1 0 30,44 A15,15 0 1 1 30,4 Z" />,
  pentagon: <polygon points="24,4 45,19 37,43 11,43 3,19" />,
}

const FILL_DEFS = {
  solid:   (color, id) => <rect width="48" height="48" fill={color} />,
  outline: () => null,
  striped: (color, id) => (
    <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="6" height="6" fill="white" />
      <rect width="3" height="6" fill={color} />
    </pattern>
  ),
  hatched: (color, id) => (
    <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="6" fill="white" />
      <path d="M0,0 L6,6 M6,0 L0,6" stroke={color} strokeWidth="1.4" />
    </pattern>
  ),
  dotted: (color, id) => (
    <pattern id={id} width="7" height="7" patternUnits="userSpaceOnUse">
      <rect width="7" height="7" fill="white" />
      <circle cx="3.5" cy="3.5" r="1.6" fill={color} />
    </pattern>
  ),
}

let uid = 0

export default function VisualShape({ shape = 'circle', fill = 'solid', color = '#6366f1', rotation = 0, size = 48 }) {
  const path = PATHS[shape] ?? PATHS.circle
  const isPattern = fill === 'striped' || fill === 'hatched' || fill === 'dotted'
  const patternId = isPattern ? `vs-pat-${shape}-${fill}-${color.replace('#', '')}-${++uid}` : null

  const fillValue = fill === 'outline' ? 'none' : fill === 'solid' ? color : `url(#${patternId})`
  const strokeValue = color

  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className="inline-block" style={{ transform: `rotate(${rotation}deg)` }}>
      {isPattern && <defs>{FILL_DEFS[fill](color, patternId)}</defs>}
      <g fill={fillValue} stroke={strokeValue} strokeWidth={fill === 'outline' ? 2.5 : 1.5}>
        {path}
      </g>
    </svg>
  )
}

export const SHAPES = Object.keys(PATHS)
export const FILLS = Object.keys(FILL_DEFS)
