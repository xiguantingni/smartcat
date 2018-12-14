/**
 * Created by RCC on 2018/12/13.
 */

import React from 'react';
import { Button } from 'antd';
import { dispatch } from '@util/dispatch';
import { connect } from 'react-redux';
import './index.less';

class Detail extends React.Component {

    componentDidMount() {
        // 此处发起请求
    }

    render() {
        return (
            <div className="view detail-container">
                <div className="introduction">
                    <div className="text-1">简介</div>
                    <div>
                        <img src="src/image/12.jpg" className="picture" />
                    </div>
                </div>
                <div className="download">
                    <div className="text-2">下载说明</div>
                    <div>
                        123
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(({ detail }) => ({ ...detail }))(Detail);
