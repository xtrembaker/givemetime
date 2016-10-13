import { connect } from 'react-redux'
import { ViewStatComponent } from './stat.view'
import { bindActionCreators } from 'redux'
import * as actions from './stat.actions'

const mapStateToProps = state => {
    return ({
        stat: state.project.project.stat,
    })
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadStat: actions.loadStats,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewStatComponent)
