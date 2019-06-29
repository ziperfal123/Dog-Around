import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  imageStyle: {
    width: 33,
    height: 33
  }
})
const MenuBtn = props => {
  console.log(' cccc--> in MenuBtn.js')
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
        <Image
          style={styles.imageStyle}
          source={require('../../assets/hamburgerMenu/hamburgerMenu.png')}
        />
      </TouchableOpacity>
    </View>
  )
}

MenuBtn.propTypes = {
  navigation: PropTypes.object
}

export default MenuBtn
