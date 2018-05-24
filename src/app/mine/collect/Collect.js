import React, { PureComponent } from 'react'
import { net } from '../../../base/Config'
import PFList from '../../component/pflist/PFList'
import {
    View, Text, StyleSheet,
    TouchableHighlight, TouchableWithoutFeedback
} from 'react-native'
import CustomImage from '../../../base/component/CustomImage'
import { colors } from '../../../base/Color'
import { formatDiyCodeDailyTime } from '../../../utils/Time'
import { actionCollect } from './CollectActions'
import { connect } from 'react-redux'

class Collect extends PureComponent {

    render() {
        let url = net.BASE_URL + net.USER + this.props.navigation.state.params.user + '/favorites.json';
        return (
            <PFList
                renderItem={this.renderItem}
                url={url} />
        );
    }

    /**
     * 列表item点击事件
     */
    onImtemClicked = (item) => {
        this.props.navigation.navigate('TopicDetails', { id: item.id });
    }

    /**
     * 取消收藏
     */
    unCollect = (id) => {
        this.props.dispatch(actionCollect(id));
    }

    /**
     * 绘制列表item
     * @param item 列表item
     */
    renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => this.props.onImtemClicked(item)}>
                <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
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
                    <TouchableHighlight
                        style={styles.cancelCollect}
                        onPress={() => this.unCollect(item.id)}
                        underlayColor={colors.gray}>
                        <Text style={{ fontSize: 10 }}>{'取消关注'}</Text>
                    </TouchableHighlight>
                </View>
            </TouchableWithoutFeedback>
        );
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
    cancelCollect: {
        marginLeft: 12,
        borderRadius: 10,
        borderColor: colors.divide,
        borderWidth: 1,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 10,
        paddingRight: 10
    },
});

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(Collect)