import { connect } from 'react-redux'
import * as actions from './projectRow.actions'
import { bindActionCreators } from 'redux'
import { ProjectRowComponent } from './projectRow.view'

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        onDelete: actions.onDelete,
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(ProjectRowComponent)
