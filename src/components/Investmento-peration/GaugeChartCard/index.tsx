import { GaugeChart } from '@kdcloudjs/kd-charts-card';
import * as echarts from 'echarts';

export default (props: any) => {
  const option = {
    series: [
      {
        name: '仪表盘',
        type: 'gauge',
        radius: '90%',
        startAngle: 225,
        endAngle: -45,
        axisLine: {
          lineStyle: {
            width: 8, // 设置刻度盘宽度为 5（较细的刻度盘）
            color: [
              [
                0.5,
                new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: '#504C4A' }, // 渐变起始颜色
                  { offset: 1, color: '#FFAC4C' }, // 渐变结束颜色
                ]),
              ], // 前30%的渐变色
              [1, '#A6A6A6'], // 剩余部分为单色
            ],
          },
        },
        axisTick: {
          show: false, // 隐藏小刻度线
        },
        splitLine: {
          show: false, // 隐藏大刻度线
        },
        axisLabel: {
          show: false, // 隐藏刻度文字
        },
        pointer: {
          width: 5, // 指针宽度
          itemStyle: {
            color: '#E1D6B8', // 设置指针颜色
          },
        },
        detail: {
          show: true, // 显示指针值
          fontSize: 16,
          color: '#333',
        },
        data: [
          {
            value: 100, // 指针位置
            name: '', // 隐藏名称文字
          },
        ],
      },
    ],
  };

  return <GaugeChart options={option} />;
};
