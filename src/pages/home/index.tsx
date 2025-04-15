import chart11_icon_1 from '@/assets/images/chart11_icon_1.png';
import chart11_icon_2 from '@/assets/images/chart11_icon_2.png';
import chart11_icon_3 from '@/assets/images/chart11_icon_3.png';
import chart11_icon_4 from '@/assets/images/chart11_icon_4.png';
import chart11_icon_5 from '@/assets/images/chart11_icon_5.png';
import chart11_icon_6 from '@/assets/images/chart11_icon_6.png';
import chart11_icon_7 from '@/assets/images/chart11_icon_7.png';
import GaugeChartCard from '@/components/Investmento-peration/GaugeChartCard';
import request from '@/utils/request'; // 引入 Axios 实例
import {
  BarChart,
  BigNumberChart,
  ChartCard,
  LineChart,
} from '@kdcloudjs/kd-charts-card';
import '@kdcloudjs/kd-charts-card/dist/kd-charts-card.css';
import { Progress } from '@kdcloudjs/kdesign';
import { useEffect, useState } from 'react';
import styles from './index.less';

// 定义图标名称的联合类型
type IconName =
  | 'chart11_icon_1'
  | 'chart11_icon_2'
  | 'chart11_icon_3'
  | 'chart11_icon_4'
  | 'chart11_icon_5'
  | 'chart11_icon_6'
  | 'chart11_icon_7';

// 定义数据结构接口
interface BusinessIndicatorItem {
  icon: IconName;
  value?: number; // 示例字段，根据实际数据结构调整
  label?: string; // 示例字段，根据实际数据结构调整
}

interface BusinessIndicatorsData {
  top?: BusinessIndicatorItem[];
  bottom?: BusinessIndicatorItem[];
}

interface ReceivableBalanceData {
  top?: { icon: IconName; value?: number; label?: string }[];
  bottom?: { value?: number; label?: string }[];
  progress?: { percent: number };
}

interface OperatingProfitData {
  top?: { value?: number; label?: string }[];
  bottom?: { value?: number; label?: string }[];
}

interface OperatingIncomeData {
  top?: { value?: number; label?: string }[];
  bottom?: { value?: number; label?: string }[];
}

interface AssetData {
  left1?: { value?: number; label?: string }[];
  left2?: { value?: number; label?: string }[];
  right1?: { value?: number; label?: string }[];
  right2?: { value?: number; label?: string }[];
}

interface DashboardDataState {
  seriesData: any; // 待优化：根据实际 API 数据结构定义
  accountsSeriesData: any;
  businessIndicatorsData: BusinessIndicatorsData | null;
  receivableBalanceData: ReceivableBalanceData | null;
  operatingProfitData: OperatingProfitData | null;
  operatingIncomeData: OperatingIncomeData | null;
  assetData: AssetData | null;
}

/**
 * 首页组件，展示各类经营指标图表。
 *
 * @module HomePage
 */
export default function HomePage() {
  // 状态管理
  const [dashboardData, setDashboardData] = useState<DashboardDataState>({
    seriesData: null,
    accountsSeriesData: null,
    businessIndicatorsData: null,
    receivableBalanceData: null,
    operatingProfitData: null,
    operatingIncomeData: null,
    assetData: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 图标映射
  const icons: Record<IconName, string> = {
    chart11_icon_1,
    chart11_icon_2,
    chart11_icon_3,
    chart11_icon_4,
    chart11_icon_5,
    chart11_icon_6,
    chart11_icon_7,
  };

  // 获取所有数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          seriesDataResponse,
          accountsSeriesDataResponse,
          businessIndicatorsDataResponse,
          receivableBalanceDataResponse,
          operatingProfitDataResponse,
          operatingIncomeDataResponse,
          assetDataResponse,
        ] = await Promise.all([
          request.get('/series-data'),
          request.get('/accounts-series'),
          request.get('/business-indicators'),
          request.get('/receivable-balance'),
          request.get('/operating-profit'),
          request.get('/operating-income'),
          request.get('/asset-data'),
        ]);

        const seriesData = seriesDataResponse.data;
        const accountsSeriesData = accountsSeriesDataResponse.data;
        const businessIndicatorsData = businessIndicatorsDataResponse.data;
        const receivableBalanceData = receivableBalanceDataResponse.data;
        const operatingProfitData = operatingProfitDataResponse.data;
        const operatingIncomeData = operatingIncomeDataResponse.data;
        const assetData = assetDataResponse.data;

        setDashboardData({
          seriesData,
          accountsSeriesData,
          businessIndicatorsData,
          receivableBalanceData,
          operatingProfitData,
          operatingIncomeData,
          assetData,
        });
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('数据加载失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 渲染加载或错误状态
  if (loading) {
    return <div className={styles.loading}>加载中...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // 渲染组件
  return (
    <div className={styles['investmento-peration']}>
      <img src={chart11_icon_3} className="investmento-peration-bg" />
      <img src={chart11_icon_4} className="investmento-peration-title" />
      <ChartCard
        title="经营指标"
        className="business-indicators"
        style={{ width: '396px', height: '288px' }}
      >
        <div className="card-top">
          <BigNumberChart
            data={dashboardData.businessIndicatorsData?.top?.map((item) => ({
              ...item,
              icon: icons[item.icon],
            }))}
            type="2"
          />
        </div>
        <div className="card-bottom">
          <BigNumberChart
            data={dashboardData.businessIndicatorsData?.bottom?.map((item) => ({
              ...item,
              icon: icons[item.icon],
            }))}
            type="4"
          />
        </div>
      </ChartCard>
      <ChartCard
        title="应收账款余额"
        className="receivable-balance"
        style={{ width: '396px', height: '330px' }}
      >
        <div className="card-top">
          <BigNumberChart
            data={dashboardData.receivableBalanceData?.top?.map((item) => ({
              ...item,
              icon: icons[item.icon],
            }))}
            type="2"
          />
        </div>
        <div className="card-bottom">
          <BigNumberChart
            data={dashboardData.receivableBalanceData?.bottom}
            type="6"
          />
        </div>
        <div className="card-bottom-progress">
          <Progress
            percent={dashboardData.receivableBalanceData?.progress?.percent}
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
        style={{ width: '396px', height: '308px' }}
      >
        <div className="card-top">
          <div className="child">
            <GaugeChartCard />
          </div>
          <div className="child">
            <BigNumberChart
              data={dashboardData.operatingProfitData?.top}
              type="4"
            />
          </div>
        </div>
        <div className="card-bottom">
          <BigNumberChart
            data={dashboardData.operatingProfitData?.bottom}
            type="6"
          />
        </div>
      </ChartCard>
      <ChartCard
        title="经营收入"
        className="operating-income"
        style={{ width: '396px', height: '310px' }}
      >
        <div className="card-top">
          <div className="child">
            <GaugeChartCard />
          </div>
          <div className="child">
            <BigNumberChart
              data={dashboardData.operatingIncomeData?.top}
              type="4"
            />
          </div>
        </div>
        <div className="card-bottom">
          <BigNumberChart
            data={dashboardData.operatingIncomeData?.bottom}
            type="6"
          />
        </div>
      </ChartCard>
      <ChartCard
        title="应收账款余额趋势"
        className="accounts-receivable-balance"
        style={{ width: '396px', height: '288px' }}
      >
        <BarChart options={dashboardData.accountsSeriesData} />
      </ChartCard>
      <ChartCard
        title="经营利润趋势"
        className="security-alarm"
        style={{ width: '716px', height: '288px' }}
      >
        <LineChart options={dashboardData.seriesData} />
      </ChartCard>
      <ChartCard
        title="经营收入趋势"
        className="trend-operating-income"
        style={{ width: '745px', height: '288px' }}
      >
        <LineChart options={dashboardData.seriesData} />
      </ChartCard>
      <div
        className="asset-data-left1"
        style={{ width: '188px', height: '211px' }}
      >
        <BigNumberChart data={dashboardData.assetData?.left1} type="5" />
      </div>
      <div
        className="asset-data-left2"
        style={{ width: '188px', height: '211px' }}
      >
        <BigNumberChart data={dashboardData.assetData?.left2} type="5" />
      </div>
      <div
        className="asset-data-right1"
        style={{ width: '188px', height: '211px' }}
      >
        <BigNumberChart data={dashboardData.assetData?.right1} type="5" />
      </div>
      <div
        className="asset-data-right2"
        style={{ width: '188px', height: '211px' }}
      >
        <BigNumberChart data={dashboardData.assetData?.right2} type="5" />
      </div>
    </div>
  );
}
