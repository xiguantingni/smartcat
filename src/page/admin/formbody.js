/**
 * Created by RCC on 2019/1/3.
 */

import React from 'react';
import { Form, Checkbox, Radio, Input } from 'antd';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

class FormBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articleMode: 'content' // content || file
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentRow !== this.props.currentRow) {
            this.props.form.resetFields();
        }
    }

    renderName() {
        const { currentRow } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <FormItem
                label="名称"
                labelCol={{span: 5}}
                wrapperCol={{span: 19}}
                colon={false}
                style={{marginBottom: 0}}
            >
                {getFieldDecorator('name', {
                    initialValue: currentRow ? currentRow.name : undefined,
                    rules: [{
                        required: true, message: '必填项'
                    }]
                })(
                    <Input />
                )}
            </FormItem>
        )
    }

    renderKeywords() {
        const { currentRow } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <FormItem
                label="关键词"
                labelCol={{span: 5}}
                wrapperCol={{span: 19}}
                colon={false}
                style={{marginBottom: 0}}
            >
                {getFieldDecorator('keywords', {
                    initialValue: currentRow ? currentRow.keywords : undefined,
                    rules: [{
                        required: true, message: '必填项'
                    }]
                })(
                    <Input />
                )}
            </FormItem>
        )
    }

    renderPrice() {
        const { currentRow } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <FormItem
                label="单价"
                labelCol={{span: 5}}
                wrapperCol={{span: 19}}
                colon={false}
                style={{marginBottom: 0}}
            >
                {getFieldDecorator('price', {
                    initialValue: currentRow ? currentRow.price : undefined,
                    rules: [{
                        required: true, message: '必填项'
                    }]
                })(
                    <Input />
                )}
            </FormItem>
        )
    }

    renderIcon() {
        const { currentRow } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <FormItem
                label="缩略图地址"
                labelCol={{span: 5}}
                wrapperCol={{span: 19}}
                colon={false}
                style={{marginBottom: 0}}
            >
                {getFieldDecorator('icon', {
                    initialValue: currentRow ? currentRow.icon : undefined,
                    rules: [{
                        required: true, message: '必填项'
                    }]
                })(
                    <Input />
                )}
            </FormItem>
        )
    }

    renderLocation() {
        const { currentRow } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <FormItem
                label="资源地址"
                labelCol={{span: 5}}
                wrapperCol={{span: 19}}
                colon={false}
                style={{marginBottom: 0}}
            >
                {getFieldDecorator('location', {
                    initialValue: currentRow ? currentRow.location : undefined,
                    rules: [{
                        required: true, message: '必填项'
                    }]
                })(
                    <Input />
                )}
            </FormItem>
        )
    }

    renderFeature() {
        const { type, currentRow } = this.props;
        const { getFieldDecorator } = this.props.form;
        let _options = [];
        if (type === 'software') {
            _options = [
                { label: '聊天工具', value: 'chat' },
                { label: '视频软件', value: 'video' },
                { label: '音频软件', value: 'music' }
            ];
        }
        return (
            <FormItem
                label="资源类型"
                labelCol={{span: 5}}
                wrapperCol={{span: 19}}
                colon={false}
                style={{marginBottom: 0}}
            >
                {getFieldDecorator('type', {
                    initialValue: currentRow ? currentRow.type.split(',') : undefined,
                    rules: [{
                        required: true, message: '必填项'
                    }]
                })(
                    <CheckboxGroup
                        options={_options}
                    />
                )}
            </FormItem>
        )
    }

    renderArticleMode() {
        const { articleMode } = this.state;
        const { getFieldDecorator } = this.props.form;
        const _options = [
            {label: '文本内容', value: 'content'},
            {label: '文件', value: 'file'}
        ];
        return (
            <FormItem
                label="输入方式"
                labelCol={{span: 5}}
                wrapperCol={{span: 19}}
                colon={false}
                style={{marginBottom: 0}}
            >
                <RadioGroup
                    options={_options}
                    value={articleMode}
                    onChange={(e) => this.setState({articleMode: e.target.value})}
                />
            </FormItem>
        )
    }

    renderContent() {
        const { currentRow } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <FormItem
                label="文章内容"
                labelCol={{span: 5}}
                wrapperCol={{span: 19}}
                colon={false}
                style={{marginBottom: 0}}
            >
                {getFieldDecorator('content', {
                    initialValue: currentRow ? currentRow.content : undefined,
                    rules: [{
                        required: true, message: '必填项'
                    }]
                })(
                    <Input.TextArea />
                )}
            </FormItem>
        )
    }

    render() {
        const { type } = this.props;
        const { articleMode } = this.state;
        return (
            <Form style={{margin: '0 10px'}}>
                { this.renderName() }
                { this.renderKeywords() }
                { this.renderPrice() }
                { (type === 'film' || type === 'software') ? this.renderIcon() : null }
                { (type === 'article') ? this.renderArticleMode() : null }
                { (type === 'article' && articleMode === 'content') ? this.renderContent() : null }
                { (type === 'article' && articleMode === 'file') ? this.renderLocation() : null }
                { (type === 'software') ? this.renderFeature() : null }
                { (type === 'film' || type === 'software') ? this.renderLocation() : null }
            </Form>
        )
    }

}

export default Form.create()(FormBody);
