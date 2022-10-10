import request, { IResult, IParams } from './index'

export function CompanyTodayData(params: IParams) {
  return request<IResult>(`/ierp/kapi/app/dicj_analyze/CompanyTodayData`, {
    method: 'GET',
    params,
  })
}

export function CompanyTodayHb(params: IParams) {
  return request<IResult>(`/ierp/kapi/app/dicj_analyze/CompanyTodayHb`, {
    method: 'GET',
    params,
  })
}

// 当天某XXX公司按娱乐场毛收入排名
export function CompanyTodayCasinoGrossSeq(params: IParams) {
  return request<IResult>(
    `/ierp/kapi/app/dicj_analyze/CompanyTodayCasinoGrossSeq`,
    {
      method: 'GET',
      params,
    },
  )
}

// 当天某XXX公司各业务类型毛收入（业务及业务机）
// XXX毛收入
export function CompanyTodayBusinessTypeGross(params: IParams) {
  return request<IResult>(
    `/ierp/kapi/app/dicj_analyze/CompanyTodayBusinessTypeGross`,
    {
      method: 'GET',
      params,
    },
  )
}

// 某XXX公司按业务类型汇总收益及数目

export function getTableDataByCasinoAndBusinessType(params: IParams) {
  return request<IResult>(
    `/ierp/kapi/app/dicj_analyze/getTableDataByCasinoAndBusinessType`,
    {
      method: 'GET',
      params,
    },
  )
}

// 某XXX公司三个月每天业务毛收入、VIP毛收入、中场毛收入比对 ——————————业务運營趨勢
// 公司业务运行分析
export function getGrossByDayAndCompany(params: IParams) {
  return request<IResult>(
    `/ierp/kapi/app/dicj_analyze/getGrossByDayAndCompany`,
    {
      method: 'GET',
      params,
    },
  )
}

//当天某XXX公司按娱乐场统计业务开台占比及排名  业务 排行榜
export function CompanyTodayCasionOpenSeq(params: IParams) {
  return request<IResult>(
    `/ierp/kapi/app/dicj_analyze/CompanyTodayCasionOpenSeq`,
    {
      method: 'GET',
      params,
    },
  )
}

//XXX同环比
export function getRatioDataByCompany(params: IParams) {
  return request<IResult>(`/ierp/kapi/app/dicj_analyze/getRatioDataByCompany`, {
    method: 'GET',
    params,
  })
}

// 业务單枱/單機毛收入對比
export function getCompanyGross(params: IParams) {
  return request<IResult>(`/ierp/kapi/app/dicj_analyze/getTableDataByCompany`, {
    method: 'GET',
    params,
  })
}

//业务高/低於閾值開枱数量對比
export function getOpenNumberToday(params: IParams) {
  return request<IResult>(
    `/ierp/kapi/app/dicj_analyze/getOpenNumberByCompany`,
    {
      method: 'GET',
      params,
    },
  )
}

//业务运行状态
export function getTodayOperationData(params: IParams) {
  return request<IResult>(
    `/ierp/kapi/app/dicj_analyze/CompanyTodayOperationData`,
    {
      method: 'GET',
      params,
    },
  )
}
