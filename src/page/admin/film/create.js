/**
 * Created by RCC on 2018/12/28.
 */

import React from 'react';
import { Button, Drawer, Form, Input, Alert } from 'antd';
import './index.less';

const FormItem = Form.Item;

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            saving: false
        }
    }

    handleOKClick() {
        const me = this;
        this.props.form.validateFields(errors => {
            if (!errors) {
                // 保存中状态
                me.setState({
                    saving: true
                });
            }
        });
        setTimeout(() => {
            me.props.onClose();
        }, 2000);
    }

    renderForm() {
        const { getFieldDecorator } = this.props.form;
        const { currentRow } = this.props;
        return (
            <Form>
                <FormItem
                    label="名称"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 19}}
                    colon={false}
                    style={{marginBottom: 0, marginTop: 20}}
                >
                    {getFieldDecorator('name', {
                        initialValue: currentRow ? currentRow.name : '',
                        rules: [{
                            required: true, message: '必填项'
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="关键词"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 19}}
                    colon={false}
                    style={{marginBottom: 0}}
                >
                    {getFieldDecorator('keywords', {
                        initialValue: currentRow ? currentRow.keywords : '',
                        rules: [{
                            required: true, message: '必填项'
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="单价"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 19}}
                    colon={false}
                    style={{marginBottom: 0}}
                >
                    {getFieldDecorator('price', {
                        initialValue: currentRow ? currentRow.price : '',
                        rules: [{
                            required: true, message: '必填项'
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="缩略图地址"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 19}}
                    colon={false}
                    style={{marginBottom: 0}}
                >
                    {getFieldDecorator('icon', {
                        initialValue: currentRow ? currentRow.icon : '',
                        rules: [{
                            required: true, message: '必填项'
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="资源地址"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 19}}
                    colon={false}
                    style={{marginBottom: 0}}
                >
                    {getFieldDecorator('location', {
                        initialValue: currentRow ? currentRow.location : '',
                        rules: [{
                            required: true, message: '必填项'
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
            </Form>
        )
    }

    renderDescription() {
        return (
            <div>
                <div><span className="title-tip">名称：</span>必填；字符；</div>
                <div><span className="title-tip">关键词：</span>选填；字符；如存在多个，以分号隔开；</div>
                <div><span className="title-tip">单价：</span>必填；数字；单位为分；</div>
                <div><span className="title-tip">缩略图地址：</span>必填；字符；缩略图路径；</div>
                <div><span className="title-tip">资源地址：</span>必填；字符；资源路径；</div>
            </div>
        )
    }

    render() {
        const { visible, onClose, currentRow } = this.props;
        const { saving } = this.state;
        return (
            <Drawer
                className="create-drawer"
                onClose={onClose}
                maskClosable
                mask
                width={500}
                title={currentRow ? '编辑' : '创建'}
                visible={visible}
            >
                <div className="drawer-body">
                    <Alert
                        className="form-input-tip"
                        message="表单填写注意事项如下："
                        type="warning"
                        description={this.renderDescription()}
                    />
                    {this.renderForm()}
                </div>

                <div className="drawer-foot">
                    <Button
                        style={{marginRight: 16}}
                        onClick={onClose}
                    >
                        取消
                    </Button>
                    <Button
                        type="primary"
                        loading={saving}
                        onClick={this.handleOKClick.bind(this)}
                    >
                        保存
                    </Button>
                </div>
            </Drawer>
        );
    }
}

export default Form.create()(Create);
