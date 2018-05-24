import {createBottomTabNavigator} from 'react-navigation'
import Message from '../../app/project/Project';
import Topic from '../../app/topic/Topic';
import Mine from '../../app/mine/Mine';
import {colors} from "../../base/Color";
import {Image} from "react-native";
import React from "react";


const messageIcon = require('../../assets/ic_ranking.png');
const topicIcon = require('../../assets/ic_topic.png');
const mineIcon = require('../../assets/ic_mine.png');


export const maiTab = createBottomTabNavigator({
    Message: {
        screen: Message,
        navigationOptions: () => TabOptions('消息', messageIcon),
    },
    Topic: {
        screen: Topic,
        navigationOptions: () => TabOptions('话题', topicIcon),
    },
    Mine: {
        screen: Mine,
        navigationOptions: () => TabOptions('我的', mineIcon),
    }
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: false,
    lazy: true,

    tabBarOptions: {
        showIcon: true,
        showLabel: true,
        inactiveTintColor: '#DBDBDB',
        activeTintColor: '#2196F3',
        style: {
            height: 50,
            backgroundColor: colors.white,
            padding:0
        },
        indicatorStyle: {
            height: 0
        },
        labelStyle: {
            fontSize: 10,
            marginTop: 3,
        },
    },
});


// const TabOptions = (tabBarTitle, checked, unchecked) => {
//     let tabBarLabel = tabBarTitle;
//     let tabBarIcon = (({tintColor, focused}) => {
//         return (
//             <Image
//                 source={!focused ? unchecked : checked}
//                 colors={{height: 30, width: 30}}
//             />
//         )
//     });
//     let header = null;
//     return {tabBarLabel, tabBarIcon, header};
// };

const TabOptions = (tabBarTitle, icon) => {
    let tabBarLabel = tabBarTitle;
    let tabBarIcon = (({tintColor}) => {
        return (
            <Image source={icon} style={{height: 28, width: 28, tintColor: tintColor}}/>
        )
    });
    let header = null;
    return {tabBarLabel, tabBarIcon, header};
};