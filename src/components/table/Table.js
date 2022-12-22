import {ExcelComponent} from "@core/ExcelComponent"
import {createTable} from "@/components/table/table.template"
import {$} from "@/core/dom"

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mouseup', 'mousemove', 'mousedown']
    })
  }
  toHTML() {
    return createTable(20)
  }
  onMouseup() {

  }
  onMousemove() {

  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $target = $(event.target)
      const $parent = $target.closest('[data-type="resizeble"]')
      const coords = $parent.getCoords()
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
      document.onmousemove = e => {
        const delta = e.pageX - coords.right
        const value = coords.width + delta
        $parent.$el.style.width = value + 'px'
        cells.forEach(el => el.style.width = value + 'px')
      }
      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}