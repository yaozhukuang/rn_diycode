import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
import { net } from '../../base/Config'
import PFList from '../component/pflist/PFList'
import { colors } from '../../base/Color';
import CustomImage from '../../base/component/CustomImage'

export default class Project extends PureComponent {

    render() {
        return (
            <PFList
                renderItem={this.renderItem}
                url={net.BASE_URL + net.PROJECT} />
        );
    }


    /**
     * 绘制列表item
     * @param item 列表item
     */
    renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => this.onImtemClicked(item)}>
                <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>

                    <CustomImage
                        uri={item.project_cover_url}
                        name={item.name}
                        style={styles.userIcon} />

                    <View style={{ justifyContent: 'space-between', flexShrink: 1 }}>
                        <Text style={{ color: colors.blue, fontSize: 16 }}>{item.name}</Text>
                        <Text
                            numberOfLines={3}
                            style={{ color: colors.textBlack, marginTop: 5 }}>
                            {item.description}
                        </Text>
                        <Text style={{ color: colors.textLight, fontSize: 12, marginTop: 5 }} >
                            <Text style={{
                                color: colors.textLight,
                                backgroundColor: colors.gray,
                                borderRadius: 3,
                                fontSize: 12,
                                marginRight: 6,
                                paddingLeft: 3,
                                paddingRight: 3
                            }}>
                                {item.category.name ? item.category.name : ''}
                            </Text>
                            {' · ' + (item.sub_category.name ? item.sub_category.name : '')}
                        </Text>
                    </View>

                    <View style={{
                        height: 18,
                        borderRadius: 9,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#777777',
                        marginLeft: 10,
                        paddingLeft: 5,
                        paddingRight: 5
                    }}>
                        <Image
                            style={{ width: 14, height: 14, marginRight: 4 }}
                            source={require('../../assets/ic_star.png')} />
                        <Text style={{ color: colors.white, fontSize: 10 }}>{item.star}</Text>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        );
    }


    /**
     * 列表item点击事件
     */
    onImtemClicked = (item) => {
        this.props.navigation.navigate('Web',
            { title: item.name, url: item.github });
    }
}

const styles = StyleSheet.create({
    itemTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15
    }
});