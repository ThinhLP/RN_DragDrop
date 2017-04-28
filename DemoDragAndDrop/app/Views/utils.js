import React from 'react';
import Dimensions from 'Dimensions';
import {
  Platform,
} from 'react-native';

const Util = {

  size: {
    widthDevice: Dimensions.get('window').width,
    heightDevice: Dimensions.get('window').height,
    bar: (Platform.OS === 'ios') ? 60 : 40,
  },
};

export default Util;
