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
  switch (action.type) {
    case FETCH_DOG_NAME:
      return {
        ...state,
        dogName: action.payload
      }

    case SAVE_ARR_OF_DOGS_IN_STORE:
      return {
        ...state,
        arrOfOwnersDogsNames: action.payload
      }
    case SAVE_DOG_NAME_IN_STORE:
      return {
        ...state,
        dogName: action.payload
      }

    default:
      return state
  }
}
