import React, { PureComponent } from 'react'
import {
    FlatList, Text, View, StyleSheet,
    Image, Animated, Easing, TouchableWithoutFeedback
} from 'react-native'
import { colors } from "../../../base/Color";
import { connect } from 'react-redux'
import { actionGetPFListData, actionClearPFList } from './PFAction'
import { formatDiyCodeDailyTime } from '../../../utils/Time'
import CustomImage from '../../../base/component/CustomImage'

class PFList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            rotateValue: new Animated.Value(0)
        };
    }

    render() {
        return (
            <FlatList
                style={
                    this.props.style ? this.props.style : { backgroundColor: colors.white }
                }
                renderItem={
                    this.props.renderItem ? this.props.renderItem : this.renderItem
                }
                numColumns={
                    this.props.numColumns ? this.props.numColumns : 1
                }
                ListEmptyComponent={
                    this.props.ListEmptyComponent ? this.props.ListEmptyComponent : this.empty
                }
                ListFooterComponent={
                    this.props.ListFooterComponent ? this.props.ListFooterComponent : this.footer
                }
                ItemSeparatorComponent={
                    this.props.ItemSeparatorComponent ? this.props.ItemSeparatorComponent : this.separator
                }
                data={
                    this.props.data ? this.props.data : this.props.state.pflist.data
                }
                onRefresh={
                    this.props.onRefresh ? this.props.onRefresh : this.getItemList
                }
                refreshing={
                    this.props.refreshing ? this.props.refreshing : this.props.state.pflist.refreshing
                }
                showsVerticalScrollIndicator={
                    this.props.showsVerticalScrollIndicator ? this.props.showsVerticalScrollIndicator : false
                }
                onEndReached={
                    this.props.onEndReached ? this.props.onEndReached : this.onEndReached
                }
                onEndReachedThreshold={
                    this.onEndReachedThreshold ? this.props.onEndReachedThreshold : 0.1
                }
                keyExtractor={(item, index) => index.toString()} />
        );
    }

    /**
     * 获取pflist列表数据
     */
    getItemList = (index = 0) => {
        let action = actionGetPFListData(index, this.props.url);
        this.props.dispatch(action);
    };

    /**
     * 分割线
     */
    separator = () =>
        (<View
            style={{ height: 1, backgroundColor: colors.divide }}
        />);

    /**
     * 空视图
     */
    empty = () => {
        return (
            <Text style={{ color: colors.textBlack, textAlign: 'center', marginTop: 130 }}>
                {'暂无数据'}
            </Text>
        );
    }

    /**
     * 绘制列表item
     * @param item 列表item
     */
    renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => this.props.onImtemClicked ? this.props.onImtemClicked(item) : null}>
                <View style={{ padding: 16 }}>
                    <View style={styles.itemTitle}>
                        <CustomImage
                            uri={item.user.avatar_url}
                            name={item.user.name}
                            style={styles.userIcon} />
                        <Text style={{ fontSize: 12, color: colors.blue }}>
                            {item.user.name}
                        </Text>
                        <Text style={{ fontSize: 12, color: colors.textLight, marginLeft: 20 }}>
                            {formatDiyCodeDailyTime(item.updated_at)}
                        </Text>
                    </View>
                    <Text style={styles.content}>{item.title}</Text>
                    <View style={styles.itemTitle}>
                        <Text style={styles.tag}>{item.node_name}</Text>
                        <Text style={{ fontSize: 12, color: colors.textLight }}>
                            {'评论 ' + (item.replies_count ? item.replies_count : 0)}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    /**
     * footer，用于加载跟多的表示
     */
    footer = () => {
        const spin = this.state.rotateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        //列表为空，不展示加载更多
        if (this.props.state.pflist.data.length === 0) {
            return (
                <View />
            );
        }
        //已经全部加载完成
        if (this.props.state.pflist.loadAll) {
            return (
                <View style={styles.footer}>
                    <Text>{'没有更多了'}</Text>
                </View>
            )
        }
        //正在加载更多
        return (
            <Animated.View style={[styles.footer, { transform: [{ rotate: spin }] }]}>
                <Image
                    style={{ width: 35, height: 35 }}
                    source={require('../../../assets/ic_loading.png')} />
            </Animated.View>
        );
    };

    /**
     * 加载更多动画
     */
    runLoadAnimation() {
        this.state.rotateValue.setValue(0);
        Animated.timing(this.state.rotateValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear
        }).start(() => this.runLoadAnimation());
    }

    /**
     * 滑动到底部
     */
    onEndReached = () => {
        if (!this.props.state.pflist.loadAll) {
            //可以加载更多
            this.runLoadAnimation();
            this.getItemList(this.props.state.pflist.data.length)
        }
    };


    componentDidMount() {
        this.getItemList(0);
    }

    componentWillUnmount() {
        this.props.dispatch(actionClearPFList());
    }
}

const styles = StyleSheet.create({
    itemTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10
    },
    content: {
        color: colors.textBlack,
        marginTop: 10,
        fontSize: 15,
        marginBottom: 8
    },
    tag: {
        fontSize: 10,
        padding: 1,
        marginRight: 12,
        textAlign: 'center',
        color: colors.textLight
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70
    },
});

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(PFList)