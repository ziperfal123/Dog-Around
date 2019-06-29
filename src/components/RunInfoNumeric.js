import RunInfo from './RunInfo'
import PropTypes from 'prop-types'
export default class RunInfoNumeric extends RunInfo {
  formatValue = () => {
    return [this.state.value.toFixed(2), this.props.unit].join(' ')
  }
}

RunInfoNumeric.propTypes = {
  unit: PropTypes.string
}
