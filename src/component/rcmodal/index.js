/**
 * Created by RCC on 2018/8/8.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal, Checkbox, Button, Alert } from 'antd';
import './index.less';

class RcModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDisabled: true
        }
    }
    handleConfirmChange(e) {
        this.setState({
            confirmDisabled: !e.target.checked
        });
    }
    renderCustomContent() {
        const { type, customData, children } = this.props;
        const { promptText, warnText, dataSource } = customData;
        if (type === 'multi-delete') {
            return (
                <Fragment>
                    <Alert
                        style={{marginBottom: 15}}
                        type="warning"
                        message={warnText}
                        showIcon
                    />
                    <div style={{fontSize: 14}}>{ promptText }</div>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {
                            dataSource.map((item, index) => {
                                return <div key={index} className="multi-delete-item">{ typeof item === 'string' ? item : item.text || item.value}</div>
                            })
                        }
                    </div>
                </Fragment>
            )
        }
        if (type === 'warn') {
            return (
                <div style={{display: 'flex'}}>
                    <i className="iconfont icon-warning-s" style={{lineHeight: '1', fontSize: 24, color: '#f0a332'}} />
                    <span style={{fontSize: 14, marginLeft: 8}}>{ promptText }</span>
                </div>
            )
        }
        if (type === 'info') {
            return (
                <div style={{display: 'flex'}}>
                    <i className="iconfont icon-info-s" style={{lineHeight: '1', fontSize: 24, color: '#42a5f5'}} />
                    <span style={{fontSize: 14, marginLeft: 8}}>{ promptText }</span>
                </div>
            )
        }
        return children;
    }
    render() {
        const { type, confirmLoading, twiceConfirm, twiceConfirmText, onOk, onCancel } = this.props;
        const { confirmDisabled } = this.state;
        const maskStyle = {
            opacity: '0.5',
            pointerEvents: 'none'
        };
        const extraProps = {};
        if (twiceConfirm) {
            extraProps.footer = (
                <div>
                    <Checkbox
                        onChange={ this.handleConfirmChange.bind(this) }
                        style={{marginTop: 5, float: 'left'}}
                    >
                        {twiceConfirmText}
                    </Checkbox>
                    <Button onClick={onCancel}>取消</Button>
                    <Button
                        type="primary"
                        onClick={onOk}
                        loading={confirmLoading}
                        disabled={ confirmDisabled }
                    >
                        确定
                    </Button>
                </div>
            )
        }
        if (type === 'info') {
            extraProps.okButtonProps = { style: { display: 'none' } };
            extraProps.cancelText = '知道了';
        }
        return (
            <Modal
                bodyStyle={confirmLoading ? maskStyle : null}
                className="rcmodal-container"
                width={500}
                maskClosable={false}
                {...extraProps}
                {...this.props}
            >
                {this.renderCustomContent()}
            </Modal>
        )
    }

}

// 除了ant modal中支持的api外，另扩展如下
RcModal.propTypes = {
    type: PropTypes.oneOf(['default', 'multi-delete', 'warn', 'info']),
    // 自定义数据对象，当type !== default 时存在
    // customData:
    //      promptText 提示文字
    //      warnText 警告文字
    //      dataSource  批量删除的数据源
    customData: PropTypes.object,
    twiceConfirm: PropTypes.bool, // 二次确认，例：批量删除的确认删除操作
    twiceConfirmText: PropTypes.string // 二次确认文本
};

RcModal.defaultProps = {
    type: 'default',
    customData: {},
    twiceConfirm: false,
    twiceConfirmText: ''
};

export default RcModal;
