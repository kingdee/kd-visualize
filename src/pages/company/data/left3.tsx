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
  },
  // dataZoom: [
  //   {
  //     type: 'inside',
  //     startValue: 0,
  //     endValue: 100,
  //     zoomOnMouseWheel: false,
  //   },
  // ],
  legend: {
    top: 0,
    right: 100,
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
      {
        name: '毛收入1',
        icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHqADAAQAAAABAAAAHgAAAADKQTcFAAAAkUlEQVRIDWNgGAWjITAaAqMhMBoCgz0EGJEduCr0P9uXbwxN/xkY4oDikshyFLCfAy1ZxMPFUBe2mvEXzBwWGANEQy0tRxajAlsS6JFyoNkgUAEzjwnGANFQnyILUY2NbjaKxVSzhQiDUCwGxQUReshSgm42ShyDEgAoLmiVuMhy8aim0RAYDYHREBgNgQELAQDAsRv1A3/KeAAAAABJRU5ErkJggg==',
      },
      {
        name: '毛收入2',
        icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJUlEQVQoU2NkIAAYKVfgsOr/YYb/DDZYTWJkOMJIUAHlbiBkAgAhWQlhOgtmTwAAAABJRU5ErkJggg==',
      },
      {
        name: '毛收入3',
        icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHqADAAQAAAABAAAAHgAAAADKQTcFAAAAqklEQVRIDe2SMQ7CMBAE7yzEHyiokxdR8o1QoYiOb6TMi6BOkT9QZGELS7abSCZFinXjc06ejcc205ABGZABGdi7AU9/EGN/fE+vB+BXAKe0V1u7++yOoTm3d7/0n8g5xIIzQ5fFOjOkn/+qeQDAuh+bnFuEhVhw5knT9ZZ1yc6CtwxaY2XBvIu1DbX9kp0F8wGEYE8+iNqAch9ZZJJd9rSWARmQARnYt4Ev0lkr73jW1s0AAAAASUVORK5CYII=',
      },
      {
        name: '毛收入4',
        icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAACqADAAQAAAABAAAACgAAAAA7eLj1AAAALElEQVQYGWNgGPyAEeRExncPtzL8Z/DC6lxGhm3/heS9mbBKogr+R+UOXh4AAFMHA8Pi2Z8AAAAASUVORK5CYII=',
      },
      {
        name: '毛收入5',
        icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAACqADAAQAAAABAAAACgAAAAA7eLj1AAAAL0lEQVQYGWNgGPyAEeTEqIvZWxn+M3hhdS4jw7Zl+lO9mbBKIgky/mf8j8Qd1EwApL4IBIYdn+MAAAAASUVORK5CYII=',
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
        padding: [-20, 10, 0, 0],
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
      name: '毛收入1',
      type: 'line',
      data: [],
      symbolSize: 4,
      symbol: 'circle',
      smooth: true,
      itemStyle: {
        color: 'rgba(171, 100, 218, 1)',
      },
      lineStyle: {
        color: 'rgba(171, 100, 218, 1)',
        width: 2,
      },
    },
    {
      name: '毛收入2',
      type: 'line',
      data: [],
      symbolSize: 4,
      symbol: 'circle',
      smooth: true,
      itemStyle: {
        color: 'rgba(1,128,237,1)',
      },
      lineStyle: {
        color: 'rgba(1,128,237,1)',
        width: 2,
      },
    },
    {
      name: '毛收入3',
      type: 'line',
      data: [],
      symbolSize: 4,
      symbol: 'circle',
      smooth: true,
      itemStyle: {
        color: 'rgba(214,139,88,1)',
      },
      lineStyle: {
        color: 'rgba(214,139,88,1)',
        width: 2,
      },
    },
    {
      name: '毛收入4',
      type: 'line',
      data: [],
      symbolSize: 4,
      symbol: 'circle',
      smooth: true,
      itemStyle: {
        color: 'rgba(1,237,225,1)',
      },
      lineStyle: {
        color: 'rgba(1,237,225,1)',
        width: 2,
      },
    },
    {
      name: '毛收入5',
      type: 'line',
      data: [],
      symbolSize: 4,
      symbol: 'circle',
      smooth: true,
      itemStyle: {
        color: 'rgba(90,208,107,1)',
      },
      lineStyle: {
        color: 'rgba(90,208,107,1)',
        width: 2,
      },
    },
  ],
}
