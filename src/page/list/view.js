/**
 * Created by RCC on 2018/12/26.
 */

import React from 'react';
import { Button, Icon } from 'antd';
import { parseUrlParams, getDeviceType } from '@util';
import './index.less';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: parseUrlParams(props.location.search).type || 'film',
            page: 1, // 默认第一页
            size: 20, // 默认每页20项
            rows: [
                {id: 1, type: 'film', name: '狄仁杰之四大天王1', icon: '../../image/12.jpg'},
                {id: 2, type: 'film', name: '狄仁杰之四大天王2'},
                {id: 3, type: 'film', name: '狄仁杰之四大天王3'},
                {id: 4, type: 'film', name: '狄仁杰之四大天王4'},
                {id: 5, type: 'film', name: '狄仁杰之四大天王5'},
                {id: 6, type: 'film', name: '狄仁杰之四大天王1'},
                {id: 7, type: 'film', name: '狄仁杰之四大天王2'},
                {id: 8, type: 'film', name: '狄仁杰之四大天王3'},
                {id: 9, type: 'film', name: '狄仁杰之四大天王4'},
                {id: 10, type: 'film', name: '狄仁杰之四大天王5'}
            ]
        };
        this.isPc = getDeviceType();
    }

    handleTitleClick(type) {
        this.setState({type});
    }

    handlePageChange(status) {
        const { page } = this.state;
        let _page = page;
        if (status === 'start') {
            _page = 1;
        } else if (status === 'pre') {
            _page = page === 1 ? 1 : page - 1;
        } else if (status === 'next') {
            _page = page + 1;
        } else if (status === 'end') {
            _page = page;
        }
        this.setState({page: _page});
    }

    renderItem(item) {
        if (this.isPc && item.type === 'film') {
            return (
                <div className="film-item" key={item.id}>
                    <img src="/src/image/12.jpg" className="film-item-picture" />
                    <div className="film-item-name">{item.name}</div>
                </div>
            );
        } else if (this.isPc && item.type === 'software') {
            return (
                <div className="software-item" key={item.id}></div>
            );
        } else if (this.isPc && item.type === 'article') {
            return (
                <div className="article-item" key={item.id}></div>
            );
        } else if (!this.isPc && item.type === 'film') {
            return (
                <div className="film-item"></div>
            );
        } else if (!this.isPc && item.type === 'software') {
            return (
                <div className="software-item" key={item.id}></div>
            );
        } else if (!this.isPc && item.type === 'article') {
            return (
                <div className="article-item" key={item.id}></div>
            );
        } else {
            return (
                <div className="unknown-item" key={item.id}></div>
            );
        }
    }

    render() {
        const { type, rows } = this.state;
        console.log(this.state);
        return (
            <div className={`list-container-${getDeviceType()}`}>
                <div className="list-title">
                    <div onClick={this.handleTitleClick.bind(this, 'film')} className={type === 'film' ? 'item active' : 'item'}>电影</div>
                    <div onClick={this.handleTitleClick.bind(this, 'software')} className={type === 'software' ? 'item active' : 'item'}>软件</div>
                    <div onClick={this.handleTitleClick.bind(this, 'article')} className={type === 'article' ? 'item active' : 'item'}>好文</div>
                </div>
                <div className="list-body">{rows.map(item => this.renderItem(item))}</div>
                <div className="list-foot">
                    <div>
                        <Button style={{marginRight: 20}} onClick={this.handlePageChange.bind(this, 'start')}>首页</Button>
                        <Button onClick={this.handlePageChange.bind(this, 'pre')}><Icon type="arrow-left" />上一页</Button>
                    </div>
                    <div>正在展示5/14页</div>
                    <div>
                        <Button style={{marginRight: 20}} onClick={this.handlePageChange.bind(this, 'next')}><Icon type="arrow-right" />上一页</Button>
                        <Button onClick={this.handlePageChange.bind(this, 'end')}>尾页</Button>
                    </div>
                </div>
            </div>
        )
    }

}

export default List;
