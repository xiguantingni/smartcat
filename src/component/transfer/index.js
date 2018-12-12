/**
 * Created by RCC on 2018/8/2.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Input, Divider } from 'antd';
import './index.less';

class Transfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.leftData.map(item => ({
                    ...item,
                    isSelected: false,
                    isPassed: false
                })).concat(props.rightData.map(item => ({
                    ...item,
                    isSelected: false,
                    isPassed: true
                }))),
            leftQuery: '',  // 左侧查询标识
            rightQuery: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.leftData.map(item => ({
                ...item,
                isSelected: false,
                isPassed: false
            })).concat(nextProps.rightData.map(item => ({
                ...item,
                isSelected: false,
                isPassed: true
            })))
        })
    }
    baseChange() {
        const { onChange } = this.props;
        const { data } = this.state;
        if (onChange) {
            onChange(data.filter(item => !item.isPassed), data.filter(item => item.isPassed));
        }
    }
    handleLeftSearch(e) {
        this.setState({
            leftQuery: e.target.value
        })
    }
    handleLeftAll(e) {
        const { data, leftQuery } = this.state;
        let r = e.target.checked;
        // 搜集左侧所有显示，将其isSelected置为r
        data.forEach(item => {
            if (!item.isPassed && item.text.indexOf(leftQuery) >= 0) {
                item.isSelected = r;
            }
        });
        this.setState(data);
    }
    handleLeftAdd() {
        // 搜集左侧所有选中，将其isPassed置为true
        const { data } = this.state;
        data.forEach(item => {
            if (!item.isPassed && item.isSelected) {
                item.isPassed = true;
                item.isSelected = false;
            }
        });
        this.setState(data);
        // 通知回去
        this.baseChange();
    }
    handleItemSelect(item, e) {
        let r = e.target.checked;
        const { data } = this.state;
        data.forEach(it => {
            if (it.id === item.id) {
                it.isSelected = r;
            }
        });
        this.setState(data);
    }
    handleItemAdd(item, e) {
        const { data } = this.state;
        data.forEach(it => {
            if (it.id === item.id) {
                it.isPassed = !it.isPassed;
                it.isSelected = false
            }
        });
        this.setState(data);
        this.baseChange();
        e.preventDefault();
    }
    handleRightSearch(e) {
        this.setState({
            rightQuery: e.target.value
        })
    }
    handleRightAll(e) {
        const { data, rightQuery } = this.state;
        let r = e.target.checked;
        // 搜集右侧所有显示，将其isSelected置为r
        data.forEach(item => {
            if (item.isPassed && item.text.indexOf(rightQuery) >= 0) {
                item.isSelected = r;
            }
        });
        this.setState(data);
    }
    handleRightAdd() {
        // 搜集右侧所有选中，将其isPassed置为false
        const { data } = this.state;
        data.forEach(item => {
            if (item.isPassed && item.isSelected) {
                item.isPassed = false;
                item.isSelected = false;
            }
        });
        this.setState(data);
        // 通知回去
        this.baseChange();
    }
    checkLeftAll() {
        // 判断左侧全选
        const { data, leftQuery } = this.state;
        const arr = data.filter(item => !item.isPassed && item.text.indexOf(leftQuery) >= 0);
        return arr.length ? arr.every(item => item.isSelected) : false;
    }
    checkRightAll() {
        // 判断左侧全选
        const { data, rightQuery } = this.state;
        const arr = data.filter(item => item.isPassed && item.text.indexOf(rightQuery) >= 0)
        return arr.length ? arr.every(item => item.isSelected) : false;
    }
    render() {
        const { className, placeHolder } = this.props;
        const { data, leftQuery, rightQuery } = this.state;
        return <div className={'transfer-container' + className }>
            <div className="transfer-item">
                <Input.Search
                    className="transfer-search"
                    onChange={this.handleLeftSearch.bind(this)}
                    placeholder={placeHolder.left}
                />
                <div className="transfer-body">
                    <div style={{paddingRight: 10}}>
                        <Checkbox
                            style={{marginLeft: '5px'}}
                            onChange={this.handleLeftAll.bind(this)}
                            checked={this.checkLeftAll()}
                        >
                            全选
                        </Checkbox>
                        <i
                            onClick={this.handleLeftAdd.bind(this)}
                            style={{float: 'right'}}
                            className="select-all iconfont icon-add-s"
                        />
                    </div>
                    <Divider style={{margin: '10px 0 0 0'}} />
                    <div className="transfer-list">
                        {
                            data.filter(item => !item.isPassed && item.text.indexOf(leftQuery) >= 0).map((item, index) => {
                                return (
                                    <Checkbox
                                        key={index}
                                        className="transfer-record"
                                        onChange={this.handleItemSelect.bind(this, item)}
                                        checked={item.isSelected}
                                    >
                                        {item.text}
                                        <i
                                            onClick={this.handleItemAdd.bind(this, item)}
                                            style={{float: 'right', display: 'inline-block'}}
                                            className="iconfont icon-add-s"
                                        />
                                    </Checkbox>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="transfer-item">
                <Input.Search
                    className="transfer-search"
                    onChange={this.handleRightSearch.bind(this)}
                    placeholder={placeHolder.right}
                />
                <div className="transfer-body">
                    <div style={{paddingRight: 10}}>
                        <Checkbox
                            style={{marginLeft: '5px'}}
                            onChange={this.handleRightAll.bind(this)}
                            checked={this.checkRightAll()}
                        >
                            全选
                        </Checkbox>
                        <i
                            onClick={this.handleRightAdd.bind(this)}
                            style={{float: 'right'}}
                            className="select-all iconfont icon-minus-s"
                        />
                    </div>
                    <Divider style={{margin: '10px 0 0 0'}} />
                    <div className="transfer-list">
                        {
                            data.filter(item => item.isPassed && item.text.indexOf(rightQuery) >= 0).map((item, index) => {
                                return (
                                    <Checkbox
                                        key={index}
                                        className="transfer-record"
                                        onChange={this.handleItemSelect.bind(this, item)}
                                        checked={item.isSelected}
                                    >
                                        {item.text}
                                        <i
                                            onClick={this.handleItemAdd.bind(this, item)}
                                            style={{float: 'right', display: 'inline-block'}}
                                            className="iconfont icon-minus-s"
                                        />
                                    </Checkbox>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}

Transfer.propTypes = {
    className: PropTypes.string,
    leftData: PropTypes.array,
    rightData: PropTypes.array,
    onChange: PropTypes.func,
    placeHolder: PropTypes.object
};

Transfer.defaultProps = {
    className: '',
    leftData: [],
    rightData: [],
    onChange: null,
    placeHolder: {left: '查询', right: '查询'}
};

export default Transfer;
