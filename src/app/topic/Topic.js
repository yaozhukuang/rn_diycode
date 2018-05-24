import React, { PureComponent } from 'react'
import { net } from '../../base/Config'
import PFList from '../component/pflist/PFList'

export default class Topic extends PureComponent {

    render() {
        return (
            <PFList 
            onImtemClicked={this.onImtemClicked}
            url={net.BASE_URL + net.TOPIC} />
        );
    }

    /**
     * 列表item点击事件
     */
    onImtemClicked = (item) => {
        this.props.navigation.navigate('TopicDetails', {id: item.id});
    }
}
