import * as echarts from 'echarts'

export const LinearGradient = (color1: string, color2: string) => {
  const color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: color1,
    },
    {
      offset: 1,
      color: color2,
    },
  ])
  return color
}
