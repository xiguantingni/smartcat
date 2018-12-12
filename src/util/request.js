/**
 * Created by RCC on 2018/6/22.
 *  options释义
        post接口成功失败，界面都会提示，需提示语句
        options = {
            successCallback: function, // 成功回调
            failCallback: function, // 失败回调
            successAlertMsg: '操作成功', // 成功提示语。默认：post请求提示，get不提示。
            method: 'GET', // 方法
            para: {type : 1}, //url参数
            body: {name: 123} // post数据
            pageStatusCheck: function // 接口有效性检查，通过则调用接口；不通过，则放弃。
        }
 */

import fetch from 'isomorphic-fetch';
import context from '@src/context';
import constant from '@src/constant';
import { getCookie } from '@util/cookie';
import notification from '@component/notification';
import correctPage from '@util/correctpage';

export const request = (url, options = {}) => {
    // 1,url处理
    if (options.para) {
        let _suffix = '';
        for (let key in options.para) {
            if (url.indexOf(key) >= 0) {
                url.replace(`{${key}}`, options.para[key]);
            } else {
                _suffix += `&${key}=${options.para[key]}`;
            }
        }
        url += _suffix ? '?' + _suffix.substring(1) : '';
    }
    // headers处理
    options.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${getCookie('token')}`
    };
    options.credentials = 'include';
    // method处理
    if (!options.method) {
        options.method = 'POST'; // 海河默认
    }
    // body 处理
    if (options.body) {
        options.body = JSON.stringify(options.body);
    }
    // 页面状态检查
    if (options.pageStatusCheck) {
        correctPage();
    }

    // 通知request
    context.dispatch({ type: `${options.type}_${constant.request}`, payload: options });

    return fetch(`/deployapi${url}`, options)
        .then((res) => {
            if (res.status >= 0 && res.status <= 599) {
                return res;
            } else {
                throw new Error('异常').response = res;
            }
        })
        .then((res) => {
            return res.json().then(resp => {
                return {
                    status: res.status,
                    response: resp
                }
            })
        })
        .then(res => {
            const { response, status } = res;
            // 成功获取后台数据
            if (status >= 200 && status < 300) {
                // 成功通知
                context.dispatch({ type: `${options.type}_${constant.success}`, payload: { ...options, response } });
                // 成功回调
                options.successCallback && options.successCallback(response);
            } else {
                if (status === 401) {
                    notification('info', { description: '登录超时，请重新登录。' });
                    context.dispatch({
                        type: 'login/logout'
                    })
                } else {
                    // 失败通知
                    context.dispatch({ type: `${options.type}_${constant.fail}`, payload: { ...options, response } });
                    // 失败回调
                    options.failCallback && options.failCallback(response);
                    // 失败提示
                    notification('error', { description: response.errorMessage || '操作失败' });
                }
            }
            return response;
        })
        .catch(error => {
            // 网络连接错误，或者前端语法错误
            console.log(error);
            // 失败回调
            options.failCallback && options.failCallback(error);
            // 失败通知
            context.dispatch({ type: `${options.type}_${constant.fail}`, payload: { ...options, error } });
            // 失败提示
            notification('error', { description: '操作失败' });
        });

};
