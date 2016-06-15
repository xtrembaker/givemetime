import testSetupProvider from '../testSetup.js'
import expect from 'expect'

import { Layout } from './Layout.jsx'


describe('Layout', () => {

    const setup = testSetupProvider({
        user: { },
    })

    it('render login message when user is not logged in', () => {
        const { output } = setup(Layout)
        expect(output.props.children[1]).toBe('Login to view projects')
    })

    it('render page layout when user is logged in', () => {
        const { output } = setup(Layout, { user: { id: 'an id', credit: 16 } })
        expect(output.props.children.length).toBe(4)
    })
})
