/**
 * Created by RCC on 2018/6/21.
 * 搜集所有的reducer
 */

//import Detail from '@page/detail/model';
import { combineReducers } from 'redux';

const allReducers = [
  //  Detail
].reduce((p, c) => {
    p[c.namespace] = c.reducer;
    return p
}, {});

export default combineReducers(allReducers);
