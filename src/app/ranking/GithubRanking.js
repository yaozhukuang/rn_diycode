import React, { PureComponent } from 'react'
import PFList from '../component/pflist/PFList'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { colors } from '../../base/Color';

export default class GithubRanking extends PureComponent {

    render() {
        return (
            <PFList
                numColumns={3}
                renderItem={this.renderItem}
                ItemSeparatorComponent={null}
                style={{ marginLeft: 5, marginRight:5 }}
                url={'https://api.github.com/search/users?q=type:user&sort=followers'} />
        );
    }

    /**
     * 列表item点击事件
     */
    onImtemClicked = (item) => {
        this.props.navigation.navigate('Web', { url: item.html_url, title: item.login });
    }

    /**
     * 绘制item
     */
    renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => this.onImtemClicked(item)}>
                <View style={{
                    paddingTop:10,paddingLeft:5,paddingRight:5,
                    alignItems: 'center', height: 145, flex: 1
                }}>
                    <Image source={{ uri: item.avatar_url }} style={{ alignSelf: 'stretch', flex: 1 }} />
                    <Text style={{ fontSize: 14, color: colors.textBlack, marginTop: 8 }}>
                        {item.login}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
