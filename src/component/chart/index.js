'use strict';
//预估图表
import * as echarts from 'echarts/lib/echarts';
import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { ChartUI, BLine, GLine, OLine } from './ui';
import "./index.less"
import { formatVolume } from '@util';
import Loading from '@component/loading';
import {ChartContext} from "./context";

const defaultFormat = val => {
    return val;
};
const Status = [ 'processing', 'success', 'warning'];
const Line = [BLine, GLine, OLine];

const position = {
    left: `20px`,
    right: `30px`,
    top: ``,
    bottom: ``,
}

//生成浮动popover
const renderHtml  = (index, text) => {
    return `<span class="ant-badge hy-chart ant-badge-status ant-badge-not-a-wrapper"><span class="ant-badge-status-dot ant-badge-status-${Status[index]}"></span><span class="ant-badge-status-text color-white">${text}</span></span>`
};

/* *
    * title  标题
    * legend   右上角
    * xContext 横向坐标字段
    * series   数据数组
    * xLabelfixed true时x轴label自动生成 false 固定20个标签间隔显示100/20总显示5个
 */
const renderOpts = ({ title, legend,xContext, series, format = defaultFormat, xFormat = defaultFormat, visualMap = {}, xLabelfixed = false }) => {

    //处理传入的数组
    series = series.map((item, i) => {
        item = {
            type: 'line',
            showSymbol: false,//折线图上不显示点·
            showAllSymbol:false,
            itemStyle: {
                normal: {
                    color: Line[i].lineStyle.color || '#57B0F3',//右上角的颜色
                    opacity: 0,
                },
                emphasis: {
                    color:  Line[i].lineStyle.color|| '#57B0F3',
                    opacity: 1,
                    borderColor: '#fff',
                    borderWidth: 2,
                    // shadowColor: 'blue',
                    shadowBlur: 50
                }
            },
            // symbol: 'image://',//清空标记上的样式 只显示-
            ...item,

            ...Line[i],//设置线颜色
        };
        return item;
    });
    //x轴
    const xAxis = {
        type: 'category',
            // boundaryGap: false,
        // interval: 40,
        splitLine: {
            show: false,
            interval: 0
        },
        axisLine: {
            show:false,//显示线
        },
        axisTick: {
            show: false,//刻度
            // alignWithLabel: true,
        },
        axisLabel: {
            interval: xLabelfixed ? 'auto': 20,//x轴label间隔 | 控制个数显示
            formatter: (value) => {
                return xFormat(value);
            },
        }
    };
    //处理 从数据内部生成x轴时 防止不显示
    if(xContext.length !== 0) {
        xAxis['data'] = xContext;

    }
    return {
        title: {
            text: title,
            left: position.left,
            top: '3%',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 14,
            },
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#2B3031',
            padding: 10,
            axisPointer: {
                lineStyle: {
                    type: 'dashed',//鼠标移入出现垂直线
                }
            },
            //hover时折线图弹出框
            formatter: function (params, ticket, callback) {
                let res = '';
                if(params.length > 0) {
                    res += `<div class="color-grey">${xFormat(params[0].name)}</div>`;
                }
                params.map((item, i) => {
                    const value = Array.isArray(item.value)?item.value[1]:item.value;
                    res += renderHtml(i, `${item.seriesName}- ${format(value)}`);
                    if(item.length !== (i + 1))
                        res += '<br/>';
                });

                return `<div>${res}</div>`;

            }
        },
        visualMap,
        legend: {
            data: legend,
            right: position.right,
            // selectedMode: false,//是否点击显示隐藏
            top: '3%',

            //修改右上角的图标样式
            orient: 'horizontal',
            itemWidth: 16,
            itemHeight: 1,
            icon: 'rect',
            itemGap: 13,
        },
        xAxis: xAxis,
        yAxis: {
            axisLine: {
                show:false,
            },
            axisTick: {
                show: false,
            },
            type: 'value',
            axisLabel: {
                //y轴 格式化
                formatter: (value) => {
                    return format(value);
                },
            }
        },
        grid: {
            left: position.left,
            right: position.right,
            bottom: '3%',
            containLabel: true
        },
        series: [...series],
    };
};


class E extends PureComponent {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.state = {
            xContext: [],
            series: [],
        };
    }
    componentDidMount() {
        const _this = this;
        const dom = ReactDom.findDOMNode(_this.chartRef)
        _this.renderEstimateChart(dom.clientWidth, 300);
    }
    //防止chart 初始化 只做刷新数据操作
    componentWillReceiveProps(nextProps) {
        const _this = this;
        setTimeout(function() {
            const { series, xContext } = nextProps;
            _this.renderOpts(series, xContext);
        })
    }
    //生成配置项
    renderOpts(series = [], xContext = []) {
        const props = this.props;
        // const { xContext, series } = this.state;
        const opts = renderOpts({
            ...props,
            xContext,
            series,
        });
        this.estimateChart.setOption(opts);
    }
    //init
    renderEstimateChart(width = 0, height = 0) {
        this.estimateChart = echarts.init(this.chartRef, 'light', {
            width,
            height,
        }); //初始化echarts
        const { series = [], xContext = [] } = this.props;
        this.renderOpts(series, xContext);
    }

    render() {
        return (
            <div ref={(c) => this.chartRef = c}></div>
        )
    }
}

class Chart extends PureComponent{

    render() {
        const { Footer, loading } = this.props;
        return (
            <div style={ChartUI}>
                { loading ? (
                    <div style={{ padding: 100 }}>
                        <Loading/>
                    </div>
                ) : (
                    <Fragment>
                        <E { ...this.props }/>
                        {Footer && <Footer/>}
                    </Fragment>
                ) }

            </div>
        )
    }
}

Chart.propTypes = {
    title: PropTypes.string.isRequired,

};

export default Chart;
