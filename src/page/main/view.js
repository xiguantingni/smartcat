/**
 * Created by RCC on 2018/12/13.
 */

import React from 'react';
import { Button, Alert } from 'antd';
import { getDeviceType } from '@util';
import './index.less';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentType: ''
        }
    }

    handleItemClick(item) {
        let _type = item.type;
        const { history } = this.props;
        if (_type === 'film') {
            // 跳转电影资源详情页
            history.push();
        }
    }

    render() {
        const filmArr = [
            {id: 1, type: 'film', name: '狄仁杰之四大天王1'},
            {id: 2, type: 'film', name: '狄仁杰之四大天王2'},
            {id: 3, type: 'film', name: '狄仁杰之四大天王3'},
            {id: 4, type: 'film', name: '狄仁杰之四大天王4'},
            {id: 5, type: 'film', name: '狄仁杰之四大天王5'},
            {id: 6, type: 'film', name: '狄仁杰之四大天王1'},
            {id: 7, type: 'film', name: '狄仁杰之四大天王2'},
            {id: 8, type: 'film', name: '狄仁杰之四大天王3'},
            {id: 9, type: 'film', name: '狄仁杰之四大天王4'},
            {id: 10, type: 'film', name: '狄仁杰之四大天王5'}
        ];
        return (
            <div className="view main-container">
                <div className="title">
                    <div className="title-item">推荐</div>
                    <div className="title-item active">电影</div>
                    <div className="title-item">音乐</div>
                    <div className="title-item">软件</div>
                    <div className="title-item">文档</div>
                </div>
                <Alert
                    type="warning"
                    message="防走失，请添加微信：abc123"
                />
                <div className="body">
                    <div className="list-container">
                        {
                            filmArr.map(item => {
                                switch (item.type) {
                                    case 'film':
                                        return (
                                            <div className="film-item" key={item.id} onClick={this.handleItemClick.bind(this, item)}>
                                                <img className="film-item-picture" src="/src/image/12.jpg" />
                                                <div className="film-item-remark">{item.name}</div>
                                            </div>
                                        );
                                    default:
                                        return (
                                            <div>资源类型不存在</div>
                                        )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default Main;
