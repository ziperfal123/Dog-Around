import React, { Component } from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

import ImageLoader from '../../components/ImageLoader'
import { fetchDogEventsFromDB, fetchCurrentDayDataFromDB } from '../../actions/dbActions'
import {
  fetchDogNameFromAsyncStorage,
  saveArrOfDogsInStore,
  fetchArrOfDogsFromDBToAsyncStorage
} from '../../actions/authActions'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#15cda8'
  }
})

class LoadingScreen extends Component {
  constructor() {
    super()
    this.state = {
      shouldRender: 1
    }
  }
  static navigationOptions = {
    headerMode: 'none',
    headerLeft: null
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.shouldRender !== 1) return false
  }

  render() {
    const fetchData = async () => {
      const email = await AsyncStorage.getItem('email')
      const dogName = await AsyncStorage.getItem('dogName')
      let arrOfDogs = await AsyncStorage.getItem('arrOfDogs')
      arrOfDogs = JSON.parse(arrOfDogs)

      this.setState({ shouldRender: 0 })
      setTimeout(async () => {
        this.props.fetchDogEventsFromDB(dogName)
        this.props.fetchCurrentDayDataFromDB(dogName)
        this.props.fetchDogNameFromAsyncStorage()

        if (arrOfDogs) this.props.saveArrOfDogsInStore(arrOfDogs)
        else this.props.fetchArrOfDogsFromDBToAsyncStorage(email)
        if (email) this.props.navigation.navigate('App')
        else this.props.navigation.push('SignInScreen')
      }, 1700)
    }
    fetchData()
    return (
      <View style={styles.container}>
        <ImageLoader />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  dogName: state.authReducer.dogName
})

LoadingScreen.propTypes = {
  navigation: PropTypes.object,
  fetchDogEventsFromDB: PropTypes.func,
  fetchDogNameFromAsyncStorage: PropTypes.func,
  fetchArrOfDogsFromDBToAsyncStorage: PropTypes.func,
  saveArrOfDogsInStore: PropTypes.func,
  fetchCurrentDayDataFromDB: PropTypes.func
}

export default connect(
  mapStateToProps,
  {
    fetchDogEventsFromDB,
    fetchDogNameFromAsyncStorage,
    fetchCurrentDayDataFromDB,
    saveArrOfDogsInStore,
    fetchArrOfDogsFromDBToAsyncStorage
  }
)(LoadingScreen)
