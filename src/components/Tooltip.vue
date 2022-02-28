<template>
  <div ref="fbxTooltipTrigger">
    <slot></slot>
  </div>

  <div ref="fbxTooltip" class="fbx-tooltip">
    <div class="tooltip-arrow"></div>
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    trigger: { type: String, default: 'hover' }, // manual,click,hover
    visible: Boolean,
    text: String,
  },
  data() {
    return {
      style: '',
    }
  },
  watch: {
    visible(visible) {
      if (visible) {
        this._show()
      } else {
        this._hide()
      }
    },
  },
  methods: {
    toast() {
      this._show()

      clearTimeout(this._autoTimeout)
      this._autoTimeout = setTimeout(() => this._hide(), 1500)
    },

    _show() {
      if (!this.text || this._visible) return

      const tooltip = this._tooltip
      const tooltipRect = tooltip._rect || {}
      const triggerRect = this._getElemRect(this._trigger)

      Object.assign(tooltip.style, {
        top: `${triggerRect.top - tooltipRect.height - 5}px`,
        left: `${triggerRect.left - tooltipRect.width / 2 + triggerRect.width / 2}px`,
      })

      document.body.appendChild(tooltip)

      clearTimeout(this._timeout)
      this._timeout = setTimeout(() => {
        Object.assign(tooltip.style, {
          opacity: 1,
          transform: 'none',
        })
      }, 0)

      this._visible = true
    },
    _hide() {
      if (!this._visible) return
      this._visible = false

      const tooltip = this._tooltip
      Object.assign(tooltip.style, {
        opacity: 0,
        transform: '',
      })

      clearTimeout(this._timeout)
      this._timeout = setTimeout(() => {
        tooltip.remove()
      }, 500)
    },

    _getElemRect(elem) {
      if (elem && elem._rect) return elem._rect

