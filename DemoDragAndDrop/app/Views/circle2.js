import React, { Component } from 'react';
import Dimensions from 'Dimensions';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  PanResponder
} from 'react-native';
import Util from './utils';

var borderPosition = [];

class Circle extends Component {

  constructor(props){
    super(props);

    for (let i = 1; i < 3; i++) {
        borderPosition.push(sectionHeight * i);
    }

    this.state = {
      radius: defaultDiameter/2,
    };
  }
  //Init position of circle
  _previousLeft = 0;
  _previousTop = 5;
  //Boundary
  _maxTop = heightDevice - bar;
  _maxBottom = heightDevice;
  _maxLeft = widthDevice;
  _circleStyles = {};
  circle = (null : ?{ setNativeProps(props: Object): void });

  _updatePosition() {
    this.circle && this.circle.setNativeProps(this._circleStyles);

  }

  _endMove(evt, gestureState) {
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
    let radius = this.state.radius;
    // Valid position
    if (this._previousLeft < 0) {
        this._previousLeft = 0;
    }
    if (this._previousTop < 0) {
        this._previousTop = 0;
    }
    if (this._previousLeft > this._maxLeft - radius * 2) {
        this._previousLeft = this._maxLeft - radius * 2;
    }
    if (this._previousTop > this._maxTop - radius * 2) {
       this._previousTop = this._maxTop - radius * 2;
    }


// this._previousLeft = 0;
//     this._circleStyles.style.left = 0;
//     this._circleStyles.style.top = this._previousTop;
//     this._updatePosition();
    var centerY = this._previousTop + radius;
    for (let i = 0; i < borderPosition.length; i++) {
      if (centerY > borderPosition[i] - radius && centerY <= borderPosition[i]) {

            this._previousTop -= (centerY + radius - borderPosition[i]);
            this._circleStyles.style.top = this._previousTop;
            this._circleStyles.style.left = this._previousLeft;
            this._updatePosition();
            break;
      }
     if (centerY > borderPosition[i] && centerY < borderPosition[i] + radius) {
            this._previousTop += (borderPosition[i] + radius - centerY);
            this._circleStyles.style.top = this._previousTop;
            this._circleStyles.style.left = this._previousLeft;
            this._updatePosition();
            break;
      }
    }
    // console.log('==============================');
    // console.log('Left: ' + this._previousLeft);
    // console.log('Top: ' + this._previousTop);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
           this._circleStyles.style.left = this._previousLeft + gestureState.dx;
           this._circleStyles.style.top = this._previousTop + gestureState.dy;
           // Border left
           if (this._circleStyles.style.left < 0) {
              this._circleStyles.style.left = 0;
           };
           // Border right
           if (this._circleStyles.style.left > this._maxLeft - this.state.radius * 2) {
              this._circleStyles.style.left = this._maxLeft - this.state.radius * 2;
           };
           // Border bottom
           if (this._circleStyles.style.top > this._maxTop - this.state.radius * 2) {
              this._circleStyles.style.top = this._maxTop - this.state.radius * 2;
           };
           // Border top
           if (this._circleStyles.style.top < 0) {
              this._circleStyles.style.top = 0;
           };
           this._updatePosition();
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
        onPanResponderTerminate: (evt, gestureState) => this._endMove(evt, gestureState),
      });
    this._circleStyles = {
      style: {
          left: this._previousLeft,
          top: this._previousTop,
      },
    };
  }

  componentDidMount() {
      this._updatePosition();
  }

  render() {
    var circleListStyle = [styles.circle];
    var props = this.props.circleProps;
    var borderRadius;

    // Set style for circle
    switch (props.size) {
      case 'small':
        circleListStyle.push(styles.smallCircle);
        this.state.radius = defaultDiameter/2;
        break;
      case 'medium':
        circleListStyle.push(styles.mediumCircle);
        this.state.radius = defaultDiameter * 1.12/2;
        break;
      case 'big':
        circleListStyle.push(styles.bigCircle);
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

    return (
      <Image borderRadius={borderRadius} ref={(circle) => {this.circle = circle;}} {...this._panResponder.panHandlers} source={require('../resources/images/circle_background2.jpeg')} style={[circleListStyle]}>
          <Text style={styles.circleText}>{props.title}</Text>
      </Image>
    );
  }
}

const widthDevice = Util.size.widthDevice;
const heightDevice = Util.size.heightDevice;
const bar = Util.size.bar;
const sectionHeight = (heightDevice - bar) / 3;
const defaultDiameter = (heightDevice - bar)/7.5;

const styles = StyleSheet.create({
  circle: {
      borderWidth: 2,
      borderColor: '#8FC5E1',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1F87AF',
      resizeMode: 'cover',
      position: 'absolute',
      zIndex: 10000,
      left:0,
      top:0,
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
