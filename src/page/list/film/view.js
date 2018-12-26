/**
 * Created by RCC on 2018/12/26.
 */

import React from 'react';
import { getDeviceType } from '@util';
import './index.less';

class Film extends React.Component {

    constructor(props) {
        super(props);
        this.isPc = getDeviceType() === 'pc';
    }

    renderPc() {
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
            <div className="list-film-container-pc">
                <div className="list-bar"></div>
                <div className="list-body"></div>
                <div className="list-foot"></div>
            </div>
        )
    }

    renderMobile() {
        return (
            <div>暂未实现</div>
        )
    }

    render() {
        return this.isPc ? this.renderPc() : this.renderMobile();
    }

}

export default Film;
