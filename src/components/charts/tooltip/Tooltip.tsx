function Tooltip(params, ticket, callback) {
  console.log('params', params)
  let htmlStr = ''
  htmlStr += `<div class="echarts-tooltip-formatter">
  <div class="echarts-tooltip-title">${params[0].name}</div>
  <div class="echarts-tooltip-main">`
  let marker = ''
  for (let i = 0; i < params.length; i++) {
    let _value = params[i],
      _marker = ''
    if (_value.seriesType === 'line') {
      marker = `<span style="display:inline-block;margin-right:4px;border-radius:0px;width:10px;height:4px;background-color:${_value.color}"></span>`
    } else {
      marker = _value.marker
    }
    htmlStr += `<div class="item">
    <div class="left">
    ${marker}
      <div class="text">${_value.seriesName}</div>
    </div>
    <div class="right">${_value.value}</div>
  </div>`
  }

  htmlStr += `</div></div>`

  return htmlStr
}

export default Tooltip
