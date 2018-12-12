/**
 * Created by RCC on 2018/9/4.
 * api 如下：
 *      normalBtnClassName: '',
 *      activeBtnClassName: '',
 *      defaultValue: 1,
 *      data：[
 *          { text: '1天', value: 24 }, // 注意：text:string  value:number ( value值单位为小时，自定义为-1 )
 *          { text: '实时', value: 1 }
 *      ],
 *      handleChange: function
 */

import React from 'react';
import { DatePicker } from 'antd';
import './index.less';

export default class TimeBtnList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cTime: ''
        }
    }
    componentDidMount() {
        const { defaultValue, data } = this.props;
        // 默认以参数为主，其次以第一个为主
        this.setState({
            cTime: defaultValue || data[0].value
        })
    }
    handleCustomOk(value) {
        const { handleChange } = this.props;
        // 更改内部显示
        this.setState({
            cTime: -1
        });
        // 通知父组件改变
        if (handleChange && value) {
            handleChange(parseInt(value[0].valueOf() / 1000), parseInt(value[1].valueOf() / 1000));
        }
    }
    handleTimeChange(value) {
        const { handleChange } = this.props;
        // 更改内部显示
        this.setState({
            cTime: value
        });
        // 通知父组件改变
        if (handleChange && value !== -1 && value !== this.state.cTime) {
            let nowStamp = parseInt(new Date().getTime() / 1000);
            handleChange(nowStamp - value * 3600, nowStamp);
        }
    }
    render() {
        const { data, normalBtnClassName, activeBtnClassName } = this.props;
        const { cTime } = this.state;
        return (
            <div className="time-btn-list-container">
                {
                    data.map((item, idx) => {
                        if (cTime === -1 && item.value === -1) {
                            return (
                                <div key={idx} style={{marginLeft: 8}}>
                                    <DatePicker.RangePicker
                                        showTime={{ format: 'HH:mm:ss' }}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder={['开始时间', '结束时间']}
                                        onOk={this.handleCustomOk.bind(this)}
                                    />
                                </div>
                            )
                        } else {
                            let _class = '';
                            if (normalBtnClassName && activeBtnClassName) {
                                _class = cTime === item.value ? `${normalBtnClassName} ${activeBtnClassName}` : normalBtnClassName;
                            } else {
                                _class = cTime === item.value ? 'time-btn-normal active' : 'time-btn-normal';
                            }
                            return (
                                <div
                                    key={idx}
                                    onClick={this.handleTimeChange.bind(this, item.value)}
                                    className={_class}
                                >
                                    {item.text}
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}
