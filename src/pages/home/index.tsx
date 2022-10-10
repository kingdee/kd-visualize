/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect, useRef, useMemo } from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import defaultTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-default.js'
import redTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-red.js'
import naturalTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-natural.js'
import scienceTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-science.js'
import { Radio } from '@kdcloudjs/kdesign'
import { useModel, history } from 'umi'
import _ from 'lodash'
import CountUp from 'react-countup'
import { DEFAULT_INTERVAL } from '@/constant'

import './index.less'
import '../company/index.less'
import Header from '@/components/header'
import {
  getTodayData,
  ITodayData,
  getTodayGross,
  ITodayGross,
  getGrossDetailByCompany,
  IGrossDetailByCompany,
  getGrossByDayWithMonth,
  // IGrossByDayWithMonth,
  getCompanyGross,
  ICompanyGross,
  getOpenNumberToday,
  getTodayOperationData,
  getTodayCompanyGrossSeq,
  ITodayCompanyGrossSeq,
  getTodayTableMachineData,
  ITodayTableMachineData,
  getRatioData,
  IRatioData,
  getTodayBusinessTypeGross,
} from '@/services/home'

import { formatNumber, ePercentage, eMillion } from '../../utils'

import { DefaultOption as right1_copy } from '@/pages/company/data/right1'
import { DefaultOption as right2_copy } from '@/pages/company/data/right2'
import { DefaultOption as right3_copy } from '@/pages/company/data/right3'
import { DefaultOption as center3_copy } from '@/pages/company/data/center3'
import { DefaultOption as middleList_copy } from '@/pages/company/data/left3'
import {
  DefaultOption as center_income_2_copy,
  DefaultOption as center2_1_copy,
} from '@/pages/company/data/center2_1'
import { DefaultOption as center2_2_copy } from '@/pages/company/data/center2_2'

import { animationData, TIME, SIZE, HEIGHT, PEAK, POS, POSITION } from './data'

// right1.grid = { left: 30, right: 40, top: 60, bottom: 110 }
// right2.grid = { left: 30, right: 0, top: 60, bottom: 90 }
// right3.grid = { left: 30, right: 40, top: 60, bottom: 90 }
// center3.grid = { left: 30, right: 0, top: 60, bottom: 90 }
// center2_2.grid = { left: 30, right: 0, top: 70, bottom: 90 }
const right1 = _.cloneDeep(right1_copy)
const right2 = _.cloneDeep(right2_copy)
const right3 = _.cloneDeep(right3_copy)
const center3 = _.cloneDeep(center3_copy)
const middleList = _.cloneDeep(middleList_copy)
const center_income_2 = _.cloneDeep(center_income_2_copy)
const center2_1 = _.cloneDeep(center2_1_copy)
const center2_2 = _.cloneDeep(center2_2_copy)
const center_income_2_1 = _.cloneDeep(center2_2_copy)

right2.legend.right = 0

middleList.legend.right = 166
middleList.legend.top = 13
middleList.grid = {
  left: 70,
  right: 20,
  top: 70,
  bottom: 100,
}

center_income_2.tooltip.position = (point, params, dom, rect, size) => {
  let x = 0 // x坐标位置
  let y = 0 // y坐标位置

  // 当前鼠标位置
  const pointX = point[0]
  const pointY = point[1]

  // 提示框大小
  const boxWidth = size.contentSize[0]
  const boxHeight = size.contentSize[1]

  if (boxWidth > pointX) {
    x = 120
  } else {
    // 左边放的下
    x = pointX - boxWidth
  }

  if (boxHeight > pointY) {
    y = 5
  } else {
    // 上边放得下
    y = pointY - boxHeight
  }
  return [x, y]
}

center2_1.tooltip.position = (point, params, dom, rect, size) => {
  let x = 0 // x坐标位置
  let y = 0 // y坐标位置

  // 当前鼠标位置
  const pointX = point[0]
  const pointY = point[1]

  // 提示框大小
  const boxWidth = size.contentSize[0]
  const boxHeight = size.contentSize[1]

  if (boxWidth > pointX) {
    x = 120
  } else {
    // 左边放的下
    x = pointX - boxWidth
  }

  if (boxHeight > pointY) {
    y = 5
  } else {
    // 上边放得下
    y = pointY - boxHeight
  }
  return [x, y]
}

center2_2.series[0].label = {
  show: true,
  position: 'top',
  color: '#ffffff',
  formatter: (value: any, index: any) => {
    return `${value.value}`
  },
}

center_income_2_1.series[0].label = {
  show: true,
  color: '#ffffff',
  position: 'top',
  formatter: (value: any, index: any) => {
    return `${parseFloat(value.value).toFixed(2)}`
  },
}

center_income_2_1.yAxis[0].name = '百万'

center3.legend.top = 5

const HOME_TAB_DATA = [
  { name: '毛收入', value: 'T1' },
  { name: '运行数量', value: 'T2' },
]

const formatData = (
  num: number | string | undefined,
  decimal: number | null = 2,
  unit = 1,
) => {
  if ((num ?? '') === '') {
    return null
  }
  let number = num
  if (typeof number === 'string') {
    number = Number(num)
  }
  number /= unit
  if (decimal === null) {
    return number
  }
  return number.toFixed(decimal)
}

const getDomPos = (dom: any) => {
  const {
    offsetHeight = 0,
    offsetWidth = 0,
    offsetTop = 0,
    offsetLeft = 0,
  } = dom
  return {
    left: offsetLeft,
    top: offsetTop,
    width: offsetWidth,
    height: offsetHeight,
  }
}

export const convertInto = (v: any, isMillion = true) => {
  const r = Number(v)
  if (!Number.isNaN(r)) {
    if (isMillion) {
      if (r >= 100000000 || r <= -100000000) {
        return { number: (r / 100000000).toFixed(2), unit: '億' }
      }
      return { number: (r / 1000000).toFixed(2), unit: '百万' }
    }
  }
  return {}
}

const companySort = (data: any) => data.sort((a: any, b: any) => a.seq - b.seq)

let amusementTimer: NodeJS.Timer | null = null

export default function IndexPage() {
  echarts.registerTheme('defaultTheme', defaultTheme)
  echarts.registerTheme('redTheme', redTheme)
  echarts.registerTheme('naturalTheme', naturalTheme)
  echarts.registerTheme('scienceTheme', scienceTheme)

  const { token } = useModel('token')
  const { period, dataType, companySn } = useModel('base')

  const [tabType, setTabType] = useState<string>('T1')
  const [list1, setList1] = useState<ITodayData>({})
  const [list2, setList2] = useState<ITodayGross>({})
  const [index, setIndex] = useState<number>(0)

  const [sistogramList, setSistogramList] = useState<IGrossDetailByCompany[]>(
    [],
  )

  // 毛收入排名
  const [grossIncomeRank, setGrossIncomeRank] = useState<
    ITodayCompanyGrossSeq[]
  >([])

  // 运行排名
  const [tableMachineData, setTableMachineData] = useState<
    ITodayTableMachineData[]
  >([])
  const [table_slot, setTable_slot] = useState(true)

  // 毛收入同环比
  const [RatioDataByCompany, setRatioDataByCompany] = useState<IRatioData[]>([])
  const [grossMoM, setGrossMoM] = useState(true)

  // XXX毛收入
  const [TodayBusinessTypeGross, setCompanyTodayBusinessTypeGross] =
    useState<any>({})

  // 按钮
  const [table_opening_all, setTable_opening_all] = useState(true)
  const [table_switch, setTable] = useState('table')

  const [Gross_income, setGross_income] = useState(true)

  //
  const [BusinessType, setBusinessType] = useState('all')

  const [right2Type, setRight2Type] = useState('VIP')
  const [right2Data, setRight2Data] = useState([])

  const [table_gross_opening, setTable_gross_opening] = useState(true)

  const echartsRefMiddle = useRef<any>(null)
  const echartsRefRight1 = useRef<any>(null)
  const echartsRefRight2 = useRef<any>(null)
  const echartsRefRight3 = useRef<any>(null)
  const echartsRefCenter3 = useRef<any>(null)
  const echartsRefCenter2 = useRef<any>(null)
  const echartsRefCenterIncome_2_1 = useRef<any>(null)
  const echartsRefCenter2_1 = useRef<any>(null)
  const echartsRefCenter2_2 = useRef<any>(null)
  const mounting = useRef(false)

  const sistogramItem = useMemo(() => {
    return sistogramList[index] || {}
  }, [sistogramList, index])

  function machineOnChange() {
    setTable_slot(!table_slot)
  }

  const renderEchartsRefCenterIncome_2_1 = (
    option: any,
    _data: any,
    _type = 'VIP',
  ) => {
    if (!_data?.grossDetail && !_data?.grossDetail[_type]) return
    option.xAxis[0].data = _.map(_data?.grossDetail[_type], 'companyName')
    option.series[0].data = _.map(_data?.grossDetail[_type], 'gross')
    option.grid = { left: 40, right: 0, top: 70, bottom: 106 }

    switch (_type) {
      case 'VIP':
        option.series[0].name = ' 貴賓中机器毛收入'
        break
      case 'MS':
        option.series[0].name = ' 中場中机器毛收入'
        break
      case 'Slot':
        option.series[0].name = ' 机器毛收入'
        break
      default:
        option.series[0].name = ' 貴賓中机器毛收入'
        break
    }

    option.series[0].data = _.map(option.series[0].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })

    echartsRefCenterIncome_2_1?.current
      ?.getEchartsInstance()
      ?.setOption(option, true)
  }

  function Gross_income_swicth() {
    setGross_income(!Gross_income)
    setTable_opening_all(true)
  }

  const renderEchartsMiddle = (option: any, _data: any) => {
    option.xAxis[0].data = _.map(_data, 'gamingDay')
    option.series[0].data = _.map(_data, 'vipGross')
    option.series[1].data = _.map(_data, 'msGross')
    option.series[2].data = _.map(_data, 'sumGross')
    option.series[3].data = _.map(_data, 'slotGross')
    option.series[4].data = _.map(_data, 'gross')
    // option.grid = {
    //   left: 60,
    //   right: 20,
    //   top: 70,
    //   bottom: 100,
    // }
    // option.legend.right = 100

    option.series[0].data = _.map(option.series[0].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })
    option.series[1].data = _.map(option.series[1].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })

    option.series[2].data = _.map(option.series[2].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })
    option.series[3].data = _.map(option.series[3].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })

    option.series[4].data = _.map(option.series[4].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })

    if (echartsRefMiddle.current) {
      echartsRefMiddle.current?.getEchartsInstance()?.setOption(option, true)
    }
  }

  const renderEchartsRight1 = (option: any, _data: any) => {
    option.xAxis[0].data = _.map(_data, 'companyName')
    option.series[0].data = _.map(_data, 'openNumberOverBase')
    option.series[1].data = _.map(_data, 'openNumberUnderBase')
    option.series[2].data = _.map(_data, 'overRate')
    option.grid = { left: 40, right: 40, top: 60, bottom: 130 }

    option.series[2].data = _.map(option.series[2].data, function (n) {
      return (parseFloat(n) * 100).toFixed(2)
    })

    if (echartsRefRight1.current) {
      echartsRefRight1.current?.getEchartsInstance()?.setOption(option, true)
    }
  }

  const renderEchartsRight2 = (option: any, _data: any, type = 'VIP') => {
    if (!_.map(_data, type)) return
    option.xAxis[0].data = _.map(_data, 'companyName')
    const gross = _.map(_data, type)
    option.series[0].data = _.map(gross, 'minGross')
    option.series[1].data = _.map(gross, 'avgGross')
    option.series[2].data = _.map(gross, 'maxGross')

    option.grid = { left: 40, right: 0, top: 60, bottom: 106 }
    // delete option.grid

    option.series[0].data = _.map(option.series[0].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })
    option.series[1].data = _.map(option.series[1].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })
    option.series[2].data = _.map(option.series[2].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })

    if (type === 'Slot') {
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

    if (echartsRefRight2.current) {
      echartsRefRight2.current?.getEchartsInstance()?.setOption(option, true)
    }
  }

  const renderEchartsRight3 = (option: any, _data: any) => {
    option.xAxis[0].data = _.map(_data, 'game_type_name')
    option.series[0].data = _.map(_data, 'gross')
    option.series[1].data = _.map(_data, 'open_rate')
    option.grid = { left: 40, right: 40, top: 60, bottom: 120 }

    option.series[0].data = _.map(option.series[0].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })

    option.series[1].data = _.map(option.series[1].data, function (n: any) {
      return (parseFloat(n) * 100).toFixed(2)
    })

    if (echartsRefRight3.current) {
      echartsRefRight3.current?.getEchartsInstance()?.setOption(option, true)
    }
  }

  // XXX毛收入

  const renderEchartsCenter2 = (option: any, _data: any) => {
    option.series[0].data = [
      {
        value: _data?.grossNum?.VIP,
        name: '机器',
        itemStyle: {
          color: '#ab64da',
        },
      },
      {
        value: _data?.grossNum?.MS,
        name: '中机器',
        itemStyle: {
          color: '#3d9ef6',
        },
      },
      {
        value: _data?.grossNum?.Slot,
        name: '小机器',
        itemStyle: {
          color: '#6ed2ad',
        },
      },
    ]
    delete option.grid

    echartsRefCenter2.current?.getEchartsInstance()?.setOption(option, true)
  }

  // 运行数

  const renderEchartsCenter2_1 = (option: any, _data: any) => {
    const {
      tableNum: { MS, Slot, VIP, unOpenNumber } = {}, // 中机器各业务类型开枱数量
    } = _data || { tableNum: {} }
    option.series[0].data = [
      {
        value: VIP,
        name: '机器',
        itemStyle: {
          color: '#ab64da',
        },
      },
      {
        value: MS,
        name: '中机器',
        itemStyle: {
          color: '#3d9ef6',
        },
      },
      {
        value: unOpenNumber,
        name: '未运行中机器',
        itemStyle: {
          color: '#88a1c2',
        },
      },
    ]

    echartsRefCenter2_1.current?.getEchartsInstance()?.setOption(option, true)
  }

  // 运行数 全公司
  const renderEchartsCenter2_2 = (option: any, _data: any, _type = 'VIP') => {
    if (!_data?.tableDetail && !_data?.tableDetail[_type]) return
    option.xAxis[0].data = _.map(_data?.tableDetail[_type], 'companyName')
    option.series[0].data = _.map(_data?.tableDetail[_type], 'open_number')
    option.grid = { left: 30, right: 0, top: 70, bottom: 106 }

    if (_type === 'Slot') {
      option.yAxis[0].name = '部'
    } else {
      option.yAxis[0].name = '台'
    }

    switch (_type) {
      case 'VIP':
        option.series[0].name = '貴賓中机器运行數'
        break
      case 'MS':
        option.series[0].name = ' 中場中机器运行數'
        break
      case 'Slot':
        option.series[0].name = ' 机器运行數'
        break
      default:
        option.series[0].name = ' 貴賓中机器运行數'
        break
    }

    echartsRefCenter2_2?.current?.getEchartsInstance()?.setOption(option, true)
  }

  const renderEchartsCenter3 = (
    option: any,
    _data: any,
    _type = 'grossTbRate',
  ) => {
    option.xAxis[0].data = _.map(_data, 'companyName')
    option.series[1].data = _.map(_data, 'gross')
    option.series[0].data = _.map(
      _data,
      _type === 'grossTbRate' ? 'grossTb' : 'grossHb',
    )

    option.series[2].data = _.map(
      _data,
      _type === 'grossTbRate' ? 'grossTbRate' : 'grossHbRate',
    )

    option.series[2].data = _.map(option.series[2].data, function (n) {
      return (parseFloat(`${n}`) * 100).toFixed(2)
    })

    option.series[0].data = _.map(option.series[0].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })
    option.series[1].data = _.map(option.series[1].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })

    option.grid = { left: 44, right: 48, top: 60, bottom: 110 }

    // delete option.grid

    if (_type === 'grossTbRate') {
      option.legend.data[0].name = 'XXXX毛收入'
      option.series[0].name = 'XXXX毛收入'
      option.legend.data[2].name = '同比'
      option.series[2].name = '同比'
    } else if (_type === 'grossHbRate') {
      option.legend.data[0].name = '上月毛收入'
      option.series[0].name = '上月毛收入'
      option.legend.data[2].name = '环比'
      option.series[2].name = '环比'
    }

    echartsRefCenter3 &&
      echartsRefCenter3.current?.getEchartsInstance()?.setOption(option, true)
  }

  // 运行数
  function onChange(e: any) {
    renderEchartsCenter2_2(center2_2, TodayBusinessTypeGross, e.target.value)
    if (e.target.value === 'all') {
      setTable_opening_all(true)
    } else {
      setTable_opening_all(false)
    }
  }

  // 中机器   小机器
  function onChangeMachineTable(e) {
    setTable(e.target.value)

    if (e.target.value === 'table') {
      // 显示中机器
      setBusinessType('all')
      setTable_opening_all(true)
    } else {
      // 显示机器
      setTable_opening_all(false)
      renderEchartsCenter2_2(center2_2, TodayBusinessTypeGross, 'Slot')
    }
  }

  function onBusinessTypeChange(e) {
    setBusinessType(e.target.value)
    if (e.target.value === 'all') {
      // 显示 呈批公司  环形图
      setTable_gross_opening(true)
    } else {
      setTable_gross_opening(false)
      renderEchartsRefCenterIncome_2_1(
        center_income_2_1,
        TodayBusinessTypeGross,
        e.target.value,
      )
    }
  }

  function onRight2TypeChange(e: any) {
    setRight2Type(e.target.value)
    renderEchartsRight2(right2, right2Data, e.target.value)
  }

  function onChangeMoMYoy(e: any) {
    setGrossMoM(!grossMoM)
    renderEchartsCenter3(center3, RatioDataByCompany, e.target.value)
  }

  const cleanTimer = () => {
    if (amusementTimer) {
      clearInterval(amusementTimer)
    }
  }

  const renderPage = () => {
    getTodayData({ period, companySn, dataType }).then((res) => {
      const { data = {} } = res
      //console.log('当天全部即时汇总', data)
      setList1(data)
    })

    getTodayGross({ period, companySn, dataType }).then((res) => {
      const { data = {} } = res
      //console.log('当天全部累计同比汇总', data)
      setList2(data)
    })

    getGrossDetailByCompany({ period, dataType }).then((res) => {
      const { data = [] } = res
      const arr = data.filter((item) => POSITION[item?.casinoName])
      setSistogramList(arr)
      //console.log('地图数据', data)
      if (data.length && !mounting.current) {
        mounting.current = true
        setIndex(0)
      }
    })

    getGrossByDayWithMonth({ period, dataType }).then((res) => {
      const { data = [] } = res
      //console.log('全部中机器運營趨勢', data)
      renderEchartsMiddle(middleList, data)
    })

    // 中机器單枱收益對比
    getCompanyGross({ period, dataType }).then((res) => {
      const { data = [] } = res
      //console.log('中机器單枱收益對比', data)
      // const newData = companySort(data)
      const newData = data
      setRight2Data(newData)
      renderEchartsRight2(right2, newData)
    })

    // 中机器数量对比
    getOpenNumberToday({ period, dataType }).then((res) => {
      const { data = [] } = res
      //console.log('中机器数量对比', data)
      // const newData = companySort(data)
      const newData = data
      renderEchartsRight1(right1, newData)
    })

    // 中机器遊戲類型運營狀況
    getTodayOperationData({ period, dataType }).then((res) => {
      const { data = [] } = res
      //console.log('中机器遊戲類型運營狀況', data)
      // const newData = companySort(data)
      const newData = data
      renderEchartsRight3(right3, newData)
    })

    // 毛收入排名
    getTodayCompanyGrossSeq({ period, dataType }).then((res) => {
      const { data = [] } = res
      //console.log('毛收入排名', data)
      setGrossIncomeRank(data)
    })

    // 运行排名
    getTodayTableMachineData({ period, dataType }).then((res) => {
      const { data = [] } = res
      //console.log('运行排名', data)
      const table = data && data.table
      const slot = data && data.slot
      const _table = _.sortBy(table, function (o) {
        return -o.rate_by_table
      })
      const _slot = _.sortBy(slot, function (o) {
        return -o.rate_by_slot
      })
      setTableMachineData({
        slot: _slot,
        table: _table,
      })
    })

    // 毛收入同环比
    getRatioData({ period, dataType }).then((res) => {
      const { data = [] } = res
      //console.log('毛收入同环比', data)
      // const newData = companySort(data)
      const newData = data
      setRatioDataByCompany(newData)
      renderEchartsCenter3(center3, newData)
    })

    // XXX毛收入
    getTodayBusinessTypeGross({ period, dataType }).then((res) => {
      const { data = [] } = res
      //console.log('XXX毛收入', data)
      // const newData = companySort(data)
      const newData = data
      setTable_gross_opening(true)
      setBusinessType('all')
      setCompanyTodayBusinessTypeGross(newData)
      renderEchartsCenter2(center_income_2, newData)
      renderEchartsCenter2_1(center2_1, newData)
      renderEchartsCenter2_2(center2_2, newData)
      setTable_opening_all(true)
    })
  }

  const onClick = () => {
    history.push('/company')
  }

  const init = () => {
    renderPage()
  }

  useEffect(() => {
    if (token && period && dataType) {
      cleanTimer()
      init()
      amusementTimer = setInterval(() => {
        init()
      }, DEFAULT_INTERVAL)
    }
    return () => {
      cleanTimer()
    }
  }, [token, period, dataType])

  const changeTab = (v: any) => {
    setTabType(v)
  }

  useEffect(() => {
    changeTab('T1')
  }, [dataType])

  const timer = useRef()

  return (
    <div className="common_wrapper home aom_company">
      <Header />
      <div className="home_list">
        <div className="list_item list_item_1">
          <div className="img img_1">
            <img
              // eslint-disable-next-line global-require
              src={require('../../static/images/home/list_item_1.png')}
              alt=""
            />
          </div>
          <div>
            <div className="text">
              <span className="number">
                {/* {formatNumber(list1?.gross)?.number} */}
                <CountUp isCounting end={49.59} duration={2} decimals={2} />
              </span>
              <span className="unit">百万</span>
            </div>
            <div className="title">XXXX收入</div>
          </div>
          <div className="img img_2">
            <img
              // eslint-disable-next-line global-require
              src={require('../../static/images/home/list_item_2.png')}
              alt=""
            />
          </div>
          <div>
            <div className="text">
              <span className="number">
                <CountUp isCounting end={49.59} duration={2} decimals={2} />
              </span>
              <span className="unit">百万</span>
            </div>
            <div className="title">XXXX毛收入</div>
          </div>
          <div className="img img_3">
            <img
              // eslint-disable-next-line global-require
              src={require('../../static/images/home/list_item_7.png')}
              alt=""
            />
          </div>
          <div>
            <div className="text">
              <span className="number">
                <CountUp isCounting end={49.59} duration={2} decimals={2} />
              </span>
              <span className="unit">百万</span>
            </div>
            <div className="title">XXXX毛收入</div>
          </div>
        </div>

        <div className="list_item list_item_2">
          <div style={{ display: 'flex', width: '50%' }}>
            <div className="img">
              <img
                // eslint-disable-next-line global-require
                src={require('../../static/images/home/list_item_5.png')}
                alt=""
              />
            </div>
            <div>
              <div className="text" style={{ marginBottom: 8 }}>
                <span className="number">
                  <CountUp isCounting end={49.59} duration={2} decimals={2} />
                </span>
                <span className="unit">
                  {convertInto(list2?.pre_gross_by_month)?.unit}
                </span>
                <img
                  className="arrow"
                  // eslint-disable-next-line import/no-dynamic-require, global-require
                  src={require(`../../../public/images/home/rise.png`)}
                />
                <span
                  className={
                    (1 || 0) >= 0 ? 'up_value percent' : 'down_value percent'
                  }
                >
                  {/* {(parseFloat(list2?.pre_rate_by_month) * 100).toFixed(2)} */}
                  <CountUp isCounting end={49.59} duration={2} decimals={2} />
                </span>
                <span
                  className={
                    (list2?.pre_rate_by_month || 0) >= 0
                      ? 'up_value sign'
                      : 'down_value sign'
                  }
                >
                  %
                </span>
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: 14,
                    verticalAlign: 'middle',
                  }}
                >
                  同比
                </span>
              </div>
              <div className="title">XXXX毛收入</div>
            </div>
          </div>
          <div style={{ display: 'flex', width: '50%' }}>
            <div className="img">
              <img
                // eslint-disable-next-line global-require
                src={require('../../static/images/home/list_item_6.png')}
                alt=""
              />
            </div>
            <div>
              <div className="text" style={{ marginBottom: 8 }}>
                <span className="number">
                  <CountUp isCounting end={49.59} duration={2} decimals={2} />
                </span>
                <span className="unit">
                  {convertInto(list2?.gross_to_month_end)?.unit}
                </span>

                <img
                  className="arrow"
                  // eslint-disable-next-line import/no-dynamic-require, global-require
                  src={require(`../../../public/images/home/${
                    (1 || 0) >= 0 ? 'rise' : 'decline'
                  }.png`)}
                />
                <span
                  className={
                    (1 || 0) >= 0 ? 'up_value percent' : 'down_value percent'
                  }
                >
                  <CountUp isCounting end={49.59} duration={2} decimals={2} />
                </span>
                <span
                  className={
                    (2 || 0) >= 0 ? 'up_value sign' : 'down_value sign'
                  }
                >
                  %
                </span>
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: 14,
                    verticalAlign: 'middle',
                  }}
                >
                  同比
                </span>
              </div>
              <div className="title">XXXX毛收入</div>
            </div>
          </div>
        </div>
        <div className="list_item list_item_3">
          <div className="img">
            <img
              // eslint-disable-next-line global-require
              src={require('../../static/images/home/list_item_4.png')}
              alt=""
            />
          </div>
          <div>
            <div className="text">
              <span className="number">
                <CountUp isCounting end={49.59} duration={2} decimals={0} />
              </span>
              <span className="unit">台</span>
            </div>
            <div className="title">XXXX数量</div>
          </div>

          <div className="img">
            <img
              // eslint-disable-next-line global-require
              src={require('../../static/images/home/list_item_3.png')}
              alt=""
            />
          </div>
          <div>
            <div className="text">
              <span className="number">
                {Number(list1?.open_number_slot) !== 0 ? (
                  <CountUp isCounting end={49.59} duration={2} decimals={0} />
                ) : (
                  '--'
                )}
              </span>
              <span className="unit">部</span>
            </div>
            <div className="title">XXXX数量</div>
          </div>
        </div>
      </div>
      <div className="home_tab">
        {HOME_TAB_DATA.map((d) => {
          return (
            <div
              key={d.value}
              className={tabType === d.value ? 'active' : ''}
              onClick={() => changeTab(d.value)}
            >
              {d.name}
            </div>
          )
        })}
      </div>
      <div className="home_left">
        {tabType === 'T1' ? (
          <>
            <div className="echart_list echart_list_1">
              <div className="title">XXX排名</div>
              <div className="table_content">
                <div className="table">
                  <div className="table-item">
                    <div>No.</div>
                    <div>公司</div>
                    <div>毛收入(百万)</div>
                    <div>占比</div>
                    <div>更新时间</div>
                  </div>
                  <div className="table-top">
                    {grossIncomeRank?.length
                      ? grossIncomeRank.map((number, i) => {
                          return (
                            <div className="table-item" key={i}>
                              <div className={`rank${i}`}>
                                {i > 2 ? i + 1 : ''}
                              </div>
                              <div>{number.company}</div>
                              <div
                                style={{ textAlign: 'right', paddingRight: 25 }}
                              >
                                {eMillion(number.gross)}
                              </div>
                              <div>{ePercentage(number.gross_rate)}</div>
                              <div>
                                {number.created_at
                                  ? number.created_at.substring(0, 5)
                                  : '--'}
                              </div>
                            </div>
                          )
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="echart_list echart_list_2">
              <div className="title">XXXX毛收入</div>
              <div
                style={{ width: 300 }}
                className={table_gross_opening ? '' : 'hiden'}
              >
                <ReactECharts
                  option={center_income_2}
                  ref={echartsRefCenter2}
                />
              </div>
              <div className={table_gross_opening ? 'gross' : 'gross hiden'}>
                <div className="Proportion_table_opening_legend_li">
                  <div>
                    <div className="legend_ball" />
                  </div>
                  <div>机器</div>
                  <div />
                  <div>
                    {convertInto(TodayBusinessTypeGross?.grossNum?.VIP)?.number}
                    <span>
                      {convertInto(TodayBusinessTypeGross?.grossNum?.VIP)?.unit}
                    </span>
                  </div>
                </div>
                <div className="Proportion_table_opening_legend_li">
                  <div>
                    <div className="legend_ball" />
                  </div>
                  <div>中机器</div>
                  <div />
                  <div>
                    {convertInto(TodayBusinessTypeGross?.grossNum?.MS)?.number}
                    <span>
                      {convertInto(TodayBusinessTypeGross?.grossNum?.MS)?.unit}
                    </span>
                  </div>
                </div>
                <div className="Proportion_table_opening_legend_li">
                  <div>
                    <div className="legend_ball" />
                  </div>
                  <div>小机器</div>
                  <div />
                  <div>
                    {Number(
                      convertInto(TodayBusinessTypeGross?.grossNum?.Slot)
                        ?.number,
                    ) === 0
                      ? '--'
                      : convertInto(TodayBusinessTypeGross?.grossNum?.Slot)
                          ?.number}
                    <span>
                      {
                        convertInto(TodayBusinessTypeGross?.grossNum?.Slot)
                          ?.unit
                      }
                    </span>
                  </div>
                </div>
              </div>
              <div
                // style={{ width: 300 }}
                className={table_gross_opening ? 'hiden' : ''}
              >
                <ReactECharts
                  option={center_income_2_1}
                  ref={echartsRefCenterIncome_2_1}
                />
              </div>
              <div className="Proportion_table_opening_btn Proportion_table_opening_radio left2_btn">
                <Radio.Group
                  // eslint-disable-next-line react/jsx-no-bind
                  onChange={onBusinessTypeChange}
                  value={BusinessType}
                >
                  <Radio.Button value="all">全部毛收入</Radio.Button>
                  <Radio.Button value="VIP">机器</Radio.Button>
                  <Radio.Button value="MS">中机器</Radio.Button>
                  <Radio.Button value="Slot">小机器</Radio.Button>
                </Radio.Group>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="echart_list echart_list_1">
              <div className="Ranking_List_Btn">
                <Radio.Group onChange={machineOnChange} defaultValue="a">
                  <Radio.Button value="a">中机器</Radio.Button>
                  <Radio.Button value="b">小机器</Radio.Button>
                </Radio.Group>
              </div>
              <div className="title">运行排名</div>
              <div className="table_content">
                <div className="table">
                  <div className="table-item">
                    <div>No.</div>
                    <div>公司</div>
                    <div>运行/分配數</div>
                    <div>数量比例</div>
                    <div>运行比例</div>
                  </div>
                  <div className="table-top">
                    {tableMachineData &&
                      (
                        tableMachineData[table_slot ? 'table' : 'slot'] || []
                      ).map((number, i) => {
                        const _type = table_slot ? 'table' : 'slot'
                        return (
                          <div className="table-item" key={number.company}>
                            <div className={`rank${i}`}>
                              {i > 2 ? i + 1 : ''}
                            </div>
                            <div>{number.company}</div>
                            <div>{number[`text_by_${_type}`]}</div>
                            <div>{ePercentage(number[`rate_by_${_type}`])}</div>
                            <div>
                              {ePercentage(number[`open_rate_by_${_type}`])}
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            </div>
            <>
              <div className="echart_list echart_list_2">
                <div className="title">运行数</div>
                <div
                  className={table_opening_all ? '' : 'hiden'}
                  style={{ width: 300 }}
                >
                  <ReactECharts option={center2_1} ref={echartsRefCenter2_1} />
                </div>
                <div className={table_opening_all ? 'gross' : 'gross hiden'}>
                  <div className="Proportion_table_opening_legend_li">
                    <div>
                      <div className="legend_ball" />
                    </div>
                    <div>机器</div>
                    <div />
                    <div>
                      {TodayBusinessTypeGross?.tableNum?.VIP}
                      <span>台</span>
                    </div>
                  </div>
                  <div className="Proportion_table_opening_legend_li">
                    <div>
                      <div className="legend_ball" />
                    </div>
                    <div>中机器</div>
                    <div />
                    <div>
                      {TodayBusinessTypeGross?.tableNum?.MS}
                      <span>台</span>
                    </div>
                  </div>
                  <div className="Proportion_table_opening_legend_li">
                    <div>
                      <div
                        className="legend_ball"
                        style={{ backgroundColor: '#88a1c2' }}
                      />
                    </div>
                    <div>未运行中机器</div>
                    <div />
                    <div>
                      {TodayBusinessTypeGross?.tableNum?.unOpenNumber}
                      <span>台</span>
                    </div>
                  </div>
                </div>
                <div className={table_opening_all ? 'left2 hiden' : 'left2'}>
                  <ReactECharts option={center2_2} ref={echartsRefCenter2_2} />
                </div>
                {table_switch === 'table' && (
                  <div className="Proportion_table_opening_btn Proportion_table_opening_radio table_btn">
                    <Radio.Group onChange={onChange} defaultValue="all">
                      <Radio.Button value="all">全部中机器</Radio.Button>
                      <Radio.Button value="VIP">机器</Radio.Button>
                      <Radio.Button value="MS">中机器</Radio.Button>
                      {/* <Radio.Button value="Slot">小机器</Radio.Button> */}
                    </Radio.Group>
                  </div>
                )}
                <div className="Gambling_machine_btn left2_machine_btn">
                  <Radio.Group
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={onChangeMachineTable}
                    value={table_switch}
                  >
                    <Radio.Button value="table">中机器</Radio.Button>
                    <Radio.Button value="machine">小机器</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
            </>
          </>
        )}
        <div className="echart_list echart_list_3">
          <div className="Ranking_List_Btn">
            <Radio.Group onChange={onChangeMoMYoy} defaultValue="grossTbRate">
              <Radio.Button value="grossTbRate">同比</Radio.Button>
              <Radio.Button value="grossHbRate">环比</Radio.Button>
            </Radio.Group>
          </div>
          <div className="title">毛收入同环比</div>
          <div>
            <ReactECharts
              option={center3}
              theme="defaultTheme"
              ref={echartsRefCenter3}
            />
          </div>
        </div>
      </div>
      {/* 开枱数 */}

      {/* 开枱数  END */}
      <div
        className="home_middle"
        style={{ width: 1920, height: 1080, left: 0, top: 0, zIndex: -1 }}
      ></div>
      <div className="map_info" onClick={onClick}>
        <div className="title">
          <span className="titile_cn">XXX公司</span>
          <span className="titile_en">（information）</span>
        </div>
        <div className="map_info_content">
          {/* <img src={require('./../../static/images/home/amusement.png')} /> */}
          <img src={require('../../static/images/home/amusement.png')} />
          <div className="map_info_content_right">
            <div>
              <span className="info">毛收入：</span>
              <span className="num orange">
                {formatData(sistogramItem.gross, 2, 1000000)}
              </span>
              <span className="unit">百万</span>
            </div>
            <div>
              <span className="info">中机器运行数量：</span>
              <span className="num purple">
                {sistogramItem.tableOpenNumber}
              </span>
              <span className="unit">台</span>
            </div>
            <div>
              <span className="info">机器运行数量：</span>
              <span className="num purple" style={{ color: '#19D1C0' }}>
                {Number(sistogramItem.slotOpenNumber) !== 0
                  ? sistogramItem.slotOpenNumber
                  : '--'}
              </span>
              <span className="unit">部</span>
            </div>
          </div>
        </div>
      </div>

      <div className="business_trends">
        <div className="title" style={{ position: 'absolute' }}>
          全部业务运行分析
        </div>
        <div>
          <ReactECharts
            option={middleList}
            theme="defaultTheme"
            ref={echartsRefMiddle}
          />
        </div>
      </div>

      <div className="home_right">
        <div className="home_right_title">运行情況</div>
        <div className="echart_list echart_list_4">
          <div className="title">中机器数量对比</div>
          <div>
            <ReactECharts
              ref={echartsRefRight1}
              option={right1}
              theme="defaultTheme"
            />
          </div>
        </div>
        <div className="echart_list echart_list_5">
          {/* 业务單枱/單機毛收入對比 */}
          <div className="title">中机器对比</div>
          <div>
            <ReactECharts
              option={right2}
              ref={echartsRefRight2}
              theme="defaultTheme"
            />
          </div>
          <div
            className="Proportion_table_opening_btn"
            style={{
              right: 8,
              top: 9,
              width: 'unset',
              left: 'unset',
              height: 'unset',
            }}
          >
            <Radio.Group
              // eslint-disable-next-line react/jsx-no-bind
              onChange={onRight2TypeChange}
              value={right2Type}
            >
              <Radio.Button value="VIP">机器</Radio.Button>
              <Radio.Button value="MS">中机器</Radio.Button>
              {/* <Radio.Button value="Slot">小机器</Radio.Button> */}
            </Radio.Group>
          </div>
        </div>
        <div className="echart_list echart_list_6">
          <div className="title">中机器运行状态</div>
          <ReactECharts
            option={right3}
            ref={echartsRefRight3}
            theme="defaultTheme"
          />
        </div>
      </div>
    </div>
  )
}
