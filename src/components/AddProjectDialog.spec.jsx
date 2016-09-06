/*import expect from 'expect'
import testSetupProvider from '../testSetup.js'

import { AddProjectDialog } from './AddProjectDialog.jsx'

describe('AddProjectDialog', () => {

    const field = { touched: null, error: null, value: '' }
    const setup = testSetupProvider({
        open: false,
        fields: {
            author: field,
            title: field,
            estimate: field,
            description: field,
        },
        submitting: false,
        handleSubmit: () => {},
        invalid: false,
        onSubmit: () => {},
        initialValues: {
            author: 1,
        },
        openDialog: () => {},
        closeDialog: () => {},
        userRowId: 1,
        userFullName: 'John Doe',
    })

    it('shows a button when closed', () => {
        const { output } = setup(AddProjectDialog)
        // expect dialog to be closed
        expect(output.props.children[1].props.open).toBe(false)
    })

    it('shows a popin when open', () => {
        const { output } = setup(AddProjectDialog, { open: true })
        // expect dialog to be closed
        expect(output.props.children[1].props.open).toBe(true)
    })
})
*/