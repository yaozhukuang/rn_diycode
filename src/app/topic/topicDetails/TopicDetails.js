import React, { PureComponent } from 'react'
import { View, ScrollView, WebView, Text, StyleSheet } from 'react-native'
import Request from '../../../base/network/Request'
import { colors } from '../../../base/Color'
import { connect } from 'react-redux'
import CustomImage from '../../../base/component/CustomImage'
import { formatDiyCodeDailyTime } from '../../../utils/Time'
import { actionGetTopicDetails, actionClearTopicDetails } from './TopicDetailsAction'
import MyWebView from 'react-native-webview-autoheight';
import ReplyList from '../../component/reply/ReplyList'
import { net } from '../../../base/Config'
import {actionGetReply} from '../../component/reply/ReplyAction'

class TopicDetails extends PureComponent {

    render() {
        let details = this.props.state.topicDetails;
        return (
            <ScrollView style={{ backgroundColor: colors.white, paddingTop: 16 }}>
                <View style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <CustomImage
                        uri={details.userHeader}
                        name={details.userName}
                        style={styles.userIcon} />
                    <Text style={{ fontSize: 14, color: colors.textLight }}>
                        {details.userName}
                    </Text>
                    <Text style={styles.time}>
                        {formatDiyCodeDailyTime(details.time)}
                    </Text>
                </View>

                <Text style={{
                    fontSize: 16,
                    color: colors.textBlack,
                    marginTop: 12,
                    paddingLeft: 16,
                    paddingRight: 16,
                }}>
                    {details.title}
                </Text>

                <MyWebView
                    onLoadEnd={this.getItemList}
                    style={{ paddingLeft: 16, paddingRight: 16, }}
                    source={{ html: details.body, baseUrl: '' }}
                    automaticallyAdjustContentInsets={true}
                    scalesPageToFit={true}
                    startInLoadingState={true} />

                <ReplyList
                    url={net.BASE_URL + net.TOPIC_DETAILS + this.getTopicId() + net.REPLY} />
            </ScrollView>
        );
    }

    /**
     * 获取回复列表
     */
    getItemList = (index) => {
        url = net.BASE_URL + net.TOPIC_DETAILS + this.getTopicId() + net.REPLY;
        let action = actionGetReply(index, url);
        this.props.dispatch(action);
    }

    componentDidMount() {
        let action = actionGetTopicDetails(this.getTopicId());
        this.props.dispatch(action);
    }

    getTopicId = () => {
        return this.props.navigation.state.params.id;
    }

    componentWillUnmount() {
        this.props.dispatch(actionClearTopicDetails());
    }
}

const styles = StyleSheet.create({
    userIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10
    },
    time: {
        fontSize: 14,
        color: colors.textLight,
        flex: 1,
        textAlign: 'right'
    }
});

const mapStateToPrps = (state) => {
    return {
        state: state
    }
}

export default connect(mapStateToPrps)(TopicDetails)