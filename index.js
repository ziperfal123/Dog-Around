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
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: true
    }
  }

  async componentDidMount() {
    console.log('Component Did Mount')
    const email = await AsyncStorage.getItem('email')
    const dogName = await AsyncStorage.getItem('dogName')
    let arrOfDogs = await AsyncStorage.getItem('arrOfDogs')
    arrOfDogs = JSON.parse(arrOfDogs)
    console.log(arrOfDogs)
    if (email) {
      console.log('if Email')
      store.dispatch(fetchDogNameFromAsyncStorage())
      store.dispatch(fetchDogEventsFromDB(dogName))
      store.dispatch(fetchCurrentDayDataFromDB(dogName))

      if (arrOfDogs) store.dispatch(saveArrOfDogsInStore(arrOfDogs))
    } else if (!arrOfDogs) {
      store.dispatch(fetchArrOfDogsFromDBToAsyncStorage(email))
    }
  }

  render() {
    console.log('in index..')

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
