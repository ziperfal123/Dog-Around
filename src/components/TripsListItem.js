import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 25,
    backgroundColor: '#a879d4',
    borderRadius: 15,
    width: '90%',
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 30,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  }
})

export default class TripsListItem extends Component {
  constructor(props) {
    super(props)

    this.handlePress = this.handlePress.bind(this)
  }
  handlePress() {
    this.props.navigation.navigate('TripMapViewScreen', {
      id: this.props.id,
      trip: this.props.trip
    })
  }

  render() {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={this.handlePress}>
        <Text style={styles.titleStyle}>
          Trip
          <Text> {this.props.id}</Text>
        </Text>
      </TouchableOpacity>
    )
  }
}

TripsListItem.propTypes = {
  id: PropTypes.string,
  navigation: PropTypes.object
}
