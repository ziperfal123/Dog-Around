/**
 * @format
 */
console.disableYellowBox = true
import React, { Component } from 'react'
import { AppRegistry, SafeAreaView, StyleSheet, AsyncStorage } from 'react-native'
import { name as appName } from './app.json'
import { Provider } from 'react-redux'

import NavigatorContainer from './src/navigation/index'
import store from './src/store'
import {
  fetchDogNameFromAsyncStorage,
  saveArrOfDogsInStore,
  fetchArrOfDogsFromDBToAsyncStorage
} from './src/actions/authActions'
import { fetchDogEventsFromDB, fetchCurrentDayDataFromDB } from './src/actions/dbActions'

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#15cda8'
  }
})

class Application extends Component {
  async componentDidMount() {
    const email = await AsyncStorage.getItem('email')
    const dogName = await AsyncStorage.getItem('dogName')
    let arrOfDogs = await AsyncStorage.getItem('arrOfDogs')
    arrOfDogs = JSON.parse(arrOfDogs)
    if (email) {
      store.dispatch(fetchDogNameFromAsyncStorage())
      store.dispatch(fetchDogEventsFromDB(dogName))
      store.dispatch(fetchCurrentDayDataFromDB(dogName))

      if (arrOfDogs) store.dispatch(saveArrOfDogsInStore(arrOfDogs))
    } else if (!arrOfDogs) {
      store.dispatch(fetchArrOfDogsFromDBToAsyncStorage(email))
    }
  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.safeAreaStyle}>
          <NavigatorContainer />
        </SafeAreaView>
      </Provider>
    )
  }
}

AppRegistry.registerComponent(appName, () => Application)
