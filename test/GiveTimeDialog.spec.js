import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'

import Dialog from 'material-ui/Dialog'

import { GiveTimeDialog } from '../src/components/GiveTimeDialog'


describe('GiveTimeDialog', () => {
    let wrapper

    beforeEach(() => {
        const field = { touched: null, error: null, value: 0 }
        const props = {
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
        }

        wrapper = shallow(<GiveTimeDialog {...props} />)
    })

    it('Open when openId is equal to id', () => {
        wrapper.setProps({ openId: 'abc', id: 'abc' })
        expect(wrapper.find(Dialog).props().open).toBe(true)
        wrapper.setProps({ openId: 'abc', id: 'def' })
        expect(wrapper.find(Dialog).props().open).toBe(false)
    })
})
