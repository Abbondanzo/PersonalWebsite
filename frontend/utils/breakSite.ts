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

/** Mid-level cards/panels that should fall as whole chunks on long pages.
 *  Tall ones are skipped as bodies but still hidden as abandoned shells. */
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
  '.contact-form',
  '.text-block',
  '.project-list',
  '.popup',
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
  'input',
  'textarea',
  '.input',
  '.nav-links a',
  '.mobile-links a',
  '.btn',
].join(', ')

const WALL_THICKNESS = 200
const DEFAULT_GRAVITY = 1
const LAYER_ATTR = 'data-break-site-layer'
const WALL_CATEGORY = 0x0001
const PIECE_CATEGORY = 0x0002

export type BreakSiteOptions = {
  /** Fired once when the first deviceorientation event arrives. */
  onOrientation?: () => void
}

export type BreakSiteController = {
  stop: () => void
}

type TrackedElement = {
  /** Physics/DOM node living in the overlay (a clone — Vue keeps the original). */
  el: HTMLElement
  /** Original page node, hidden while broken. */
  source: HTMLElement
  width: number
  height: number
  body: Matter.Body
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
    // Giant About/project panels fill the viewport when they hit the floor and
    // look “stuck mid-page”. Break their inner leaves instead and hide the shell.
    if (el.getBoundingClientRect().height > window.innerHeight * 0.4) return false
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

/** Hide oversized section shells whose children are falling as leaves. */
function hideAbandonedShells(falling: HTMLElement[]): HTMLElement[] {
  const shells: HTMLElement[] = []
  for (const el of document.querySelectorAll<HTMLElement>(CHUNK_SELECTOR)) {
    if (isBreakUi(el)) continue
    if (!isVisible(el)) continue
    if (falling.some((piece) => piece === el)) continue
    // Shell owns at least one falling leaf.
    if (!falling.some((piece) => el.contains(piece))) continue
    shells.push(el)
  }
  return shells
}

/** Visual CSS properties (kebab-case) baked onto clones so parent-scoped rules stick. */
const FROZEN_STYLE_PROPS = [
  'color',
  'background-color',
  'background-image',
  'background-size',
  'background-position',
  'background-repeat',
  'background-clip',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',
  'border-top-style',
  'border-right-style',
  'border-bottom-style',
  'border-left-style',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-right-radius',
  'border-bottom-left-radius',
  'box-shadow',
  'text-shadow',
  'opacity',
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'font-variant',
  'line-height',
  'letter-spacing',
  'word-spacing',
  'text-align',
  'text-transform',
  'text-decoration',
  'text-decoration-color',
  'text-decoration-line',
  'text-decoration-style',
  'white-space',
  'filter',
  '-webkit-filter',
  '-webkit-text-fill-color',
  '-webkit-background-clip',
  'mix-blend-mode',
  'fill',
  'stroke',
  'stroke-width',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'display',
  'align-items',
  'justify-content',
  'flex-direction',
  'gap',
  'object-fit',
  'vertical-align',
] as const

/** Props that site CSS often sets with !important (autofill, fills) — mirror that. */
const IMPORTANT_FROZEN_PROPS = new Set([
  '-webkit-text-fill-color',
  'filter',
  '-webkit-filter',
  'box-shadow',
  '-webkit-box-shadow',
])

function isTransparentColor(value: string): boolean {
  const v = value.trim().toLowerCase()
  return (
    !v ||
    v === 'transparent' ||
    v === 'rgba(0, 0, 0, 0)' ||
    v === 'rgba(0,0,0,0)'
  )
}

/**
 * When a leaf is ripped out of a painted panel (`.experience`, `.contact-form`,
 * `.text-block`), keep that panel color on the falling piece so dark text does
 * not suddenly sit naked on the photo.
 */
function paintedAncestorBackground(el: HTMLElement): string | null {
  let node: HTMLElement | null = el.parentElement
  while (node && node !== document.documentElement && node !== document.body) {
    const style = window.getComputedStyle(node)
    const bg = style.backgroundColor
    if (!isTransparentColor(bg)) return bg
    const image = style.backgroundImage
    if (image && image !== 'none') {
      // Solid color is enough for panels; images are rare on shells we abandon.
      return bg && !isTransparentColor(bg) ? bg : null
    }
    node = node.parentElement
  }
  return null
}

/**
 * Copy computed appearance from a live in-DOM node tree onto its clone.
 * Clones leave parent selectors (e.g. `.experience h3 { color: #fff }`), so
 * without this white-on-olive text becomes black-on-transparent mid-fall.
 */
function freezeAppearance(sourceRoot: HTMLElement, cloneRoot: HTMLElement) {
  const sources = [sourceRoot, ...sourceRoot.querySelectorAll<Element>('*')]
  const clones = [cloneRoot, ...cloneRoot.querySelectorAll<Element>('*')]
  const count = Math.min(sources.length, clones.length)

  for (let i = 0; i < count; i++) {
    const source = sources[i]
    const clone = clones[i] as HTMLElement | SVGElement
    if (!clone || !('style' in clone)) continue

    const computed = window.getComputedStyle(source)
    for (const prop of FROZEN_STYLE_PROPS) {
      const value = computed.getPropertyValue(prop)
      if (!value) continue
      try {
        const priority = IMPORTANT_FROZEN_PROPS.has(prop) ? 'important' : ''
        clone.style.setProperty(prop, value, priority)
      } catch {
        // Some SVG presentation attrs reject setProperty — ignore quietly.
      }
    }

    // Kill transitions so baked filter/color/opacity do not animate mid-fall.
    try {
      clone.style.setProperty('transition', 'none', 'important')
    } catch {
      /* ignore */
    }
  }

  // If the piece itself is transparent, inherit the nearest opaque panel fill.
  const rootComputed = window.getComputedStyle(sourceRoot)
  if (isTransparentColor(rootComputed.backgroundColor)) {
    const inherited = paintedAncestorBackground(sourceRoot)
    if (inherited) {
      cloneRoot.style.setProperty('background-color', inherited, 'important')
    }
  }
}

const BREAK_HIDDEN_ATTR = 'data-break-hidden'

function hideBrokenSource(el: HTMLElement) {
  // Attribute + stylesheet beat Vue class transitions that ignore inline visibility.
  el.setAttribute(BREAK_HIDDEN_ATTR, '')
  el.style.pointerEvents = 'none'
}

function showBrokenSource(el: HTMLElement) {
  el.removeAttribute(BREAK_HIDDEN_ATTR)
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
      {
        isStatic: true,
        collisionFilter: { category: WALL_CATEGORY, mask: PIECE_CATEGORY },
      },
    ),
    Bodies.rectangle(
      width / 2,
      height + WALL_THICKNESS / 2,
      width + WALL_THICKNESS * 2,
      WALL_THICKNESS,
      {
        isStatic: true,
        collisionFilter: { category: WALL_CATEGORY, mask: PIECE_CATEGORY },
      },
    ),
    Bodies.rectangle(
      -WALL_THICKNESS / 2,
      height / 2,
      WALL_THICKNESS,
      height + WALL_THICKNESS * 2,
      {
        isStatic: true,
        collisionFilter: { category: WALL_CATEGORY, mask: PIECE_CATEGORY },
      },
    ),
    Bodies.rectangle(
      width + WALL_THICKNESS / 2,
      height / 2,
      WALL_THICKNESS,
      height + WALL_THICKNESS * 2,
      {
        isStatic: true,
        collisionFilter: { category: WALL_CATEGORY, mask: PIECE_CATEGORY },
      },
    ),
  ]
  Composite.add(world, walls)

  const tracked: TrackedElement[] = []
  const elements = getBreakableElements()
  // Resolve shells now, but hide them only after freezing piece styles so
  // parent selectors (e.g. `.experience h3`) still resolve while we bake.
  const abandonedShellEls = hideAbandonedShells(elements)

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

    // Bake computed colors/fonts/borders while the source is still in-tree.
    freezeAppearance(source, el)

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

    const previousPointerEvents = source.style.pointerEvents
    hideBrokenSource(source)

    const body = Bodies.rectangle(x, y, bodyW, bodyH, {
      restitution: 0.15,
      friction: 0.4,
      frictionAir: 0.02,
      density: 0.002,
      slop: 0.05,
      // Fall through other pieces at first so stacked About cards do not explode
      // apart — collide with walls only until the drop settles.
      collisionFilter: { category: PIECE_CATEGORY, mask: WALL_CATEGORY },
    })
    Body.setVelocity(body, { x: 0, y: 2 })
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03)

    tracked.push({
      el,
      source,
      width: w,
      height: h,
      body,
      previousPointerEvents,
    })
    Composite.add(world, body)
  }

  const abandonedShells = abandonedShellEls.map((el) => {
    const previousPointerEvents = el.style.pointerEvents
    hideBrokenSource(el)
    return { el, previousPointerEvents }
  })

  // About cards heavily overlap in the layout. Leave piece-piece collisions off
  // so they fall through each other onto the floor instead of detonating apart.
  // Walls still catch them; the mouse constraint can still fling individual pieces.

  // Mouse on document.body so hits work even though the layer is pointer-events:none
  // (children re-enable hits). Capture-phase guard keeps Fix + real links usable —
  // Matter’s mouse otherwise swallows mousedown and kills <a> navigation.
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

  let pointerDown: { x: number; y: number } | null = null
  let pointerDragged = false

  const isFixUi = (target: Element | null) =>
    Boolean(target?.closest?.('[data-break-site-ui]'))

  const linkFromEvent = (target: Element | null) =>
    target?.closest?.('a[href]') as HTMLAnchorElement | null

  const ignoreMatterOnInteractive = (event: Event) => {
    const target = event.target as Element | null
    if (isFixUi(target)) {
      event.stopImmediatePropagation()
      return
    }
    // Let anchors get a real click instead of starting a physics drag.
    if (
      (event.type === 'mousedown' || event.type === 'touchstart') &&
      linkFromEvent(target)
    ) {
      event.stopImmediatePropagation()
    }
  }

  const onPointerDownTrack = (event: PointerEvent) => {
    pointerDown = { x: event.clientX, y: event.clientY }
    pointerDragged = false
  }

  const onPointerMoveTrack = (event: PointerEvent) => {
    if (!pointerDown || pointerDragged) return
    const dx = event.clientX - pointerDown.x
    const dy = event.clientY - pointerDown.y
    if (dx * dx + dy * dy > 64) pointerDragged = true
  }

  const onLinkClick = (event: MouseEvent) => {
    if (pointerDragged) return
    const anchor = linkFromEvent(event.target as Element | null)
    if (!anchor || isFixUi(anchor)) return
    // Only handle clicks on physics clones (Vue listeners were lost on cloneNode).
    if (!anchor.closest(`[${LAYER_ATTR}]`)) return

    const href = anchor.getAttribute('href')
    if (!href || href.startsWith('#')) return

    event.preventDefault()
    event.stopPropagation()
    // Full navigation clears the broken state cleanly.
    window.location.assign(anchor.href)
  }

  document.body.addEventListener('mousedown', ignoreMatterOnInteractive, true)
  document.body.addEventListener('mouseup', ignoreMatterOnInteractive, true)
  document.body.addEventListener('touchstart', ignoreMatterOnInteractive, true)
  document.body.addEventListener('touchend', ignoreMatterOnInteractive, true)
  document.body.addEventListener('pointerdown', onPointerDownTrack, true)
  document.body.addEventListener('pointermove', onPointerMoveTrack, true)
  document.body.addEventListener('click', onLinkClick, true)

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
    showBrokenSource(item.source)
    item.source.style.pointerEvents = item.previousPointerEvents
    item.el.remove()
  }

  return {
    stop() {
      if (stopped) return
      stopped = true

      window.clearTimeout(mouseTiltDelay)
      Runner.stop(runner)
      Events.off(engine, 'afterUpdate', syncDom)
      window.removeEventListener('deviceorientation', onOrientation)
      window.removeEventListener('mousemove', onMouseMove)
      document.body.removeEventListener('mousedown', ignoreMatterOnInteractive, true)
      document.body.removeEventListener('mouseup', ignoreMatterOnInteractive, true)
      document.body.removeEventListener('touchstart', ignoreMatterOnInteractive, true)
      document.body.removeEventListener('touchend', ignoreMatterOnInteractive, true)
      document.body.removeEventListener('pointerdown', onPointerDownTrack, true)
      document.body.removeEventListener('pointermove', onPointerMoveTrack, true)
      document.body.removeEventListener('click', onLinkClick, true)
      Composite.clear(world, false, true)
      Engine.clear(engine)

      for (const item of tracked) {
        putBack(item)
      }
      for (const shell of abandonedShells) {
        showBrokenSource(shell.el)
        shell.el.style.pointerEvents = shell.previousPointerEvents
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
