/**
 * Created by RCC on 2018/7/13.
 * loading组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import './index.css'

class NoData extends React.Component {
    render() {
        const { style, className } = this.props;
        return (
            <div className={className + ' nodata-container'} style={style}>
                <i className="iconfont icon-nodata" />
                <p className='text-desc' >暂无数据</p>
            </div>
        )
    }
}

NoData.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string
};

NoData.defaultProps = {
    style: {},
    className: ''
};

export default NoData;
