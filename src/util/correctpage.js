/**
 * Created by RCC on 2018/11/26.
 * 调用接口，校验页面是否停留在正确位置。
 */

import { dispatch } from '@util/dispatch';
import history from '@util/history';

export default () => {
    dispatch({
        type: 'pageStatus/getStatus',
        payload: {
            url: '/clusters/getStatus/',
            successCallback: (response) => {
                const path = window.location.pathname;
                const { branch, status } = response.data;
                if (branch === 0) { // 配置管理中心
                    // 暂不处理
                } else if (branch === 1) { // 部署逻辑
                    if (status === 0 && path.indexOf('deploy-index') < 0 && path.indexOf('deploy-step') < 0) {
                        history.push('/deploy-index');
                    } else if (status === 1 && path.indexOf('deploy-ing') < 0) {
                        history.push(`/deploy-ing?task_id=${response.data.task_id}`);
                    } else if (status === 2 && path.indexOf('deploy-success') < 0) {
                        history.push('/deploy-success');
                    } else if (status === -1 && path.indexOf('deploy-fail') < 0) {
                        history.push('/deploy-fail');
                    } else {
                        // 保留当前页面，什么也不做
                    }
                } else {
                    console.log('后端接口返回错误：[/deployapi/clusters/getStatus/]');
                }
            }
        }
    });
}
