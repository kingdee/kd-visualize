import chart11_icon_1 from '@/assets/images/chart11_icon_1.png';
import chart11_icon_2 from '@/assets/images/chart11_icon_2.png';
import chart11_icon_3 from '@/assets/images/chart11_icon_3.png';
import chart11_icon_4 from '@/assets/images/chart11_icon_4.png';
import chart11_icon_5 from '@/assets/images/chart11_icon_5.png';
import chart11_icon_6 from '@/assets/images/chart11_icon_6.png';
import chart11_icon_7 from '@/assets/images/chart11_icon_7.png';
import GaugeChartCard from '@/components/Investmento-peration/GaugeChartCard';
import {
  BarChart,
  BigNumberChart,
  ChartCard,
  LineChart,
} from '@kdcloudjs/kd-charts-card';
import '@kdcloudjs/kd-charts-card/dist/kd-charts-card.css';
import { Progress } from '@kdcloudjs/kdesign';
import * as echarts from 'echarts';
import styles from './index.less';

/**
 * 首页组件，展示各类经营指标图表。
 *
 * @module HomePage
 */
export default function HomePage() {
  const seriesData = {
    grid: {
      top: '20%',
      left: '1%',
      right: '1%',
      bottom: '1%',
    },
    xAxis: {
      data: [
        '08.13',
        '08.14',
        '08.15',
        '08.16',
        '08.17',
        '08.18',
        '08.19',
        '08.20',
        '08.21',
        '08.22',
        '08.23',
        '08.24',
        '08.25',
        '08.26',
      ],
    },
    yAxis: {
      name: '万', // 设置单位
    },
    series: [
      {
        name: '数据量',
        data: [
          150, 160, 155, 145, 150, 165, 180, 175, 160, 170, 155, 190, 165, 170,
        ],
        areaStyle: {
          // 添加区域阴影
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 165, 0, 0.5)' }, // 顶部颜色
              { offset: 1, color: 'rgba(255, 165, 0, 0)' }, // 底部颜色
            ],
          },
        },
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
        },
      },
    ],
  };

  const accounts_seriesData = {
    grid: {
      top: '20%',
      left: '0',
      right: '0',
      bottom: '0',
    },
    xAxis: {
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
    },
    series: [
      {
        type: 'bar',
        data: [200, 150, 180, 120, 200, 170], // 柱状图数据
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#FFAC4C' }, // 顶部颜色
            { offset: 1, color: '#504C4A' }, // 底部颜色
          ]),
          borderRadius: [10, 10, 0, 0],
        },
      },
    ],
  };

  return (
    <div className={styles['investmento-peration']}>
      <img src={chart11_icon_3} className="investmento-peration-bg" />
      <img src={chart11_icon_4} className="investmento-peration-title" />
      <ChartCard
        title="经营指标"
        className="business-indicators"
        style={{
          width: '396px',
          height: '288px',
        }}
      >
        <div className="card-top">
          <BigNumberChart
            data={[
              {
                icon: chart11_icon_1,
                value: 3.5,
                text: '经营投入指数',
                unit: '',
              },
            ]}
            type="2"
          />
        </div>
        <div className="card-bottom">
          <BigNumberChart
            data={[
              {
                icon: chart11_icon_5,
                value: 5.7,
                text: '资金投入',
                unit: '',
              },
              {
                icon: chart11_icon_6,
                value: 3.8,
                text: '人力投入',
                unit: '',
              },
              {
                icon: chart11_icon_7,
                value: '2.6',
                text: '时间投入',
                unit: '',
              },
            ]}
            type="4"
          />
        </div>
      </ChartCard>
      <ChartCard
        title="应收账款余额"
        className="receivable-balance"
        style={{
          width: '396px',
          height: '330px',
        }}
      >
        <div className="card-top">
          <BigNumberChart
            data={[
              {
                icon: chart11_icon_2,
                value: 15693.32,
                text: '',
                unit: '万元',
              },
            ]}
            type="2"
          />
        </div>
        <div className="card-bottom">
          <BigNumberChart
            data={[
              {
                value: '78%',
                text: '完成度',
                trend: '22678',
                trendDirection: 'up',
                trendTitle: '目标值(万元)',
              },
            ]}
            type="6"
          />
        </div>

        <div className="card-bottom-progress">
          <Progress
            percent={75}
            showInfo={false}
            strokeColor={{
              '0%': '#735353',
              '100%': 'rgba(114, 105, 81, 0.33)',
            }}
          />
        </div>
      </ChartCard>

      <ChartCard
        title="经营利润"
        className="operating-profit"
        style={{
          width: '396px',
          height: '308px',
        }}
      >
        <div className="card-top">
          <div className="child">
            <GaugeChartCard />
          </div>
          <div className="child">
            <BigNumberChart
              data={[
                {
                  value: '58.46%',
                  text: '完成率',
                  unit: '',
                },
              ]}
              type="4"
            />
          </div>
        </div>
        <div className="card-bottom">
          <BigNumberChart
            data={[
              {
                value: '5,845,699.00',
                text: '完成量',
                trend: '8%',
                trendDirection: 'up',
                trendTitle: '环比',
              },
            ]}
            type="6"
          />
        </div>
      </ChartCard>
      <ChartCard
        title="经营收入"
        className="operating-income"
        style={{
          width: '396px',
          height: '310px',
        }}
      >
        <div className="card-top">
          <div className="child">
            <GaugeChartCard />
          </div>
          <div className="child">
            <BigNumberChart
              data={[
                {
                  value: '58.46%',
                  text: '完成率',
                  unit: '',
                },
              ]}
              type="4"
            />
          </div>
        </div>
        <div className="card-bottom">
          <BigNumberChart
            data={[
              {
                value: '5,845,699.00',
                text: '完成量',
                trend: '8%',
                trendDirection: 'up',
                trendTitle: '环比',
              },
            ]}
            type="6"
          />
        </div>
      </ChartCard>

      <ChartCard
        title="应收账款余额趋势"
        className="accounts-receivable-balance"
        style={{
          width: '396px',
          height: '288px',
        }}
      >
        <BarChart options={accounts_seriesData} />
      </ChartCard>

      <ChartCard
        title="经营利润趋势"
        className="security-alarm"
        style={{
          width: '716px',
          height: '288px',
        }}
      >
        <LineChart options={seriesData} />
      </ChartCard>

      <ChartCard
        title="经营收入趋势"
        className="trend-operating-income"
        style={{
          width: '745px',
          height: '288px',
        }}
      >
        <LineChart options={seriesData} />
      </ChartCard>

      <div
        className="asset-data-left1"
        style={{
          width: '188px',
          height: '211px',
        }}
      >
        <BigNumberChart
          data={[
            {
              value: '56.2',
              unit: '',
              text: '资产负债率',
              trend: '↑13%',
              trendTitle: '环比',
            },
          ]}
          type="5"
        />
      </div>
      <div
        className="asset-data-left2"
        style={{
          width: '188px',
          height: '211px',
        }}
      >
        <BigNumberChart
          data={[
            {
              value: '76.8%',
              unit: '',
              text: '净资产收益率',
              trend: '↑73%',
              trendTitle: '环比',
            },
          ]}
          type="5"
        />
      </div>
      <div
        className="asset-data-right1"
        style={{
          width: '188px',
          height: '211px',
        }}
      >
        <BigNumberChart
          data={[
            {
              value: '56.2',
              unit: '',
              text: '资产保值增值率',
              trend: '↑13%',
              trendTitle: '环比',
            },
          ]}
          type="5"
        />
      </div>
      <div
        className="asset-data-right2"
        style={{
          width: '188px',
          height: '211px',
        }}
      >
        <BigNumberChart
          data={[
            {
              value: '122.8%',
              unit: '',
              text: '流动比率',
              trend: '↑3%',
              trendTitle: '环比',
            },
          ]}
          type="5"
        />
      </div>
    </div>
  );
}
