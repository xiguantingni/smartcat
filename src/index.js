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

// 一级页面组件
import Main from '@page/main/view';
import Type from '@page/type/view';
import Detail from '@page/detail/view';
import Description from '@page/description/view';
import FilmPlay from '@page/filmplay/view';
import Page404 from '@page/page404/view';

let store = createStore(reducers);
context.dispatch = store.dispatch;

ReactDom.render(
    <Provider store={store}>
        <LocaleProvider locale={zhCN}>
            <Router history={history}>
                <Switch>
                    <Route key="main" path="/page/main" component={Main} />
                    <Route key="type" path="/page/type" component={Type} />
                    <Route key="detail" path="/page/detail" component={Detail} />
                    <Route key="description" path="/page/description" component={Description} />
                    <Route key="filmplay" path="/page/filmplay" component={FilmPlay} />
                    <Route key="pagenotfound" path="/page/pagenotfound" component={Page404} />
                    <Redirect to="/page/pagenotfound" />
                </Switch>
            </Router>
        </LocaleProvider>
    </Provider>,
    document.getElementById('app')
);
