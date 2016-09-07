import testSetupProvider from '../testSetup.js'
import expect from 'expect'

import { Layout } from './layout.container.js'

describe('Layout component', () => {

    const setup = testSetupProvider({
        user: { },
        globalMenuToggle: () => {},
        globalMenuOpen: false,
        openDialog: () => {},
    })

    it('render login message when user is not logged in', () => {
        const { output } = setup(Layout)
        expect(output.props.children[2].props.children).toBe('Login to view projects')
    })

    it('render page layout when user is logged in', () => {
        const { output } = setup(Layout, { user: { id: 'an id', credit: 16 } })
        expect(output.props.children[2].props.children.length).toBe(2)
    })

    it('should be able to open the left panel', () => {
        const props = {
            user: { id: 'an id', credit: 16 },
            globalMenuToggle: expect.createSpy(),
        }
        const { output } = setup(Layout, props)
        expect(output.props.children[1].props.children.props.open).toEqual(false)
        output.props.children[0].props.onLeftIconButtonTouchTap()
        expect(props.globalMenuToggle).toHaveBeenCalled()
    })
    it('should be able to open the left panel when not logged in', () => {
        const props = {
            user: { },
            globalMenuToggle: expect.createSpy(),
        }
        const { output } = setup(Layout, props)
        expect(output.props.children[1].props.children.props.open).toEqual(false)
        output.props.children[0].props.onLeftIconButtonTouchTap()
        expect(props.globalMenuToggle).toHaveBeenCalled()
    })
})
