import { FC, useEffect, useRef, useState } from 'react'
import { DatePicker, Icon, Input } from '@kdcloudjs/kdesign'
import { useOnClickOutside } from '@kdcloudjs/kdesign/lib/_utils/hooks'
import { DateType } from '@kdcloudjs/kdesign/es/date-picker/interface'
import { useModel, history } from 'umi'
import moment from 'moment'
import { Calendar } from 'antd-mobile'
import { DATA_TYPE_LIST, WEEK_LIST } from '@/constant'
import { getCompanyList } from '@/services/common'

import './usePopper.less'
import './index.less'

moment.locale('zh-cn')

const Header: FC<{}> = () => {
  const { hash: pathname } = location
  const { token } = useModel('token')
  const {
    dataType,
    setDataType,
    companySn,
    setCompanySn,
    period,
    setPeriod,
    companyList,
    setCompanyList,
  } = useModel('base')

  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [visiblePicker, setVisiblePicker] = useState<boolean>(false)
  const [day, setDay] = useState<string>('')
  const [week, setWeek] = useState<string>('')
  const [time, setTime] = useState<string[]>([
    '0',
    '0',
    ':',
    '0',
    '0',
    ':',
    '0',
    '0',
  ])
  const [temp, setTemp] = useState<DateType | null>(null)

  useEffect(() => {
    if (period) {
      setTemp(new Date(period))
    } else {
      setTemp(null)
    }
  }, [period])

  const changeType = (v: any) => {
    setDataType(v)
  }

  const changeTime = () => {
    const t = moment().format('HH:mm:ss')
    setTime(t.split(''))
  }

  const changeHandle = (c: string, url: string) => {
    if (c) {
      setCompanySn(c)
      setTimeout(() => {
        setVisible(false)
      })
    }
    if (pathname !== url) {
      history.push(url)
    }
  }

  const initPage = () => {
    const today = moment().format('YYYY-MM-DD')
    setDay(today)
    setWeek(WEEK_LIST[Number(moment().format('d'))])
    changeTime()
  }

  useOnClickOutside([ref1, ref2], () => {
    setVisible(false)
  })

  useOnClickOutside([ref3, ref4], () => {
    setVisiblePicker(false)
  })

  useEffect(() => {
    initPage()
  }, [])

  useEffect(() => {
    setVisible(false)
  }, [pathname])

  useEffect(() => {
    if (token) {
      getCompanyList().then((res) => {
        let { data = [] } = res
        if (data.length) {
          data = data.filter((d) => d.isShow === 1)
          data.sort((a, b) => a.seq - b.seq)
        }
        console.log('getCompanyList', data)
        setCompanyList(data || [])
      })
    }
    const timer = setInterval(() => {
      changeTime()
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [token])

  return (
    <div className="com-header">
      <div className="title">
        {/* <div className="logo" /> */}
        <div>智慧XX数字经营总览</div>
      </div>
      <div>
        <div className="menu" ref={ref2} onClick={() => setVisible(!visible)} />
        <div className="tab">
          {DATA_TYPE_LIST.map((d) => {
            return (
              <div
                key={d.value}
                className={dataType === d.value ? 'active' : ''}
                onClick={() => changeType(d.value)}
              >
                {d.name}
              </div>
            )
          })}
        </div>

        <div
          className="change-time"
          onClick={() => {
            setVisiblePicker(!visiblePicker)
          }}
        >
          <Input
            ref={ref3}
            addonAfter={<Icon type="date" />}
            readOnly
            value={period}
          />
        </div>
      </div>

      <div
        className={
          visiblePicker
            ? 'time-container time-container-show'
            : 'time-container'
        }
        ref={ref4}
      >
        <Calendar
          selectionMode="single"
          value={temp}
          onChange={(val) => {
            if (val) {
              setPeriod(moment(val).format('YYYY-MM-DD'))
            }
            setVisiblePicker(false)
          }}
        />
      </div>

      <div>
        <div className="time">
          {time.map((d, i) => {
            return (
              <div key={i} className={i === 2 || i === 5 ? '' : 'bg'}>
                {d}
              </div>
            )
          })}
        </div>
        <div className="date">
          <div>{week}</div>
          <div>{day}</div>
        </div>
      </div>
    </div>
  )
}

export default Header
