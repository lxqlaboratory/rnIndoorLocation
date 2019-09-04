
import {
    PAGE_LOGIN,
    UPDATE_PAGE_STATE,
    UPDATE_NAVIGATOR
} from '../constants/PageStateConstants';


//更新登录前的页面状态
export let updatePageState=(payload)=>{

    return (dispatch,getState)=> {
        dispatch({
            type:UPDATE_PAGE_STATE,
            payload:payload
        });
    }
}
