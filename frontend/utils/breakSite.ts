import Matter from 'matter-js'

const {
  Engine,
  Runner,
  Bodies,
  Body,
  Composite,
  Mouse,
  MouseConstraint,
  Events,
} = Matter

/** Mid-level cards/panels that should fall as whole chunks on long pages. */
const CHUNK_SELECTOR = [
  '.info-block',
  '.experience',
  '.more-info-block',
  '.contact-cta',
  '.greeting',
  '.hello-text',
  '.p-title',
  '.p-text',
  '.project-return',
].join(', ')

/** Leaf content used when nothing wraps it in a chunk. */
const LEAF_SELECTOR = [
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
const LAYER_ATTR = 'data-break-site-layer'

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
  /** Physics/DOM node living in the overlay (a clone — Vue keeps the original). */
  el: HTMLElement
  /** Original page node, hidden while broken. */
  source: HTMLElement
  width: number
  height: number
  body: Matter.Body
  previousVisibility: string
  previousPointerEvents: string
}

function isVisible(el: HTMLElement): boolean {
  const style = window.getComputedStyle(el)
  if (style.display === 'none' || style.visibility === 'hidden') return false
  if (style.opacity === '0') return false
  const rect = el.getBoundingClientRect()
  if (rect.width <= 4 || rect.height <= 4) return false
  // Only break what you can see — off-screen pieces would spawn outside the walls.
  return (
    rect.bottom > 0 &&
    rect.top < window.innerHeight &&
    rect.right > 0 &&
    rect.left < window.innerWidth
  )
}

/**
 * Full-bleed logos / heroes make terrible rigid bodies and block everything else.
 * Only apply this to media — content cards on long pages are allowed to be large.
 */
function isOversizedMedia(el: HTMLElement): boolean {
  if (el.tagName !== 'IMG' && el.tagName !== 'VIDEO' && el.tagName !== 'CANVAS') {
    return false
  }
  const rect = el.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight
  const areaRatio = (rect.width * rect.height) / (vw * vh)
  return areaRatio > 0.35 || (rect.width > vw * 0.7 && rect.height > vh * 0.5)
}

function isBreakUi(el: Element): boolean {
  return Boolean(
    el.closest('[data-break-site-ui]') || el.closest(`[${LAYER_ATTR}]`),
  )
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
  const chunks = Array.from(
    document.querySelectorAll<HTMLElement>(CHUNK_SELECTOR),
  ).filter((el) => {
    if (isBreakUi(el)) return false
    if (!isVisible(el)) return false
    return true
  })

  // Prefer outer chunks when one chunk wraps another.
  const topChunks = chunks.filter(
    (el) => !chunks.some((other) => other !== el && other.contains(el)),
  )

  const leaves = Array.from(
    document.querySelectorAll<HTMLElement>(LEAF_SELECTOR),
  ).filter((el) => {
    if (isBreakUi(el)) return false
    if (!isVisible(el)) return false
    if (isOversizedMedia(el)) return false
    // Skip leaves already covered by a falling chunk.
    if (topChunks.some((chunk) => chunk.contains(el))) return false
    return true
  })

  const topLeaves = leaves.filter(
    (el) => !leaves.some((other) => other !== el && other.contains(el)),
  )

  return [...topChunks, ...topLeaves]
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

  const gx = Math.sin((x * Math.PI) / 180)
  const gy = Math.sin((y * Math.PI) / 180)
  const len = Math.hypot(gx, gy)

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

function createPhysicsLayer(): HTMLDivElement {
  const layer = document.createElement('div')
  layer.setAttribute(LAYER_ATTR, '')
  // pointer-events none on the layer so the teleported Fix button stays clickable;
  // children re-enable hits for dragging.
  layer.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:30',
    'overflow:hidden',
    'pointer-events:none',
  ].join(';')
  document.body.appendChild(layer)
  return layer
}

/**
 * Turns visible page content into Matter.js bodies that fall with gravity.
 * Device orientation steers gravity when available; otherwise the mouse does.
 *
 * Elements are reparented into a viewport-fixed layer so ancestor `transform`
 * / `overflow` (parallax cards, clipped sections) cannot trap `position:fixed`.
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
  const layer = createPhysicsLayer()

  const width = window.innerWidth
  const height = window.innerHeight

  const walls = [
    Bodies.rectangle(
      width / 2,
      -WALL_THICKNESS / 2,
      width + WALL_THICKNESS * 2,
      WALL_THICKNESS,
      { isStatic: true },
    ),
    Bodies.rectangle(
      width / 2,
      height + WALL_THICKNESS / 2,
      width + WALL_THICKNESS * 2,
      WALL_THICKNESS,
      { isStatic: true },
    ),
    Bodies.rectangle(
      -WALL_THICKNESS / 2,
      height / 2,
      WALL_THICKNESS,
      height + WALL_THICKNESS * 2,
      { isStatic: true },
    ),
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

  for (const source of elements) {
    // Measure the live node, then clone it into the overlay. Reparenting Vue-managed
    // nodes fails — the next patch yanks them back into overflow/transform cages.
    const rect = source.getBoundingClientRect()
    const w = Math.max(rect.width, 8)
    const h = Math.max(rect.height, 8)
    const bodyW = Math.max(w * 0.92, 6)
    const bodyH = Math.max(h * 0.92, 6)
    const x = rect.left + w / 2
    const y = rect.top + h / 2

    const el = source.cloneNode(true) as HTMLElement
    el.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'))
    el.removeAttribute('id')

    el.style.position = 'absolute'
    el.style.left = `${rect.left}px`
    el.style.top = `${rect.top}px`
    el.style.width = `${w}px`
    el.style.height = `${h}px`
    el.style.maxWidth = 'none'
    el.style.margin = '0'
    el.style.transform = 'none'
    el.style.transformOrigin = 'center center'
    el.style.zIndex = '1'
    el.style.pointerEvents = 'auto'
    layer.appendChild(el)

    const previousVisibility = source.style.visibility
    const previousPointerEvents = source.style.pointerEvents
    source.style.visibility = 'hidden'
    source.style.pointerEvents = 'none'

    const body = Bodies.rectangle(x, y, bodyW, bodyH, {
      restitution: 0.15,
      friction: 0.4,
      frictionAir: 0.02,
      density: 0.002,
      slop: 0.05,
    })
    Body.setVelocity(body, { x: 0, y: 1.2 })
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03)

    tracked.push({
      el,
      source,
      width: w,
      height: h,
      body,
      previousVisibility,
      previousPointerEvents,
    })
    Composite.add(world, body)
  }

  // Bleed off the violent separation impulse Matter applies to overlapping bodies.
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

  // Mouse on document.body so hits work even though the layer is pointer-events:none
  // (children re-enable hits). Capture-phase guard keeps the Fix button usable.
  const mouse = Mouse.create(document.body)
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.15,
      render: { visible: false },
    },
  })
  Composite.add(world, mouseConstraint)

  mouse.element.removeEventListener('mousewheel', (mouse as any).mousewheel)
  mouse.element.removeEventListener('DOMMouseScroll', (mouse as any).mousewheel)

  const ignoreBreakUiPointer = (event: Event) => {
    const target = event.target as Element | null
    if (target?.closest?.('[data-break-site-ui]')) {
      event.stopImmediatePropagation()
    }
  }
  document.body.addEventListener('mousedown', ignoreBreakUiPointer, true)
  document.body.addEventListener('mouseup', ignoreBreakUiPointer, true)
  document.body.addEventListener('touchstart', ignoreBreakUiPointer, true)
  document.body.addEventListener('touchend', ignoreBreakUiPointer, true)

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
  let mouseTiltEnabled = false
  const mouseTiltDelay = window.setTimeout(() => {
    mouseTiltEnabled = true
  }, 900)

  const onOrientation = (event: DeviceOrientationEvent) => {
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

  const putBack = (item: TrackedElement) => {
    item.source.style.visibility = item.previousVisibility
    item.source.style.pointerEvents = item.previousPointerEvents
    item.el.remove()
  }

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
      document.body.removeEventListener('mousedown', ignoreBreakUiPointer, true)
      document.body.removeEventListener('mouseup', ignoreBreakUiPointer, true)
      document.body.removeEventListener('touchstart', ignoreBreakUiPointer, true)
      document.body.removeEventListener('touchend', ignoreBreakUiPointer, true)
      Composite.clear(world, false, true)
      Engine.clear(engine)

      for (const item of tracked) {
        putBack(item)
      }
      layer.remove()

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
