import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Alert
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { saveArrOfDogsInStore, saveDogNameInStore } from '../../actions/authActions'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#15cda8'
  },
  titleStyle: {
    top: 50,
    left: 30,
    fontSize: 38,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  },
  formContainer: {
    justifyContent: 'center',
    top: 85,
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

class CreateDogScreen extends Component {
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
    headerTintColor: '#f1e4e4'
  }

  async handleSignUpPress() {
    const { dogsNickName, numOfMeals, numOfSnacks } = this.state
    const { navigation } = this.props
    const fullName = navigation.getParam('fullName')
    const email = navigation.getParam('email')
    const password = navigation.getParam('password')

    await AsyncStorage.setItem('email', email)
    await AsyncStorage.setItem('fullName', fullName)
    await AsyncStorage.setItem('dogName', dogsNickName)
    let arrOfDogs = await AsyncStorage.getItem('arrOfDogs')
    fetch('https://rn-dog-tracker.herokuapp.com/ownersSignUp', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          fullName,
          email,
          password
        }
      })
    })
      .then(
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
      )
      .then(res => {
        console.log(res)
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
      arrOfDogs = [dogsNickName]
      await AsyncStorage.setItem('arrOfDogs', JSON.stringify(arrOfDogs))
      await AsyncStorage.setItem('dogName', dogsNickName)
      this.props.saveArrOfDogsInStore(arrOfDogs)
      this.props.saveDogNameInStore(dogsNickName)
      this.props.navigation.navigate('WelcomeScreen')
    } else {
      Alert.alert('dog name is alreay exist.. try again')
      this.setState({
        dogsNickName: '',
        didDogWasSignedSuccesfully: true
      })
    }
  }
  render() {
    console.log(' >> in CreateDogScreen.js')
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Create your dog</Text>
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
            <Text style={styles.btnTextStyle}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

CreateDogScreen.propTypes = {
  navigation: PropTypes.object,
  saveArrOfDogsInStore: PropTypes.func,
  saveDogNameInStore: PropTypes.func
}

export default connect(
  null,
  { saveArrOfDogsInStore, saveDogNameInStore }
)(CreateDogScreen)
