import { combineReducers } from 'redux'
import splashReducer from '../../app/splash/SplashReducer'
import loginReducer from '../../app/mine/login/LoginReducer'
import pflistReducer from '../../app/component/pflist/PFReducer'
import topicDetailsReducer from '../../app/topic/topicDetails/topicDetailsReducer'
import replyReducer from '../../app/component/reply/ReplyReducer'
import mineReducer from '../../app/mine/MineReducer'

export const reducer = combineReducers({
    splash: splashReducer,
    login: loginReducer,
    pflist: pflistReducer,
    topicDetails: topicDetailsReducer,
    reply:replyReducer,
    mine:mineReducer
});