import * as Actions from '../../core/action/Actions'

const initState = {
    holder: require('../../assets/ic_default_head.png'),
    head: '',
    name: ''
}

export default function mineReducer(state = initState, action) {
    switch (action.type) {
        case Actions.GET_LOGIN_USER_INFO:
            return {
                holder: require('../../assets/ic_default_head.png'),
                head: action.data.avatar_url,
                name: action.data.name
            }
        default:
            return state;
    }
}