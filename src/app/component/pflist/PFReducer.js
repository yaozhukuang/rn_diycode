import * as Actions from '../../../core/action/Actions'

const initState = {
    data: [],
    refreshing: true,
    loadAll: false
}

export default function pflistReducer(state = initState, action) {
    switch (action.type) {
        case Actions.GET_PFLIST_DATA:
            let tmpData = (action.index === 0 ? [] : state.data);
            return {
                data: [...tmpData, ...action.data],
                refreshing: false,
                loadAll: action.data.length === 0
            }
        case Actions.CLEAR_PFLIST_DATA:
            return initState;
        case Actions.REMOVE_LIST_ITEM:
            let tmp = Object.assign({}, state);
            tmp.data.splice(tmp.data.findIndex(item => item.id === action.id), 1);
            return tmp;
        default:
            return state
    }
}