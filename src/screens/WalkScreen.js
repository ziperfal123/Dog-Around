import React, { Component } from 'react'
import { StyleSheet, View, Image, Button, Alert } from 'react-native'

import haversine from 'haversine'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import RunInfoNumeric from '../components/RunInfoNumeric'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#15cda8'
  },
  drawerIconStyle: {
    width: 25,
    height: 25
  },
  map: {
    height: 625,
    position: 'absolute',
    right: 0,
    bottom: 95,
    left: 0
  },
  infoWrapper: {
    position: 'absolute',
    left: 0,
    bottom: 50,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.75)',
    padding: 15,
    justifyContent: 'space-evenly'
  },
  endTripStyle: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    bottom: 12
  }
})

let id = 0

class WalkScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      longitude: null,
      latitude: null,
      markers: [],
      watchID,
      renderFlag: false
    }

    const watchID = navigator.geolocation.watchPosition(position => {
      let distance = 0
      if (this.state.previousCoordinate) {
        distance = this.state.distance + haversine(this.state.previousCoordinate, position.coords)
        if (this.distanceInfo && this.speedInfo) {
          this.distanceInfo.setState({ value: distance.toFixed(2) })
          this.speedInfo.setState({ value: position.coords.speed.toFixed(2) })
        }
      }
      this.setState(
        {
          markers: [
            ...this.state.markers,
            {
              coordinate: position.coords,
              key: id++
            }
          ],
          previousCoordinate: position.coords,
          distance
        },
        null,
        { distanceFilter: 10 }
      )
    })
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      })
    })
  }

  static navigationOptions = {
    drawerIcon: (
      <Image
        source={require('../../assets/hamburgerMenu/walk.png')}
        style={styles.drawerIconStyle}
      />
    )
  }

  handleTripEnd = () => {
    if (this.distanceInfo.state.value < 0.01 || !this.distanceInfo.state.value)
      Alert.alert('Trips under 10m are not being saved')
    else {
      Alert.alert('Trip Details Saved Successfully')
      fetch(
        `https://rn-dog-tracker.herokuapp.com/saveDogTrip?coords=${JSON.stringify(
          this.state.markers
        )}&distance=${this.distanceInfo.state.value}&nickName=${this.props.dogName}`
      )
    }
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        {this.state.longitude && this.state.latitude ? (
          <View style={styles.contentContainer}>
            <MapView
              style={styles.map}
              showsUserLocation
              followsUserLocation
              initialRegion={{
                longitude: this.state.longitude,
                latitude: this.state.latitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
              }}
            >
              <MapView.Polyline
                coordinates={this.state.markers.map(marker => marker.coordinate)}
                strokeWidth={4}
              />
            </MapView>
          </View>
        ) : null}

        <View style={styles.infoWrapper}>
          <RunInfoNumeric title="Distance" unit="km" ref={info => (this.distanceInfo = info)} />
          <RunInfoNumeric title="Speed" unit="km/h" ref={info => (this.speedInfo = info)} />
        </View>
        <View style={styles.endTripStyle}>
          <Button title="End Trip" onPress={this.handleTripEnd} />
        </View>
      </View>
    )
  }
}

WalkScreen.propTypes = {
  navigation: PropTypes.object,
  dogName: PropTypes.string
}

const mapStateToProps = state => ({
  dogName: state.authReducer.dogName
})
export default connect(
  mapStateToProps,
  null
)(WalkScreen)
