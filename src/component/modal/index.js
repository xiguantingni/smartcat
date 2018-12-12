/**
 * Created by LJZ on 2018/7/31.
 * modal组件
 * method multiDelete 多选删除 error 错误 info消息提示 warning警告
 * onOK success回调 //重置所有内部状态为false error 只重置加载状态为false
 * onCancel 隐藏
 */

import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';
import { Modal as AntModal, Alert, Checkbox, Button  } from 'antd';
import './index.less';

let modalType = 'confirm'; //区分模态框类型 primary 正常框 confirm 确认框

/*
    * method 多选删除 数据枚举
    * gutter 左右间距 默认内间距10
 */
const MultiEnum = ({dataSource = [], gutter = 10}) => {
    const E = gutter / 2;
    return  (
        <div className="clearfix" style={{padding: `${E}px`, margin: `0 -${gutter}px`}}>
            {dataSource.map((item, i) => (
                <span key={`enum-${i}`} style={{float: 'left', display: 'inline-block', margin: '5px', padding: 4, fontSize: 12, backgroundColor: '#f6f6f6'}}>
                    {item}
                </span>
            ))}
        </div>
    );
};

const ACTION = {
    danger: {
        icon: 'icon-error-s',
        color: '#eb5f5c',
    },
    info: {
        icon: 'icon-info-s',
        color: '#2196f3',
    },
    success: {
        icon: 'icon-correct-s',
        color: '#5ab55e',
    },
    warning: {
        icon: 'icon-warning-s',
        color: '#f0a332',
    },
};

//confirm模块 icon 图标
const ConfirmContainer = ({ icon = null, children }) => (
    <div className="hy-modal-container-confirm">
        {icon?<div className="icon">
            {icon}
        </div>:null}
        <div className="body">
            {children}
        </div>
    </div>
);


/*
    * type info | warning | danger | success 确认框状态 不传 默认为正常模态框
    * icon 只有在type有效时 修改icon
 */
class EModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            disable: false,//隐藏显示
            invisible: false,//内部加载状态,
            checked: false, //勾选状态
        };
    }
    componentDidMount() {
        this.setState({
            disable: this.props.visible,
        })
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     //只有当 外部传入visible与内部disable不一样， 或者内部的disable， invisible发生变化时才会重新render 目的：防止外部render 导致组件内部render
    //     const state = this.state;
    //     if(nextProps.visible !== this.state.disable || state.disable !== nextState.disable || state.invisible !== nextState.invisible || state.checked !== nextState.checked) {
    //         return true;
    //     }
    //     return false;
    // }

    //异常问题 内容部分刷新 会重新调用这个方法
    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        let { checked, invisible } = this.state;
        let disable = false;
        //向外支持，接收到外部visible为true时，设置内部组件状态, 组件消失时设置checked为false
        if(visible) {
            disable = true;
        } else {
            checked = false;
            invisible = false;
        };
        this.setState({
            disable,
            checked,
            invisible,
        })
    }

    //CheckBox点击事件
    onChange(e) {
        this.setState({
            checked: e.target.checked,
        })
    }

    //初始化一些参数
    initial() {
        let props = this.props;
        let { width = 500 } = props;

        //判断是否确认框
        if( !(props.type && ACTION[props.type]) ) {
            modalType = 'primary'; //如果不是confirm框
        } else {
            modalType = 'confirm';
        }

        const {
            wrapClassName = '',
        } = props;
        //封装后 定义一些样式 主要为class，以及区分判断普通模态框还是确认框。目的：不同的框内部间距不同。
        return {
            ...props,
            width,
            wrapClassName: [
                'hy-modal-container',
                wrapClassName,//props 传入样式
            ].join(' ')
        };
    }

    //点击取消事件
    handleCancel() {
        const { onCancel } = this.props;
        const _this = this;
        //取消函数 关闭窗口 切执行传递的函数
        _this.setState({
            invisible: false,
            disable: false,
        }, () => {
            //有onCancel函数 调用函数
            if(onCancel)
                onCancel();
        });
    }

    //点击ok事件
    handleOk() {
      const {  onOk } = this.props;
      const _this = this;
      //onOk回调支持 success 操作成功 =》 所有隐藏 error操作失败 只设置加载层invisible 状态为false
      //success 支持隐藏之后回调函数
      function success(callback) {
          setTimeout(() => {
              _this.setState({
                  invisible: false,
                  disable:false,
              }, () => {
                  if(callback)
                      callback();
              });
          })
      };

      //支持设置状态后的回调方法
      function error(callback) {
          _this.setState({
              invisible: false,
          }, () => {
              if(callback)
                  callback();
          });
      }

      if(onOk) {
          _this.setState({
              invisible: true,//设置加载中
          }, () => {
              onOk(success, error);
          });
      } else {
          //未设置onOk函数
          _this.setState({
              invisible: false,//
              disable: false,
          });
      }
    };

    //生成多选删除定制footer
    renderFooter() {
        const { invisible, checked } = this.state;
        //按钮禁用 未勾选 或者 勾选状态下加载
        return (
            <div>
                <Checkbox checked={checked} onChange={this.onChange.bind(this)} style={{marginTop: 5, float: 'left'}}>确认删除</Checkbox>
                <Button onClick={this.handleCancel.bind(this)}>取 消</Button>
                <Button type="primary" onClick={this.handleOk.bind(this)} loading={invisible} disabled={ !checked || ( checked && invisible ) }>确 定</Button>
            </div>
        );
    }
    render() {
        let props =  this.initial();
        const { icon = false, wrapClassName, type } = props;
        const { invisible, disable } = this.state;

        //如果是多选删除 定制footer
        if( 'multi-delete' === type ) {
            const footer = this.renderFooter();
            props = {
                ...props,
                footer,
            }
        }
        return (
            <Fragment>
                {disable == true && <AntModal
                    maskClosable = {false}
                    {...props}
                    onOk = {this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    confirmLoading={invisible}
                    visible={disable}
                    wrapClassName= {[
                        invisible?'disabled':'',
                        wrapClassName,//props 传入样式
                    ].join(' ')}
                >
                    {modalType === 'confirm'?<ConfirmContainer
                        icon={icon?icon:<i className={`iconfont ${ACTION[props.type]['icon']}`} style={{fontSize: 18, color: `${ACTION[props.type]['color']}`}} />}
                    >{props.children}</ConfirmContainer>:props.children}
                </AntModal>}
            </Fragment>
        )
    }
}
//正常显示 调用如下 title children参数即可
//* title: 'title',//标题
//* children: 'dslj',//内容
//icon 定制图标 可选
function Modal (props, child) {
    return (
        <EModal
            {...props}
        />
    )
};
//confirm 默认配置
const CONFIRM_DEFAULT = {
    width: 500,//宽度
    visible: true,//调用直接显示
};

//提醒框
Modal.info = (props) => {
    const TModal = document.createElement("div");
    // document.body.appendChild(<h2>Yeah!</h2>);
    ReactDom.render(<EModal
        type = 'info'
        {...CONFIRM_DEFAULT}
        okButtonProps = {{style: {
            display: 'none',
            }}}
        cancelText = "知道了"
        {...props}
    />, TModal);
};
Modal.error = (props) => {
    const TModal = document.createElement("div");
    ReactDom.render(<EModal
        {...CONFIRM_DEFAULT}
        {...props}
        type = 'danger'
    />, TModal);
};

Modal.warning = (props) => {
    const TModal = document.createElement("div");
    ReactDom.render(<EModal
        {...CONFIRM_DEFAULT}
        {...props}
        type = 'warning'
    />, TModal);
};

/*
   * method 多选删除
   * dataSource 要显示的数据源
   * tips 提示语
   * warningTip 警告alerts的提示语
   * 示例： Modal.multiDelete({
                title: 'title',
                children: 'dslj',
                warningTips: '很好',
                tips: '已选以下目标',
                dataSource: [{id: 1, label: '这里是测试模板'}]
            })
 */
Modal.multiDelete = (props) => {
    const TModal = document.createElement("div");
    const { warningTips = false, tips = false, dataSource = [] } = props;
    //生成panel
    const PANEL = (
        <Fragment>
            {warningTips?<Alert message={warningTips} type="warning" showIcon />:null}
            {tips?<h3 style={{ margin: '20px 0 0 0', fontWeight: 500 }}>{tips}</h3>:null}
            {dataSource.length > 0?<MultiEnum dataSource={dataSource}/>:null}
        </Fragment>
    );
    ReactDom.render(<EModal
        {...CONFIRM_DEFAULT}
        {...props}
        children = {PANEL}
        type = 'multi-delete'
    />, TModal);
};
export default Modal;