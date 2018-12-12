//外层ui样式
import * as echarts from "echarts/lib/echarts";

export const ChartUI = {border: '1px dashed #DDDDDD', overflow: 'hidden',
    position: 'relative'
};
export const PanelUI = {
    marginBottom: 20,
    padding: 10,
};
//第一条线样式 蓝色
export const BLine = {
    lineStyle: {
        color: '#1890ff',
    },
    areaStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#CCE7FC'
            }, {
                offset: 1,
                color: '#FAFDFF'
            }])
        }
    }
};
//第二条线样式 绿色
export const GLine = {
    lineStyle: {
        color: '#78D4BB',
    },
    areaStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#A2E1D0'
            }, {
                offset: 1,
                color: '#FAFDFF'
            }])
        }
    }
};
//黄色的线
export const YLine = {
    lineStyle: {
        color: '#F1C04D',
    },
    areaStyle: {
        normal: {
            color: '#F9F0DC',
        }
    }
};
//预估橘色的线
export const OLine = {
    lineStyle: {
        color: '#F2C353',
    },
    areaStyle: {
        normal: {
            color: '#F2C353',
        }
    }
};
