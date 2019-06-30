import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import PropTypes from 'prop-types'
import Header from '../components/Header'

const styles = StyleSheet.create({
  mapStyle: {
    height: 520,
    position: 'relative',
    top: 30,
    right: 0,
    bottom: 0,
    left: 0
  },
  btnStyle: {
    width: '100%',
    top: 80,
    textAlign: 'center'
  },
  btnTitleStyle: {
    color: '#f1e4e4',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 4
  },
  titleStyle: {
    marginTop: 25,
    marginLeft: 30,
    fontSize: 38,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  },
  distanceStyle: {
    marginLeft: 30,
    fontSize: 20,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  }
})

export default class TripMapViewScreen extends Component {
  constructor(props) {
    super(props)

    this.handleBackPress = this.handleBackPress.bind(this)
  }

  static navigationOptions = {
    drawerLabel: () => null
  }

  handleBackPress() {
    this.props.navigation.navigate('TripsListScreen')
  }

  render() {
    const id = this.props.navigation.getParam('id')
    const trip = this.props.navigation.getParam('trip')

    if (trip[0].distance) {
      this.distance = trip[0].distance
      trip.shift()
    }
    const { latitude, longitude } = trip[0]
    return (
      <View>
        <Header navigation={this.props.navigation} />
        <Text style={styles.titleStyle}>Trip {id}</Text>
        <Text style={styles.distanceStyle}>Total Distance- {this.distance}</Text>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}
        >
          <MapView.Polyline coordinates={trip} strokeWidth={5} />
        </MapView>
        <TouchableOpacity style={styles.btnStyle} onPress={this.handleBackPress}>
          <Text style={styles.btnTitleStyle}>Back To Trips List</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

TripMapViewScreen.propTypes = {
  navigation: PropTypes.object
}
