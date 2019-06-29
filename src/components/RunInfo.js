import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#666'
  },
  value: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '200',
    padding: 5
  }
})

export default class RunInfo extends Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.value }
  }

  formatvalue() {
    return this.state.value
  }

  render() {
    console.log('cccc--> in RunInfo.js')
    const value = this.state.value ? this.formatvalue() : '-'
    return (
      <View>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.value}>
          {value} {this.props.unit}
        </Text>
      </View>
    )
  }
}

RunInfo.propTypes = {
  value: PropTypes.number,
  title: PropTypes.string,
  unit: PropTypes.string
}
