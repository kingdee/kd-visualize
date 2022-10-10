import { useModel } from 'umi'
import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import defaultTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-default.js'
import _ from 'lodash'

import { DEFAULT_INTERVAL } from '@/constant'
import Header from '@/components/header'
import { DefaultOption as right3 } from '@/pages/company/data/right3'
import { getTodayOperationData } from '@/services/template'
import './index.less'

let timer1: string | number | NodeJS.Timeout | undefined
let timer2: string | number | NodeJS.Timeout | undefined
let companyPageRefresh: string | number | NodeJS.Timeout | undefined

export default function IndexPage() {
  echarts.registerTheme('defaultTheme', defaultTheme)
  const { token } = useModel('token')
  const { period, dataType, companySn } = useModel('base')

  const echartsRefRight3 = useRef(null)

  const renderEchartsRight3 = (option: any, _data: any) => {
    option.xAxis[0].data = _.map(_data, 'game_type_name')
    option.series[0].data = _.map(_data, 'gross')
    option.series[1].data = _.map(_data, 'open_rate')
    delete option.grid
    option.series[0].data = _.map(option.series[0].data, (n) => {
      return (parseFloat(n) / 1000000).toFixed(2)
    })
    option.series[1].data = _.map(option.series[1].data, (n) => {
      return (parseFloat(n) * 100).toFixed(2)
    })

    if (echartsRefRight3.current) {
      echartsRefRight3.current?.getEchartsInstance()?.setOption(option, true)
    }
  }

  const renderPage = () => {
    // 业务运行状态
    getTodayOperationData({ period, companyNum: companySn, dataType }).then(
      (res) => {
        const { data = [] } = res
        renderEchartsRight3(right3, data)
      },
    )
  }

  const clearAllTime = () => {
    if (timer1) {
      clearInterval(timer1)
    }
    if (timer2) {
      clearInterval(timer2)
    }
  }

  const init = () => {
    clearAllTime()
    renderPage()
  }

  useEffect(() => {
    if (token && period && dataType) {
      init()
      companyPageRefresh = setInterval(() => {
        init()
      }, DEFAULT_INTERVAL)
    }

    return () => {
      clearAllTime()
      if (companyPageRefresh) {
        clearInterval(companyPageRefresh)
      }
    }
  }, [token, period, dataType])

  return (
    <div className="common_wrapper tmp">
      <Header />
      <div className="Operation_gambling_table">
        <div>业务运行状态</div>
        <div />
      </div>

      <div className="Operation_gambling_table_echart">
        <ReactECharts
          option={right3}
          theme="defaultTheme"
          ref={echartsRefRight3}
        />
      </div>
    </div>
  )
}
