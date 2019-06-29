import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  AsyncStorage,
  Alert
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchDogEventsFromDB, fetchCurrentDayDataFromDB } from '../../actions/dbActions'
import { fetchDogNameFromAsyncStorage } from '../../actions/authActions'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#15cda8'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginBottom: 7
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
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  },
  formContainer: {
    alignItems: 'center',
    marginBottom: 130
  },
  signUpTextStyle: {
    marginTop: 15,
    fontSize: 17,
    fontWeight: '600',
    color: '#f1e4e4'
  }
})

class SignInScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleLogIn = this.handleLogIn.bind(this)
    this.handleSignUpBtn = this.handleSignUpBtn.bind(this)
  }

  static navigationOptions = {
    header: null
  }

  async handleLogIn() {
    const { email, password } = this.state
    if (!email || !password) Alert.alert('you must enter email & password')
    else {
      fetch(`https://rn-dog-tracker.herokuapp.com/getOwnerInfo?email=${email}`)
        .then(res => res.json())
        .then(async data => {
          if (data.statusCode === 404) {
            Alert.alert('Wrong email. Try again')
            this.setState({ email: '', password: '' })
          } else {
            const dogName = data[0].Dogs[0]
            const arrOfDogs = data[0].Dogs
            if (data[0] === undefined) {
              Alert.alert('Wrong email. Try again')
              this.setState({ email: '', password: '' })
            } else if (password !== data[0].Password) {
              Alert.alert('Wrong Password! Try again')
              this.setState({ password: '' })
            } else {
              await AsyncStorage.setItem('email', email)
              await AsyncStorage.setItem('dogName', dogName)
              await AsyncStorage.setItem('arrOfDogs', JSON.stringify(arrOfDogs))
              await this.props.fetchDogNameFromAsyncStorage()
              await this.props.fetchDogEventsFromDB(dogName)
              await this.props.fetchCurrentDayDataFromDB(dogName)

              this.props.navigation.push('LoadingScreen')
            }
          }
        })
    }
  }

  handleSignUpBtn() {
    this.props.navigation.push('SignUpScreen')
  }

  render() {
    console.log('>> in SignInScreen.js')
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.imageStyle} source={require('../../../assets/dogIcon.png')} />
          <Text style={styles.titleStyle}>DogAround</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter email"
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter password"
            keyboardType="numbers-and-punctuation"
            secureTextEntry
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
          <TouchableOpacity style={styles.btnStyle} onPress={this.handleLogIn}>
            <Text style={styles.btnTextStyle}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.handleSignUpBtn}>
            <Text style={styles.signUpTextStyle}>or... sign up!</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

SignInScreen.propTypes = {
  navigation: PropTypes.object,
  fetchDogNameFromAsyncStorage: PropTypes.func,
  fetchDogEventsFromDB: PropTypes.func,
  fetchCurrentDayDataFromDB: PropTypes.func
}

export default connect(
  null,
  {
    fetchDogNameFromAsyncStorage,
    fetchDogEventsFromDB,
    fetchCurrentDayDataFromDB
  }
)(SignInScreen)
