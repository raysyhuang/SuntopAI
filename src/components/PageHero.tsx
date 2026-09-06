'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'

/**
 * The page opener, in the language the homepage sets: a photograph of our own
 * network carrying the fold, the heading over it at a size that can hold a dark
 * frame, and no label stacked above the heading.
 *
 * Deliberately not animated. Framer renders an initial state into the server HTML,
 * so a fade-in here would ship opacity:0 in the markup and leave the heading
 * invisible until hydration — blank on a slow connection, permanently blank if the
 * bundle fails. Nothing a visitor must read on arrival waits for JavaScript. The
 * one authored motion moment on the site is the network map.
 *
 * `focus` sets object-position per image, because a face or a sign near an edge is
 * the first thing a centre crop throws away.
 */
export function PageHero({
  title,
  lede,
  photo,
  focus = 'center',
  children,
}: {
  title: string
  lede?: string
  photo: string
  focus?: string
  children?: ReactNode
}) {
  return (
    <section className="relative isolate grain overflow-hidden bg-[#060d18]">
      <div className="absolute inset-0">
        <Image
          src={photo}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: focus }}
        />
        {/* Two scrims: a wash from the left so the type has a ground, and a lift
            from the bottom so the section below does not butt against the image. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, #060d18 0%, rgba(6,13,24,0.93) 40%, rgba(6,13,24,0.66) 66%, rgba(6,13,24,0.34) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: 'linear-gradient(to top, rgba(6,13,24,0.85), transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-36 pb-24 md:pt-44 md:pb-28">
        <div className="max-w-[44rem]">
          <h1
            className="font-display font-light text-white leading-[1.06] tracking-[-0.03em] text-[2.6rem] sm:text-[3.2rem] lg:text-[3.8rem]"
            style={{ textWrap: 'balance' }}
          >
            {title}
          </h1>
          {lede && (
            <p className="mt-7 max-w-[38rem] text-[1.05rem] md:text-lg leading-[1.85] text-neutral-300">
              {lede}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
