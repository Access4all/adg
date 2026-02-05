'use strict'

/*
 * Tabs (Manual Activation)
 * WAI-ARIA Authoring Practices compliant
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */

class TabList {
  constructor(tablist) {
    this.tablist = tablist

    this.tabs = [...tablist.querySelectorAll('[role="tab"]')]

    this.panels = this.tabs.map(tab =>
      document.getElementById(tab.getAttribute('aria-controls'))
    )

    this.init()
  }

  init() {
    this.tabs.forEach((tab, i) => {
      tab.tabIndex = -1
      tab.setAttribute('aria-selected', 'false')

      tab.addEventListener('click', () => this.activate(i))
      tab.addEventListener('keydown', e => this.onKey(e, i))
    })

    this.activate(0, false)
  }

  activate(i, focus = true) {
    this.tabs.forEach((tab, n) => {
      const active = i === n

      tab.tabIndex = active ? 0 : -1
      tab.setAttribute('aria-selected', active)

      this.panels[n].toggleAttribute('hidden', !active)
    })

    if (focus) this.tabs[i].focus()
  }

  focus(i) {
    const max = this.tabs.length - 1

    if (i < 0) i = max
    if (i > max) i = 0

    this.tabs[i].focus()
  }

  onKey(e, i) {
    const keys = {
      ArrowLeft: () => this.focus(i - 1),
      ArrowRight: () => this.focus(i + 1),
      Home: () => this.focus(0),
      End: () => this.focus(this.tabs.length - 1),
      Enter: () => this.activate(i),
      ' ': () => this.activate(i)
    }

    if (!keys[e.key]) return

    keys[e.key]()
    e.preventDefault()
  }
}

/* Init */

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[role="tablist"]').forEach(el => new TabList(el))
})
