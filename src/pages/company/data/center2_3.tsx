import { LinearGradient } from '@/components/charts/common/LinearGradient'

function Tooltip(params, ticket, callback) {
  let htmlStr = ''
  htmlStr += `<div class="echarts-tooltip-formatter">
  <div class="echarts-tooltip-title">${params[0].name}</div>
  <div class="echarts-tooltip-main">`
  let marker = ''
  for (let i = 0; i < params.length; i++) {
    const _value = params[i]
    if (_value.seriesType === 'line') {
      marker = `<span style="display:inline-block;margin-right:4px;border-radius:0px;width:10px;height:2px;background-color:${_value.color}"></span>`
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

export const DefaultOption = {
  tooltip: {
    show: true,
    formatter: Tooltip,
    trigger: 'axis',
    borderWidth: 0,
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  dataZoom: [
    {
      type: 'inside',
      startValue: 0,
      endValue: 6,
      zoomOnMouseWheel: false,
    },
  ],
  xAxis: [
    {
      type: 'category',
      data: [],
      axisPointer: {
        type: 'shadow',
      },
      // name: '%',
      nameTextStyle: {
        color: '#D4E0FF',
      },
      axisLabel: {
        color: '#D4E0FF',
        interval: 0,
        rotate: '45',
        fontSize: 14,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#5A657E',
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '百万',
      nameTextStyle: {
        align: 'right',
        color: '#93A3C6',
        padding: [-20, 5, 0, 0],
      },
      // min: 0,
      // max: 300,
      // interval: 50,
      axisLabel: {
        color: '#93A3C6',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#5A657E',
        },
      },
    },
  ],
  series: [
    {
      name: '毛收入',
      type: 'bar',
      barWidth: 6,
      emphasis: {
        focus: 'series',
      },
      data: [],
      itemStyle: {
        barBorderRadius: [30, 30, 0, 0],
        color: LinearGradient('rgba(30,182,222,1)', 'rgba(20,75,149,0.59)'),
      },
      label: {
        show: true,
        position: 'top',
        color: '#ffffff',
        formatter: (value: any, index: any) => {
          if (
            value.value === '' ||
            value.value === '0' ||
            value.value === '0.00' ||
            value.value === 0
          ) {
            return ''
          }
        },
      },
    },
  ],
}
