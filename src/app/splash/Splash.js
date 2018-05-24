import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {colors} from "../../base/Color";
import {actionCountDown} from './SplashAction'
import {connect} from "react-redux";
import * as StoreUtil from '../../utils/StoreUtils'
import {cache} from '../../base/Config'

class Splash extends PureComponent {

    render() {
        return (
            <View style={{flex: 1, paddingTop: 220, alignItems: 'center', backgroundColor: colors.white}}>
                <Text style={styles.text}>{'感谢您的陪伴'}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.text, {color: colors.transparent}]}>{'占位占位占位占位'}</Text>
                    <Text style={{color: colors.textBlack, fontSize: 20}}>{'--DiyCode'}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => this.skip()}
                    style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Text style={styles.countDown}>{'跳过 ' + this.props.state.splash.count}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    countDown = () => {
        this.props.dispatch(actionCountDown());
        if (this.interval && this.props.state.splash.count <= 0) {
            this.skip();
        }
    };

    skip = () => {
        this.checkLogin();
        clearInterval(this.interval);
    };

    checkLogin() {
        this.props.navigation.replace('Home');
    };

    componentDidMount() {
        this.interval = setInterval(this.countDown, 1000);
    }
}


const styles = StyleSheet.create({
    text: {
        color: colors.textBlack,
        fontSize: 23,
    },
    countDown: {
        marginBottom: 35,
        marginRight: 30,
        borderRadius: 20,
        borderColor: colors.divide,
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center',
        fontSize: 12,
        paddingTop: 2
    },
});


function mapStateToProps(state) {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(Splash)