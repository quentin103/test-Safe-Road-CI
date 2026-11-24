"use client"

import { MotionConfig, motion } from "motion/react"

import { cn } from "@/lib/utils"

/** Pointillés de la ligne centrale, de plus en plus fins vers l'horizon (perspective). */
const dashes = [
  { y: 216, h: 22, w: 7 },
  { y: 182, h: 16, w: 5.5 },
  { y: 156, h: 12, w: 4.5 },
  { y: 136, h: 9, w: 3.5 },
  { y: 121, h: 6, w: 2.6 },
]

/**
 * Route qui s'arrête sur une barrière, avec un panneau « 404 » qui se balance.
 * Illustration décorative (SVG), aux couleurs de la charte ; respecte « réduire les animations ».
 */
export function DeadEndIllustration({ className }: { className?: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <svg
        viewBox="0 0 320 250"
        preserveAspectRatio="xMidYMax slice"
        role="img"
        aria-label="Une route qui s’arrête devant une barrière"
        className={cn("h-auto w-full", className)}
      >
        {/* Soleil */}
        <circle cx="74" cy="66" r="24" fill="var(--sand)" />

        {/* Collines */}
        <path d="M0 122 Q60 96 120 116 T240 108 T320 116 V250 H0Z" fill="var(--mint)" />
        <path d="M0 132 Q80 116 160 126 T320 124 V250 H0Z" fill="var(--fern)" opacity="0.55" />

        {/* Route */}
        <path d="M66 250 L148 112 H172 L254 250Z" fill="var(--primary)" />
        <path d="M66 250 L148 112" stroke="var(--primary-tile)" strokeWidth="2" />
        <path d="M254 250 L172 112" stroke="var(--primary-tile)" strokeWidth="2" />

        {/* Ligne centrale qui défile vers l'horizon */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {dashes.map((dash, index) => (
            <motion.rect
              key={dash.y}
              x={160 - dash.w / 2}
              y={dash.y}
              width={dash.w}
              height={dash.h}
              rx={dash.w / 2}
              fill="var(--card)"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.18, ease: "easeInOut" }}
            />
          ))}
        </motion.g>

        {/* Barrière de fin de route */}
        <defs>
          <pattern id="barrier-stripes" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="12" height="12" fill="var(--card)" />
            <rect width="6" height="12" fill="var(--danger-muted)" />
          </pattern>
        </defs>
        <rect x="124" y="98" width="3" height="18" rx="1.5" fill="var(--soft-foreground)" />
        <rect x="193" y="98" width="3" height="18" rx="1.5" fill="var(--soft-foreground)" />
        <rect x="116" y="92" width="88" height="12" rx="3" fill="url(#barrier-stripes)" stroke="var(--foreground)" strokeWidth="1.5" />

        {/* Panneau 404 qui se balance sur son poteau */}
        <rect x="250" y="120" width="4" height="96" rx="2" fill="var(--soft-foreground)" />
        <motion.g
          style={{ originX: "252px", originY: "122px" }}
          initial={{ rotate: -14, opacity: 0 }}
          animate={{ rotate: [-4, 4, -4], opacity: 1 }}
          transition={{
            rotate: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.4 },
          }}
        >
          <rect x="250.5" y="114" width="3" height="10" fill="var(--soft-foreground)" />
          <rect
            x="230"
            y="64"
            width="44"
            height="44"
            rx="7"
            transform="rotate(45 252 86)"
            fill="var(--gold)"
            stroke="var(--foreground)"
            strokeWidth="2.5"
          />
          <text
            x="252"
            y="92"
            textAnchor="middle"
            fontSize="17"
            fontWeight="800"
            fill="var(--foreground)"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            404
          </text>
        </motion.g>

        {/* Bornes au bord de la route */}
        <rect x="54" y="214" width="8" height="22" rx="2" fill="var(--card)" stroke="var(--foreground)" strokeWidth="1.2" />
        <rect x="54" y="218" width="8" height="4" fill="var(--danger-muted)" />
        <rect x="96" y="160" width="5" height="14" rx="1.5" fill="var(--card)" stroke="var(--foreground)" strokeWidth="1" />
        <rect x="96" y="163" width="5" height="2.5" fill="var(--danger-muted)" />
      </svg>
    </MotionConfig>
  )
}
