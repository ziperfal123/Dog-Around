import RunInfo from './RunInfo'
import PropTypes from 'prop-types'
export default class RunInfoNumeric extends RunInfo {
  formatValue = () => {
    let info
    if (this.state.value < 0) info = 0
    else info = this.state.value

    return [info.toFixed(2), this.props.unit].join(' ')
  }
}

RunInfoNumeric.propTypes = {
  unit: PropTypes.string
}
