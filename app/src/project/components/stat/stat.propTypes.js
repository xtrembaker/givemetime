import { PropTypes } from 'react'

const StatPropTypes = PropTypes.shape({
    aggregateAcquired: PropTypes.number,
    aggregateAcquiredByDate : PropTypes.object,
})

export default StatPropTypes