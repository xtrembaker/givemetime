import React, { PropTypes } from 'react'
import StatPropTypes from './stat.propTypes'
import DayStatGraph from './stat.daystat.graph'

export class ViewStatComponent extends React.Component {
    componentWillMount () {
        this.props.loadStat()
    }

    componentDidMount () {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount () {
        this.unsubscribe()
    }

    render () {
        if (! this.props.stat) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div>
                <h2>Global stat (all projects mixed)</h2>
                <label>Aggregate acquired over time :</label>
                <DayStatGraph data={this.props.stat.aggregateAcquiredByDate} />

                <label>Total acquired time : {this.props.stat.aggregateAcquired}</label>
            </div>
        )
    }

}

ViewStatComponent.propTypes = {
    stat: StatPropTypes,
    loadStat: PropTypes.func.isRequired,
}

ViewStatComponent.contextTypes = {
    store: React.PropTypes.object,
}
