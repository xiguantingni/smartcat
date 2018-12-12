/**
 * Created by RCC on 2018/12/7.
 */

import constant from '@src/constant';

const initState = {
    isRetryDeploy: false,
    retryDeployError: null
};

const namespace = 'deployFail';

export default {
    namespace: namespace,
    reducer: (state = initState, { type, payload = {}, error }) => {
        switch (type) {
            case `${namespace}/retryDeploy_${constant.request}`:
                return {
                    ...state,
                    isRetryDeploy: true,
                    retryDeployError: null
                };
            case `${namespace}/retryDeploy_${constant.success}`:
                return {
                    ...state,
                    isRetryDeploy: false
                };
            case `${namespace}/retryDeploy_${constant.fail}`:
                return {
                    ...state,
                    isRetryDeploy: false,
                    retryDeployError: error
                };
            default:
                return state;
        }
    }
}
