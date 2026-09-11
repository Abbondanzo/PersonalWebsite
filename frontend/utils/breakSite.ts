import Matter from 'matter-js'

const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } =
  Matter

/** Elements that become physics bodies when the site “breaks”. */
const BREAKABLE_SELECTOR = [
  'h1',
  'h2',
  'h3',
  'h4',
  'p',
  'button',
  'img',
  'li',
  '.nav-links a',
  '.mobile-links a',
  '.btn',
].join(', ')

const WALL_THICKNESS = 200
const DEFAULT_GRAVITY = 1

export type BreakSiteOptions = {
  /** Fired once when the first deviceorientation event arrives. */
  onOrientation?: () => void
}

export type BreakSiteController = {
  stop: () => void
}

type StoredStyles = {
  position: string
  left: string
  top: string
  width: string
  height: string
  margin: string
  transform: string
  transformOrigin: string
  zIndex: string
  pointerEvents: string
  maxWidth: string
}

type TrackedElement = {
  el: HTMLElement
  width: number
  height: number
  body: Matter.Body
  original: StoredStyles
}

function isVisible(el: HTMLElement): boolean {
  const style = window.getComputedStyle(el)
  if (style.display === 'none' || style.visibility === 'hidden') return false
  if (style.opacity === '0') return false
  const rect = el.getBoundingClientRect()
  return rect.width > 4 && rect.height > 4
}

function getBreakableElements(): HTMLElement[] {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(BREAKABLE_SELECTOR),
  ).filter((el) => {
    if (el.closest('[data-break-site-ui]')) return false
    return isVisible(el)
  })

  // Prefer leaf nodes so nested text/buttons are not double-bound.
  return candidates.filter(
    (el) => !candidates.some((other) => other !== el && el.contains(other)),
  )
}

function snapshotStyles(el: HTMLElement): StoredStyles {
  return {
    position: el.style.position,
    left: el.style.left,
    top: el.style.top,
    width: el.style.width,
    height: el.style.height,
    margin: el.style.margin,
    transform: el.style.transform,
    transformOrigin: el.style.transformOrigin,
    zIndex: el.style.zIndex,
    pointerEvents: el.style.pointerEvents,
    maxWidth: el.style.maxWidth,
  }
}

function restoreStyles(el: HTMLElement, original: StoredStyles) {
  el.style.position = original.position
  el.style.left = original.left
  el.style.top = original.top
  el.style.width = original.width
  el.style.height = original.height
  el.style.margin = original.margin
  el.style.transform = original.transform
  el.style.transformOrigin = original.transformOrigin
  el.style.zIndex = original.zIndex
  el.style.pointerEvents = original.pointerEvents
  el.style.maxWidth = original.maxWidth
}

function orientationToGravity(
  beta: number | null,
  gamma: number | null,
): { x: number; y: number } {
  // Fall back to normal downward gravity when the device reports nothing.
  if (beta == null || gamma == null) {
    return { x: 0, y: DEFAULT_GRAVITY }
  }

  // Compensate for landscape/portrait so “down” matches the screen.
  const angle = (typeof screen.orientation?.angle === 'number'
    ? screen.orientation.angle
    : (window.orientation as number | undefined) || 0) as number

  let x = gamma
  let y = beta
  if (angle === 90) {
    x = beta
    y = -gamma
  } else if (angle === -90 || angle === 270) {
    x = -beta
    y = gamma
  } else if (angle === 180) {
    x = -gamma
    y = -beta
  }

  // Scale device degrees into Matter gravity units.
  const scale = 1 / 45
  return {
    x: Math.max(-2, Math.min(2, x * scale)),
    y: Math.max(-2, Math.min(2, y * scale)),
  }
}

function mouseToGravity(clientX: number, clientY: number): { x: number; y: number } {
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  return {
    x: Math.max(-2, Math.min(2, (clientX - cx) / cx)),
    y: Math.max(-2, Math.min(2, (clientY - cy) / cy + 0.6)),
  }
}

/**
 * Turns visible page content into Matter.js bodies that fall with gravity.
 * Device orientation steers gravity when available; otherwise the mouse does.
 */
export function startBreakSite(options: BreakSiteOptions = {}): BreakSiteController {
  const engine = Engine.create({
    gravity: { x: 0, y: DEFAULT_GRAVITY, scale: 0.001 },
  })
  const world = engine.world
  const runner = Runner.create()

  const width = window.innerWidth
  const height = window.innerHeight

  const walls = [
    Bodies.rectangle(width / 2, -WALL_THICKNESS / 2, width + WALL_THICKNESS * 2, WALL_THICKNESS, {
      isStatic: true,
    }),
    Bodies.rectangle(
      width / 2,
      height + WALL_THICKNESS / 2,
      width + WALL_THICKNESS * 2,
      WALL_THICKNESS,
      { isStatic: true },
    ),
    Bodies.rectangle(-WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height + WALL_THICKNESS * 2, {
      isStatic: true,
    }),
    Bodies.rectangle(
      width + WALL_THICKNESS / 2,
      height / 2,
      WALL_THICKNESS,
      height + WALL_THICKNESS * 2,
      { isStatic: true },
    ),
  ]
  Composite.add(world, walls)

  const tracked: TrackedElement[] = []
  const elements = getBreakableElements()

  for (const el of elements) {
    const rect = el.getBoundingClientRect()
    const original = snapshotStyles(el)
    const w = Math.max(rect.width, 8)
    const h = Math.max(rect.height, 8)
    const x = rect.left + w / 2
    const y = rect.top + h / 2

    el.style.position = 'fixed'
    el.style.left = `${rect.left}px`
    el.style.top = `${rect.top}px`
    el.style.width = `${w}px`
    el.style.height = `${h}px`
    el.style.maxWidth = 'none'
    el.style.margin = '0'
    el.style.transformOrigin = 'center center'
    el.style.zIndex = '20'
    el.style.pointerEvents = 'auto'

    const body = Bodies.rectangle(x, y, w, h, {
      restitution: 0.35,
      friction: 0.2,
      frictionAir: 0.02,
      density: 0.002,
    })

    tracked.push({ el, width: w, height: h, body, original })
    Composite.add(world, body)
  }

  // Let people fling pieces around after the break.
  const mouse = Mouse.create(document.body)
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.15,
      render: { visible: false },
    },
  })
  Composite.add(world, mouseConstraint)

  // Matter’s mouse uses the element’s scroll offset; keep it in sync with the viewport.
  mouse.element.removeEventListener('mousewheel', (mouse as any).mousewheel)
  mouse.element.removeEventListener('DOMMouseScroll', (mouse as any).mousewheel)

  const syncDom = () => {
    for (const item of tracked) {
      const { el, body, width: w, height: h } = item
      el.style.left = `${body.position.x - w / 2}px`
      el.style.top = `${body.position.y - h / 2}px`
      el.style.transform = `rotate(${body.angle}rad)`
    }
  }

  Events.on(engine, 'afterUpdate', syncDom)

  let usingOrientation = false

  const onOrientation = (event: DeviceOrientationEvent) => {
    // Ignore empty events some desktops fire without a real sensor.
    if (event.beta == null && event.gamma == null) return
    if (!usingOrientation) {
      usingOrientation = true
      options.onOrientation?.()
    }
    const g = orientationToGravity(event.beta, event.gamma)
    engine.gravity.x = g.x
    engine.gravity.y = g.y
  }

  const onMouseMove = (event: MouseEvent) => {
    if (usingOrientation) return
    const g = mouseToGravity(event.clientX, event.clientY)
    engine.gravity.x = g.x
    engine.gravity.y = g.y
  }

  window.addEventListener('deviceorientation', onOrientation)
  window.addEventListener('mousemove', onMouseMove)

  const previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  document.documentElement.classList.add('site-broken')

  Runner.run(runner, engine)

  let stopped = false

  return {
    stop() {
      if (stopped) return
      stopped = true

      Runner.stop(runner)
      Events.off(engine, 'afterUpdate', syncDom)
      window.removeEventListener('deviceorientation', onOrientation)
      window.removeEventListener('mousemove', onMouseMove)
      Composite.clear(world, false, true)
      Engine.clear(engine)

      for (const item of tracked) {
        restoreStyles(item.el, item.original)
      }

      document.body.style.overflow = previousOverflow
      document.documentElement.classList.remove('site-broken')
    },
  }
}

/**
 * iOS requires a user-gesture permission prompt before orientation events fire.
 * Returns whether orientation can be used (permission granted or not required).
 */
export async function requestOrientationPermission(): Promise<boolean> {
  const DOE = DeviceOrientationEvent as unknown as {
    requestPermission?: () => Promise<'granted' | 'denied'>
  }

  if (typeof DeviceOrientationEvent === 'undefined') {
    return false
  }

  if (typeof DOE.requestPermission === 'function') {
    try {
      const result = await DOE.requestPermission()
      return result === 'granted'
    } catch {
      return false
    }
  }

  return true
}
