/**
 * Created by RCC on 2018/6/15.
 */

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import context from '@src/context';
import reducers from '@src/reducers';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { getCookie } from '@util/cookie';
import history from '@util/history';
import './common.less';

// 页面组件
import DeploySuccess from '@page/deploysuccess/view';
import DeployFail from '@page/deployfail/view';
import Page404 from '@page/page404/view';

let store = createStore(reducers);
context.dispatch = store.dispatch;

ReactDom.render(
    <Provider store={store}>
        <LocaleProvider locale={zhCN}>
            <Router history={history}>
                <Switch>
                    <Route key="deploy-success" path="/deploy-success" component={DeploySuccess} />
                    <Route key="deploy-fail" path="/deploy-fail" component={DeployFail} />
                    <Route key="pagenotfound" path="/pagenotfound" component={Page404} />
                    <Redirect to="/pagenotfound" />
                </Switch>
            </Router>
        </LocaleProvider>
    </Provider>,
    document.getElementById('app')
);
