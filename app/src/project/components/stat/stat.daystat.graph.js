import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import { PropTypes } from 'react'

export default class DayStatGraph extends Component {
    formatData () {
        const data = []
        data.push(['Date', 'Acquired'])
        for(var date in this.props.data) {
            data.push([date, this.props.data[date]])
        }
        return data
    }
    render () {
        return (
            <div className={'my-pretty-chart-container'}>
                <Chart chartType="ScatterChart" data={this.formatData()} options={{}} graph_id="ScatterChart" width={'100%'} height={'400px'} legend_toggle={true} />
            </div>
        )
    }
}

DayStatGraph.propTypes = {
    data:  PropTypes.func.isRequired,
}