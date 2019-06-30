import {
  FETCH_DOG_NAME,
  SAVE_ARR_OF_DOGS_IN_STORE,
  FETCH_ARR_OF_DOGS_FROM_DB_TO_ASYNCSTORAGE,
  SAVE_DOG_NAME_IN_STORE
} from './actionTypes'
import { AsyncStorage } from 'react-native'

export const fetchDogNameFromAsyncStorage = () => async dispatch => {
  const dogName = await AsyncStorage.getItem('dogName')
  dispatch({
    type: FETCH_DOG_NAME,
    payload: dogName
  })
}

export const saveArrOfDogsInStore = arrOfDogs => dispatch => {
  dispatch({
    type: SAVE_ARR_OF_DOGS_IN_STORE,
    payload: arrOfDogs
  })
}

export const saveDogNameInStore = dogNameToSave => dispatch => {
  dispatch({
    type: SAVE_DOG_NAME_IN_STORE,
    payload: dogNameToSave
  })
}

export const fetchArrOfDogsFromDBToAsyncStorage = email => dispatch => {
  fetch(`https://rn-dog-tracker.herokuapp.com/getOwnerInfo?email=${email}`)
    .then(res => res.json())
    .then(async data => {
      const arrOfDogs = data[0].Dogs
      await AsyncStorage.setItem('arrOfDogs', JSON.stringify(arrOfDogs))
      dispatch({
        type: FETCH_ARR_OF_DOGS_FROM_DB_TO_ASYNCSTORAGE,
        PAYLOAD: arrOfDogs
      })
    })
}
