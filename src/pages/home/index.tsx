import React from 'react';
import { history } from 'umi';
import * as echarts from 'echarts';
import ScaleBox from 'react-scale-box';
import '@kingdee-ui/kui/dist/kui.css';
import defaultTheme from '@kingdee-ui/charts/theme/echarts-theme-default.js';
import redTheme from '@kingdee-ui/charts/theme/echarts-theme-red.js';
import naturalTheme from '@kingdee-ui/charts/theme/echarts-theme-natural.js';
import scienceTheme from '@kingdee-ui/charts/theme/echarts-theme-science.js';
import Bi_directional from '@/components/charts/bar/Bi_directional';
import Stepbar from '@/components/charts/linebar/stepbar';
import Basic from '@/components/charts/pie/basic';
import Choropleth from '@/components/charts/map/Choropleth';

import './index.less';

export default function IndexPage() {
  echarts.registerTheme('defaultTheme', defaultTheme);
  echarts.registerTheme('redTheme', redTheme);
  echarts.registerTheme('naturalTheme', naturalTheme);
  echarts.registerTheme('scienceTheme', scienceTheme);

  return (
    <ScaleBox width={1920} height={1080}>
      <div className={'screen'}>
        <div className="common_wrapper">
          <div className="common_header">
            <div className="common_header_logo"></div>
            <span className="common_header_title">
              链接伙伴
            </span>
          </div>
          <div className="common_content sf_content">
            <div className="sf_content_item1">
              <div className="sf_content_item1_left" onClick={() => history.push('/infor')}>
              <div className="item-border">
                </div>
              </div>
              <div className="sf_content_item1_right">
              <div className="item-border">
                </div>
              </div>
            </div>
            <div className="sf_content_item2">
            <div className="item-border">
              </div>
            </div>
            <div className="sf_content_item3">
              <div className="sf_content_item3_top">
                <div className="item-border">
                </div>
              </div>
              <div className="sf_content_item3_left">
                <div className="item-border">
                </div>
              </div>
              <div className="sf_content_item3_right">
                <div className="item-border">
                </div>
              </div>
            </div>
            <div className="sf_content_item4">
            <div className="item-border">
            </div>
            </div>
          </div>
        </div>
      </div>
    </ScaleBox>
  );
}
