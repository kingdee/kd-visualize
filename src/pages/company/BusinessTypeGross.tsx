import { useModel } from 'umi'
import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import defaultTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-default.js'
import { Radio } from '@kdcloudjs/kdesign'
import './index.less'
import { eMillionShortTerm } from '@/utils'
import _ from 'lodash'
import { CompanyTodayBusinessTypeGross } from '@/services/company'

import { DefaultOption as center2_1 } from '@/pages/company/data/center2_1'
import { DefaultOption as center2_2 } from '@/pages/company/data/center2_2'
import { DefaultOption as center2_3 } from '@/pages/company/data/center2_3'
import { DefaultOption as center_income_2 } from '@/pages/company/data/center2_1'

const TableOpening: FC<{}> = () => {
  echarts.registerTheme('defaultTheme', defaultTheme)
  const { token } = useModel('token')
  const { period, dataType, companySn, companyList } = useModel('base')

  //各業務類型运行数

  const [table_opening_all, setTable_opening_all] = useState(true)
  const echartsRefCenter2_1 = useRef(null) // //各業務類型运行数
  const echartsRefCenter2_2 = useRef(null) // //各業務類型运行数

  //XXX毛收入
  const [TodayBusinessTypeGross, setCompanyTodayBusinessTypeGross] = useState(
    {},
  )

  // 按钮组
  const [table_switch, setTable] = useState('table')
  const [BusinessType, setBusinessType] = useState('all')

  //各業務類型运行数

  const renderEchartsCenter2_1 = (option: any, _data: any) => {
    const { grossNum } = _data
    option.series[0].data = [
      {
        value: grossNum?.VIP,
        name: 'VIP业务',
        itemStyle: {
          color: '#ab64da',
        },
      },
      {
        value: grossNum?.MS,
        name: '中型业务',
        itemStyle: {
          color: '#3d9ef6',
        },
      },

      {
        value: grossNum?.Slot,
        name: '小型业务',
        itemStyle: {
          color: '#6ed2ad',
        },
      },
    ]

    console.log('各業務類型运行数', _data)

    echartsRefCenter2_1.current?.getEchartsInstance().setOption(option, true)
  }

  //各業務類型运行数  全公司
  const renderEchartsCenter2_2 = (option, _data, _type = 'VIP') => {
    let grossDetail = _data?.grossDetail[_type]
    if (_type === 'VIP' || _type === 'MS') {
      grossDetail = _.filter(grossDetail, function (o) {
        return o.casion !== '摩卡'
      })
    }
    // grossDetail = grossDetail.filter((d) => d.isShow === 1)
    // grossDetail.sort((a, b) => a.seq - b.seq)

    option.xAxis[0].data = _.map(grossDetail, 'casion')
    option.series[0].data = _.map(grossDetail, 'gross')

    option.series[0].data = _.map(option.series[0].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })

    switch (_type) {
      case 'VIP':
        option.series[0].name = ' 毛收入1'
        break
      case 'MS':
        option.series[0].name = ' 毛收入2'
        break
      case 'Slot':
        option.series[0].name = ' 毛收入4'
        break
      default:
        option.series[0].name = ' 毛收入1'
        break
    }

    echartsRefCenter2_2?.current?.getEchartsInstance().setOption(option, true)
  }

  //各業務類型运行数
  function onChange(e) {
    setBusinessType(e.target.value)
    renderEchartsCenter2_2(center2_3, TodayBusinessTypeGross, e.target.value)
    if (e.target.value === 'all') {
      //显示 呈批公司  环形图
      setTable_opening_all(true)
    } else {
      setTable_opening_all(false)
    }
  }

  //业务   小型业务
  function onChangeMachineTable(e) {
    setTable(e.target.value)

    if (e.target.value === 'table') {
      //显示业务
      setBusinessType('all')
      setTable_opening_all(true)
      renderEchartsCenter2_2(center2_3, TodayBusinessTypeGross, 'all')
    } else {
      //显示小型业务
      setTable_opening_all(false)
      renderEchartsCenter2_2(center2_3, TodayBusinessTypeGross, 'Slot')
    }
  }

  const renderPage = () => {
    //XXX毛收入
    CompanyTodayBusinessTypeGross({
      period,
      companyNum: companySn,
      dataType,
    }).then((res) => {
      const { data = [] } = res
      setBusinessType('all')
      setTable_opening_all(true)
      setCompanyTodayBusinessTypeGross(data)
      // renderEchartsCenter2(center_income_2, data)
      renderEchartsCenter2_1(center_income_2, data)
      renderEchartsCenter2_2(center2_3, data)
    })
  }

  useEffect(() => {
    if (token && period && dataType && companySn) {
      renderPage()
    }
  }, [token, period, dataType, companySn])

  return (
    <>
      <div
        className={
          table_opening_all
            ? 'Proportion_table_opening tables_opened'
            : 'Proportion_table_opening tables_opened table_opening_all'
        }
      >
        <div>XXX毛收入</div>
        <div>
          <ReactECharts option={center2_1} ref={echartsRefCenter2_1} />
        </div>
        <div className="Proportion_table_opening_legend">
          <div className="Proportion_table_opening_legend_li">
            <div>
              <div className="legend_ball"></div>
            </div>
            <div>VIP业务</div>
            <div></div>
            <div>
              {eMillionShortTerm(TodayBusinessTypeGross?.grossNum?.VIP)}
              <span>百万</span>
            </div>
          </div>
          <div className="Proportion_table_opening_legend_li">
            <div>
              <div
                className="legend_ball"
                style={{ backgroundColor: '#3d9ef6' }}
              ></div>
            </div>
            <div>中型业务</div>
            <div></div>
            <div>
              {eMillionShortTerm(TodayBusinessTypeGross?.grossNum?.MS)}
              <span>百万</span>
            </div>
          </div>
          <div className="Proportion_table_opening_legend_li">
            <div>
              <div
                className="legend_ball"
                style={{ backgroundColor: '#01EDE1' }}
              />
            </div>
            <div>小型业务</div>
            <div></div>
            <div>
              {eMillionShortTerm(TodayBusinessTypeGross?.grossNum?.Slot)}
              <span>百万</span>
            </div>
          </div>
        </div>
      </div>

      <div className={table_opening_all ? 'echart hiden' : 'echart'}>
        <ReactECharts option={center2_2} ref={echartsRefCenter2_2} />
      </div>

      {table_switch === 'table' && (
        <div className="Proportion_table_opening_btn Proportion_table_opening_radio">
          <Radio.Group onChange={onChange} value={BusinessType}>
            <Radio.Button value="all">XXX公司业务毛收入</Radio.Button>
            <Radio.Button value="VIP">VIP业务</Radio.Button>
            <Radio.Button value="MS">中型业务</Radio.Button>
            <Radio.Button value="Slot">小型业务</Radio.Button>
          </Radio.Group>
        </div>
      )}

      <div className="Gambling_machine_btn hiden">
        <Radio.Group onChange={onChangeMachineTable} value={table_switch}>
          <Radio.Button value="table">业务</Radio.Button>
          <Radio.Button value="machine">小型业务</Radio.Button>
        </Radio.Group>
      </div>
    </>
  )
}

export default TableOpening
