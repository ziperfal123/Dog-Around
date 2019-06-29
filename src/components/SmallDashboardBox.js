import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateSpecificFieldInDogEvents } from '../actions/dbActions'
import { numOfWalksTitle, poopsTitle } from '../screens/dashboardItemsTitles'

const styles = StyleSheet.create({
  smallBoxStyle: {
    position: 'relative',
    height: 161,
    marginTop: 17,
    backgroundColor: '#a879d4',
    borderWidth: 0.7,
    borderColor: 'black',
    borderRadius: 10
  },
  dataStyle: {
    marginTop: 15,
    marginLeft: 7,
    fontSize: 30,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  },
  titleStyle: {
    marginTop: 7,
    marginLeft: 7,
    fontSize: 15,
    color: '#f1e4e4',
    fontFamily: 'ArialHebrew'
  },
  updateContainer: {
    position: 'absolute',
    top: 40,
    width: '100%'
  },
  updateDashboardItemArea: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textBetweenButtonsStyle: {
    fontSize: 34,
    fontFamily: 'ArialHebrew'
  },
  longPressInstructions: {
    position: 'absolute',
    marginTop: 70,
    marginLeft: 10,
    fontFamily: 'ArialHebrew',
    top: 40
  },
  longPressInstructionsText: {
    textAlign: 'center',
    fontSize: 12
  },
  poopImageStyle: {
    width: 24,
    height: 24,
    marginTop: 10,
    marginLeft: 8
  },
  poopsImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  plusMinusImageStyle: {
    width: 30,
    height: 30
  }
})

class SmallDashboardBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didItemWasLongPressed: false,
      dataToDisplay: 0
    }

    this.handleLongPress = this.handleLongPress.bind(this)
    this.handlePlusPress = this.handlePlusPress.bind(this)
    this.handleMinusPress = this.handleMinusPress.bind(this)
    this.renderUpdateSectionOnLongPress = this.renderUpdateSectionOnLongPress.bind(this)
    this.handleDoneUpdatingPress = this.handleDoneUpdatingPress.bind(this)
  }

  displayPoops(dataToDisplay) {
    const arrOfPoopsItems = []
    for (let i = 0; i < dataToDisplay; i++) {
      arrOfPoopsItems.push(
        <Image
          key={i}
          source={require('../../assets/poopIcon.png')}
          style={styles.poopImageStyle}
        />
      )
    }
    return <View style={styles.poopsImagesContainer}>{arrOfPoopsItems}</View>
  }

  handleLongPress() {
    if (
      this.props.dataToDisplay === undefined ||
      this.props.dataToDisplay === '-' ||
      isNaN(this.props.dataToDisplay) === true ||
      this.props.dataToDisplay === '' ||
      this.props.dataToDisplay === -1
    ) {
      this.setState({
        didItemWasLongPressed: !this.state.didItemWasLongPressed,
        dataToDisplay: 0
      })
    } else {
      this.setState({
        didItemWasLongPressed: !this.state.didItemWasLongPressed,
        dataToDisplay: this.props.dataToDisplay
      })
    }
  }

  handlePlusPress() {
    if (this.state.dataToDisplay < 8) this.setState({ dataToDisplay: this.state.dataToDisplay + 1 })
  }

  handleMinusPress() {
    if (this.state.dataToDisplay > 0) this.setState({ dataToDisplay: this.state.dataToDisplay - 1 })
  }

  handleDoneUpdatingPress() {
    const { dogName, title, updateSpecificFieldInDogEvents } = this.props
    const { dataToDisplay } = this.state
    updateSpecificFieldInDogEvents(dogName, title, dataToDisplay)
    this.setState({
      didItemWasLongPressed: !this.state.didItemWasLongPressed
    })
  }

  renderUpdateSectionOnLongPress() {
    return (
      <View style={styles.updateContainer}>
        <View style={styles.updateDashboardItemArea}>
          <TouchableOpacity onPress={this.handleMinusPress}>
            <Image
              source={require('../../assets/minusIconRed.png')}
              style={styles.plusMinusImageStyle}
            />
          </TouchableOpacity>
          <Text style={styles.textBetweenButtonsStyle}>{this.state.dataToDisplay}</Text>
          <TouchableOpacity onPress={this.handlePlusPress}>
            <Image
              source={require('../../assets/plusIconGreen.png')}
              style={styles.plusMinusImageStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <Button title="Done" color="white" onPress={this.handleDoneUpdatingPress} />
        </View>
      </View>
    )
  }

  render() {
    console.log(' cccc--> in SmallDashboardBox.js')
    let { dataToDisplay } = this.props
    const { title } = this.props
    const updateSection = this.renderUpdateSectionOnLongPress()

    if (dataToDisplay === undefined || dataToDisplay === 0 || dataToDisplay === -1)
      dataToDisplay = '-'

    if (title === numOfWalksTitle) {
      return (
        <View style={styles.smallBoxStyle} onLongPress={this.handleLongPress}>
          {title === poopsTitle && dataToDisplay !== '-' ? (
            this.displayPoops(dataToDisplay)
          ) : (
            <Text style={styles.dataStyle}>{dataToDisplay}</Text>
          )}
          <Text style={styles.titleStyle}>{title}</Text>
          {this.state.didItemWasLongPressed && title !== numOfWalksTitle ? (
            <View style={styles.updateContainer}>{updateSection}</View>
          ) : title === numOfWalksTitle ? null : (
            <View style={styles.longPressInstructions}>
              <Text style={styles.longPressInstructionsText}>Long press to update</Text>
            </View>
          )}
        </View>
      )
    }
    return (
      <TouchableOpacity style={styles.smallBoxStyle} onLongPress={this.handleLongPress}>
        {title === poopsTitle && dataToDisplay !== '-' ? (
          this.displayPoops(dataToDisplay)
        ) : (
          <Text style={styles.dataStyle}>{dataToDisplay}</Text>
        )}
        <Text style={styles.titleStyle}>{title}</Text>
        {this.state.didItemWasLongPressed && title !== numOfWalksTitle ? (
          <View style={styles.updateContainer}>{updateSection}</View>
        ) : title === numOfWalksTitle ? null : (
          <View style={styles.longPressInstructions}>
            <Text style={styles.longPressInstructionsText}>Long press to update</Text>
          </View>
        )}
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = state => ({
  dogName: state.authReducer.dogName
})

SmallDashboardBox.propTypes = {
  title: PropTypes.string,
  dataToDisplay: PropTypes.number,
  dogName: PropTypes.string,
  updateSpecificFieldInDogEvents: PropTypes.func
}
export default connect(
  mapStateToProps,
  { updateSpecificFieldInDogEvents }
)(SmallDashboardBox)
