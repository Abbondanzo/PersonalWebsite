<template>
  <div data-break-site-ui class="break-site" :class="{ broken: isBroken }">
    <button
      type="button"
      class="break-site__btn"
      :title="isBroken ? 'Put everything back' : 'Knock the page over'"
      @click="toggle"
    >
      {{ isBroken ? 'Fix this site' : 'Break this site' }}
    </button>
    <p v-if="isBroken && hint" class="break-site__hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import {
  requestOrientationPermission,
  startBreakSite,
  type BreakSiteController,
} from '~/utils/breakSite'

const isBroken = ref(false)
const hint = ref('')
let controller: BreakSiteController | null = null

const clearController = () => {
  controller?.stop()
  controller = null
}

const toggle = async () => {
  if (isBroken.value) {
    // A full reload is the honest “fix” — layout and parallax state are messy after a break.
    window.location.reload()
    return
  }

  await requestOrientationPermission()
  controller = startBreakSite({
    onOrientation: () => {
      hint.value = 'Tilt your device — gravity follows the gyro.'
    },
  })
  isBroken.value = true
  hint.value = 'Move your mouse to tilt gravity. On a phone, tilt the device.'
}

onBeforeUnmount(() => {
  clearController()
})
</script>

<script lang="ts">
export default {
  name: 'BreakSite',
}
</script>

<style lang="scss" scoped>
.break-site {
  position: fixed;
  z-index: 10000;
  left: 16px;
  bottom: 16px;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  max-width: min(280px, calc(100vw - 32px));

  &.broken {
    .break-site__btn {
      border-color: #fff;
      color: #fff;
      background: rgba(42, 42, 42, 0.55);

      &::before {
        background: #fff;
      }

      &:hover {
        color: $primary;
      }
    }
  }
}

.break-site__btn {
  pointer-events: all;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: 2px solid rgba(255, 255, 255, 0.7);
  color: #fff;
  background: rgba(42, 42, 42, 0.35);
  padding: 0.6em 1.2em;
  min-width: 0;
  min-height: 0;
  cursor: pointer;
  position: relative;
  z-index: 0;
  backdrop-filter: blur(4px);
  transition: color $anim * 2 $ease-out-quint, border-color $anim * 2 $ease-out-quint;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    right: 100%;
    background: #fff;
    z-index: -1;
    transition: right $anim * 2 $ease-out-quint;
  }

  &:hover {
    color: $primary;
    border-color: #fff;

    &::before {
      right: 0;
    }
  }
}

.break-site__hint {
  pointer-events: none;
  margin: 0;
  padding: 6px 10px;
  font-size: 12px;
  line-height: 1.4;
  color: #fff;
  background: rgba(42, 42, 42, 0.55);
  backdrop-filter: blur(4px);
  cursor: default;
}

@media screen and (max-width: 960px) {
  .break-site {
    // Keep clear of the mobile menu hamburger (top-right).
    left: 12px;
    bottom: 12px;
  }
}
</style>
