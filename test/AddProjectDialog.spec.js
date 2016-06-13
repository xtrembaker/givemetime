import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'

import Dialog from 'material-ui/Dialog'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { AddProjectDialog } from '../src/components/AddProjectDialog'


describe('AddProjectDialog', () => {
    let wrapper

    beforeEach(() => {
        const field = { touched: null, error: null, value: '' }
        const props = {
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
        }

        wrapper = shallow(<AddProjectDialog {...props} />)
    })

    it('shows a button when closed', () => {
        expect(wrapper.find(Dialog).props().open).toBe(false)
        expect(wrapper.find(ContentAdd).length).toBe(1)
    })

    it('shows a popin when open', () => {
        wrapper.setProps({ open: true })
        expect(wrapper.find(Dialog).props().open).toBe(true)
    })


    it('triggers an onSubmit on submit', () => {
        const spy = expect.createSpy()
        wrapper.setProps({
            open: true,
            onSubmit: spy,
        })

        expect(spy.calls.length).toBe(0)
        wrapper.find('form').simulate('submit')
        // @todo: fix this
        //expect(spy.calls.length).toBe(1)
    })
})
