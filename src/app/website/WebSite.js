import React, { PureComponent } from 'react'
import { View, WebView } from "react-native";

export default class WebSite extends PureComponent {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{ uri: 'https://www.diycode.cc/sites' }}
                    startInLoadingState={true} />
            </View>

        );
    }
}