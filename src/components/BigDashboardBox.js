import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateSpecificFieldInDogEvents } from '../actions/dbActions'
import { distaneTitle } from '../screens/dashboardItemsTitles'

const styles = StyleSheet.create({
  bigBoxStyle: {
    height: 281,
    marginTop: 17,
    backgroundColor: '#a879d4',
    borderWidth: 0.7,
    borderColor: '#000000',
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
  kmStyle: {
    fontSize: 14
  },
  updateDashItemArea: {
    top: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  textBetweenButtonsStyle: {
    fontSize: 34,
    fontFamily: 'ArialHebrew'
  },
  longPressInstructions: {
    top: 128,
    marginLeft: 10
  },
  longPressInstructionsText: {
    fontSize: 12
  },
  plusMinusImageStyle: {
    width: 30,
    height: 30
  },
  doneBtn: {
    top: 45
  }
})

class BigDashboardBox extends Component {
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
      <View>
        <View style={styles.updateDashItemArea}>
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
        <View style={styles.doneBtn}>
          <Button title="Done" color="white" onPress={this.handleDoneUpdatingPress} />
        </View>
      </View>
    )
  }

  render() {
    console.log(' cccc--> in BigDashboardScreen.js')
    const { title } = this.props
    let { dataToDisplay } = this.props
    const updateSection = this.renderUpdateSectionOnLongPress()

    if (dataToDisplay === undefined || dataToDisplay === 0 || dataToDisplay === -1)
      dataToDisplay = '-'

    if (title === distaneTitle) {
      return (
        <View style={styles.bigBoxStyle} onLongPress={this.handleLongPress}>
          <Text style={styles.dataStyle}>
            {title === distaneTitle && dataToDisplay !== '-' ? (
              <Text>
                {dataToDisplay}
                <Text style={styles.kmStyle}> km</Text>
              </Text>
            ) : (
              <Text>{dataToDisplay}</Text>
            )}
          </Text>
          <Text style={styles.titleStyle}>{title}</Text>
          {this.state.didItemWasLongPressed && title !== distaneTitle ? (
            <View>{updateSection}</View>
          ) : title === distaneTitle ? null : (
            <View style={styles.longPressInstructions}>
              <Text style={styles.longPressInstructionsText}>Long press to update</Text>
            </View>
          )}
        </View>
      )
    }
    return (
      <TouchableOpacity style={styles.bigBoxStyle} onLongPress={this.handleLongPress}>
        <Text style={styles.dataStyle}>
          {title === distaneTitle && dataToDisplay !== '-' ? (
            <Text>
              {dataToDisplay}
              <Text style={styles.kmStyle}> km</Text>
            </Text>
          ) : (
            <Text>{dataToDisplay}</Text>
          )}
        </Text>
        <Text style={styles.titleStyle}>{title}</Text>
        {this.state.didItemWasLongPressed && title !== distaneTitle ? (
          <View>{updateSection}</View>
        ) : title === distaneTitle ? null : (
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

BigDashboardBox.propTypes = {
  dogName: PropTypes.string,
  updateSpecificFieldInDogEvents: PropTypes.func,
  title: PropTypes.string,
  dataToDisplay: PropTypes.number
}

export default connect(
  mapStateToProps,
  { updateSpecificFieldInDogEvents }
)(BigDashboardBox)
