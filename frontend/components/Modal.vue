<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header" style="padding: 0">
            <slot name="header" />
          </div>

          <div class="modal-body">
            <slot name="body" />
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineSlots<{
  header(): any
  body(): any
  footer(): any
}>()
defineEmits<{ close: [] }>()
</script>

<script lang="ts">
export default {
  name: 'Modal',
}
</script>

<style lang="scss" scoped>
@use 'sass:math';

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: $padding;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: 'Montserrat', sans-serif;
}

@media screen and (max-width: 400px) {
  .modal-container {
    width: 100%;
    padding: math.div($padding, 4);
  }
  .modal-default-button {
    float: right;
    min-height: 20px;
    min-width: 100%;
  }
}

.modal-header h2 {
  padding-bottom: 10px;
  margin-top: 0;
  color: #42b983;
}

.modal-header h3 {
  margin-top: 0;
  font-size: 32px;
  color: $textcolor1;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-footer {
  overflow: auto;
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*/

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
