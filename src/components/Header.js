import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import PropTypes from 'prop-types'

import MenuBtn from './MenuBtn'

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#15cda8',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  boneIconStyle: {
    width: 45,
    height: 45
  },
  titleStyle: {
    fontSize: 24,
    color: '#f1e4e4'
  }
})

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.boneIconStyle} source={require('../../assets/dogIcon.png')} />
        <Text style={styles.titleStyle}>Dog Around</Text>
        <MenuBtn style={styles.menuBtnStyle} navigation={this.props.navigation} />
      </View>
    )
  }
}

Header.propTypes = {
  navigation: PropTypes.object
}
