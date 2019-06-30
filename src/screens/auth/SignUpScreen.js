import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    backgroundColor: '#15cda8'
  },
  titleStyle: {
    bottom: 20,
    textAlign: 'center',
    fontSize: 38,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  },
  formContainer: {
    bottom: 130,
    justifyContent: 'center'
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
    marginTop: 20,
    left: 43,
    backgroundColor: '#a879d4',
    borderRadius: 6
  },
  btnTextStyle: {
    color: '#f1e4e4',
    fontWeight: 'bold'
  }
})

class SignUpScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      email: '',
      password: ''
    }
    this.handleSignUpPress = this.handleSignUpPress.bind(this)
  }

  static navigationOptions = {
    headerTintColor: '#f1e4e4'
  }

  async handleSignUpPress() {
    const { fullName, password } = this.state
    let { email } = this.state
    if (fullName && email && password) {
      if (!ValidateEmail(email)) {
        Alert.alert('please enter a valid email address')
        this.setState({ email: '', fullName: '', password: '' })
      } else {
        email = email.toLowerCase()
        this.props.navigation.navigate('CreateDogScreen', {
          fullName,
          email,
          password
        })
      }
    } else {
      Alert.alert('please fill all the fields')
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Sign Up</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter full name"
            keyboardType="name-phone-pad"
            value={this.state.fullName}
            onChangeText={text => this.setState({ fullName: text })}
          />

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

          <TouchableOpacity style={styles.btnStyle} onPress={this.handleSignUpPress}>
            <Text style={styles.btnTextStyle}>next step</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

SignUpScreen.propTypes = {
  navigation: PropTypes.object
}

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true
  return false
}

export default SignUpScreen
