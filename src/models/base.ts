import { useEffect, useState } from 'react'
import moment from 'moment'
import {
  DEFAULT_DATA_TYPE,
  LOCAL_COMPANY,
  LOCAL_DATA_TYPE,
  LOCAL_PERIOD,
} from '@/constant'
import { getCompanyList, ICompanyItem } from '@/services/common'

const useBase = () => {
  const [dataType, setDataType] = useState<string>('')
  const [period, setPeriod] = useState<string>('')
  const [companySn, setCompanySn] = useState<string>('')
  const [companyList, setCompanyList] = useState<ICompanyItem[]>([])

  useEffect(() => {
    if (companySn) {
      localStorage.setItem(LOCAL_COMPANY, companySn)
    }
  }, [companySn])

  useEffect(() => {
    if (period) {
      localStorage.setItem(LOCAL_PERIOD, period)
    }
  }, [period])

  useEffect(() => {
    if (dataType) {
      localStorage.setItem(LOCAL_DATA_TYPE, dataType)
    }
  }, [dataType])

  useEffect(() => {
    const lc = localStorage.getItem(LOCAL_COMPANY)
    if (lc) {
      setCompanySn(lc)
    }
    const lp = localStorage.getItem(LOCAL_PERIOD)
    if (lp) {
      setPeriod(lp)
    } else {
      setPeriod(moment().format('YYYY-MM-DD'))
    }
    const ld = localStorage.getItem(LOCAL_DATA_TYPE)
    if (ld) {
      setDataType(ld)
    } else {
      setDataType(DEFAULT_DATA_TYPE)
    }
  }, [])

  return {
    dataType,
    setDataType,
    companySn,
    setCompanySn,
    period,
    setPeriod,
    companyList,
    setCompanyList,
  }
}

export default useBase
