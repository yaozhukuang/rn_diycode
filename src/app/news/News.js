import React, { PureComponent } from 'react'
import { net } from '../../base/Config'
import PFList from '../component/pflist/PFList'

export default class News extends PureComponent {

    render() {
        return (
            <PFList
                onImtemClicked={this.onImtemClicked}
                url={net.BASE_URL + net.NEWS} />
        );
    }

    /**
     * 列表item点击事件
     */
    onImtemClicked = (item) => {
        this.props.navigation.navigate('Web', { url: item.address, title: item.title });
    }
}