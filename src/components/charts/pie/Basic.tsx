import React from 'react';
import { DefaultOption } from './data/basic';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import defaultTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-default.js';
function index(props) {
  echarts.registerTheme('defaultTheme', defaultTheme);
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
