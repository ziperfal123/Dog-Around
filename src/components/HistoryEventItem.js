import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 25,
    backgroundColor: '#a879d4',
    borderRadius: 15,
    width: '98%',
    height: 140
  },
  itemContent: {
    top: 5,
    left: 7
  },
  dateStyle: {
    fontSize: 33,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  },
  dogsDataStyle: {
    fontSize: 16,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  }
})

class HistoryEventItem extends Component {
  constructor(props) {
    super(props)

    this.handlePress = this.handlePress.bind(this)
  }
  handlePress() {
    this.props.navigation.navigate('TripsListScreen', {
      event: this.props.event
    })
  }

  render() {
    console.log(' cccc--> in HistoryEventItem.js')

    const { event } = this.props
    const date = new Date(event.Date)
    let totalKm = 0
    event.Trips.map(item => {
      if (item[0].distance !== 'undefined') {
        totalKm += parseFloat(item[0].distance)
      }
    })
    totalKm = totalKm.toFixed(2)
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={this.handlePress}>
        <View style={styles.itemContent}>
          <Text style={styles.dateStyle}>
            {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
          </Text>
          <Text style={styles.dogsDataStyle}>
            Total walking distance: {totalKm <= 0 ? '-' : totalKm}
            {totalKm > 0 ? ' km' : null}
          </Text>
          <Text style={styles.dogsDataStyle}>
            # of meals: {event.Meals === undefined || event.Meals === -1 ? '-' : event.Meals}
          </Text>
          <Text style={styles.dogsDataStyle}>
            # of poops: {event.Poops === undefined || event.Poops === -1 ? '-' : event.Poops}
          </Text>
          <Text style={styles.dogsDataStyle}>
            # of snacks: {event.Snacks === undefined || event.Snacks === -1 ? '-' : event.Snacks}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

HistoryEventItem.propTypes = {
  event: PropTypes.object
}

export default HistoryEventItem
