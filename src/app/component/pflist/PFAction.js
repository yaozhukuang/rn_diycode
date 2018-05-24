import * as Actions from '../../../core/action/Actions'
import Request from '../../../base/network/Request'


/**
 * 获取列表
 * @param  index 列表开始索引
 * @param  url 请求地址 
 */
export function actionGetPFListData(index = 0, url) {
    if (!url) {
        alert('please set url');
        return;
    }
    if (url.indexOf('github') != -1) {
        let wholeUrl = url + '?page=' + index / 20 + '&per_page=20';
        return (dispatch) => {
            Request.get(wholeUrl, (response) => {
                dispatch({ type: Actions.GET_PFLIST_DATA, data: response.items, index: index });
            });
        }
    } else {
        let wholeUrl = url + '?offset=' + index + '&limit=20';
        return (dispatch) => {
            Request.get(wholeUrl, (response) => {
                dispatch({ type: Actions.GET_PFLIST_DATA, data: response, index: index });
            });
        }
    }
}

/**
 * 清除列表
 */
export function actionClearPFList() {
    return { type: Actions.CLEAR_PFLIST_DATA }
}

/**
 * 删除某一个item
 * @param  id item id
 */
export function actionRemoveItem(id) {
    return { type: Actions.REMOVE_LIST_ITEM, id: id }
}