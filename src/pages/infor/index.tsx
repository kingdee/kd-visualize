import React from 'react';
import { history } from 'umi';
import * as echarts from 'echarts';
import ScaleBox from 'react-scale-box';
import defaultTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-default.js';
import redTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-red.js';
import naturalTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-natural.js';
import scienceTheme from '@kdcloudjs/kd-charts/theme/echarts-theme-science.js';
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
            <div
              className="common_header_logo"
              onClick={() => history.goBack()}
            ></div>
            <span className="common_header_title">链接伙伴</span>
          </div>
          <div className="common_content sf_content">
            <div className="sf_content_item1">
              <div className="sf_content_item1_left">
                <div className="item-border">
                  <span className="sf_content_title">供应商</span>
                  <div className="digit_text_wrapper">
                    <span className="digit blue">15,680</span>
                    <span className="text">合格供应商</span>
                  </div>
                  <div className="digit_text_wrapper">
                    <span className="digit blue">39</span>
                    <span className="text">黑名单供应商</span>
                  </div>
                </div>
              </div>
              <div className="sf_content_item1_right">
                <div className="item-border">
                  <span className="sf_content_title">在线寻源</span>
                  <div className="digit_text_wrapper">
                    <span className="digit green">3379</span>
                    <span className="text">寻源项目</span>
                  </div>
                  <div className="digit_text_wrapper">
                    <span className="digit green">99,648.3</span>
                    <span className="wan green">万</span>
                    <span className="text">定标金额（元）</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="sf_content_item2">
              <div className="item-border">
                <span className="sf_content_title">累计成交量</span>
                <div className="digit_text_wrapper">
                  <span className="digit yellow"> 63,622.9</span>
                  <span className="wan yellow">万</span>
                  <span className="text">成交金额（元）</span>
                </div>
                <div className="digit_text_wrapper">
                  <span className="digit yellow">2,618</span>
                  <span className="text" style={{ paddingLeft: '1.7rem' }}>
                    成交项目（项）
                  </span>
                </div>
              </div>
            </div>
            <div className="sf_content_item3">
              <div className="sf_content_item3_top">
                <div className="item-border">
                  <span className="sf_content_title">供应商分布</span>
                  <Bi_directional
                    theme={naturalTheme}
                    width="1095px"
                    height="466px"
                  ></Bi_directional>
                </div>
              </div>
              <div className="sf_content_item3_left">
                <div className="item-border">
                  <span className="sf_content_title">板块供应商分布</span>
                  <div id="stack">
                    <Stepbar
                      theme={naturalTheme}
                      width="543px"
                      height="260px"
                    ></Stepbar>
                  </div>
                </div>
              </div>
              <div className="sf_content_item3_right">
                <div className="item-border">
                  <span className="sf_content_title">供应商绩效分布</span>
                  <div id="doughnut">
                    <Basic
                      theme={scienceTheme}
                      width="530px"
                      height="310px"
                    ></Basic>
                  </div>
                </div>
              </div>
            </div>
            <div className="sf_content_item4">
              <div className="item-border">
                <span className="sf_content_title">月度需求满足度分析</span>
                <div className="sf_content_item4_top">
                  <div id="group_bar">
                    <Choropleth
                      theme={scienceTheme}
                      width="795px"
                      height="400px"
                    ></Choropleth>
                  </div>
                </div>
                <div className="sf_content_item4_bottom">
                  <div className="sf_card_wrapper">
                    <span className="card_title">物流</span>
                    <div className="table_wrapper">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <span className="card_text">需求满足度</span>
                            </td>
                            <td>
                              <span className="card_digit big green">98.6</span>
                              <span className="card_digit small green">%</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="card_text">累计成交金额</td>
                            <td>
                              <span className="card_digit big yellow">
                                28,465
                              </span>
                              <span className="card_digit small yellow">
                                万
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="line">
                      <Stepbar
                        theme={naturalTheme}
                        width="220px"
                        height="150px"
                      ></Stepbar>
                    </div>
                  </div>
                  <div className="sf_card_wrapper">
                    <span className="card_title">航空</span>
                    <div className="table_wrapper">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <span className="card_text">需求满足度</span>
                            </td>
                            <td>
                              <span className="card_digit big green">99.3</span>
                              <span className="card_digit small green">%</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="card_text">累计成交金额</td>
                            <td>
                              <span className="card_digit big yellow">
                                12,939
                              </span>
                              <span className="card_digit small yellow">
                                万
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="line">
                      <Stepbar
                        theme={naturalTheme}
                        width="220px"
                        height="150px"
                      ></Stepbar>
                    </div>
                  </div>
                  <div className="sf_card_wrapper">
                    <span className="card_title">商业</span>
                    <div className="table_wrapper">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <span className="card_text">需求满足度</span>
                            </td>
                            <td>
                              <span className="card_digit big green">97.2</span>
                              <span className="card_digit small green">%</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="card_text">累计成交金额</td>
                            <td>
                              <span className="card_digit big yellow">
                                8,660
                              </span>
                              <span className="card_digit small yellow">
                                万
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="line">
                      <Stepbar
                        theme={naturalTheme}
                        width="220px"
                        height="150px"
                      ></Stepbar>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScaleBox>
  );
}
