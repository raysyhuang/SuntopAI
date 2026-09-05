'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import dots from '../../public/data/network-map-dots.json'

/**
 * The network overview on the homepage.
 *
 * The province shapes are a static image — 200KB of path data that would bloat the
 * HTML if inlined — with only the centers drawn as real elements on top, from
 * network-map-dots.json. Both come out of scripts/make-network-map.mjs and share a
 * viewBox, so the overlay lands exactly on the map.
 *
 * The dots arrive one at a time, north to south, so the section reads as the network
 * being built rather than as decoration. It is the one piece of motion on the site
 * that carries meaning, which is the only reason it earns its place.
 *
 * The dots are data, not ornament, so they must not depend on an animation firing.
 * A plain whileInView left them at opacity zero whenever the intersection observer
 * did not trigger — in headless rendering, in screenshot tools, and potentially for
 * a real visitor — and the map then showed a network with no centers in it. So the
 * reveal runs on a timer as well as on the observer, whichever comes first, and
 * anyone who has asked for less motion gets the finished map immediately.
 */
export function NetworkMap({ alt }: { alt: string }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const show = inView || timedOut || Boolean(reduceMotion)
  const { viewBox, dots: points } = dots

  return (
    <div className="relative" ref={ref}>
      <Image
        src="/images/network-map.svg"
        alt={alt}
        width={viewBox.width}
        height={viewBox.height}
        className="w-full h-auto"
      />

      <svg
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        focusable="false"
      >
        {points.map((p, i) => (
          <motion.circle
            key={`${p.x}-${p.y}-${i}`}
            cx={p.x}
            cy={p.y}
            r={6.5}
            fill={p.type === 'direct' ? '#0b1d33' : '#0b5f58'}
            stroke="#ffffff"
            strokeWidth={2.2}
            initial={{ scale: 0, opacity: 0 }}
            animate={show ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    // Roughly a second and a half for the whole network — long enough
                    // to read as a sequence, short enough not to hold anyone up.
                    delay: timedOut && !inView ? 0 : i * 0.07,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
            style={{ transformOrigin: `${p.x}px ${p.y}px`, transformBox: 'fill-box' }}
          />
        ))}
      </svg>
    </div>
  )
}
