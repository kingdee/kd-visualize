function Tooltip(p, ticket, callback) {
  return `
  <div class="echarts-tooltip-formatter">
  <div class="echarts-tooltip-title">${p.name}</div>
  <div class="echarts-tooltip-main">
    <div class="item">
      <div class="left">
 
        ${p.marker}
        <div class="text">${p.seriesName}：</div>
      </div>
      <div class="right">
        ${p.value}
      </div>
    </div>
  </div>
</div>

`
}

export const DefaultOption = {
  tooltip: {
    show: false,
    formatter: Tooltip,
    trigger: 'item',
    borderWidth: 0,
    padding: 0,
  },
  series: [
    {
      name: '各業務類型运行数',
      type: 'pie',
      radius: ['40%', '48%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#20283c',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: false,
          fontSize: '15',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        // { value: '1485405321.30', name: '中型业务' },
        // { value: '14854', name: 'VIP业务' },
        // { value: '1485405321.30', name: '未运行业务' },
      ],
    },
  ],
}
