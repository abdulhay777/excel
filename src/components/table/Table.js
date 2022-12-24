import {ExcelComponent} from "@core/ExcelComponent"
import {createTable} from "@/components/table/table.template"
import {tableResize} from "./table.resize"

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
      tableResize(this.$root, event)
    }
  }
}