import request, { IResult, IParams } from './index'

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
