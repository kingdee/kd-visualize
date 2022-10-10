import { useModel } from 'umi'
import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash'

import { tenThousandShortTerm, eMillionShortTerm } from '@/utils'
import { CompanyTodayData, CompanyTodayHb } from '@/services/company'
import comp from '@/static/images/company/comp.png'

import comp_up from '@/static/images/company/comp_up.png'
import comp_down from '@/static/images/company/comp_down.png'
import { useSetState } from 'ahooks'

import line4 from '@/static/images/company/line_4.png'
import line5 from '@/static/images/company/line_5.png'

const CompInfor: FC<{}> = () => {
  const { token } = useModel('token')
  const { period, dataType, companySn } = useModel('base')

  const [state, setState] = useSetState({
    gross: '--',
    gross_by_month: '--',
    open_number_table: '--',
    pre_gross_by_month: '--',
    avg_gross: '--',
    open_number_slot: '--',
    gross_to_month_end: '--',
    orgPic: comp,
    pre_rate_by_month: '--',
    pre_rate_to_month: '--',
  })

  const renderPage = () => {
    CompanyTodayData({ period, companyNum: companySn, dataType }).then(
      (res) => {
        const { data = [] } = res
        // setLeftData1(data)
        setState({
          gross: eMillionShortTerm(data?.gross),
          open_number_table: tenThousandShortTerm(
            data?.open_number_table,
            false,
          ),
          avg_gross: eMillionShortTerm(data?.avg_gross),
          open_number_slot: tenThousandShortTerm(data?.open_number_slot, false),
        })
      },
    )

    CompanyTodayHb({ period, companyNum: companySn, dataType }).then((res) => {
      const { data = [] } = res
      // setTodayHb(data)
      setState({
        gross_by_month: eMillionShortTerm(data?.gross_by_month),
        pre_gross_by_month: eMillionShortTerm(data?.pre_gross_by_month),
        gross_to_month_end: eMillionShortTerm(data?.gross_to_month_end),
        pre_rate_by_month: data?.pre_rate_by_month,
        pre_rate_to_month: data?.pre_rate_to_month,
      })
    })
  }

  useEffect(() => {
    if (token && period && dataType && companySn) {
      renderPage()
    }
  }, [token, period, dataType, companySn])

  return (
    <>
      <div className="comp_infor" />
      <div className="comp_orgPic">
        <img src={state.orgPic} />
      </div>
      <div className="comp_gross">
        <div className="comp_infor_card">
          <div>
            <div />
          </div>
          <div>XXX毛收入</div>
          <div>
            {state.gross}
            <span>百万</span>
          </div>
        </div>
      </div>

      <div className="comp_gross_by_month">
        <div className="comp_infor_card">
          <div>
            <div />
          </div>
          <div>XXX毛收入</div>
          <div>
            {state.gross_by_month}
            <span>百万</span>
          </div>
        </div>
      </div>

      <div className="comp_avg_gross">
        <div className="comp_infor_card">
          <div>
            <div />
          </div>
          <div>XXX毛收入</div>
          <div>
            {state.avg_gross}
            <span>百万</span>
          </div>
        </div>
      </div>

      <div className="comp_open_number_table">
        <div className="comp_infor_card">
          <div>
            <div className="Gaming_table_opens" />
          </div>
          <div>机器数量</div>
          <div>
            {state.open_number_table}
            <span>台</span>
          </div>
        </div>
      </div>

      <div className="comp_pre_gross_by_month">
        <div className="comp_infor_card">
          <div />
          <div>XXX毛收入</div>
          <div>
            {state.pre_gross_by_month}
            <span>百万</span>
          </div>
          <div>
            <span className="comp_infor_card_year_name">同比</span>
            {state.pre_rate_by_month !== '--' && (
              <img
                src={
                  parseFloat(state.pre_rate_by_month) > 0 ? comp_up : comp_down
                }
              />
            )}
            {state.pre_rate_by_month !== '--' && (
              <span
                className={`comp_infor_card_year_value ${
                  parseFloat(state.pre_rate_by_month) > 0
                    ? 'up_value'
                    : 'down_value'
                }`}
              >
                {`${(parseFloat(state.pre_rate_by_month) * 100).toFixed(2)} %`}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="comp_gross_to_month_end">
        <div className="comp_infor_card">
          <div />
          <div>XXX毛收入</div>
          <div>
            {state.gross_to_month_end}
            <span>百万</span>
          </div>
          <div>
            <span className="comp_infor_card_year_name">同比</span>
            {state.pre_rate_to_month !== '--' && (
              <img
                src={
                  parseFloat(state.pre_rate_to_month) > 0 ? comp_up : comp_down
                }
              />
            )}
            {state.pre_rate_to_month !== '--' && (
              <span
                className={`comp_infor_card_year_value ${
                  parseFloat(state.pre_rate_to_month) > 0
                    ? 'up_value'
                    : 'down_value'
                }`}
              >
                {`${(parseFloat(state.pre_rate_to_month) * 100).toFixed(2)} %`}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="comp_open_number_slot">
        <div className="comp_infor_card">
          <div>
            <div className="Gaming_table_opens" />
          </div>
          <div>机器数量</div>
          <div>
            {state.open_number_slot}
            <span>部</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompInfor
