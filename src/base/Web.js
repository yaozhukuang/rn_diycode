import React, { PureComponent } from 'react'
import { View, WebView } from "react-native";

export default class Web extends PureComponent {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{ uri: this.props.navigation.state.params.url }}
                    startInLoadingState={true} />
            </View>

        );
    }
}