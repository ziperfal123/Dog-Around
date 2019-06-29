import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  itemContainer: {
    width: 120,
    height: 120,
    marginLeft: 45,
    alignItems: 'center',
    marginTop: 30
  },
  circleStyle: {
    width: 100,
    height: 100,
    backgroundColor: '#a879d4',
    borderRadius: 100 / 2
  },
  titleStyle: {
    marginTop: 4,
    fontSize: 22,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  }
})

export default class ChooseDogItem extends Component {
  constructor(props) {
    super(props)

    this.handlePress = this.handlePress.bind(this)
  }

  async handlePress() {
    const { name } = this.props
    console.log(name)
    await AsyncStorage.setItem('dogName', name)
    this.props.onHandlePress()
  }

  render() {
    console.log(' cccc--> in ChooseDogItem.js')
    let url
    switch (this.props.index) {
      case 0:
        url = require(`../../assets/dogsIcons/dog0.png`)
        break
      case 1:
        url = require(`../../assets/dogsIcons/dog1.png`)
        break
      case 2:
        url = require(`../../assets/dogsIcons/dog2.png`)
        break
      case 3:
        url = require(`../../assets/dogsIcons/dog3.png`)
        break
      case 4:
        url = require(`../../assets/dogsIcons/dog4.png`)
        break
      case 5:
        url = require(`../../assets/dogsIcons/dog5.png`)
        break
      case 6:
        url = require(`../../assets/dogsIcons/dog6.png`)
        break
      case 7:
        url = require(`../../assets/dogsIcons/dog7.png`)
        break
      default:
        url = require(`../../assets/dogsIcons/dog0.png`)
        break
    }
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={this.handlePress}>
        <Image source={url} style={styles.circleStyle} />
        <Text style={styles.titleStyle}>{this.props.name}</Text>
      </TouchableOpacity>
    )
  }
}

ChooseDogItem.propTypes = {
  name: PropTypes.string,
  onHandlePress: PropTypes.func
}
