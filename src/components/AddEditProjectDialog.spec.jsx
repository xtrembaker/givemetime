import expect from 'expect'
import testSetupProvider from '../testSetup.js'

import { AddEditProjectDialog } from './AddEditProjectDialog.jsx'

describe('AddEditProjectDialog', () => {

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
        openProject: {},
    })

    it('shows a button when closed', () => {
        const { output } = setup(AddEditProjectDialog)
        // expect dialog to be closed
        expect(output.props.children[1].props.open).toBe(false)
    })

    it('shows a popin when open', () => {
        const { output } = setup(AddEditProjectDialog, { open: true })
        // expect dialog to be closed
        expect(output.props.children[1].props.open).toBe(true)
    })
})
