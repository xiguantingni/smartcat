import {Col, Row} from "antd";
import React, {Fragment} from "react";
import { formatVolume, percent } from '@util';
/*
    * method 容量使用UI组件
    * params
    *   used 已使用
    *   total 未使用
 */
export const ETotal = ({ used, total }) => {
    const renderProcess = (used, total) => {
        const p = used / total;
        const percent = Number(p * 100 );
        let style = {
            height: 4,
            borderRadius: 10,
            width: `${percent}%`,
        };
        let color;
        if( p <= 0.7) {
            color = '61,166,241';
        } else if ( 0.7 < p && p <= 0.9 ) {
            color = '240,163,50';
        } else {
            color = '235,96,92';
        }
        return {
            ...style,
            boxShadow: `0 0 0 1px rgba(${color}, ${percent>0.5?0.2:0})`,
            background: `linear-gradient(to right, rgba(${color}, 0.5), rgba(${color}, 1))`,
        };
    };
    return <Fragment>
        <Row>
            <Col span={6} style={{fontWeight: 'bold'}}>
                {percent(used, total)}
            </Col>
            <Col span={18} style={{textAlign: 'right', fontWeight: 600}}>
                {formatVolume(used)} / {formatVolume(total)}
            </Col>
        </Row>
        <div className="ant-progress-inner" style={{backgroundColor: '#E0E0E0'}}>
            <div className="ant-progress-bg"
                 style={renderProcess(used, total)}></div>
        </div>
    </Fragment>
};

export const EProcessTotal = ({percent}) => {
    const renderProcess = (per) => {
        const p = per;
        let percent = per *100;
        let style = {
            height: 4,
            borderRadius: 10,
            width: `${percent}%`,
        };
        let color;
        if( p <= 0.7) {
            color = '61,166,241';
        } else if ( 0.7 < p && p <= 0.9 ) {
            color = '240,163,50';
        } else {
            color = '235,96,92';
        }
        return {
            ...style,
            boxShadow: `0 0 0 1px rgba(${color}, ${percent>0.5?0.2:0})`,
            background: `linear-gradient(to right, rgba(${color}, 0.5), rgba(${color}, 1))`,
        };
    };
    return <Fragment>
        <Row>
            <Col span={24} style={{fontWeight: 'bold'}}>
                {(percent * 100).toFixed(2)} %
            </Col>
        </Row>
        <div className="ant-progress-inner" style={{backgroundColor: '#E0E0E0'}}>
            <div className="ant-progress-bg"
                 style={renderProcess(percent)}></div>
        </div>
    </Fragment>
};


export const StatusUI = {
    health: {
        context: '健康',
        value: 'success',
        name: 'health',
        text: ':当前值、最差值大于临界值',
    },
    warn: {
        context: '告警',
        value: 'warning',
        name: 'warn',
        text: ':当前值、最差值大于但接近临界值',
    },
    error: {
        context: '错误',
        value: 'error',
        name: 'error',
        text: ':当前值、最差值小于临界值',
    },
    critical: {
        context: '严重错误',
        value: 'error',
        name: 'critical',//多选时的值
        text: ':当前值、最差值小于临界值',
    },
};

export const StatusToArray = () => {
    let dist = [];
    for(let key in StatusUI) {
        const status = {
            text: StatusUI[key]['context'],
            value: StatusUI[key]['name'],
        };
        dist.push(status);
    }
    return dist;
};