import request from './index'

export interface IResult<T> {
  state: 'success' | 'error'
  data: T
  errorMsg: string
}

export interface IBase {
  success: boolean
  error_desc: string
  error_code: string
}

export interface IAppToken extends IBase {
  app_token: string
  expire_time: number
}

export interface IAccessToken extends IBase {
  access_token: string
  expire_time: number
}

const appTokenParams = {
  appId: 'dicj_analyze',
  appSecuret: 'OpoCh!wwGr3w%axk',
  tenantid: 'ambjj',
  accountId: '1402938521185946624',
  language: 'zh_TW',
}

const accessTokenParams = {
  user: '13631296956',
  apptoken: 'd37370c7-e6b4-467c-9444-920e07ccf334',
  tenantid: 'ambjj',
  accountId: '1402938521185946624',
  usertype: 'Mobile',
  language: 'zh_TW',
}

export function getAppToken() {
  return request<IResult<IAppToken>>(`/ierp/api/getAppToken.do`, {
    method: 'POST',
    data: appTokenParams,
    skipErrorHandler: true,
  })
}

export function getAccessToken(apptoken: string) {
  return request<IResult<IAccessToken>>(`/ierp/api/login.do`, {
    method: 'POST',
    data: {
      ...accessTokenParams,
      apptoken,
    },
    skipErrorHandler: true,
  })
}
