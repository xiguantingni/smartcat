/**
 * Created by RCC on 2018/7/13.
 * 封装loading组件
 * api如下：
 * type: success, info, warn, error(可选，默认info)
 * config参考: antd.notification.config
 */

import React from 'react';
import { notification as AntNotification } from 'antd';
import './index.less'

// 执行设计全局配置，可被覆盖
AntNotification.config({
    placement: 'topRight',
    top: 24,
    duration: 5
});

// 预定义配置
const baseConfig = {
    'success': { icon: 'icon-correct-o', message: '成功', duration: 5, bgColor: '#5ab55e' }, // 非get接口成功提示
    'info': { icon: 'icon-info-o', message: '提示', duration: 5, bgColor: '#5bc0de' }, // 默认值，暂未发现其用处
    'warn': { icon: 'icon-warning-o', message: '警告', duration: 10, bgColor: '#f0a332' }, // 操作警告提示
    'error': { icon: 'icon-error-o', message: '失败', duration: null, bgColor: '#eb5f5c' } // 非get接口失败提示
};

export default (type = 'info', config) => {
    const _config = { ...baseConfig[type], ...config };
    const { duration, bgColor } = _config;
    AntNotification.open({
        ..._config,
        icon: <i style={{color: bgColor}} className={'iconfont ' + _config.icon } />,
        description: <div>
            <div className="notification-content">{_config.description}</div>
            { duration === null ? null : <div className='notification-process' style={{background: bgColor, animationDuration: duration + 's'}}></div> }
        </div>
    });
}
