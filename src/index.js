/**
 * Created by RCC on 2018/6/15.
 */

import React from 'react';
import ReactDom from 'react-dom';
import context from '@src/context';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { getCookie } from '@util/cookie';
import history from '@util/history';
import './common.less';

// 一级页面组件
import Index from '@page/index/view';
import List from '@page/list/view';
import Main from '@page/main/view';
import Type from '@page/type/view';
import Description from '@page/description/view';
import FilmPlay from '@page/filmplay/view';

// 以下是管理页面
import Admin from '@page/admin/view';

import Page404 from '@page/page404/view';

ReactDom.render(
    <LocaleProvider locale={zhCN}>
        <Router history={history}>
            <Switch>
                <Route key="index" path="/page/index" component={Index} />
                <Route key="list" path="/page/list" component={List} />
                <Route key="main" path="/page/main" component={Main} />
                <Route key="type" path="/page/type" component={Type} />
                <Route key="description" path="/page/description" component={Description} />
                <Route key="filmplay" path="/page/filmplay" component={FilmPlay} />
                <Route key="pagenotfound" path="/page/pagenotfound" component={Page404} />

                <Route key="admin-film" path="/page/admin/film" component={Admin} />

                <Redirect to="/page/pagenotfound" />
            </Switch>
        </Router>
    </LocaleProvider>,
    document.getElementById('app')
);
