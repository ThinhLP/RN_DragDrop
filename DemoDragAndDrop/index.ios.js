/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Dimensions from 'Dimensions';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

var ViewBackground = require('./app/Views/view.js');
var ViewContent = require('./app/Views/viewContent.js');

export default class DemoDragAndDrop extends Component {
  state = {
    backgroundColor: '#22A2D3',
  };

  render() {

    return (

        <LinearGradient colors={['#22A2D3', '#3E3F76']} style={styles.container}>
            <StatusBar backgroundColor={this.state.backgroundColor} />
            {/* Structure of Tab Bar */}
            <View style={styles.tabBar}>
                    <TouchableHighlight style={[styles.tabBarButton, styles.active]}>
                        <Image style={styles.tabBarIcon} source={require('./app/resources/images/home.png')} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.tabBarButton}>
                        <Image style={styles.tabBarIcon} source={require('./app/resources/images/download.png')} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.tabBarButton}>
                        <Image style={styles.tabBarIcon} source={require('./app/resources/images/plus.png')} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.tabBarButton}>
                        <Image style={styles.tabBarIcon} source={require('./app/resources/images/pin.png')} />
                    </TouchableHighlight>
             </View>

             {/* Border */}
             <Image style={styles.borderTop} source={require('./app/resources/images/line2.png')} />

             {/* Background Content */}
             <ViewBackground style={styles.viewBackground} />
             {/* Content */}
             <ViewContent style={styles.mainView} />


        </LinearGradient>

    );
  }
}

const widthDevice = Dimensions.get('window').width;
const heightDevice = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: 'transparent',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
    position: 'relative',
    zIndex: 101,
  },
  tabBarButton: {
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#90CFE6',
    borderRadius: 20,
  },
  tabBarIcon: {
    width: 25,
    height: 25,
  },

  buttons: {
    height: 40,
    backgroundColor: '#2187B0',
    position: 'relative',
    zIndex: 1,
  },

  borderTop: {
    margin: 0,
    width: widthDevice,
    height: 60,
    top: 55,
    position: 'absolute',
    zIndex: 100,
  },
  borderBottom: {
    margin: 0,
    width: widthDevice,
    height: 60,
    position: 'absolute',
    zIndex: 100,
    top: 95,
  },
  bars: {
    width: 20,
    height: 20,
  },
  buttonBars: {
    position: 'absolute',
    top: 80,
    left: 15,
    zIndex: 1000
  },
  search: {
    width: 20,
    height: 20,
  },
  buttonSearch: {
    position: 'absolute',
    top: 80,
    right: 15,
    zIndex: 1000
  },

  viewBackground: {
    position: 'relative',
    zIndex: 1,
  },

});

AppRegistry.registerComponent('DemoDragAndDrop', () => DemoDragAndDrop);
