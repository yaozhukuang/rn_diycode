import React, { PureComponent } from 'react'
import { Image, Text, View } from 'react-native'
import { colors } from "../../base/Color";

export default class CustomImage extends PureComponent {

    render() {
        let uri = this.props.uri;
        let name = this.props.name;
        if (!uri && !name) {
            return <View style={this.props.style}/>
        }
        return (
            <View>
                <View style={[this.props.style, {
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.blue
                }]}>
                    <Text style={{ textAlign: 'center', color: colors.white }}>
                        {name ? name.substring(0, 1).toLocaleUpperCase() : ''}
                    </Text>
                </View>
                <Image
                    source={{ uri: uri }}
                    style={[this.props.style, { position: 'absolute' }]}
                />
            </View>
        );
    }
}
