import * as Actions from '../../../core/action/Actions'

const initState = {
    data: [],
    loadAll: false
}

export default replyReducer = (state = initState, action) => {
    switch (action.type) {
        case Actions.GET_REPLY_LIST:
            return { data: action.data, loadAll: action.data.length === 0 };
        case Actions.CLEAR_REPLY_LIST:
            return initState;
        default:
            return state;
    }
}