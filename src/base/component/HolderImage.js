import React, { PureComponent } from 'react'
import { Image, View } from 'react-native'

export default class HolderImage extends PureComponent {

    render() {
        if (this.props.uri) {
            return (
                <View style={this.props.style}>
                    <Image
                        source={this.props.holder}
                        style={this.props.style}
                    />
                    <Image
                        source={{ uri: this.props.uri }}
                        style={[this.props.style, { position: 'absolute' }]}
                    />
                </View>
            );
        }
        return (
            <Image
                source={this.props.holder}
                style={this.props.style}
            />
        );
    }
}