import request, { IResult, IParams } from './index'

export interface ITodayData {
  avg_gross?: number
  avg_gross_unit?: string
  gross?: number
  gross_unit?: string
  open_number_slot?: number
  open_number_table?: number
}

export function getTodayData(params: IParams) {
  return request<IResult<ITodayData[]>>(
    `/ierp/kapi/app/dicj_analyze/TodayData`,
    {
      method: 'GET',
      params,
    },
  )
}

export interface ITodayGross {
  pre_gross_by_month?: number
  pre_gross_by_month_unit?: string
  gross_to_month_end?: number
  gross_to_month_end_unit?: string
  pre_rate_by_month?: number
  pre_rate_to_month?: number
}

export function getTodayGross(params: IParams) {
  return request<IResult<ITodayGross[]>>(
    `/ierp/kapi/app/dicj_analyze/TodayGross`,
    {
      method: 'GET',
      params,
    },
  )
}

export interface IGrossDetailByCompany {
  casinoName?: string
  casinoSn?: string
  gross?: string | number
  openNumber?: number
  pic?: string
  tableOpenNumber?: number
  slotOpenNumber?: number
}

export function getGrossDetailByCompany(params: IParams) {
  return request<IResult<IGrossDetailByCompany[]>>(
    `/ierp/kapi/app/dicj_analyze/getGrossDetailByCompany`,
    {
      method: 'GET',
      params,
    },
  )
}

export interface IGrossByDayWithMonth {
  gamingDay: string
  vipGross: number // 贵宾毛收入
  sumGross: number // 业务收入
  msGross: string // 中场收入
}

export function getGrossByDayWithMonth(params: IParams) {
  return request<IResult<IGrossByDayWithMonth[]>>(
    `/ierp/kapi/app/dicj_analyze/getGrossByDayWithMonth`,
    {
      method: 'GET',
      params,
    },
  )
}

// 业务單枱收益對比
export interface ICompanyGross {
  avgGross: number // 平均单枱收益（毛收入）
  maxGross: number // 单枱收益（毛收入）最大值
  companySn: string // 公司编码
  gross: number // 统计毛收入
  companyName: string // 公司名称
}

export function getCompanyGross(params: IParams) {
  return request<IResult<ICompanyGross[]>>(
    `/ierp/kapi/app/dicj_analyze/getCompanyGross`,
    {
      method: 'GET',
      params,
    },
  )
}

// 业务高/低於閾值開枱数量對比
export interface IOpenNumberToday {
  companySn: string // 公司编码
  openNumberOverBase: number // 高于阈值开台数
  companyName: string // 公司名称
  openNumberUnderBase: number // 低于阈值开台数
  overRate: number // 占比
}

export function getOpenNumberToday(params: IParams) {
  return request<IResult<IOpenNumberToday[]>>(
    `/ierp/kapi/app/dicj_analyze/getOpenNumberToday`,
    {
      method: 'GET',
      params,
    },
  )
}

// 业务遊戲類型運營狀況
export interface ITodayOperationData {
  game_type_name: string // 业务游戏类型
  gross: number // 毛收入
  open_rate: number // 开台率
}

export function getTodayOperationData(params: IParams) {
  return request<IResult<ITodayOperationData[]>>(
    `/ierp/kapi/app/dicj_analyze/TodayOperationData`,
    {
      method: 'GET',
      params,
    },
  )
}

// 毛收入排名
export interface ITodayCompanyGrossSeq {
  gross: number // 毛收入
  gross_rate: number // 毛收入占比
  created_at: string // 更新时间
  company: string // XXX公司
}

export function getTodayCompanyGrossSeq(params: IParams) {
  return request<IResult<ITodayCompanyGrossSeq[]>>(
    `/ierp/kapi/app/dicj_analyze/TodayCompanyGrossSeq`,
    {
      method: 'GET',
      params,
    },
  )
}

// 開枱數排名
export interface ITodayTableMachineData {
  rate_by_slot: number // 业务机数目占比
  open_rate_by_slot: number // 业务机运营占比
  text_by_slot: string // 业务机运营/分配数
  open_number_by_slot: number // 业务机数目(开台)
  company: string // XXX公司
  open_number_by_table: number // 赌台数目(开台)
  open_rate_by_table: number // 业务运营占比
  text_by_table: string // 业务运营/分配数
  rate_by_table: number // 业务数目占比
}

export function getTodayTableMachineData(params: IParams) {
  return request<IResult<ITodayTableMachineData[]>>(
    `/ierp/kapi/app/dicj_analyze/TodayTableMachineData`,
    {
      method: 'GET',
      params,
    },
  )
}

// XXX同环比
export interface IRatioData {
  companySn: string // 公司编码
  grossHb: number // 上月毛收入
  openNumberHb: number // 上月开台数
  openNumberMoM: number // 开台数环比
  gross: number // 本月预计毛收入
  grossMoM: number // 毛收入环比
  companyName: string // 公司名称
  openNumber: number // 本月预计开台数
  openNumberYoY: number // 开台数同比
  grossYoY: number // 毛收入同比
  grossTb: number // XXXX毛收入
  openNumberTb: number // 去年同月开台数
}

export function getRatioData(params: IParams) {
  return request<IResult<IRatioData[]>>(
    `/ierp/kapi/app/dicj_analyze/getRatioData`,
    {
      method: 'GET',
      params,
    },
  )
}

// XXX毛收入
export function getTodayBusinessTypeGross(params: IParams) {
  return request<IResult<[]>>(
    `/ierp/kapi/app/dicj_analyze/TodayBusinessTypeGross`,
    {
      method: 'GET',
      params,
    },
  )
}
