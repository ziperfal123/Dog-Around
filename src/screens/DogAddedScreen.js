import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#15cda8'
  },
  titleStyle: {
    textAlign: 'center',
    top: 40,
    fontSize: 30,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  },
  messageStyle: {
    textAlign: 'center',
    top: 70,
    fontSize: 20,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  }
})

class DogAddedScreen extends Component {
  static navigationOptions = {
    headerLeft: null
  }

  render() {
    setTimeout(() => {
      this.props.navigation.navigate('App')
    }, 2000)
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>You have Successfully Added a dog!</Text>
        <Text style={styles.messageStyle}>opening the app..</Text>
      </View>
    )
  }
}

DogAddedScreen.propTypes = {
  navigation: PropTypes.object
}

export default DogAddedScreen
