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
    <div class="right">${_value.value + (i === 1 ? '%' : '')}</div>
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
  },
  dataZoom: [
    {
      type: 'inside',
      startValue: 0,
      endValue: 6,
      zoomOnMouseWheel: false,
    },
  ],
  legend: {
    top: 10,
    right: 15,
    itemGap: 10,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      fontSize: 14,
      color: '#ffffff',
    },
    selectedMode: true,
    inactiveColor: '#8694B4',
    data: [
      { name: '毛收入', icon: 'rect' },
      {
        name: '运行率',
        icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHqADAAQAAAABAAAAHgAAAADKQTcFAAAAqklEQVRIDe2SMQ7CMBAE7yzEHyiokxdR8o1QoYiOb6TMi6BOkT9QZGELS7abSCZFinXjc06ejcc205ABGZABGdi7AU9/EGN/fE+vB+BXAKe0V1u7++yOoTm3d7/0n8g5xIIzQ5fFOjOkn/+qeQDAuh+bnFuEhVhw5knT9ZZ1yc6CtwxaY2XBvIu1DbX9kp0F8wGEYE8+iNqAch9ZZJJd9rSWARmQARnYt4Ev0lkr73jW1s0AAAAASUVORK5CYII=',
      },
    ],
  }, // 设置显示图例，非必选
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
    {
      type: 'value',
      name: '%',
      // max: 100,
      // interval: 5,
      nameTextStyle: {
        align: 'left',
        color: '#93A3C6',
        padding: [0, 0, 0, 10],
      },
      axisLabel: {
        color: '#93A3C6',
      },
      splitLine: {
        show: false,
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
        color: LinearGradient('rgba(30,182,222,1)', 'rgba(20,75,149,0.4)'),
      },
    },
    {
      yAxisIndex: 1,
      name: '运行率',
      type: 'line',
      data: [],
      symbolSize: 4,
      symbol: 'circle',
      smooth: true,
      itemStyle: {
        color: '#D68B58',
      },
      lineStyle: {
        color: '#D68B58',
      },
      label: {
        show: true,
        color: '#ffffff',
        formatter: (value: any, index: any) => {
          return `${value.value}%`
        },
      },
    },
  ],
}
