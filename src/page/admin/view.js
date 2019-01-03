/**
 * Created by RCC on 2019/1/2.
 */

import React from 'react';
import Table from '@component/table';
import Modal from '@component/rcmodal';
import request from '@util/request';
import { Button, Radio, Form } from 'antd';
import FormBody from './formbody';
import './index.less';

const FormItem = Form.Item;

class Admin extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            type: 'film',
            showDeleteAlert: false,
            showOperateAlert: false,
            showOperateLoading: false, // 确定中
            currentRow: null,
            isFetch: false,
            rows: [
                {
                    uuid: '1',
                    name: '狄仁杰之四大天王',
                    type: 'film',
                    keywords: ['狄仁杰', '四大天王'],
                    price: '0',
                    icon: '/c/d',
                    location: '',
                    times: '12',
                    create: '1545980877200',
                    profit: '12.4'
                },
                {
                    uuid: '2',
                    name: '头号玩家',
                    type: 'film',
                    keywords: ['VR', '游戏', '头号', '玩家'],
                    price: '0',
                    icon: '/c/d',
                    location: 'film/d/12.mvm',
                    times: '12',
                    create: '1545980877200',
                    profit: '12.4'
                }
            ],
            selectRows: []
        }
    }

    handleTypeChange(e) {
        this.setState({type: e.target.value});
        // 此处开始请求对应资源
    }

    getColumns() {
        return [
            { title: "UUID", dataIndex: "uuid", key: "uuid" },
            { title: "名称", dataIndex: "name", key: "name" },
            { title: "类型", dataIndex: "type", key: "type" },
            { title: "单价", dataIndex: "price", key: "price" },
            { title: "缩略图地址", dataIndex: "icon", key: "icon" },
            { title: "资源地址", dataIndex: "location", key: "location" },
            { title: "浏览次数", dataIndex: "times", key: "times" },
            { title: "关键词", dataIndex: "keywords", key: "keywords" },
            { title: "利润", dataIndex: "profit", key: "profit" },
            { title: "创建时间", dataIndex: "create", key: "create" },
            { title: '操作', key: 'operation',  render: (value, row) => <Button type="primary" size="small" onClick={this.handleEditOperationClick.bind(this, row)}>编辑</Button> }
        ]
    }

    getRowSelection() {
        return {
            onChange: (ids, rows) => {
                this.setState({selectRows: rows});
            }
        }
    }


    // 操作管理弹框---start

    getOperateTitle() {
        const { type, currentRow } = this.state;
        if (type === 'film') {
            return currentRow ? '编辑电影' : '创建电影';
        } else if (type === 'software') {
            return currentRow ? '编辑软件' : '创建软件';
        } else if (type === 'article') {
            return currentRow ? '编辑好文' : '创建好文';
        } else {
            return '未知';
        }
    }

    handleCreateOperateClick() {
        this.setState({showOperateAlert: true, currentRow: null});
    }

    handleEditOperationClick(row) {
        this.setState({showOperateAlert: true, currentRow: row});
    }

    handleOkOperateClick() {
        this.formBody.props.form.validateFields(errors => {
            if (!errors) {
                this.setState({ showOperateLoading: true });
                // 开始于后端交互
                request('/api/createOrEdit', {
                    successCallback: () => { this.setState({ showOperateLoading: false, showOperateAlert: false })},
                    failCallback: () => { this.setState({ showOperateLoading: false, showOperateAlert: false })}
                });
            }
        });
    }

    handleCancelOperateClick() {
        this.setState({ showOperateAlert: false });
    }

    // 操作管理弹框---end


    render() {
        const { type, rows, isFetch, selectRows, showDeleteAlert, currentRow, showOperateAlert, showOperateLoading } = this.state;
        return (
            <div className="view admin-film-container">
                <span className="title">管理类型：</span>
                <Radio.Group
                    value={type}
                    buttonStyle="solid"
                    onChange={this.handleTypeChange.bind(this)}>
                    <Radio.Button value="film">电影</Radio.Button>
                    <Radio.Button value="software">软件</Radio.Button>
                    <Radio.Button value="article">好文</Radio.Button>
                </Radio.Group>
                <div style={{borderTop: '1px solid #E0E0E0', margin: '10px 0'}}></div>
                <div className="body">
                    <div className="button-list">
                        <Button
                            type="primary"
                            style={{marginRight: 16}}
                            onClick={this.handleCreateOperateClick.bind(this)}
                        >
                            创建
                        </Button>
                        <Button
                            type="danger"
                            disabled={selectRows.length <= 0}
                        >
                            删除
                        </Button>
                    </div>
                    <Table
                        rowKey="uuid"
                        ref={c => this.table = c}
                        dataSource={rows}
                        columns={this.getColumns()}
                        loading={isFetch}
                        rowSelection={this.getRowSelection()}
                    />
                </div>
                <Modal
                    title="提示"
                    okText="删除"
                    type="warn"
                    customData={{promptText: "确定要删除选中的资源？"}}
                    cancelText="取消"
                    visible={showDeleteAlert}
                />
                <Modal
                    title={this.getOperateTitle()}
                    okText="确定"
                    cancelText="取消"
                    visible={showOperateAlert}
                    confirmLoading={showOperateLoading}
                    onOk={this.handleOkOperateClick.bind(this)}
                    onCancel={this.handleCancelOperateClick.bind(this)}
                >
                    <FormBody
                        wrappedComponentRef={c => this.formBody = c}
                        currentRow={currentRow}
                        type={type}
                    />
                </Modal>
            </div>
        );
    }

}

export default Admin;
