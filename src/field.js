// A living cell field: the same square cells the exhibits are drawn in, filling a whole section.
// Orange "pixels" drift diagonally a cell at a time, the four frame shifts from the pixel-shift
// paper, leaving a short trail; the pointer warms the cells it passes over.

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const mix = (a, b, t) => a + (b - a) * t
const SHIFTS = [
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
]

export function cellField(canvas, { bg, base, heat, mark, reveal = true, reduceMotion = false }) {
  const ctx = canvas.getContext('2d')
  const host = canvas.parentElement
  const [B, H, M] = [hex(base), hex(heat), hex(mark)]
  let cols = 0
  let rows = 0
  let size = 0
  let step = 0
  let warm = new Float32Array(0)
  let lit = new Float32Array(0)
  let walkers = []
  let radius = reveal && !reduceMotion ? 0 : Infinity
  let opening = false
  let running = false
  let visible = false
  let last = 0
  let tick = 0
  const pointer = { x: -1, y: -1, active: false }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = host.clientWidth
    const h = host.clientHeight
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    step = w < 600 ? 18 : 26
    size = step - 4
    cols = Math.ceil(w / step) + 1
    rows = Math.ceil(h / step) + 1
    warm = new Float32Array(cols * rows)
    lit = new Float32Array(cols * rows)
    // A fixed seed: the field starts the same on every load.
    let seed = 11
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    walkers = Array.from({ length: Math.max(8, Math.round((cols * rows) / 120)) }, () => ({
      x: Math.floor(rand() * cols),
      y: Math.floor(rand() * rows),
      d: SHIFTS[Math.floor(rand() * 4)],
      every: 5 + Math.floor(rand() * 6),
    }))
    walkers.forEach((w) => (lit[w.y * cols + w.x] = 1))
    draw()
  }

  const draw = () => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)
    const cx = w / 2
    const cy = h / 2
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = x * step
        const py = y * step
        let a = 1
        if (radius !== Infinity) {
          const d = Math.hypot(px - cx, py - cy)
          a = Math.max(0, Math.min(1, (radius - d) / 120))
          if (a <= 0) continue
        }
        const i = y * cols + x
        const hw = warm[i]
        const l = lit[i]
        const r = mix(mix(B[0], H[0], hw), M[0], l)
        const g = mix(mix(B[1], H[1], hw), M[1], l)
        const b = mix(mix(B[2], H[2], hw), M[2], l)
        ctx.globalAlpha = a
        ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`
        const s = size * (0.55 + 0.45 * a)
        ctx.fillRect(px + (size - s) / 2, py + (size - s) / 2, s, s)
      }
    }
    ctx.globalAlpha = 1
  }

  const update = () => {
    tick++
    for (const w of walkers) {
      if (tick % w.every) continue
      w.x = (w.x + w.d[0] + cols) % cols
      w.y = (w.y + w.d[1] + rows) % rows
      if (Math.random() < 0.06) w.d = SHIFTS[Math.floor(Math.random() * 4)]
      lit[w.y * cols + w.x] = 1
    }
    if (pointer.active) {
      const gx = Math.floor(pointer.x / step)
      const gy = Math.floor(pointer.y / step)
      for (let dy = -3; dy <= 3; dy++) {
        for (let dx = -3; dx <= 3; dx++) {
          const x = gx + dx
          const y = gy + dy
          if (x < 0 || y < 0 || x >= cols || y >= rows) continue
          const f = Math.max(0, 1 - Math.hypot(dx, dy) / 3.6)
          const i = y * cols + x
          warm[i] = Math.min(1, warm[i] + f * 0.35)
        }
      }
      if (gx >= 0 && gy >= 0 && gx < cols && gy < rows) lit[gy * cols + gx] = Math.max(lit[gy * cols + gx], 0.85)
    }
    for (let i = 0; i < warm.length; i++) {
      warm[i] *= 0.94
      lit[i] *= 0.93
    }
    walkers.forEach((w) => (lit[w.y * cols + w.x] = 1))
  }

  const frame = (t) => {
    if (!running) return
    if (t - last > 15) {
      last = t
      if (opening) {
        radius += Math.max(14, radius * 0.045)
        if (radius > Math.hypot(canvas.clientWidth, canvas.clientHeight)) {
          radius = Infinity
          opening = false
        }
      }
      update()
      draw()
    }
    requestAnimationFrame(frame)
  }

  const start = () => {
    if (running || reduceMotion || !visible) return
    running = true
    requestAnimationFrame(frame)
  }

  new ResizeObserver(resize).observe(host)
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting
    if (visible) start()
    else running = false
  }).observe(host)

  if (!reduceMotion) {
    host.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.active = true
    })
    host.addEventListener('pointerleave', () => (pointer.active = false))
  }

  return {
    open() {
      if (radius === Infinity) return
      opening = true
      start()
    },
  }
}
