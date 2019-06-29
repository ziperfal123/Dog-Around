import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Header from '../components/Header'
import HistoryEventItem from '../components/HistoryEventItem'
import { fetchDogEventsFromDB } from '../actions/dbActions'

const styles = StyleSheet.create({
  drawerIconStyle: {
    width: 25,
    height: 25
  },

  container: {
    flex: 1,
    width: '100%'
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    top: 10,
    backgroundColor: '#15cda8'
  },
  titleStyle: {
    marginTop: 50,
    marginLeft: 30,
    fontSize: 38,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  },
  messageStyle: {
    alignItems: 'center',
    width: '90%',
    top: 30,
    alignSelf: 'center',
    borderRadius: 5,
    height: 70
  },
  messageTextStyle: {
    fontSize: 25,
    color: '#f1e4e4'
  },
  messageSmallTextStyle: {
    fontSize: 18,
    top: 10,
    color: '#f1e4e4'
  }
})

class HistoryScreen extends Component {
  static navigationOptions = {
    drawerIcon: (
      <Image
        source={require('../../assets/hamburgerMenu/history.png')}
        style={styles.drawerIconStyle}
      />
    )
  }
  constructor(props) {
    super(props)
    this.renderListOfEvents = this.renderListOfEvents.bind(this)
  }

  componentDidMount() {
    const { navigation, fetchDogEventsFromDB, dogName } = this.props
    this.willFocusListener = navigation.addListener('willFocus', async () => {
      await fetchDogEventsFromDB(dogName)
    })
  }

  renderListOfEvents(eventsArray, index) {
    return <HistoryEventItem key={index} event={eventsArray} navigation={this.props.navigation} />
  }

  render() {
    console.log('>> in HistoryScreen.js')
    const { events } = this.props
    if (events.length === 0) {
      return (
        <View style={styles.container}>
          <Header navigation={this.props.navigation} />
          <Text style={styles.titleStyle}>Events History</Text>
          <View style={styles.messageStyle}>
            <Text style={styles.messageTextStyle}>No events for Today</Text>
            <Text style={styles.messageSmallTextStyle}>
              Perfect time to take {this.props.dogName} on a Walk!
            </Text>
          </View>
        </View>
      )
    }
    events.sort((a, b) => {
      a = new Date(a.Date)
      b = new Date(b.Date)
      return a > b ? -1 : a < b ? 1 : 0
    })
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <Text style={styles.titleStyle}>Events History</Text>
        <ScrollView>
          <View style={styles.contentContainer}>{events.map(this.renderListOfEvents)}</View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  events: state.dbReducer.arrOfEvents,
  dogName: state.authReducer.dogName
})

HistoryScreen.propTypes = {
  navigation: PropTypes.object,
  events: PropTypes.array
}

export default connect(
  mapStateToProps,
  { fetchDogEventsFromDB }
)(HistoryScreen)
