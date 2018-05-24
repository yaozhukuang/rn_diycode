import React, { PureComponent } from 'react'
import { Text, View, Image, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import { colors } from '../../base/Color'
import { connect } from 'react-redux'
import { actionGetUserInfo, actionLogout } from './MineAction'
import HolderImage from '../../base/component/HolderImage'
import { cache } from '../../base/Config'
import * as StoreUtils from '../../utils/StoreUtils'

class Mine extends PureComponent {

    render() {
        let mine = this.props.state;
        return (
            <View>
                <TouchableWithoutFeedback
                    onPress={this.login}>
                    <View style={styles.topContainer}>
                        <HolderImage
                            holder={mine.holder}
                            uri={mine.head}
                            style={styles.userHead}
                        />
                        <Text style={{
                            marginTop: 12,
                            color: colors.white,
                            fontSize: 16
                        }}>{mine.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    {this.divide(12)}
                    <TouchableHighlight
                        onPress={this.note}
                        underlayColor={colors.gray}>
                        <View style={styles.item}>
                            <Image style={styles.icon} source={require('../../assets/ic_note.png')} />
                            <Text style={styles.content}>{'我的帖子'}</Text>
                        </View>
                    </TouchableHighlight>
                    {this.divide()}
                    <TouchableHighlight
                        onPress={this.collect}
                        underlayColor={colors.gray}>
                        <View style={styles.item}>
                            <Image style={styles.icon} source={require('../../assets/ic_collect.png')} />
                            <Text style={styles.content}>{'我的收藏'}</Text>
                        </View>
                    </TouchableHighlight>
                    {this.divide()}
                    <TouchableHighlight
                        onPress={this.follow}
                        underlayColor={colors.gray}>
                        <View style={styles.item}>
                            <Image style={styles.icon} source={require('../../assets/ic_follow.png')} />
                            <Text style={styles.content}>{'我的关注'}</Text>
                        </View>
                    </TouchableHighlight>
                    {this.divide()}
                    <TouchableHighlight
                        onPress={() => this.props.navigation.navigate('Web',
                            { url: 'https://www.diycode.cc/wiki', title: '关于' })}
                        underlayColor={colors.gray}>
                        <View style={styles.item}>
                            <Image style={styles.icon} source={require('../../assets/ic_about.png')} />
                            <Text style={styles.content}>{'关于'}</Text>
                        </View>
                    </TouchableHighlight>
                    {this.divide(25)}
                    <TouchableHighlight
                        onPress={() => this.props.dispatch(actionLogout())}
                        underlayColor={colors.gray}
                        style={[styles.item, { justifyContent: 'center' }]}>
                        <Text style={{ color: colors.textBlack }}>{'退出登录'}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    /**
     * 分割线
     */
    divide = (height = 1) => {
        return (
            <View style={{ backgroundColor: colors.divide, height: height }} />
        );
    }

    /**
     * 登录
     */
    login = () => {
        StoreUtils.get(cache.USER, (value) => {
            //已经登录
        }, (error) => {
            this.props.navigation.navigate('Login');
        })
    }

    /**
     * 我的帖子
     */
    note = () => {
        StoreUtils.get(cache.INFO, (value) => {
            //已经登录
            this.props.navigation.navigate('Note', {user: JSON.parse(value).login});
        }, (error) => {
            this.props.navigation.navigate('Login');
        })
    }

    /**
    * 我的关注
    */
    follow = () => {
        StoreUtils.get(cache.INFO, (value) => {
            //已经登录
            this.props.navigation.navigate('Follow', {user: JSON.parse(value).login});
        }, (error) => {
            this.props.navigation.navigate('Login');
        })
    }

    /**
     * 我的收藏
     */
    collect = () => {
        StoreUtils.get(cache.INFO, (value) => {
            //已经登录
            this.props.navigation.navigate('Collect', {user: JSON.parse(value).login});
        }, (error) => {
            this.props.navigation.navigate('Login');
        })
    }


    componentDidMount() {
        this.props.dispatch(actionGetUserInfo())
    }

}

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30
    },
    userHead: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderColor: colors.white,
        borderWidth: 1
    },
    item: {
        flexDirection: 'row',
        height: 50,
        paddingLeft: 16,
        alignItems: 'center',
        backgroundColor: colors.white
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 15
    },
    content: {
        fontSize: 14,
        color: colors.textBlack
    }
});

const mapStateToProps = (state) => {
    return {
        state: state.mine
    }
}

export default connect(mapStateToProps)(Mine)