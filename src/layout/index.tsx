import { ConfigProvider } from '@kdcloudjs/kdesign'
import ScaleBox from 'react-scale-box'
import { useModel } from 'umi'

import zhCN from '@kdcloudjs/kdesign/lib/locale/zh-CN'
import { FC, useEffect } from 'react'
import * as echarts from 'echarts'
import defaultTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-default.js'
import redTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-red.js'
import naturalTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-natural.js'
import scienceTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-science.js'

const Layout: FC<{}> = ({ children }) => {
  echarts.registerTheme('defaultTheme', defaultTheme)
  echarts.registerTheme('redTheme', redTheme)
  echarts.registerTheme('naturalTheme', naturalTheme)
  echarts.registerTheme('scienceTheme', scienceTheme)

  const { token } = useModel('token')
  const locale = {}

  useEffect(() => {
    console.log('token', token)
    document.documentElement.setAttribute('data-prefers-color-scheme', 'dark')
  }, [])

  return (
    <ConfigProvider
      // @ts-ignore
      value={{ localeConfig: { localeData: { ...zhCN, ...locale } } }}
    >
      <ScaleBox width={1920} height={1080}>
        {children}
      </ScaleBox>
    </ConfigProvider>
  )
}

export default Layout
