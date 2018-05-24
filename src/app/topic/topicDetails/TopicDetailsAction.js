import * as Actions from '../../../core/action/Actions'
import Request from '../../../base/network/Request'
import { net } from '../../../base/Config'

/**
 * 获取话题详情
 * @param {*} id 
 */
export const actionGetTopicDetails = (id) => {
    if (!id) {
        alert('id could not be null');
        return;
    }
    let url = net.BASE_URL + net.TOPIC_DETAILS + id + '.json';
    return (dispatch) => {
        Request.get(url, (response) => {
            dispatch({ type: Actions.GET_TOPICS_DETAILS, data: response });
        });
    }
}

/**
 * 清除话题详情
 */
export const actionClearTopicDetails = () => {
    return { type: Actions.CLEAR_TOPICS_DETAILS }
}
