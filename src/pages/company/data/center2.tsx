import { LinearGradient } from '@/components/charts/common/LinearGradient'

export const DefaultOption = {
  tooltip: {
    show: true,
    // formatter: Tooltip,
    trigger: 'axis',
    borderWidth: 0,
    padding: 0,
  },
  grid: {
    left: 40,
    right: 40,
    top: 70,
    bottom: 50,
  },
  xAxis: [
    {
      type: 'category',
      data: ['金堡', '皇家', '3', '4', '5', '6'],
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
      name: '枱',
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
      name: '毛收入',
      type: 'bar',
      barWidth: 10,
      emphasis: {
        focus: 'series',
      },
      data: [71.9, 73.9, 71.9, 71.9, 21.9, 71.9, 71.9, 41.9, 71.9, 71.9],
      itemStyle: {
        barBorderRadius: [30, 30, 0, 0],
        color: LinearGradient('rgba(30,182,222,1)', 'rgba(20,75,149,0.59)'),
      },
    },
  ],
}
