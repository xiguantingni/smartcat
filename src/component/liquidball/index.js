/**
 * Created by RCC on 2018/8/21.
 * api如下：
        radius: 半径，组件会默认取2倍半径为自身宽高。例：50
        data: 数据，0 - 1之间的数据，用来表示百分比。例：0.4
        color: 液态球颜色，支持rgba
        bgColor: 背景色,支持rgba
        shape: 形状，可选：circle | square
        markText: 在液态球上显示的文本，默认显示在液态球中心，例如：70%
        markClassName：显示文本的className
        style: 组件顶层样式
        className: 作用于组件顶层
 */

import React from 'react';
import Wave from './wave';
import './index.less';

class LiquidBall extends React.Component {
    render() {
        const { radius = 0, data, color, bgColor, shape, style, className, markText, markClassName } = this.props;
        const _ballStyle = {
            width: 2 * radius,
            height: 2 * radius,
            position: 'relative',
            display: 'inline-block',
            background: bgColor,
            borderRadius: shape === 'circle' ? '50%' : 0,
            overflow: 'hidden',
            ...style
        };
        const _waveStyle = {
            width: 4 * radius,
            height: 2.5 * radius,
            display: 'inline-block',
            position: 'absolute',
            top: (1.5 - 2 * data) * radius
        };
        return (
            <div style={_ballStyle} className={'liquid-ball-container ' + (className || '')}>
                <div style={{..._waveStyle, opacity: '.5', animationDuration: '2.6s'}} className="flow-water" >
                    <Wave radius={radius} color={color} />
                </div>
                <div style={{..._waveStyle, opacity: '.8'}} className="flow-water" >
                    <Wave radius={radius} color={color} />
                </div>
                {
                    markText ? <div className={'mark-text ' + markClassName}>{markText}</div> : null
                }
            </div>
        )
    }
}

export default LiquidBall;
