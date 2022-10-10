import { useModel } from 'umi'
import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import defaultTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-default.js'
import { Radio } from '@kdcloudjs/kdesign'
import './index.less'
import _ from 'lodash'

import { getCompanyGross } from '@/services/company'
import { DefaultOption as right2 } from '@/pages/company/data/right2'

const RevenueFromSingleGamingTable: FC<{}> = () => {
  echarts.registerTheme('defaultTheme', defaultTheme)
  const { token } = useModel('token')
  const { period, dataType, companySn, companyList } = useModel('base')

  const echartsRefRight2 = useRef(null)

  //XXX毛收入
  const [TodayBusinessTypeGross, setCompanyTodayBusinessTypeGross] = useState(
    {},
  )

  // 按钮组
  const [table_switch, setTable] = useState('table')
  const [BusinessType, setBusinessType] = useState('VIP')

  //

  const renderEchartsRight2 = (option: any, _data: any, _type = 'VIP') => {
    _data = _.filter(_data, function (o) {
      return o.casinoName !== '摩卡'
    })

    _data = _data.filter((d) => d.isShow === 1)
    _data.sort((a, b) => a.seq - b.seq)

    const gross = _.map(_data, _type)

    option.xAxis[0].data = _.map(_data, 'casinoName')
    option.series[0].data = _.map(gross, 'minGross')
    option.series[1].data = _.map(gross, 'avgGross')
    option.series[2].data = _.map(gross, 'maxGross')
    delete option.grid

    if (_type === 'Slot') {
      option.legend.data[0].name = '單機毛收入最小值'
      option.series[0].name = '單機毛收入最小值'
      option.legend.data[1].name = '單機平均毛收入'
      option.series[1].name = '單機平均毛收入'
      option.legend.data[2].name = '單機毛收入最大值'
      option.series[2].name = '單機毛收入最大值'
    } else {
      option.legend.data[0].name = '毛收入最小值'
      option.series[0].name = '毛收入最小值'
      option.legend.data[1].name = '平均毛收入'
      option.series[1].name = '平均毛收入'
      option.legend.data[2].name = '毛收入最大值'
      option.series[2].name = '毛收入最大值'
    }

    option.series[0].data = _.map(option.series[0].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })
    option.series[1].data = _.map(option.series[1].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })
    option.series[2].data = _.map(option.series[2].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })

    console.log('option', option)

    if (echartsRefRight2.current) {
      echartsRefRight2.current?.getEchartsInstance()?.setOption(option, true)
    }
  }

  const renderPage = () => {
    // 业务單機毛收入對比
    getCompanyGross({ period, companySn, dataType }).then((res) => {
      const { data = [] } = res
      setCompanyTodayBusinessTypeGross(data)
      renderEchartsRight2(right2, data)
      setBusinessType('VIP')
    })
  }

  function onChange(e) {
    setBusinessType(e.target.value)
    renderEchartsRight2(right2, TodayBusinessTypeGross, e.target.value)
  }

  useEffect(() => {
    if (token && period && dataType && companySn) {
      renderPage()
    }
  }, [token, period, dataType, companySn])

  return (
    <>
      <div className="Revenue_from_single_gaming_table">
        <div>业务对比</div>
        <div />
      </div>

      <div className="Revenue_from_single_gaming_table_echart">
        <ReactECharts
          option={right2}
          theme="defaultTheme"
          ref={echartsRefRight2}
        />
      </div>
    </>
  )
}

export default RevenueFromSingleGamingTable
