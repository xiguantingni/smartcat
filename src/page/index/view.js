/**
 * Created by RCC on 2018/12/26.
 */

import React from 'react';
import { Button } from 'antd';
import { getDeviceType } from '@util';
import './index.less';

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.isPc = getDeviceType() === 'pc';
    }

    pcRender() {
        return (
            <div className="index-container-pc">
                <Button type="primary">最新电影</Button>
                <Button type="primary">软件下载</Button>
                <Button type="primary">好文推荐</Button>
            </div>
        )
    }

    render() {
        return (
            <div className={'index-container-' + getDeviceType()}>
                <Button type="primary">最新电影</Button>
                <Button type="primary">软件下载</Button>
                <Button type="primary">好文推荐</Button>
            </div>
        )
    }

}

export default Index;
