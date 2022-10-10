import request, { IParams, IResult } from '@/services/index'

export interface ICompanyItem {
  companyName: string
  companySn: string
  isShow: number
  seq: number
  id: number
}

export function getCompanyList() {
  return request<IResult<ICompanyItem[]>>(
    `/ierp/kapi/app/dicj_analyze/getCompanyList`,
    {
      method: 'GET',
    },
  )
}
