import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  Text,
  View,
  Image,
} from 'react-native';

import Section from'./section.js';

var sectionItems = require('../Data/items.js');
var sectionItems2 = require('../Data/items2.js');

module.exports = React.createClass({
  render() {
    return (
      <View>
          <Section colors={['#259ECD', '#588FC0']} />
          <Section index={1} colors={['#2F9FD1', '#4B6790']} />
          <Section index={2} colors={['#2A94C3', '#3E3F76']} />
      </View>
    );
  }
});
