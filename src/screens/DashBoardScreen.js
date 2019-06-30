import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import {
  distaneTitle,
  mealsTitle,
  numOfWalksTitle,
  poopsTitle,
  snacksTitle
} from './dashboardItemsTitles'

import Header from '../components/Header'
import BigDashboardBox from '../components/BigDashboardBox'
import SmallDashboardBox from '../components/SmallDashboardBox'

const styles = StyleSheet.create({
  drawerIconStyle: {
    width: 30,
    height: 30
  },
  dayOfTheWeekStyle: {
    marginTop: 50,
    marginLeft: 30,
    fontSize: 38,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  },
  boxesContainerStyle: {
    left: 20,
    width: '100%',
    flex: 1,
    flexDirection: 'row'
  },
  leftContentContainer: {
    marginRight: 5,
    width: '42%',
    top: 30,
    backgroundColor: 'green'
  },
  rightContentContainer: {
    marginLeft: 5,
    left: 10,
    width: '42%',
    top: 30,
    backgroundColor: 'red'
  }
})

class DashBoardScreen extends Component {
  static navigationOptions = {
    drawerIcon: (
      <Image
        source={require('../../assets/hamburgerMenu/dog.png')}
        style={styles.drawerIconStyle}
      />
    )
  }

  constructor() {
    super()
    this.state = {
      shouldRender: true
    }
  }

  render() {
    const { dogName } = this.props
    let meals, poops, snacks, totalKmWalked, numOfWalkes
    const { dataOfCurrentDay } = this.props

    if (!dataOfCurrentDay) {
      meals = -1
      poops = -1
      snacks = -1
      totalKmWalked = -1
      numOfWalkes = -1
    } else {
      meals = this.props.currentDay_meals
      poops = this.props.currentDay_poops
      snacks = this.props.currentDay_snacks
      if (this.props.currentDay_kmWalked >= 1) {
        totalKmWalked = this.props.currentDay_kmWalked.toFixed(2)
        totalKmWalked = parseFloat(totalKmWalked)
      } else if (this.props.currentDay_kmWalked === null) {
        totalKmWalked = '-'
      } else totalKmWalked = this.props.currentDay_kmWalked
      numOfWalkes = this.props.currentDay_numOfWalks
    }
    const todaysDay = new Date().toLocaleString('en-us', { weekday: 'long' })

    return (
      <View>
        <Header navigation={this.props.navigation} />
        <Text style={styles.dayOfTheWeekStyle}>
          <Text>{dogName}'s </Text>
          <Text>{todaysDay}</Text>
        </Text>
        <View style={styles.boxesContainerStyle}>
          <View style={styles.leftContentContainer}>
            <BigDashboardBox title={distaneTitle} dataToDisplay={totalKmWalked} />
            <BigDashboardBox title={mealsTitle} dataToDisplay={meals} />
          </View>
          <View style={styles.rightContentContainer}>
            <SmallDashboardBox title={numOfWalksTitle} dataToDisplay={numOfWalkes} />
            <SmallDashboardBox title={poopsTitle} dataToDisplay={poops} />
            <SmallDashboardBox title={snacksTitle} dataToDisplay={snacks} />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  dataOfCurrentDay: state.dbReducer.dataOfCurrentDay,
  dogName: state.authReducer.dogName,
  currentDay_kmWalked: state.dbReducer.currentDay_kmWalked,
  currentDay_numOfWalks: state.dbReducer.currentDay_numOfWalks,
  currentDay_poops: state.dbReducer.currentDay_poops,
  currentDay_meals: state.dbReducer.currentDay_meals,
  currentDay_snacks: state.dbReducer.currentDay_snacks
})

DashBoardScreen.propTypes = {
  navigation: PropTypes.object,
  dataOfCurrentDay: PropTypes.bool,
  dogName: PropTypes.string,
  currentDay_kmWalked: PropTypes.number,
  currentDay_numOfWalks: PropTypes.number,
  currentDay_poops: PropTypes.number,
  currentDay_meals: PropTypes.number,
  currentDay_snacks: PropTypes.number
}

export default connect(
  mapStateToProps,
  null
)(DashBoardScreen)
