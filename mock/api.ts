// mock/api.js
export default {
  // 经营指标数据
  'GET /api/business-indicators': (req, res) => {
    res.json({
      top: [
        {
          icon: 'chart11_icon_1',
          value: 4.2,
          text: '经营投入指数',
          unit: '',
        },
      ],
      bottom: [
        {
          icon: 'chart11_icon_5',
          value: 6.1,
          text: '资金投入',
          unit: '',
        },
        {
          icon: 'chart11_icon_6',
          value: 4.5,
          text: '人力投入',
          unit: '',
        },
        {
          icon: 'chart11_icon_7',
          value: 3.0,
          text: '时间投入',
          unit: '',
        },
      ],
    });
  },

  // 应收账款余额数据
  'GET /api/receivable-balance': (req, res) => {
    res.json({
      top: [
        {
          icon: 'chart11_icon_2',
          value: 17890.45,
          text: '',
          unit: '万元',
        },
      ],
      bottom: [
        {
          value: '82%',
          text: '完成度',
          trend: '24500',
          trendDirection: 'up',
          trendTitle: '目标值(万元)',
        },
      ],
      progress: {
        percent: 80,
      },
    });
  },

  // 经营利润数据
  'GET /api/operating-profit': (req, res) => {
    res.json({
      top: [
        {
          value: '62.5%',
          text: '完成率',
          unit: '',
        },
      ],
      bottom: [
        {
          value: '6,123,456.00',
          text: '完成量',
          trend: '10%',
          trendDirection: 'up',
          trendTitle: '环比',
        },
      ],
    });
  },

  // 经营收入数据
  'GET /api/operating-income': (req, res) => {
    res.json({
      top: [
        {
          value: '60.8%',
          text: '完成率',
          unit: '',
        },
      ],
      bottom: [
        {
          value: '6,500,000.00',
          text: '完成量',
          trend: '12%',
          trendDirection: 'up',
          trendTitle: '环比',
        },
      ],
    });
  },

  // 应收账款余额趋势
  'GET /api/accounts-series': (req, res) => {
    res.json({
      grid: {
        top: '20%',
        left: '0',
        right: '0',
        bottom: '0',
      },
      xAxis: {
        data: ['7月', '8月', '9月', '10月', '11月', '12月'],
      },
      series: [
        {
          type: 'bar',
          data: [180, 160, 190, 140, 170, 200],
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#FFAC4C' },
                { offset: 1, color: '#504C4A' },
              ],
            },
            borderRadius: [10, 10, 0, 0],
          },
        },
      ],
    });
  },

  // 经营利润/收入趋势
  'GET /api/series-data': (req, res) => {
    res.json({
      grid: {
        top: '20%',
        left: '1%',
        right: '1%',
        bottom: '1%',
      },
      xAxis: {
        data: [
          '09.01',
          '09.02',
          '09.03',
          '09.04',
          '09.05',
          '09.06',
          '09.07',
          '09.08',
          '09.09',
          '09.10',
          '09.11',
          '09.12',
          '09.13',
          '09.14',
        ],
      },
      yAxis: {
        name: '万',
      },
      series: [
        {
          name: '数据量',
          data: [
            120, 130, 140, 135, 145, 155, 160, 165, 170, 175, 180, 185, 190,
            195,
          ],
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(255, 165, 0, 0.5)' },
                { offset: 1, color: 'rgba(255, 165, 0, 0)' },
              ],
            },
          },
          itemStyle: {
            borderRadius: [10, 10, 0, 0],
          },
        },
      ],
    });
  },

  // 资产数据
  'GET /api/asset-data': (req, res) => {
    res.json({
      left1: [
        {
          value: '58.7',
          unit: '',
          text: '资产负债率',
          trend: '↑15%',
          trendTitle: '环比',
        },
      ],
      left2: [
        {
          value: '78.5%',
          unit: '',
          text: '净资产收益率',
          trend: '↑70%',
          trendTitle: '环比',
        },
      ],
      right1: [
        {
          value: '55.0',
          unit: '',
          text: '资产保值增值率',
          trend: '↑10%',
          trendTitle: '环比',
        },
      ],
      right2: [
        {
          value: '125.0%',
          unit: '',
          text: '流动比率',
          trend: '↑5%',
          trendTitle: '环比',
        },
      ],
    });
  },
};
