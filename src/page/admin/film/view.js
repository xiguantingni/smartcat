/**
 * Created by RCC on 2018/12/28.
 */

import React from 'react';
import Table from '@component/table';
import Modal from '@component/rcmodal';
import { Button, Drawer } from 'antd';
import './index.less';

class AdminFilm extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            showOperation: false,
            showDeleteAlert: false,
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

    handleCreateClick() {
        // 创建
        this.setState({showOperation: true});
    }

    handleEditClick(row) {
        // 编辑
        this.setState({showOperation: true});
    }

    handleDeleteClick() {
        // 删除
        this.setState({showDeleteAlert: true});
    }

    handleOkDeleteClick() {
        this.setState({showDeleteAlert: false});
    }

    handleCancelDeleteClick() {
        this.setState({showDeleteAlert: false});
    }

    handleHideOperation() {
        this.setState({showOperation: false});
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
            { title: '操作', key: 'operation',  render: (value, row) => <Button type="primary" size="small" onClick={this.handleEditClick.bind(this, row)}>编辑</Button> }
        ]
    }

    getRowSelection() {
        return {
            onChange: (ids, rows) => {
                this.setState({selectRows: rows});
            }
        }
    }

    render() {
        const { rows, isFetch, selectRows, showOperation, showDeleteAlert } = this.state;
        return (
            <div className="view admin-film-container">
                <div className="title">这是对电影资源的管理页面</div>
                <div className="body">
                    <div className="button-list">
                        <Button
                            type="primary"
                            style={{marginRight: 16}}
                            onClick={this.handleCreateClick.bind(this)}
                        >
                            创建
                        </Button>
                        <Button
                            type="danger"
                            onClick={this.handleDeleteClick.bind(this)}
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
                    onOk={this.handleOkDeleteClick.bind(this)}
                    onCancel={this.handleCancelDeleteClick.bind(this)}
                />
                <Drawer
                    className="operation"
                    onClose={this.handleHideOperation.bind(this)}
                    maskClosable
                    mask
                    width={500}
                    title="创建/编辑"
                    visible={showOperation}
                >

                </Drawer>
            </div>
        );
    }

}

export default AdminFilm;
