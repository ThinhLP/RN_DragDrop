import React, { Component } from 'react';
import Dimensions from 'Dimensions';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Animated,
  PanResponder
} from 'react-native';

class Circle extends Component {
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
          // Set the initial value to the current state
          this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
          this.state.pan.setValue({x: 0, y: 0});
          // Animated.spring(
          //   this.state.scale,
          //   { toValue: 1.1, friction: 3 }
          // ).start();
      },

      // onPanResponderMove: Animated.event([
      //   null, {dx: this.state.pan.x , dy: this.state.pan.y},
      // ]),
      onPanResponderMove: (e, gestureState) => {
        let radius = this.state.radius;
        let centerX = e.nativeEvent.pageX - e.nativeEvent.locationX + radius;
        let centerY = e.nativeEvent.pageY - e.nativeEvent.locationY + radius;
        let moveX = this.state.pan.x;
        let moveY = this.state.pan.y;

        if (centerX <= radius) {
          return Animated.spring(
               this.state.pan,
               {toValue:{x:this.state.pan.x._value, y:this.state.pan.y._value}}
           ).start();

        }

        return Animated.event([
                null, {dx: moveX , dy: moveY},
              ])(e, gestureState) ;
      },


      onPanResponderRelease: (e, gesture) => {
        // Flatten the offset to avoid erratic behavior
        this.state.pan.flattenOffset();

        this.checkConstraintOfBorderSection(e);
        //this.checkConstraintOfBorderScreen(e);

        Animated.spring(
           this.state.pan,
           {toValue:{x:this.state.pan.x._value, y:this.state.pan.y._value}}
       ).start();
      }
    });
  };
  release(){
      Animated.spring(
         this.state.pan,
         {toValue:{x:this.state.pan.x._value, y:this.state.pan.y._value}}
     ).start();
  };
  checkConstraintOfBorderScreen(event) {
      let radius = this.state.radius;
      let posOfView;
      let centerX = event.nativeEvent.pageX - event.nativeEvent.locationX + radius;
      let centerY = event.nativeEvent.pageY - event.nativeEvent.locationY + radius;
      //  Constrain border top screen
      posOfView = bar;
      if (centerY < posOfView) {
          let distance = posOfView - (event.nativeEvent.pageY - event.nativeEvent.locationY);
          this.state.pan.y._value = this.state.pan.y._value + distance;
      //  this.state.pan.setOffset({x: this.state.pan.x._value, y: 74});
      } else if (centerY > posOfView && centerY <= posOfView + radius) {
          let distance = posOfView - (event.nativeEvent.pageY - event.nativeEvent.locationY);
          this.state.pan.y._value = this.state.pan.y._value + distance;
      }
      // Constrain border bottom screen
      posOfView = sectionHeight * 3 + bar;
      if (centerY > posOfView - radius) {
          let distance = (event.nativeEvent.pageY - event.nativeEvent.locationY + radius * 2) - posOfView;
          this.state.pan.y._value = this.state.pan.y._value - distance;
      }

      //Constrain border left screen
      if (centerX <= radius) {
          let distance = (event.nativeEvent.pageX - event.nativeEvent.locationX);
          this.state.pan.x._value = this.state.pan.x._value - distance;
      }
      //Constrain border right screen
      if (centerX >= widthDevice - radius) {
          let distance = widthDevice - (event.nativeEvent.pageX - event.nativeEvent.locationX + 2*radius);
          console.log(this.state.pan.x._value);
          this.state.pan.x._value = this.state.pan.x._value  + distance;
      }

  };

  checkConstraintOfBorderSection(event) {
      let radius = this.state.radius;
      let posOfView;
      let centerY = event.nativeEvent.pageY - event.nativeEvent.locationY + radius;
      //  Constrain border top screen
      posOfView = bar;
      if (centerY < posOfView) {
          let distance = posOfView - (event.nativeEvent.pageY - event.nativeEvent.locationY);
          this.state.pan.y._value = this.state.pan.y._value + distance;
      } else if (centerY > posOfView && centerY <= posOfView + radius) {
          let distance = posOfView - (event.nativeEvent.pageY - event.nativeEvent.locationY);
          this.state.pan.y._value = this.state.pan.y._value + distance;
      }
      // Constrain another border bottom of section
      for (let i = 1; i < 3; i++) {
          posOfView = sectionHeight * i + bar;
          if (centerY < posOfView  && centerY >= posOfView - radius) {
              let distance = (event.nativeEvent.pageY - event.nativeEvent.locationY + radius * 2) - posOfView;
              this.state.pan.y._value = this.state.pan.y._value - distance;
          //  this.state.pan.setOffset({x: this.state.pan.x._value, y: 74});
          } else if (centerY > posOfView && centerY <= posOfView + radius) {
              let distance = posOfView - (event.nativeEvent.pageY - event.nativeEvent.locationY);
              this.state.pan.y._value = this.state.pan.y._value + distance;

          }
      }
  };

  constructor(props){
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      radius: defaultDiameter/2,
    };
  }

  render() {
    var circleListStyle = [styles.circle];
    var textListStyle = [styles.circleText];
    var props = this.props.circleProps;
    var borderRadius;

    // Set style for circle
    switch (props.size) {
      case 'small':
        circleListStyle.push(styles.smallCircle);
        textListStyle.push(styles.smallText);
        this.state.radius = defaultDiameter/2;
        break;
      case 'medium':
        circleListStyle.push(styles.mediumCircle);
        textListStyle.push(styles.mediumText);
        this.state.radius = defaultDiameter * 1.12/2;
        break;
      case 'big':
        circleListStyle.push(styles.bigCircle);
        textListStyle.push(styles.bigText);
        this.state.radius = defaultDiameter * 1.25/2;
        break;
    }
    borderRadius =  this.state.radius;
    let rotate = '0deg';
    if (props.rotate === 'left') {
        rotate = '-10deg'
    } else if (props.rotate === 'right') {
        rotate = '10deg'
    }

    let { pan } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];
    let imageStyle = {transform: [{translateX}, {translateY}, {rotate}]};

    return (
      <Animated.Image {...this._panResponder.panHandlers} source={require('../resources/images/circle_background2.jpeg')} style={[imageStyle, circleListStyle]}>
          <Text style={textListStyle}>{props.title}</Text>
      </Animated.Image>
    );
  }
}

const widthDevice = Dimensions.get('window').width;
const heightDevice = Dimensions.get('window').height;
const bar = (Platform.OS === 'ios') ? 60 : 40;
const defaultDiameter = (heightDevice - bar)/7.5;
const sectionHeight = (heightDevice - bar) / 3;

const styles = StyleSheet.create({
  circle: {
      borderWidth: 2,
      borderColor: '#8FC5E1',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 20,
      marginBottom: 20,
      backgroundColor: '#1F87AF',
      resizeMode: 'cover',
      position: 'relative',
      zIndex: 10000,
  },
  bigCircle: {
      width: defaultDiameter * 1.25,
      height: defaultDiameter * 1.25,
      borderRadius: defaultDiameter * 1.25/ 2,
  },
  mediumCircle: {
      width: defaultDiameter * 1.12,
      height: defaultDiameter * 1.12,
      borderRadius: defaultDiameter * 1.12/ 2,
  },
  smallCircle: {
      width: defaultDiameter,
      height: defaultDiameter,
      borderRadius: defaultDiameter/2,
  },
  bigText: {
      width: defaultDiameter * 1.25,
      height: defaultDiameter * 1.25,
      borderRadius: defaultDiameter * 1.25/ 2,
     //lineHeight: defaultDiameter * 1.25,
  },
  mediumText: {
      width: defaultDiameter * 1.12,
      height: defaultDiameter * 1.12,
      borderRadius: defaultDiameter * 1.12/ 2,
      // lineHeight: defaultDiameter * 1.12,
  },
  smallText: {
      width: defaultDiameter,
      height: defaultDiameter,
      borderRadius: defaultDiameter,
      // lineHeight: defaultDiameter,
  },
  circleRotateLeft: {
      transform: [{
          rotate: '-10deg',
        }]
  },
  circleRotateRight: {
      transform: [{
          rotate: '10deg',
        }]
  },
  circleText: {
      fontSize: 11,
      color: '#ffffff',
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: 'transparent',
  },
});

export default Circle;
