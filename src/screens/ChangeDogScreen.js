import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { saveDogNameInStore } from '../actions/authActions'

import Header from '../components/Header'
import ChooseDogItem from '../components/ChooseDogItem'

const styles = StyleSheet.create({
  drawerIconStyle: {
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
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginLeft: 20
  }
})

class ChangeDogScreen extends Component {
  constructor(props) {
    super(props)

    this.eachDog = this.eachDog.bind(this)
    this.handlePress = this.handlePress.bind(this)
  }
  static navigationOptions = {
    drawerIcon: (
      <Image
        source={require('../../assets/hamburgerMenu/changeDog.png')}
        style={styles.drawerIconStyle}
      />
    )
  }

  async handlePress(dog) {
    await this.props.saveDogNameInStore(dog)
    this.props.navigation.navigate('Auth')
  }

  eachDog(dog, index) {
    return <ChooseDogItem name={dog} key={index} index={index} onHandlePress={this.handlePress} />
  }

  render() {
    const { arrOfDogs } = this.props
    return (
      <View>
        <Header navigation={this.props.navigation} />
        <Text style={styles.titleStyle}>Change dog</Text>
        <View style={styles.contentContainer}>
          {arrOfDogs.map((dog, index) => this.eachDog(dog, index))}
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  arrOfDogs: state.authReducer.arrOfOwnersDogsNames
})

ChangeDogScreen.propTypes = {
  navigation: PropTypes.object,
  arrOfDogs: PropTypes.array,
  saveDogNameInStore: PropTypes.func
}

export default connect(
  mapStateToProps,
  { saveDogNameInStore }
)(ChangeDogScreen)
