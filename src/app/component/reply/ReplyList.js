import React, { PureComponent } from 'react'
import {
    View, FlatList, Text, StyleSheet, TextInput,
    Animated, Easing, TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native'
import { colors } from "../../../base/Color";
import { connect } from 'react-redux'
import { actionPostReply, actionClearReply } from './ReplyAction'
import CustomImage from '../../../base/component/CustomImage'
import { formatDiyCodeDailyTime } from '../../../utils/Time'
import MyWebView from 'react-native-webview-autoheight';

class ReplyList extends PureComponent {

    render() {
        let reply = this.props.state;
        return (
            <View>
                <Text style={{
                    backgroundColor: colors.divide,
                    color: colors.textBlack,
                    padding: 12
                }}>
                    {'共收到' + reply.data.length + '条回复'}
                </Text>

                <FlatList
                    style={
                        this.props.style ? this.props.style : {
                            backgroundColor: colors.white,
                            paddingTop: 10,
                            paddingBottom:12
                        }
                    }
                    renderItem={
                        this.props.renderItem ? this.props.renderItem : this.renderItem
                    }
                    ItemSeparatorComponent={
                        this.props.ItemSeparatorComponent ? this.props.ItemSeparatorComponent : this.separator
                    }
                    data={
                        this.props.data ? this.props.data : reply.data
                    }
                    onEndReached={
                        this.props.onEndReached ? this.props.onEndReached : this.onEndReached
                    }
                    onEndReachedThreshold={
                        this.onEndReachedThreshold ? this.props.onEndReachedThreshold : 0.1
                    }
                    keyExtractor={(item, index) => index.toString()} />

                <TextInput
                    placeholder={'评论内容'}
                    multiline={true}
                    textAlignVertical={'top'}
                    onChangeText={(text) => { this.reply = text }}
                    underlineColorAndroid={colors.transparent}
                    style={{
                        height: 100,
                        margin: 12,
                        textAlign: 'left',
                        padding: 10,
                        backgroundColor: colors.divide,
                        borderRadius: 6
                    }}
                />
                <TouchableHighlight
                    style={styles.send}
                    onPress={this.postReply}
                    underlayColor={colors.blueLight}>
                    <Text style={{ color: colors.white }}>{'发送'}</Text>
                </TouchableHighlight>
            </View>
        );
    }

    /**
     * 发表回复
     */
    postReply = () => {
        let action = actionPostReply(this.props.url, this.reply);
        this.props.dispatch(action);
    }

    /**
     * 分割线
     */
    separator = () => (
        <View style={{ height: 8, backgroundColor: colors.divide }} />
    );

    /**
     * 绘制item
     */
    renderItem = ({ item }) => {
        return (
            <View style={{ padding:12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CustomImage
                        uri={item.user.avatar_url}
                        name={item.user.name}
                        style={styles.userIcon} />
                    <Text style={{ fontSize: 12, color: colors.textLight }}>
                        {item.user.name}
                    </Text>
                    <Text style={styles.time}>
                        {formatDiyCodeDailyTime(item.updated_at)}
                    </Text>
                </View>
                <MyWebView
                    source={{ html: item.body_html, baseUrl: '' }}
                    automaticallyAdjustContentInsets={true}
                    startInLoadingState={false} />
            </View>
        );
    }

    componentWillUnmount() {
        this.props.dispatch(actionClearReply())
    }
}

const styles = StyleSheet.create({
    userIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10
    },
    time: {
        fontSize: 12,
        color: colors.textLight,
        flex: 1,
        textAlign: 'right'
    },
    send: {
        width: 80,
        height: 30,
        marginTop: 10,
        marginBottom: 50,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blue,
        borderRadius: 5,
        marginRight: 12
    }
});



const mapStateToProps = (state) => {
    return {
        state: state.reply
    }
}

export default connect(mapStateToProps)(ReplyList)