const CODES = {
  A: 65,
  Z: 90
}

function createCell(row) {
  return function(_, index) {
    return `
      <div class="cell" contenteditable data-col="${index}" data-type="cell" data-id="${row}:${index}"></div>
    `
  }
}

function createCol(col, index) {
  return `
    <div class="column" data-type="resizeble" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizeble">
      <div class="row-info">
        ${index || ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createCol)
    .join('')
  rows.push(createRow(null, cols))
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell(i))
      .join('')
    rows.push(createRow(i + 1, cells))
  }
  return rows.join('')
}