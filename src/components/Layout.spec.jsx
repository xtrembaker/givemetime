import testSetupProvider from '../testSetup.js'
import expect from 'expect'
import * as actions from '../actions.js'
import reducer from '../reducer.js'

import { Layout } from './Layout.jsx'


describe('Layout component', () => {

    const setup = testSetupProvider({
        user: { },
        globalMenuToggle: () => {},
        globalMenuOpen: false,
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
        output.props.children[0].props.children.props.onLeftIconButtonTouchTap()
        expect(props.globalMenuToggle).toHaveBeenCalled()
    })
    it('should be able to open the left panel when not logged in', () => {
        const props = {
            user: { },
            globalMenuToggle: expect.createSpy(),
        }
        const { output } = setup(Layout, props)
        expect(output.props.children[1].props.children.props.open).toEqual(false)
        output.props.children[0].props.children.props.onLeftIconButtonTouchTap()
        expect(props.globalMenuToggle).toHaveBeenCalled()
    })
})

describe('Layout actions', () => {
    it('should create a global menu toggle action', () => {
        expect(actions.globalMenuToggle(true)).toEqual({
            type: 'GLOBAL_MENU_TOGGLE',
            open: true,
        })

        expect(actions.globalMenuToggle(false)).toEqual({
            type: 'GLOBAL_MENU_TOGGLE',
            open: false,
        })
    })
})

describe('Layout reducer', () => {
    it('should handle GLOBAL_MENU_TOGGLE', () => {
        expect(
            reducer({ globalMenuOpen: true }, {
                type: 'GLOBAL_MENU_TOGGLE',
                open: false,
            })
        ).toEqual({ globalMenuOpen: false })

        expect(
            reducer({ globalMenuOpen: false }, {
                type: 'GLOBAL_MENU_TOGGLE',
                open: true,
            })
        ).toEqual({ globalMenuOpen: true })
    })
})