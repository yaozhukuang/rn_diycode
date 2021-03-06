import * as Actions from '../../../core/action/Actions'
import Request from '../../../base/network/Request'
import { ToastAndroid } from 'react-native'
import { actionRemoveItem } from '../../component/pflist/PFAction'
import { net, cache } from '../../../base/Config'
import * as StoreUtils from '../../../utils/StoreUtils'


export const actionDelete = (id) => {
    return (dispatch) => {
        StoreUtils.get(cache.USER, (value) => {
            let url = net.BASE_URL + net.TOPIC_DETAILS + id
                + '?access_token=' + JSON.parse(value).access_token;
            Request.delete(url, {}, (response) => {
                dispatch(actionRemoveItem(id));
            }, (error) => {
                ToastAndroid.show('error: ' + error.message, ToastAndroid.SHORT);
            })
        }, (error) => {
            ToastAndroid.show('error: ' + error.message, ToastAndroid.SHORT);
        })
    }
}