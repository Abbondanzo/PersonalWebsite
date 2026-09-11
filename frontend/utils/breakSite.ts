import Matter from 'matter-js'

const { Engine, Runner, Bodies, Body, Composite, Mouse, MouseConstraint, Events } =
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

/** Full-bleed logos / heroes make terrible rigid bodies and block everything else. */
function isOversized(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight
  const areaRatio = (rect.width * rect.height) / (vw * vh)
  return areaRatio > 0.35 || (rect.width > vw * 0.7 && rect.height > vh * 0.5)
}

/** Laptops often emit bogus deviceorientation with a backward tilt that pulls “up”. */
function canUseDeviceOrientation(): boolean {
  const needsPermission =
    typeof (DeviceOrientationEvent as unknown as { requestPermission?: unknown })
      .requestPermission === 'function'
  if (needsPermission) return true
  return (
    window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
  )
}

function getBreakableElements(): HTMLElement[] {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(BREAKABLE_SELECTOR),
  ).filter((el) => {
    if (el.closest('[data-break-site-ui]')) return false
    if (!isVisible(el)) return false
    if (isOversized(el)) return false
    return true
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

function screenOrientationAngle(): number {
  if (typeof screen.orientation?.angle === 'number') {
    return screen.orientation.angle
  }
  return (window.orientation as number | undefined) || 0
}

/**
 * Map device tilt to a gravity vector of roughly constant strength so pieces
 * always fall “down” relative to the real world (not drift with weak tilt).
 */
function orientationToGravity(
  beta: number | null,
  gamma: number | null,
): { x: number; y: number } {
  if (beta == null || gamma == null) {
    return { x: 0, y: DEFAULT_GRAVITY }
  }

  // Compensate for landscape/portrait so “down” matches the screen.
  const angle = screenOrientationAngle()
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

  let gx = Math.sin((x * Math.PI) / 180)
  let gy = Math.sin((y * Math.PI) / 180)
  const len = Math.hypot(gx, gy)

  // Phone lying flat: almost no in-plane gravity — keep a light downward pull
  // so pieces settle instead of floating mid-air.
  if (len < 0.15) {
    return { x: 0, y: DEFAULT_GRAVITY * 0.4 }
  }

  return {
    x: (gx / len) * DEFAULT_GRAVITY,
    y: (gy / len) * DEFAULT_GRAVITY,
  }
}

/**
 * Desktop fallback: keep real downward gravity and only tilt left/right with
 * the cursor. Mapping both axes to the cursor made pieces slide around instead
 * of falling.
 */
function mouseToGravity(clientX: number, _clientY: number): { x: number; y: number } {
  const cx = window.innerWidth / 2
  const tilt = Math.max(-1, Math.min(1, (clientX - cx) / cx))
  return {
    x: tilt * 0.9,
    y: DEFAULT_GRAVITY,
  }
}

/**
 * Turns visible page content into Matter.js bodies that fall with gravity.
 * Device orientation steers gravity when available; otherwise the mouse does.
 */
export function startBreakSite(options: BreakSiteOptions = {}): BreakSiteController {
  const engine = Engine.create({
    // Sleeping bodies ignore gravity changes — disable so tilt keeps working
    // after pieces settle on the floor.
    enableSleeping: false,
    gravity: { x: 0, y: DEFAULT_GRAVITY, scale: 0.0015 },
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
    // Slightly shrink the collider so stacked hero text doesn't explode apart
    // when Matter resolves the initial overlaps.
    const bodyW = Math.max(w * 0.9, 6)
    const bodyH = Math.max(h * 0.9, 6)
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

    const body = Bodies.rectangle(x, y, bodyW, bodyH, {
      restitution: 0.15,
      friction: 0.4,
      frictionAir: 0.02,
      density: 0.002,
      slop: 0.05,
    })
    // Soft downward start — avoid random kicks that look like sideways sliding.
    Body.setVelocity(body, { x: 0, y: 1.2 })
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03)

    tracked.push({ el, width: w, height: h, body, original })
    Composite.add(world, body)
  }

  // Bleed off the violent separation impulse Matter applies to overlapping bodies
  // for the first few frames so the break reads as a fall, not an explosion.
  let settleFrames = 0
  const dampOverlapExplosion = () => {
    if (settleFrames++ > 20) {
      Events.off(engine, 'beforeUpdate', dampOverlapExplosion)
      return
    }
    for (const { body } of tracked) {
      Body.setVelocity(body, {
        x: body.velocity.x * 0.25,
        y: Math.max(body.velocity.y, 0.8),
      })
      Body.setAngularVelocity(body, body.angularVelocity * 0.4)
    }
  }
  Events.on(engine, 'beforeUpdate', dampOverlapExplosion)

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
  // Let the initial collapse finish before mouse tilt kicks in.
  let mouseTiltEnabled = false
  const mouseTiltDelay = window.setTimeout(() => {
    mouseTiltEnabled = true
  }, 900)

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
    if (usingOrientation || !mouseTiltEnabled) return
    const g = mouseToGravity(event.clientX, event.clientY)
    engine.gravity.x = g.x
    engine.gravity.y = g.y
  }

  window.addEventListener('mousemove', onMouseMove)
  if (canUseDeviceOrientation()) {
    window.addEventListener('deviceorientation', onOrientation)
  }

  const previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  document.documentElement.classList.add('site-broken')

  Runner.run(runner, engine)

  let stopped = false

  return {
    stop() {
      if (stopped) return
      stopped = true

      window.clearTimeout(mouseTiltDelay)
      Runner.stop(runner)
      Events.off(engine, 'beforeUpdate', dampOverlapExplosion)
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
