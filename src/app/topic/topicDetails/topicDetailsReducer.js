import * as Actions from '../../../core/action/Actions'

const initState = {
    userHeader: '',
    userName: '',
    time: '',
    title: '',
    body: '',
    reply:[]
}
export default topicDetailsReducer = (state = initState, action) => {
    switch (action.type) {
        case Actions.GET_TOPICS_DETAILS:
            return {
                userHeader: action.data.user.avatar_url,
                userName: action.data.user.name,
                time: action.data.updated_at,
                body: action.data.body_html,
                title: action.data.title
            }
        case Actions.CLEAR_REPLY_LIST:
            return initState;
        default:
            return state;
    }
}