import {
  FETCH_DOG_EVENTS,
  FETCH_CURRENT_DAY_DATA,
  UPDATE_SPECIFIC_FIELD_IN_STORE,
  CLEAN_ARR_OF_EVENTS_IN_STORE
} from './actionTypes'
import { mealsTitle, poopsTitle, snacksTitle } from '../screens/dashboardItemsTitles'

export const fetchDogEventsFromDB = nickName => dispatch => {
  fetch(`https://rn-dog-tracker.herokuapp.com/getEventsForDog?nickName=${nickName}`)
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: FETCH_DOG_EVENTS,
        payload: data
      })
    })
}

export const cleanArrOfEventsInStore = () => dispatch => {
  dispatch({
    type: CLEAN_ARR_OF_EVENTS_IN_STORE,
    payload: []
  })
}

export const fetchCurrentDayDataFromDB = nickName => dispatch => {
  fetch(`https://rn-dog-tracker.herokuapp.com/getEventsForDogForCurrentDate?nickName=${nickName}`)
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: FETCH_CURRENT_DAY_DATA,
        payload: data
      })
    })
}

export const updateSpecificFieldInDogEvents = (nickname, fieldTitle, dataToUpdate) => dispatch => {
  let fieldRoute
  switch (fieldTitle) {
    case mealsTitle:
      fieldRoute = 'updateMealsinEvent'
      break
    case poopsTitle:
      fieldRoute = 'updatePoopsinEvent'
      break
    case snacksTitle:
      fieldRoute = 'updateSnacksinEvent'
      break

    default:
      break
  }
  const url = `https://rn-dog-tracker.herokuapp.com/${fieldRoute}?nickName=${nickname}&dataToUpdate=${dataToUpdate}`
  fetch(url, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json)

  dispatch({
    type: UPDATE_SPECIFIC_FIELD_IN_STORE,
    payload: dataToUpdate,
    fieldName: fieldTitle
  })
}
