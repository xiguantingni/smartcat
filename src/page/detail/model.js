/**
 * Created by RCC on 2018/12/14.
 */

import constant from '@src/constant';

const initState = {
    isFetchDetail: false,
    detail: {},
    fetchDetailError: null
};

const namespace = 'detail';

export default {
    namespace: namespace,
    reducer: (state = initState, { type, payload = {}, error }) => {
        switch (type) {
            case `${namespace}/getDetail_${constant.request}`:
                return {
                    ...state,
                    isFetchDetail: true,
                    fetchDetailError: null
                };
            case `${namespace}/getDetail_${constant.success}`:
                return {
                    ...state,
                    isFetchDetail: false,
                    detail: payload.response.data
                };
            case `${namespace}/getDetail_${constant.fail}`:
                return {
                    ...state,
                    isFetchDetail: false,
                    fetchDetailError: error
                };
            default:
                return state;
        }
    }
}
