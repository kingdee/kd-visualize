import React from 'react';
import { DefaultOption } from './data/choropleth';
import * as echarts from 'echarts';
import defaultTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-default.js';
import ReactECharts from 'echarts-for-react';
function index(props) {
  echarts.registerTheme('defaultTheme', defaultTheme);
  echarts.registerMap('china', require('./json/china.json')); //将地图数据注册到echart对象上
  let {
    option = DefaultOption,
    theme = defaultTheme,
    width = '375px',
    height = '320px',
  } = props;

  return (
    <div>
      <ReactECharts
        option={option}
        theme={theme}
        style={{ width: width, height: height }}
      />
    </div>
  );
}

export default index;
