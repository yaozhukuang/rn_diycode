import * as Actions from '../../core/action/Actions'
import Request from '../../base/network/Request'
import { net, cache } from '../../base/Config'
import { ToastAndroid } from 'react-native'
import * as StoreUtils from '../../utils/StoreUtils'

export const actionGetUserInfo = () => {

    return (dispatch) => {
        StoreUtils.get(cache.USER, (value) => {
            let url = net.BASE_URL + net.USER
                + 'me.json?access_token=' + JSON.parse(value).access_token;
            Request.get(url, (response) => {
                StoreUtils.save(cache.INFO, JSON.stringify(response));
                dispatch({ type: Actions.GET_LOGIN_USER_INFO, data: response });
            })
        }, (error) => {
            dispatch({ type: Actions.GET_LOGIN_USER_INFO, data: { avatar_url: null, name: '未登录' } });
        })
    }
}

export const actionLogout = () => {
    return (dispatch) => {
        StoreUtils.remove(cache.USER);
        StoreUtils.remove(cache.INFO);
        dispatch({ type: Actions.GET_LOGIN_USER_INFO, data: { avatar_url: null, name: '未登录' } });
    }
}