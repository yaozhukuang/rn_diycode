import React from 'react'
import { createStackNavigator } from 'react-navigation'
import Splash from '../../app/splash/Splash';
import Login from '../../app/mine/login/Login'
import Project from '../../app/project/Project';
import Topic from '../../app/topic/Topic';
import News from '../../app/news/News';
import Follow from '../../app/mine/follow/Follow';
import Note from '../../app/mine/note/Note';
import Collect from '../../app/mine/collect/Collect';
import GithubRanking from '../../app/ranking/GithubRanking';
import Mine from '../../app/mine/Mine';
import WebSite from '../../app/website/WebSite';
import Home from '../../app/home/Home';
import TopicDetails from '../../app/topic/topicDetails/TopicDetails'
import Web from '../../base/Web'
import { View, StatusBar, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { dimens } from '../../base/Dimen';
import { colors } from '../../base/Color';

export const AppNavigator = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: () => setNavigateBar()
    },
    Login: {
        screen: Login,
        navigationOptions: () => setNavigateBar()
    },
    Home: {
        screen: Home,
        navigationOptions: () => setNavigateBar(createHomeNavigateBar())
    },
    Topic: {
        screen: Topic,
        navigationOptions: {
            header: ({ navigation }) => creatCommonNavigateBar({ navigation }, '社区')
        }
    },
    Project: {
        screen: Project,
        navigationOptions: {
            header: ({ navigation }) => creatCommonNavigateBar({ navigation }, '项目')
        }
    },
    News: {
        screen: News,
        navigationOptions: {
            header: ({ navigation }) => creatCommonNavigateBar({ navigation }, 'News')
        }
    },
    GithubRanking: {
        screen: GithubRanking,
        navigationOptions: {
            header: ({ navigation }) => creatCommonNavigateBar({ navigation }, 'Github排名')
        }
    },
    WebSite: {
        screen: WebSite,
        navigationOptions: {
            header: ({ navigation }) => creatCommonNavigateBar({ navigation }, '酷站')
        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            header: ({ navigation }) => creatCommonNavigateBar({ navigation }, '我的')
        }
    },
    TopicDetails: {
        screen: TopicDetails,
        navigationOptions: {
            header: ({ navigation }) => creatCommonNavigateBar({ navigation }, '详情')
        }
    },
    Web: {
        screen: Web,
        navigationOptions: {
            header: ({ navigation }) => creatCommonNavigateBar({ navigation }, '详情')
        }
    },
    Note: {
        screen: Note,
        navigationOptions: {
            header: ({ navigation }) => creatCommonNavigateBar({ navigation }, '我的帖子')
        }
    },
    Collect: {
        screen: Collect,
        navigationOptions: {
            header: ({ navigation }) => creatCommonNavigateBar({ navigation }, '我的收藏')
        }
    },
    Follow: {
        screen: Follow,
        navigationOptions: {
            header: ({ navigation }) => creatCommonNavigateBar({ navigation }, '我的关注')
        }
    },
});

const setNavigateBar = (header = null) => {
    return { header };
};


const createHomeNavigateBar = () => {
    return (
        <View>
            <StatusBar translucent={true} backgroundColor={colors.transparent} />
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: colors.white, fontSize: 19 }}>{'DiyCode'}</Text>
            </View>
        </View>
    );
};

const creatCommonNavigateBar = ({ navigation }, title) => {
    let name;
    if (navigation.state == null || navigation.state.routes.lengrh <= 1) {
        name = title;
    } else {
        let route = navigation.state.routes[navigation.state.routes.length - 1];
        name = route.params ? (route.params.title ? route.params.title : title) : title;
    }

    return (
        <View>
            <StatusBar translucent={true} backgroundColor={colors.transparent} />
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.goBack(null)}>
                    <Image source={require('../../assets/ic_back.png')} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
                <Text
                    numberOfLines={1}
                    style={{
                        color: colors.white,
                        fontSize: 18,
                        paddingLeft: 16,
                        paddingRight: 16
                    }}>
                    {name}
                </Text>
                <View style={{ width: 25, height: 25 }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.blue,
        paddingTop: dimens.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: dimens.navigatorHeight + dimens.statusBarHeight,
        paddingLeft: 16,
        paddingRight: 16
    }
});
