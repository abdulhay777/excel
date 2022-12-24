import {$} from "@/core/dom"

export function tableResize($root, event) {
  let value
  const $target = $(event.target)
  const $parent = $target.closest('[data-type="resizeble"]')
  const coords = $parent.getCoords()
  const type = $target.data.resize
  if (type == 'col') {
    $target.css({
      opacity: 1,
      bottom: `-${$root.$el.clientHeight - 24}px`
    })
  } else {
    $target.css({
      opacity: 1,
      right: `-${$root.$el.clientWidth - 24}px`
    })
  }
  document.onmousemove = e => {
    if (type == 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $target.css({
        right: -delta + 'px'
      })
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $target.css({
        bottom: -delta + 'px'
      })
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type == 'col') {
      $parent.css({with: value + 'px'})
      $root.findAll(`[data-col="${$parent.data.col}"]`)
        .forEach(el => el.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }

    $target.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}