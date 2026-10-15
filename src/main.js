import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { site, about, projects, experience, research, skills, exhibits, proofGrid } from './content.js'
import { cellField } from './field.js'

gsap.registerPlugin(ScrollTrigger)
document.documentElement.classList.add('js')
// Every visit starts at the top, so the hero entrance always plays.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

// The "H + cursor" mark: two stems, crossbar replaced by a blinking cursor block.
const mark = (size = 28) => `
  <svg class="mark" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true">
    <rect x="6" y="5" width="4" height="22" fill="currentColor"/>
    <rect x="22" y="5" width="4" height="22" fill="currentColor"/>
    <rect class="mark-cursor" x="11.5" y="13.5" width="9" height="5" />
  </svg>`

// Placeholder links are '#'; anything else is a real destination.
const isReal = (url) => Boolean(url) && url !== '#'
const resume = isReal(site.resumeUrl) ? site.resumeUrl : null
const socials = site.socials.filter((s) => isReal(s.url))
const external = (url) => `href="${url}" target="_blank" rel="noopener"`

// One drawn arrow for every link that leaves the site.
const arrow = `<svg class="arrow" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`

// Text split for motion: masked words rise from below their own baseline.
const masked = (text) =>
  text
    .split(' ')
    .map((w) => `<span class="mask"><span>${w}</span></span>`)
    .join(' ')
const wordsOf = (text) =>
  text
    .split(' ')
    .map((w) => `<span class="w">${w}</span>`)
    .join(' ')

/* ---------- Exhibits: the evidence drawn beside each claim ---------- */

const cellRows = (rows) => `
  <div class="cell-rows">
    ${rows
      .map(
        (r, row) => `
      <div class="cell-row">
        <span class="cell-label"><span>${r.label}</span>${r.value ? `<b>${r.value}</b>` : ''}</span>
        <div class="cells" style="--row:${row}">
          ${Array.from({ length: 20 }, (_, i) => `<i class="${i < r.cells ? (r.mark ? 'on mark' : 'on') : ''}" style="--i:${i}"></i>`).join('')}
        </div>
      </div>`,
      )
      .join('')}
  </div>`

const cellGrid = ({ total, marked }) => `
  <div class="cell-grid">
    ${Array.from({ length: total }, (_, i) => `<i class="${i < marked ? 'on mark' : ''}" style="--i:${i}"></i>`).join('')}
  </div>`

// The pixel-shift paper, drawn: 100 cells, and the share that survives compression.
// Kept cells are scattered with a fixed seed so the figure is identical on every load.
const pixelGrid = (stat) => {
  const total = 100
  const kept = total - parseInt(stat.value, 10)
  const keep = new Set()
  let seed = 7
  while (keep.size < kept) {
    seed = (seed * 41 + 13) % total
    keep.add(seed)
  }
  return `
    <div class="cell-grid pixels">
      ${Array.from({ length: total }, (_, i) => `<i class="${keep.has(i) ? 'kept' : ''}" style="--i:${i}"></i>`).join('')}
    </div>`
}

// The search-optimization patent, drawn: each row is a parameter track. A grey cell marks
// the shared default; the orange cell slides to the value the model tuned it to.
const tuningTracks = ({ from, to }) => `
  <div class="tuning">
    ${to
      .map(
        (p, row) => `
      <div class="track" style="--from:${from};--to:${p};--row:${row}">
        ${'<i></i>'.repeat(20)}
        <b class="ghost"></b>
        <b class="knob"></b>
      </div>`,
      )
      .join('')}
  </div>`

const drawingOf = (ex) =>
  [
    ex.rows ? cellRows(ex.rows) : '',
    ex.grid ? cellGrid(ex.grid) : '',
    ex.pixels ? pixelGrid(ex.pixels) : '',
    ex.tuning ? tuningTracks(ex.tuning) : '',
  ].join('')

const picture = (img, cls = '') => `
  <img class="print ${cls}" src="${img.src}" width="${img.w}" height="${img.h}" alt="${img.alt}" loading="lazy" decoding="async" />`

const exhibit = (key) => {
  const ex = exhibits[key]
  if (!ex) return ''
  const big = ex.big || ex.pixels?.value || (ex.tuning ? 'Default → tuned' : '')
  const bigNote = ex.pixels?.label || ex.tuning?.caption || ''
  const drawing = drawingOf(ex)
  return `
    <figure class="exhibit" data-key="${key}">
      ${big ? `<div class="ex-head"><p class="ex-big${ex.tuning ? ' ex-big-words' : ''}">${big}</p>${bigNote ? `<p class="ex-note">${bigNote}</p>` : ''}</div>` : ''}
      ${drawing ? `<div class="ex-drawing" aria-hidden="true">${drawing}</div>` : ''}
      ${ex.image ? picture(ex.image) : ''}
      <figcaption>${ex.caption}</figcaption>
    </figure>`
}

const inline = (key) => `<div class="exhibit-inline">${exhibit(key)}</div>`

// A proof card: the headline number counts up, the drawing draws itself, the card links to its source.
const card = (c) => {
  const ex = exhibits[c.exhibit]
  // Only a single figure counts up; an identifier like a patent number is set as words.
  const n = c.big.match(/^([^\d]*)(\d+)(\D*)$/)
  return `
    <a class="card card-${c.area} tone-${c.tone}" href="${c.href}">
      <div class="card-head">
        <p class="card-big${n ? '' : ' card-big-words'}"${n ? ` data-pre="${n[1]}" data-to="${n[2]}" data-suf="${n[3]}"` : ''}>${c.big}</p>
        <p class="card-title">${c.title}</p>
      </div>
      <div class="card-drawing" aria-hidden="true">${drawingOf(ex)}</div>
      <p class="card-cap">${c.caption}</p>
      <span class="card-go">${c.source} ${arrow}</span>
    </a>`
}

const toolkitWords = skills.flatMap((s) => s.items)
const marqueeRow = (items) => {
  const run = items.map((t) => `<span class="mq-item">${t}</span><i class="mq-cell" aria-hidden="true"></i>`).join('')
  return `<div class="mq-row"><div class="mq-track">${run}${run}</div></div>`
}
const half = Math.ceil(toolkitWords.length / 2)

/* ---------- Page ---------- */

document.querySelector('#app').innerHTML = `
  <a class="skip" href="#main">Skip to content</a>
  <div class="progress" aria-hidden="true"></div>
  <header class="nav">
    <a href="#top" class="brand">${mark(22)}<span>${site.name}</span></a>
    <nav aria-label="Sections">
      <a href="#proof">Proof</a>
      <a href="#experience">Experience</a>
      <a href="#research">Research</a>
      <a href="#work">Work</a>
      ${resume ? `<a ${external(resume)}>Résumé</a>` : ''}
      <a href="#contact" class="nav-action">Contact</a>
    </nav>
  </header>

  <main id="main">
    <section class="hero" id="top">
      <canvas class="field" aria-hidden="true"></canvas>
      <div class="hero-wash" aria-hidden="true"></div>
      <div class="hero-inner">
        <p class="hero-kicker">${site.role} <span>·</span> ${site.location} <span>·</span> ${site.status}</p>
        <h1 class="name" aria-label="${site.name}">
          <span class="name-line" aria-hidden="true">${[...site.name.toUpperCase()]
            .map((c) => (c === ' ' ? '<span class="sp"> </span>' : `<span class="ch">${c}</span>`))
            .join('')}<span class="name-cursor"></span></span>
        </h1>
        <p class="statement">${site.intro}</p>
        <div class="actions">
          <a class="btn btn-accent magnetic" href="mailto:${site.email}">Email me</a>
          ${resume ? `<a class="btn btn-ghost magnetic" ${external(resume)}>Download résumé</a>` : `<a class="btn btn-ghost magnetic" href="#proof">See the proof</a>`}
        </div>
      </div>
    </section>

    <section class="proof" id="proof">
      <div class="proof-top">
        <h2 class="section-head">${masked(proofGrid.heading)}</h2>
        <p class="proof-sub rise">${proofGrid.sub}</p>
      </div>
      <div class="bento">${proofGrid.cards.map(card).join('')}</div>
    </section>

    <section class="toolkit-band" aria-label="Toolkit">
      ${marqueeRow(toolkitWords.slice(0, half))}
      ${marqueeRow(toolkitWords.slice(half))}
    </section>

    <section class="about" id="about">
      <h2 class="sr-only">About</h2>
      <p class="about-head">${wordsOf(about.heading)}</p>
      <div class="about-cols">
        ${about.paragraphs.map((p) => `<p class="rise">${p}</p>`).join('')}
      </div>
      <p class="signoff rise">${site.fullName}<span>${site.role}, ${site.location}</span></p>
    </section>

    <div class="stage">
      <div class="read">
        <section class="experience" id="experience" data-exhibit="oracle">
          <h2 class="section-head">${masked('Experience')}</h2>
          <div class="ledger-wrap">
            <div class="rail" aria-hidden="true"><i class="rail-fill"></i></div>
            <ol class="ledger">
              ${experience
                .map(
                  (e, i) => `
                <li class="role-entry rise${i === 0 ? ' is-current' : ''}" ${e.exhibit ? `data-exhibit="${e.exhibit}" tabindex="0"` : ''}>
                  <h3>${e.role}</h3>
                  <p class="when"><span>${e.company}</span><span>${e.period}</span><span>${e.location}</span></p>
                  <ul class="highlights">${e.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>
                  <p class="stack">${e.stack.map((s) => `<span>${s}</span>`).join('')}</p>
                  ${e.exhibit ? inline(e.exhibit) : ''}
                </li>`,
                )
                .join('')}
            </ol>
          </div>
          <div class="toolkit rise">
            <h3>Toolkit</h3>
            <dl>
              ${skills.map((s) => `<div><dt>${s.group}</dt><dd>${s.items.join(', ')}</dd></div>`).join('')}
            </dl>
          </div>
        </section>

        <section class="research" id="research" data-exhibit="paper">
          <h2 class="section-head">${masked('Research &amp; patents')}</h2>
          ${research
            .map(
              (r) => `
            <article class="paper rise" data-exhibit="${r.exhibit}">
              <p class="paper-meta">${r.type}, ${r.venue} · ${r.date}</p>
              <h3><a ${external(r.url)}>${r.title}</a></h3>
              <p>${r.summary}</p>
              ${r.figure ? `<div class="paper-figure">${picture(r.figure)}</div>` : ''}
              <p class="paper-links">
                <a ${external(r.url)}>${r.linkLabel || `Read the ${r.type.toLowerCase()}`} ${arrow}</a>
                ${r.code ? `<a ${external(r.code)}>Code ${arrow}</a>` : ''}
              </p>
              ${inline(r.exhibit)}
            </article>`,
            )
            .join('')}
        </section>

        <section class="work" id="work" data-exhibit="optipixel">
          <h2 class="section-head">${masked('Selected work')}</h2>
          <ul class="projects">
            ${projects
              .map(
                (p) => `
              <li class="rise" data-exhibit="${p.exhibit || 'none'}">
                <a class="project" ${external(p.url)}>
                  <span class="project-title">${p.title} ${arrow}</span>
                  <span class="project-year">${p.year}</span>
                  <span class="project-summary">${p.summary}</span>
                  <span class="project-tags">${p.tags.join(', ')}</span>
                </a>
              </li>`,
              )
              .join('')}
          </ul>
          ${inline('optipixel')}
        </section>
      </div>

      <aside class="plate" aria-label="Evidence for the section you are reading"></aside>
    </div>
  </main>

  <section class="contact" id="contact">
    <canvas class="field" aria-hidden="true"></canvas>
    <div class="contact-inner">
      <h2 class="close">${masked(site.tagline)}</h2>
      <div class="contact-body">
        <p class="statement">${site.status}. The fastest route is email.</p>
        <a class="contact-mail" href="mailto:${site.email}">${site.email}</a>
        <div class="actions">
          <a class="btn btn-ink magnetic" href="mailto:${site.email}">Email me</a>
          ${resume ? `<a class="btn btn-ink magnetic" ${external(resume)}>Download résumé</a>` : ''}
          ${socials.map((s) => `<a class="btn btn-ink magnetic" ${external(s.url)}>${s.label}</a>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <span class="brand">${mark(16)} ${site.fullName}</span>
    <span class="footer-links">${socials.map((s) => `<a ${external(s.url)}>${s.label}</a>`).join('')}<a href="mailto:${site.email}">Email</a></span>
    <span class="credits">Figures from arXiv 2406.19630 and US patent 12,518,222</span>
  </footer>
`

/* ---------- Living fields: the hero and the contact field are drawn in the same cells ---------- */

const heroField = cellField(document.querySelector('.hero .field'), {
  bg: '#161616',
  base: '#252524',
  heat: '#6b6862',
  mark: '#e8490f',
  reduceMotion,
})
cellField(document.querySelector('.contact .field'), {
  bg: '#e8490f',
  base: '#e04610',
  heat: '#cc3f0b',
  mark: '#b8390a',
  reveal: false,
  reduceMotion,
})

/* ---------- Figure motion: each drawing replays when it comes into view ---------- */

const play = (fig) => {
  if (reduceMotion) return
  fig.classList.remove('run')
  void fig.offsetWidth // restart transitions
  fig.classList.add('run')
}
if (!reduceMotion) document.querySelectorAll('.exhibit, .card').forEach((f) => f.classList.add('fig-armed'))

const inlineIO = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        play(e.target)
        inlineIO.unobserve(e.target)
      }
    }),
  { threshold: 0.4 },
)
document.querySelectorAll('.exhibit-inline .exhibit').forEach((f) => inlineIO.observe(f))

/* ---------- The plate: one exhibit at a time, for what is being read or pointed at ---------- */

const plate = document.querySelector('.plate')
const keys = [...new Set([...document.querySelectorAll('.read [data-exhibit]')].map((el) => el.dataset.exhibit))].filter((k) => k !== 'none')
plate.innerHTML = keys.map((k) => exhibit(k)).join('')
const layers = new Map([...plate.querySelectorAll('.exhibit')].map((f) => [f.dataset.key, f]))
layers.forEach((f) => !reduceMotion && f.classList.add('fig-armed'))

let scrollKey = keys[0]
let shownKey = null
// 'none' clears the plate: a claim without a figure never borrows another's evidence.
const show = (key) => {
  if (key === shownKey || (key !== 'none' && !layers.has(key))) return
  layers.get(shownKey)?.classList.remove('active')
  shownKey = key
  if (key === 'none') return
  const next = layers.get(key)
  next.classList.add('active')
  play(next)
}
show(scrollKey)

// Scroll: whichever claim crosses the middle of the screen owns the plate.
const readIO = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        scrollKey = e.target.dataset.exhibit
        show(scrollKey)
      }
    }),
  { rootMargin: '-48% 0px -48% 0px' },
)
document.querySelectorAll('.read [data-exhibit]').forEach((el) => readIO.observe(el))

// Pointing: hover or focus a claim to see its evidence; leaving returns to the section's.
document.querySelectorAll('.read [data-exhibit]').forEach((el) => {
  if (el.tagName === 'SECTION') return
  const enter = (e) => {
    e.stopPropagation()
    show(el.dataset.exhibit)
  }
  el.addEventListener('pointerenter', enter)
  el.addEventListener('focus', enter)
  el.addEventListener('pointerleave', () => show(scrollKey))
  el.addEventListener('blur', () => show(scrollKey))
})

/* ---------- Nav: dark over the hero, light over paper ---------- */

const nav = document.querySelector('.nav')
ScrollTrigger.create({
  trigger: '.hero',
  start: 'top bottom',
  end: 'bottom 48px',
  toggleClass: { targets: nav, className: 'on-dark' },
})

/* ---------- Motion: everything below collapses to its end state under reduced motion ---------- */

const countUp = (el) => {
  if (!el?.dataset.to) return
  const to = parseFloat(el.dataset.to)
  const obj = { v: 0 }
  gsap.to(obj, {
    v: to,
    duration: 1.6,
    ease: 'power3.out',
    onUpdate: () => (el.textContent = `${el.dataset.pre}${Math.round(obj.v)}${el.dataset.suf}`),
  })
}

const mm = gsap.matchMedia()
mm.add('(prefers-reduced-motion: no-preference)', () => {
  // Smooth scroll, driven from GSAP's ticker so ScrollTrigger stays in lockstep.
  const lenis = new Lenis({ lerp: 0.1 })
  lenis.on('scroll', ScrollTrigger.update)
  const raf = (t) => lenis.raf(t * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const target = a.getAttribute('href')
      if (target.length < 2) return
      e.preventDefault()
      lenis.scrollTo(target === '#top' ? 0 : target, { offset: target === '#top' ? 0 : -80, duration: 1.4 })
    }),
  )

  // Hero entrance: the field opens from the centre, the name rises letter by letter.
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
  tl.from('.name .ch', { yPercent: 115, duration: 1.5, stagger: 0.045 }, 0.25)
    .from('.name-cursor', { scaleX: 0, duration: 0.7, ease: 'power3.out' }, 1.0)
    .from('.hero-kicker, .hero .statement, .hero .actions', { y: 28, opacity: 0, duration: 1.2, stagger: 0.12 }, 0.8)
    .from(nav, { y: -24, opacity: 0, duration: 1 }, 1.1)

  // Hero exit: the words lift away and the field sinks back.
  gsap.to('.hero-inner', {
    yPercent: -22,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  })
  gsap.to('.hero .field', {
    scale: 1.08,
    opacity: 0.4,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  })

  // Reading progress and a nav that steps aside while you read.
  gsap.fromTo('.progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => nav.classList.toggle('tucked', self.direction === 1 && self.scroll() > window.innerHeight * 0.9),
  })

  // Section heads rise out of their own baseline.
  gsap.utils.toArray('.section-head, .close').forEach((h) =>
    gsap.from(h.querySelectorAll('.mask > span'), {
      yPercent: 115,
      duration: 1.3,
      stagger: 0.07,
      ease: 'expo.out',
      scrollTrigger: { trigger: h, start: 'top 88%' },
    }),
  )

  // Body copy rises in small batches.
  gsap.set('.rise', { opacity: 0, y: 36 })
  ScrollTrigger.batch('.rise', {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, stagger: 0.09, ease: 'expo.out' }),
  })

  // Proof cards: rise, count up, draw.
  gsap.set('.card', { opacity: 0, y: 70, scale: 0.96 })
  ScrollTrigger.batch('.card', {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.1, ease: 'expo.out' })
      batch.forEach((c, i) =>
        gsap.delayedCall(0.15 + i * 0.1, () => {
          play(c)
          countUp(c.querySelector('.card-big'))
        }),
      )
    },
  })

  // About: the heading reads itself in as you scroll.
  gsap.fromTo(
    '.about-head .w',
    { opacity: 0.12 },
    {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: '.about-head', start: 'top 82%', end: 'bottom 45%', scrub: true },
    },
  )

  // Toolkit marquee: drifts on its own, surges and leans with scroll speed.
  const tracks = gsap.utils.toArray('.mq-track')
  const pos = tracks.map(() => 0)
  let boost = 0
  let lean = 0
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const v = self.getVelocity()
      boost = Math.min(Math.abs(v) / 250, 8)
      lean = gsap.utils.clamp(-7, 7, v / -260)
    },
  })
  // Translate lives on the track, lean on its row, so the two never fight over one transform.
  const skew = tracks.map((t) => gsap.quickTo(t.parentElement, 'skewX', { duration: 0.5, ease: 'power3.out' }))
  const drift = (time, dt) => {
    tracks.forEach((t, i) => {
      const dir = i % 2 ? 1 : -1
      pos[i] += dir * (1 + boost) * dt * 0.0022
      if (pos[i] <= -50) pos[i] += 50
      if (pos[i] > 0) pos[i] -= 50
      t.style.transform = `translate3d(${pos[i]}%,0,0)`
      skew[i](lean)
    })
    boost *= 0.92
    lean *= 0.9
  }
  gsap.ticker.add(drift)

  // Experience: a rail fills as the ledger is read.
  gsap.fromTo(
    '.rail-fill',
    { scaleY: 0 },
    { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.ledger', start: 'top 55%', end: 'bottom 55%', scrub: true } },
  )

  // Printed figures grow into view and dim once they have been read.
  gsap.utils.toArray('.paper-figure').forEach((f) => {
    gsap.fromTo(
      f,
      { scale: 0.84 },
      { scale: 1, ease: 'none', scrollTrigger: { trigger: f, start: 'top bottom', end: 'center 55%', scrub: true } },
    )
    gsap.to(f, {
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: f, start: 'bottom 30%', end: 'bottom top', scrub: true },
    })
  })

  // Magnetic actions: buttons lean toward the pointer.
  const magnets = gsap.utils.toArray('.magnetic').map((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - r.left - r.width / 2) * 0.3)
      y((e.clientY - r.top - r.height / 2) * 0.35)
    }
    const leave = () => {
      x(0)
      y(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return { el, move, leave }
  })

  // Proof cards replay their drawing when pointed at.
  const replays = gsap.utils.toArray('.card').map((c) => {
    const fn = () => play(c)
    c.addEventListener('pointerenter', fn)
    return [c, fn]
  })

  return () => {
    gsap.ticker.remove(raf)
    gsap.ticker.remove(drift)
    lenis.destroy()
    magnets.forEach(({ el, move, leave }) => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    })
    replays.forEach(([c, fn]) => c.removeEventListener('pointerenter', fn))
  }
})

// The hero field opens once the fonts are in, so the name and the field arrive together.
document.fonts.ready.then(() => heroField.open())
