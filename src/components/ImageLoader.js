import React, { Component } from 'react'
import { StyleSheet, Animated, Easing } from 'react-native'
const styles = StyleSheet.create({
  imageStyle: {
    bottom: 25
  }
})

export default class ImageLoader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animatedValue: new Animated.Value(50)
    }
  }

  handleAnimation = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: 58,
      duration: 420,
      easing: Easing.ease
    }).start(() => {
      Animated.timing(this.state.animatedValue, {
        toValue: 52,
        duration: 400,
        easing: Easing.ease
      }).start(() => {
        this.handleAnimation()
      })
    })
  }

  render() {
    this.handleAnimation()
    return (
      <Animated.Image
        style={[
          styles.imageStyle,
          { width: this.state.animatedValue, height: this.state.animatedValue }
        ]}
        source={require('../../assets/dogIcon.png')}
      />
    )
  }
}
