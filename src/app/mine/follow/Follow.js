import React, { PureComponent } from 'react'
import { net } from '../../../base/Config'
import PFList from '../../component/pflist/PFList'
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native'
import { colors } from '../../../base/Color'
import CustomImage from '../../../base/component/CustomImage'
import { connect } from 'react-redux'
import { actionUnfollow } from './FollowAction'

class Follow extends PureComponent {

    render() {
        let url = net.BASE_URL + net.USER + this.props.navigation.state.params.user + '/following.json';
        return (
            <PFList
                renderItem={this.renderItem}
                url={url} />
        );
    }

    /**
    * 绘制列表item
    * @param item 列表item
    */
    renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <CustomImage
                    uri={item.avatar_url}
                    name={item.name}
                    style={styles.head} />
                <Text style={{ color: colors.textBlack, fontSize: 16, flex: 1 }}>
                    {item.name}
                </Text>

                <TouchableHighlight
                    style={styles.cancelFollow}
                    onPress={() => this.unFollow(item.id)}
                    underlayColor={colors.gray}>
                    <Text style={{ fontSize: 10 }}>{'取消关注'}</Text>
                </TouchableHighlight>
            </View>
        );
    }

    /**
    * 取消关注
    * @param id 
    */
    unFollow = id => {
        let user = this.props.navigation.state.params.user;
        this.props.dispatch(actionUnfollow(user, id));
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center'
    },
    head: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12
    },
    cancelFollow: {
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

export default connect(mapStateToProps)(Follow)