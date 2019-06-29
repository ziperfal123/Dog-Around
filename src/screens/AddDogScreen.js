import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { saveArrOfDogsInStore, saveDogNameInStore } from '../actions/authActions'
import Header from '../components/Header'

const styles = StyleSheet.create({
  drawerIcaonStyle: {
    width: 25,
    height: 25
  },
  titleStyle: {
    marginTop: 50,
    marginLeft: 30,
    fontSize: 38,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  },
  formContainer: {
    justifyContent: 'center',
    top: 55,
    left: 30
  },
  inputStyle: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: 'black',
    height: 35,
    width: 225,
    marginBottom: 24,
    fontSize: 14,
    paddingHorizontal: 7,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 0.3
  },
  btnStyle: {
    width: 140,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#a879d4',
    borderRadius: 6
  },
  btnTextStyle: {
    color: '#f1e4e4',
    fontWeight: 'bold'
  }
})

class AddDogScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dogsNickName: '',
      numOfMeals: '',
      numOfSnacks: '',
      didDogWasSignedSuccesfully: true
    }

    this.handleSignUpPress = this.handleSignUpPress.bind(this)
  }
  static navigationOptions = {
    drawerIcon: (
      <Image
        source={require('../../assets/hamburgerMenu/plusIcon.png')}
        style={styles.drawerIcaonStyle}
      />
    )
  }

  async handleSignUpPress() {
    let { arrOfDogs } = this.props
    const email = await AsyncStorage.getItem('email')
    const { dogsNickName, numOfMeals, numOfSnacks } = this.state
    if (dogsNickName === '' || numOfMeals === '' || numOfSnacks === '')
      alert('all the fields are required!')
    else {
      fetch('https://rn-dog-tracker.herokuapp.com/dogsSignUp', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dog: {
            nickName: dogsNickName,
            requiredMeals: numOfMeals,
            requiredSnacks: numOfSnacks
          }
        })
      })
        .then(() => {
          fetch(
            `https://rn-dog-tracker.herokuapp.com/addOwnerToDog?email=${email}&nickName=${dogsNickName}`,
            {
              method: 'post'
            }
          )
          this.setState({ didDogWasSignedSuccesfully: true })
        })
        .catch(() => {
          this.setState({ didDogWasSignedSuccesfully: false })
        })
      if (this.state.didDogWasSignedSuccesfully) {
        arrOfDogs = arrOfDogs.concat([dogsNickName])
        // console.log(arrOfDogs)
        await AsyncStorage.setItem('arrOfDogs', JSON.stringify(arrOfDogs))
        await AsyncStorage.setItem('dogName', dogsNickName)
        this.props.saveArrOfDogsInStore(arrOfDogs)
        this.props.saveDogNameInStore(dogsNickName)
        this.props.navigation.navigate('DogAddedScreen')
      } else {
        alert('dog name is alreay exist.. try again')
        this.setState({
          dogsNickName: '',
          didDogWasSignedSuccesfully: true
        })
      }
    }
    // console.log(arrOfDogs)
  }

  render() {
    console.log('>> in AddDogScreen.js')
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <Text style={styles.titleStyle}>Add a new dog</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your dog's nickname"
            keyboardType="name-phone-pad"
            value={this.state.dogsNickName}
            onChangeText={text => this.setState({ dogsNickName: text })}
          />

          <TextInput
            style={styles.inputStyle}
            placeholder="Enter # of meals per day"
            keyboardType="number-pad"
            value={this.state.numOfMeals}
            onChangeText={text => this.setState({ numOfMeals: text })}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter # of snacks per day"
            keyboardType="number-pad"
            value={this.state.numOfSnacks}
            onChangeText={text => this.setState({ numOfSnacks: text })}
          />

          <TouchableOpacity style={styles.btnStyle} onPress={this.handleSignUpPress}>
            <Text style={styles.btnTextStyle}>Add dog</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  arrOfDogs: state.authReducer.arrOfOwnersDogsNames
})

AddDogScreen.propTypes = {
  saveArrOfDogsInStore: PropTypes.func,
  saveDogNameInStore: PropTypes.func,
  navigation: PropTypes.object
}

export default connect(
  mapStateToProps,
  { saveArrOfDogsInStore, saveDogNameInStore }
)(AddDogScreen)
