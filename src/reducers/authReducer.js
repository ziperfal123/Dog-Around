import {
  FETCH_DOG_NAME,
  SAVE_ARR_OF_DOGS_IN_STORE,
  SAVE_DOG_NAME_IN_STORE
} from '../actions/actionTypes'

const initialState = {
  dogName: '',
  arrOfOwnersDogsNames: []
}

export default function(state = initialState, action) {
  console.log(`rrrrr --> checking action ${action.type} in authReducer`)
  switch (action.type) {
    case FETCH_DOG_NAME:
      console.log(` >> in fetchDogName CASE`)
      return {
        ...state,
        dogName: action.payload
      }

    case SAVE_ARR_OF_DOGS_IN_STORE:
      console.log(' >> in SAVE_ARR_OF_DOGS  CASE')
      return {
        ...state,
        arrOfOwnersDogsNames: action.payload
      }
    case SAVE_DOG_NAME_IN_STORE:
      console.log('>> in SAVE_DOG_NAME_IN_STORE  CASE')
      return {
        ...state,
        dogName: action.payload
      }

    default:
      return state
  }
}
