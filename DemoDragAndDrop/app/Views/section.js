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

import LinearGradient from 'react-native-linear-gradient';

const imageUrls = [require('../resources/images/line2.png'),
                  require('../resources/images/line3.png'),
                  require('../resources/images/line4.png')];

class Section extends Component {
  render() {
    var imageTag, sectionContentTag;
    var index = this.props.index;
    var containerCustom;

    if (index != null) {
        imageTag = (
            <View style={styles.borderWrapper}>
                <Image source={imageUrls[index]} style={styles.border} />
            </View>
        );
        containerCustom = {
            top: index === 1 ? -45 : (index + 1) * -30,
            flexBasis: (heightDevice-bar)/ 3 + 35
        };
    }

    var combineContainer = StyleSheet.flatten([styles.container, containerCustom]);
    return (
        <View style={[combineContainer]}>
            {imageTag}
            <LinearGradient colors={this.props.colors} style={styles.section}>
            </LinearGradient>
        </View>
    );
  }
}


const widthDevice = Dimensions.get('window').width;
const heightDevice = Dimensions.get('window').height;
const bar = (Platform.OS === 'ios') ? 70 : 50;

var styles = StyleSheet.create({
  container: {
      position: 'relative',
      zIndex: 500,
      backgroundColor: 'transparent',
      margin:0,
      alignItems: 'stretch',
      flexBasis: (heightDevice-bar)/ 3,
  },
  border: {
      width: widthDevice,
      height: 60,
  },
  borderWrapper: {
      width: widthDevice,
      height: 35,
      margin: 0,
      padding: 0,
  },
  section: {
      height: (heightDevice-bar)/3,
  },
  sectionTitle: {
      color: '#ffffff',
      fontSize: 16,
      backgroundColor: 'transparent',
      marginLeft: 10,
      fontWeight: 'bold',
  },
  sectionContent: {
      flex: 1,
      flexDirection: 'row',
  },
  contentContainer: {
      alignItems: 'center',
      justifyContent: 'center',
  },

});

module.exports = Section;
