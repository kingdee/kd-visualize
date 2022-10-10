import { useModel } from 'umi'
import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import defaultTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-default.js'

import _ from 'lodash'
import { Radio } from '@kdcloudjs/kdesign'
import moment from 'moment'
import { DEFAULT_INTERVAL } from '@/constant'
import { DefaultOption as right1 } from '@/pages/company/data/right1'

import { DefaultOption as right3 } from '@/pages/company/data/right3'

import { DefaultOption as center3 } from '@/pages/company/data/center3'

import { DefaultOption as left3 } from '@/pages/company/data/left3'

import Header from '@/components/header'

import TableOpening from '@/pages/company/tableOpening'

import BusinessTypeGross from '@/pages/company/BusinessTypeGross'
import RevenueFromSingleGamingTable from '@/pages/company/RevenueFromSingleGamingTable'

import CompInfor from '@/pages/company/CompInfor'
import { autoScroll, tenThousandShortTerm, eMillionShortTerm } from '@/utils'
import {
  CompanyTodayCasinoGrossSeq,
  getTableDataByCasinoAndBusinessType,
  getGrossByDayAndCompany,
  CompanyTodayCasionOpenSeq,
  getRatioDataByCompany,
  getOpenNumberToday,
  getTodayOperationData,
} from '@/services/company'

import './index.less'
import location from '@/static/images/company/comp_location.png'

let timer1: string | number | NodeJS.Timeout | undefined
let timer2: string | number | NodeJS.Timeout | undefined
let companyPageRefresh: string | number | NodeJS.Timeout | undefined

export default function IndexPage() {
  echarts.registerTheme('defaultTheme', defaultTheme)
  const { token } = useModel('token')
  const { period, dataType, companySn, companyList } = useModel('base')

  const [leftData1, setLeftData1] = useState({})
  const [Gross_income, setGross_income] = useState(true)
  const [table_slot, setTable_slot] = useState(true)
  const [TodayHb, setTodayHb] = useState({})
  const [grossIncomeRank, setGrossIncomeRank] = useState([])
  const [companyName, setCompanyName] = useState('')
  const [TodayCasionOpenSeq, setTodayCasionOpenSeq] = useState([])
  const [RatioDataByCompany, setRatioDataByCompany] = useState([])
  const [TableBase, setTableBase] = useState('')

  const echartsRefLeft3 = useRef(null)
  const echartsRefCenter3 = useRef(null)
  const echartsRefRight1 = useRef(null)
  const echartsRefRight3 = useRef(null)

  // VIP业务
  const [
    TableDataByCasinoAndBusinessType,
    setTableDataByCasinoAndBusinessType,
  ] = useState([])

  // XXX同环比
  const [grossMoM, setGrossMoM] = useState('grossTbRate')

  function machineOnChange(e) {
    setTable_slot(!table_slot)
    // console.log(`machineOnChange: ${e.target.value}`)
  }

  function Gross_income_swicth() {
    setGross_income(!Gross_income)
    // setTable_opening_all(true)

    setTimeout(function () {
      if (!Gross_income) {
        clearInterval(timer1)
        timer1 = autoScroll('ScrollIncomeOne')
      } else {
        clearInterval(timer2)
        timer2 = autoScroll('ScrollIncomeTwo')
      }
    }, 200)
  }

  const getCompanyName = (_companySn, _companyList) => {
    if (_companyList && _companySn) {
      const company = _.find(_companyList, { companySn: _companySn })

      if (company) setCompanyName(company.companyName)
    }
  }

  // 公司业务运行分析
  const renderEchartsLeft3 = (option, _data) => {
    //  console.log('    //公司业务运行分析', _data)
    option.xAxis[0].data = _.map(_data, 'gamingDay')
    option.series[0].data = _.map(_data, 'vipGross')
    option.series[1].data = _.map(_data, 'msGross')
    option.series[2].data = _.map(_data, 'sumGross')
    option.series[3].data = _.map(_data, 'slotGross')
    option.series[4].data = _.map(_data, 'gross')

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
    delete option.grid

    //console.log('公司业务运行分析', option)

    echartsRefLeft3?.current.getEchartsInstance().setOption(option, true)
  }

  // XXX同环比
  const renderEchartsCenter3 = (option, _data, _type = 'grossTbRate') => {
    _data = _data.filter((d) => d.isShow === 1)
    _data.sort((a, b) => a.seq - b.seq)

    option.xAxis[0].data = _.map(_data, 'casinoName')
    option.series[0].data = _.map(_data, 'gross')
    option.series[1].data = _.map(
      _data,
      _type === 'grossTbRate' ? 'grossTb' : 'grossHb',
    )
    option.series[0].data = _.map(option.series[0].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })
    option.series[1].data = _.map(option.series[1].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })

    option.series[2].data = _.map(_data, _type)

    option.series[2].data = _.map(option.series[2].data, function (n) {
      return (parseFloat(`${n}`) * 100).toFixed(2)
    })

    // console.log('XXX同环比', _data)

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
    // grossMoM   grossTbRate    同比
    //   yoy   grossHbRate    环比

    delete option.grid

    // console.log(JSON.stringify(option))
    echartsRefCenter3?.current.getEchartsInstance().setOption(option, true)
  }

  // XXX同环比
  function onChangeMoMYoy(e) {
    // console.log('XXX同环比', e.target.value)
    setGrossMoM(e.target.value)
    renderEchartsCenter3(center3, RatioDataByCompany, e.target.value)
  }

  const renderEchartsRight1 = (option: any, _data: any) => {
    _data = _.filter(_data, function (o) {
      return o.casinoName !== '摩卡'
    })

    _data = _data.filter((d) => d.isShow === 1)
    _data.sort((a, b) => a.seq - b.seq)

    option.xAxis[0].data = _.map(_data, 'casinoName')
    option.series[0].data = _.map(_data, 'openNumberOverBase')
    option.series[1].data = _.map(_data, 'openNumberUnderBase')
    option.series[2].data = _.map(_data, 'overRate')
    delete option.grid
    // console.log('grossMoM',grossMoM)

    option.series[2].data = _.map(option.series[2].data, function (n) {
      return (parseFloat(n) * 100).toFixed(2)
    })

    if (!_.isUndefined(_data[0].tableBase))
      setTableBase((parseFloat(_data[0].tableBase) / 10000).toFixed(2))

    echartsRefRight1?.current?.getEchartsInstance()?.setOption(option, true)
  }

  const renderEchartsRight3 = (option: any, _data: any) => {
    option.xAxis[0].data = _.map(_data, 'game_type_name')
    option.series[0].data = _.map(_data, 'gross')
    option.series[1].data = _.map(_data, 'open_rate')
    delete option.grid
    option.series[0].data = _.map(option.series[0].data, function (n) {
      return (parseFloat(n) / 1000000).toFixed(2)
    })
    option.series[1].data = _.map(option.series[1].data, function (n) {
      return (parseFloat(n) * 100).toFixed(2)
    })

    if (echartsRefRight3.current) {
      echartsRefRight3.current?.getEchartsInstance()?.setOption(option, true)
    }
  }

  const renderPage = () => {
    CompanyTodayCasinoGrossSeq({
      period,
      companyNum: companySn,
      dataType,
    }).then((res) => {
      const { data = [] } = res
      setGrossIncomeRank(data)
      clearInterval(timer1)
      timer1 = autoScroll('ScrollIncomeOne')
    })

    getTableDataByCasinoAndBusinessType({
      period,
      companySn,
      dataType,
    }).then((res) => {
      const { data = [] } = res
      setTableDataByCasinoAndBusinessType(data)
      // console.log('left2222', data)
    })

    // 公司业务运行分析
    getGrossByDayAndCompany({
      period,
      companySn,
      dataType,
    }).then((res) => {
      const { data = [] } = res
      renderEchartsLeft3(left3, data)
    })

    CompanyTodayCasionOpenSeq({
      period,
      companyNum: companySn,
      dataType,
    }).then((res) => {
      const { data = [] } = res
      let table = data && data.table
      let slot = data && data.slot
      let _table = _.sortBy(table, function (o) {
        // return -parseInt(o.text_by_slot.split('/')[0])
        return -o.rate_by_table
      })
      let _slot = _.sortBy(slot, function (o) {
        // return -parseInt(o.text_by_slot.split('/')[0])
        return -o.rate_by_slot
      })

      _table = _.filter(_table, function (o) {
        return o.casion !== '摩卡'
      })

      //console.log('运行数排名', _slot, _table)

      setTable_slot(true)
      setTodayCasionOpenSeq({
        slot: _slot,
        table: _table,
      })
    })

    // XXX同环比
    getRatioDataByCompany({
      period,
      companySn,
      dataType,
    }).then((res) => {
      const { data = [] } = res
      setRatioDataByCompany(data)
      renderEchartsCenter3(center3, data)
    })

    // 业务运行数量对比
    getOpenNumberToday({ period, companySn, dataType }).then((res) => {
      const { data = [] } = res
      renderEchartsRight1(right1, data)
    })

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
    setGross_income(true)
    renderPage()
    //console.log(moment().format())
  }

  useEffect(() => {
    if (token && period && dataType && companySn && companyList) {
      getCompanyName(companySn, companyList)
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
  }, [token, period, dataType, companySn, companyList])

  // useEffect(() => {
  //   if (timer1) {
  //     clearInterval(timer1)
  //   }
  //   if (timer2) {
  //     clearInterval(timer2)
  //   }
  //   setGross_income(true)
  // }, [dataType])

  return (
    <div className="common_wrapper aom_company">
      <div className="common_header">
        <div>
          <Header />
        </div>
      </div>
      <CompInfor />

      <div className="companyName">XXX公司</div>

      {TableDataByCasinoAndBusinessType &&
        TableDataByCasinoAndBusinessType.map((number, i) => {
          const _classNameList = [
            'VIP_gambling_table',
            'Midfield_gambling_table',
            'Gambling_machine',
          ]
          const _tableList = {
            VIP业务: '业务',
            中型业务: '业务',
            小型业务: '小型业务',
          }
          const _incomeList = {
            VIP业务: '平均毛收入',
            中型业务: '平均毛收入',
            小型业务: '單機平均毛收入',
          }

          return (
            <div className={_classNameList[i]} key={number.businessType}>
              <div />
              <div>业务毛收入</div>
              <div>
                {eMillionShortTerm(number.gross)}
                <span>百万</span>
              </div>
              <div>{_tableList[number.businessName]}数量</div>
              <div>{_incomeList[number.businessName]}</div>
              <div>
                {tenThousandShortTerm(number?.openNumber, false)}
                <span>
                  {_classNameList[number.businessName] === 'Gambling_machine'
                    ? '部'
                    : '台'}
                </span>
              </div>
              <div>
                {tenThousandShortTerm(number?.avgGross)}
                <span>萬</span>
              </div>
            </div>
          )
        })}

      <div className="Business_trends">
        <div>公司业务运行分析</div>
      </div>

      <div className="Business_trends_echarts">
        <ReactECharts
          option={left3}
          theme="defaultTheme"
          ref={echartsRefLeft3}
        />
      </div>

      <div
        onClick={Gross_income_swicth}
        className={
          Gross_income
            ? 'Gross_revenue_switching'
            : 'Gross_revenue_switching income'
        }
      />

      {/* 毛收入 */}

      {Gross_income && (
        <>
          <div className="Ranking_number_tables_opened income">
            <div>毛收入排名</div>
            <div>
              <div className="rank_list_title">
                <div />
                <div>No.</div>
                <div>场地</div>
                <div>毛收入(百万)</div>
                <div>占比</div>
                <div>更新时间</div>
              </div>

              {grossIncomeRank &&
                grossIncomeRank.map((number, i) => {
                  if (i < 3)
                    return (
                      <div className="rank_list_li" key={number.casion}>
                        <div />
                        <div className={`rank${i}`}>{i > 2 ? i + 1 : ''}</div>
                        <div />
                        <div>{number?.casion}</div>
                        <div>
                          {(parseFloat(number?.gross) / 1000000).toFixed(2)}
                        </div>
                        <div />
                        <div>
                          {`${(parseFloat(number?.gross_rate) * 100).toFixed(
                            2,
                          )}%`}
                        </div>
                        <div>
                          {number?.created_at
                            ? number?.created_at.substring(0, 5)
                            : '--'}
                        </div>
                      </div>
                    )
                })}

              <div id="ScrollIncomeOne">
                {grossIncomeRank &&
                  grossIncomeRank.map((number, i) => {
                    if (i > 2)
                      return (
                        <div className="rank_list_li" key={number.casion}>
                          <div />
                          <div className={`rank${i}`}>{i > 2 ? i + 1 : ''}</div>
                          <div />
                          <div>{number?.casion}</div>
                          <div>
                            {(parseFloat(number?.gross) / 1000000).toFixed(2)}
                          </div>
                          <div />
                          <div>
                            {`${(parseFloat(number?.gross_rate) * 100).toFixed(
                              2,
                            )}%`}
                          </div>
                          <div>
                            {number?.created_at
                              ? number?.created_at.substring(0, 5)
                              : '--'}
                          </div>
                        </div>
                      )
                  })}
              </div>
            </div>
          </div>

          {/* <Income /> */}
          <BusinessTypeGross />
        </>
      )}

      {/* 毛收入  END */}

      {/* 开枱数 */}

      {!Gross_income && (
        <>
          <div className="Ranking_number_tables_opened tables_opened">
            <div>运行数排名</div>
            <div>
              <div className="rank_list_title">
                <div />
                <div>No.</div>
                <div>场地</div>
                <div>运行/分配數</div>
                <div>数量佔比</div>
                <div>运行佔比</div>
              </div>

              {TodayCasionOpenSeq[table_slot ? 'table' : 'slot'].map(
                (number, i) => {
                  const _type = table_slot ? 'table' : 'slot'
                  if (i < 3)
                    return (
                      <div className="rank_list_li" key={number.created_at}>
                        <div />
                        <div className={`rank${i}`}>{i > 2 ? i + 1 : ''}</div>
                        <div />
                        <div style={{ textAlign: 'left' }}>{number.casion}</div>
                        <div>{number[`text_by_${_type}`]}</div>
                        <div />

                        <div>
                          {`${(
                            parseFloat(number[`rate_by_${_type}`]) * 100
                          ).toFixed(2)}%`}
                        </div>
                        <div>
                          {`${(
                            parseFloat(number[`open_rate_by_${_type}`]) * 100
                          ).toFixed(2)}%`}
                        </div>
                      </div>
                    )
                },
              )}

              <div id="ScrollIncomeTwo">
                {TodayCasionOpenSeq[table_slot ? 'table' : 'slot'].map(
                  (number, i) => {
                    const _type = table_slot ? 'table' : 'slot'
                    if (i > 2)
                      return (
                        <div className="rank_list_li" key={number.created_at}>
                          <div />
                          <div className={`rank${i}`}>{i > 2 ? i + 1 : ''}</div>
                          <div />
                          <div style={{ textAlign: 'left' }}>
                            {number.casion}
                          </div>
                          <div>{number[`text_by_${_type}`]}</div>
                          <div />
                          <div>
                            {`${(
                              parseFloat(number[`rate_by_${_type}`]) * 100
                            ).toFixed(2)}%`}
                          </div>
                          <div>
                            {`${(
                              parseFloat(number[`open_rate_by_${_type}`]) * 100
                            ).toFixed(2)}%`}
                          </div>
                        </div>
                      )
                  },
                )}
              </div>
            </div>
          </div>
          <div className="Ranking_List_Btn">
            <Radio.Group onChange={machineOnChange} defaultValue="a">
              <Radio.Button value="a">业务</Radio.Button>
              <Radio.Button value="b">小型业务</Radio.Button>
            </Radio.Group>
          </div>
          <TableOpening />
        </>
      )}

      {/* 开枱数  END */}

      <div className="Estimated_growth_rate">
        <div>XXX同环比</div>
        <div />
      </div>

      <div className="Estimated_growth_rate_echart">
        <ReactECharts
          option={center3}
          theme="defaultTheme"
          ref={echartsRefCenter3}
        />
      </div>

      <div className="Estimated_growth_rate_btn">
        <Radio.Group onChange={onChangeMoMYoy} defaultValue="grossTbRate">
          <Radio.Button value="grossTbRate">同比</Radio.Button>
          <Radio.Button value="grossHbRate">环比</Radio.Button>
        </Radio.Group>
      </div>

      <div className="Operation_capacity_gaming_table">
        <div>业务运行数量对比</div>
        <div />
      </div>
      <div className="Operation_capacity_gaming_table_echart">
        <ReactECharts
          option={right1}
          theme="defaultTheme"
          ref={echartsRefRight1}
        />
      </div>

      <RevenueFromSingleGamingTable />

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
