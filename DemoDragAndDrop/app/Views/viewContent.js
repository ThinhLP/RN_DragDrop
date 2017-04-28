import React, { Component } from 'react';
import Dimensions from 'Dimensions';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
} from 'react-native';

import SectionContent from'./sectionContent.js';
import Util from './utils.js';
import Circle from './circle2.js';

var sectionItems = require('../Data/items.js');
var sectionItems2 = require('../Data/items2.js');

class ViewContent extends Component {

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.blue}></View>
            <View style={styles.green}></View>
            <View style={styles.gray}></View>
            <Circle circleProps={sectionItems[1]}/>
            <Circle circleProps={sectionItems[0]}/>
            <Circle circleProps={sectionItems[2]}/>
        </View>
    );
  }
}


const widthDevice = Util.size.widthDevice;
const heightDevice = Util.size.heightDevice;
const bar = Util.size.bar;
const sectionHeight = (heightDevice - bar) / 3;

var styles = StyleSheet.create({
  container: {
    width: widthDevice,
    height: heightDevice - bar,
    top: bar,
    left: 0,
    position: 'absolute',
    zIndex: 3000,
    flexDirection: 'column',
    flexWrap: 'wrap',

  },
  blue: {
      width: widthDevice,
      backgroundColor: 'transparent',
      height:sectionHeight,
      borderWidth: 1,
      borderColor: 'red',
      borderStyle: 'solid'

  },
  green: {
    width: widthDevice,
    backgroundColor: 'transparent',
    height: sectionHeight,
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid'
  },
  gray: {
    width: widthDevice,
    backgroundColor: 'transparent',
    height: sectionHeight,
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid'
  },
});

module.exports = ViewContent;
