import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
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
const LoginForm = props => {
  console.log(' cccc--> in LoginForm.js')

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter user name"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter password"
        keyboardType="numbers-and-punctuation"
        secureTextEntry
      />
      <TouchableOpacity style={styles.btnStyle} onPress={props.handleSignIn}>
        <Text style={styles.btnTextStyle}>Log In</Text>
      </TouchableOpacity>
    </View>
  )
}

LoginForm.propTypes = {
  handleSignIn: PropTypes.func
}

export default LoginForm
