import {DomListener} from "@core/DomListener"

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emitter = options.emitter
    this.unsub = []
    this.prepare()
  }
  toHTML() {
    return ''
  }
  prepare() {}
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsub.push(unsub)
  }
  init() {
    this.initDOMListeners()
  }
  destroy() {
    this.unsub.forEach(e => e())
    this.removeDOMListeners()
  }
}