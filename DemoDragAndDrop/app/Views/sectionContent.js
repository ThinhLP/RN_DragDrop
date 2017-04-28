import React, { Component } from 'react';
import Dimensions from 'Dimensions';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  Platform,
} from 'react-native';

import Circle from './circle.js';

const imageUrls = [require('../resources/images/line2.png'),
                  require('../resources/images/line3.png'),
                  require('../resources/images/line4.png')];

class Section extends Component {

  render() {
    var props = this.props;
    var index = props.index;
    var circleTag;
    if (index != null && index == 1) {
         circleTag = (<View style={[styles.sectionContent]}>
                          <Circle circleProps={this.props.itemsContent[0]} />
                     </View>);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>{(heightDevice-bar)/ 3}</Text>
            {circleTag}
        </View>
    );
  }
}


const widthDevice = Dimensions.get('window').width;
const heightDevice = Dimensions.get('window').height;
const bar = (Platform.OS === 'ios') ? 60 : 40;   //bar without 2 buttons

var styles = StyleSheet.create({
  container: {
      flexBasis: (heightDevice-bar)/ 3,
      borderWidth: 1,
      borderColor: 'red',
      borderStyle: 'solid',
      position: 'relative',
      zIndex: 1500,
  },
  sectionTitle: {
      color: '#ffffff',
      fontSize: 16,
      backgroundColor: 'transparent',
      marginLeft: 10,
      marginTop: 10,
      fontWeight: 'bold',
  },
  sectionContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  }
});

module.exports = Section;
