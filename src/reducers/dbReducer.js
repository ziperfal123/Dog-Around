import {
  FETCH_DOG_EVENTS,
  FETCH_CURRENT_DAY_DATA,
  FETCH_ARR_OF_DOGS_FROM_DB_TO_ASYNCSTORAGE,
  UPDATE_SPECIFIC_FIELD_IN_STORE
} from '../actions/actionTypes'

import { mealsTitle, poopsTitle, snacksTitle } from '../screens/dashboardItemsTitles'

const initialState = {
  dataOfCurrentDay: true,
  numOfWalkes: -1,
  dogName: '',
  currentDay_kmWalked: -1,
  currentDay_numOfWalks: -1,
  currentDay_poops: -1,
  currentDay_meals: -1,
  currentDay_snacks: -1,
  arrOfEvents: [],
  arrOfDogs: []
}

export default function(state = initialState, action) {
  console.log(`rrrrr --> checking action ${action.type} in dbReducer`)
  switch (action.type) {
    case FETCH_DOG_EVENTS:
      console.log(' >> in fetchDogEvents CASE')
      // console.log(action.payload)
      return {
        ...state,
        arrOfEvents: action.payload
      }

    case FETCH_CURRENT_DAY_DATA:
      console.log(' >> IN fetchCurrentDayData CASE')
      // console.log(action.payload)
      if (action.payload.length !== 0) {
        return {
          ...state,
          dataOfCurrentDay: true,
          dogName: action.payload[0].nickName,
          currentDay_kmWalked: action.payload.sunOfKm,
          currentDay_numOfWalks: action.payload.numOfWalks,
          currentDay_meals: action.payload[0].Meals,
          currentDay_poops: action.payload[0].Poops,
          currentDay_snacks: action.payload[0].Snacks
        }
      }
      return {
        ...state,
        dataOfCurrentDay: false
      }

    case FETCH_ARR_OF_DOGS_FROM_DB_TO_ASYNCSTORAGE:
      console.log(' >> IN FETCH_ARR_OF_DOGS_FROM_DB_TO_ASYNCSTORAGE CASE')
      return {
        ...state,
        arrOfDogs: action.payload
      }

    case UPDATE_SPECIFIC_FIELD_IN_STORE:
      console.log(' >> IN UPDATE_SPECIFIC_FIELD_IN_STORE CASE')
      switch (action.fieldName) {
        case mealsTitle:
          return {
            ...state,
            currentDay_meals: action.payload,
            dataOfCurrentDay: true
          }

        case poopsTitle:
          return {
            ...state,
            currentDay_poops: action.payload,
            dataOfCurrentDay: true
          }

        case snacksTitle:
          return {
            ...state,
            currentDay_snacks: action.payload,
            dataOfCurrentDay: true
          }

        default:
          break
      }
      break

    default:
      return state
  }
}
