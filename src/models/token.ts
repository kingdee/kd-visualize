import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Message } from '@kdcloudjs/kdesign'
import { getAccessToken, getAppToken } from '@/services/token'
import { ACCESS_TOKEN, EXPIRE_TIME } from '@/constant'
import { getQueryVariable } from '@/utils'

const useToken = () => {
  const [token, setToken] = useState<string>('')

  const saveToken = (t: string) => {
    localStorage.setItem(ACCESS_TOKEN, t)
    setToken(t)
  }

  const initToken = () => {
    getAppToken()
      .then((res) => {
        if (res.state === 'success') {
          getAccessToken(res.data.app_token)
            .then((r) => {
              if (r.state === 'success') {
                const {
                  data: { access_token, expire_time },
                } = r
                saveToken(access_token)
                localStorage.setItem(EXPIRE_TIME, expire_time.toString())
              } else {
                Message.error(`${r?.errorMsg}[904]` || '权限异常[904]')
              }
            })
            .catch(() => {
              Message.error('权限异常[903]')
            })
        } else {
          Message.error(`${res?.errorMsg}[902]` || '权限异常[902]')
        }
      })
      .catch(() => {
        Message.error('权限异常[901]')
      })
  }

  useEffect(() => {
    const at = getQueryVariable('access_token')
    if (at) {
      saveToken(at)
    } else {
      initToken()
    }
  }, [])

  return {
    token,
    setToken,
    initToken,
  }
}

export default useToken
