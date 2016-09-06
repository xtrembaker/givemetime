/*import testSetupProvider from '../testSetup.js'
import expect from 'expect'

import { GiveTimeDialog } from './GiveTimeDialog.jsx'


describe('GiveTimeDialog', () => {
    const field = { touched: null, error: null, value: '' }
    const setup = testSetupProvider({
        openId: 'abc',
        fields: {
            amount: field,
        },
        submitting: false,
        handleSubmit: () => {},
        invalid: false,
        onSubmit: () => {},
        id: '1qsdqsd',
        rowId: 1,
        userRowId: 1,
        title: 'hey',
        estimate: 10,
        acquired: 5,
        userCredit: 10,
        openDialog: () => {},
        closeDialog: () => {},
    })

    it('Open when openId is equal to id', () => {
        const { output } = setup(GiveTimeDialog, { openId: 'abc', id: 'abc' })
        expect(output.props.children[1].props.open).toBe(true)
        expect(output.props.children[1].props.title).toEqual('Give Time to project hey (5/10)')
    })

    it('Closed when openId is different from id', () => {
        const { output } = setup(GiveTimeDialog, { openId: 'abc', id: 'def' })
        expect(output.props.children[1].props.open).toBe(false)
        expect(output.props.children[1].props.title).toEqual('Give Time to project hey (5/10)')
    })
})
*/