import * as Actions from '../../../core/action/Actions'
import Request from '../../../base/network/Request'
import { ToastAndroid } from 'react-native'
import { net, cache } from '../../../base/Config'
import * as StoreUtils from '../../../utils/StoreUtils'

/**
 * 获取回复列表
 * @param index 列表开始索引
 * @param url 请求地址 
 */
export const actionGetReply = (index = 0, url) => {
    if (!url) {
        alert('please set url');
        return;
    }
    return (dispatch) => {
        Request.get(url, (response) => {
            dispatch({ type: Actions.GET_REPLY_LIST, data: response });
        })
    }
}

/**
 * 清空评论列表
 */
export const actionClearReply = () => {
    return { type: Actions.CLEAR_REPLY_LIST }
}

/**
 * 发表回复
 * @param url 回复地址 
 * @param content 回复内容
 */
export const actionPostReply = (url, content) => {
    if (!url) {
        alert('please set url');
        return;
    }
    return (dispatch) => {
        StoreUtils.get(cache.USER, (value) => {
            let wholeUrl = url + '?access_token=' + JSON.parse(value).access_token;
            Request.post(wholeUrl, { body: JSON.stringify({ body: content })}, (response) => {
                console.log('response: ' + JSON.stringify(response));
                if (response.error) {
                    ToastAndroid.show(response.error, ToastAndroid.SHORT);
                } else {
                    dispatch(actionGetReply(0, url));
                }
            }, (error) => {
                ToastAndroid.show('error: ' + error.message, ToastAndroid.SHORT);
            })
        }, (error) => {
            ToastAndroid.show('error: ' + error.message, ToastAndroid.SHORT);
        });
    }
}