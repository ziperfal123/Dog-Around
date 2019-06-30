import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Header from '../components/Header'
import TripsListItem from '../components/TripsListItem'
import { ScrollView } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'
const styles = StyleSheet.create({
  btnStyle: {
    width: '100%',
    top: 30,
    textAlign: 'center'
  },
  btnTitleStyle: {
    color: '#f1e4e4',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 4
  },
  titleStyle: {
    marginTop: 50,
    marginLeft: 30,
    fontSize: 38,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  },
  listStyle: {
    height: '70%'
  }
})
export default class TripsListScreen extends Component {
  constructor(props) {
    super(props)

    this.renderList = this.renderList.bind(this)
    this.handleBackPress = this.handleBackPress.bind(this)
  }
  static navigationOptions = {
    drawerLabel: () => null
  }

  handleBackPress() {
    this.props.navigation.navigate("Watch your dog's history")
  }

  renderList(trip, index) {
    index += 1
    return <TripsListItem trip={trip} id={index} key={index} navigation={this.props.navigation} />
  }

  render() {
    const event = this.props.navigation.getParam('event')
    const tripsArray = event.Trips
    const date = new Date(event.Date)
    return (
      <View>
        <Header navigation={this.props.navigation} />
        <Text style={styles.titleStyle}>
          Trips for {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
        </Text>
        <ScrollView style={styles.listStyle}>
          <View>{tripsArray.map(this.renderList)}</View>
        </ScrollView>
        <TouchableOpacity style={styles.btnStyle} onPress={this.handleBackPress}>
          <Text style={styles.btnTitleStyle}>Back To History List</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

TripsListScreen.propTypes = {
  navigation: PropTypes.object
}
