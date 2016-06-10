//jest.unmock('../src/components/Layout');

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

import { Layout } from '../src/components/Layout'

function setup (user) {
    let props = {
        user: user,
    }

    let renderer = TestUtils.createRenderer()
    renderer.render(<Layout {...props} />)
    let output = renderer.getRenderOutput()

    return {
        props,
        output,
        renderer,
    }
}


describe('Layout', () => {

    it('render login message when user is not logged in', () => {
        const { output } = setup({})
        expect(output.props.children[1]).toBe('Login to view projects')
    })

    it('render page layout when user is logged in', () => {
        const { output } = setup({
            id: 'an id',
            credit: 16,
        })
        expect(output.props.children.length).toBe(4)
    })
})
