import testSetupProvider from '../testSetup.js'
import expect from 'expect'
import * as actions from './layout.actions.js'
import reducer from './layout.reducers.js'
import * as constants from './layout.actionTypes.js'

import 'isomorphic-fetch' // Fetch polyfill for node and browsers alike
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import { Layout } from './layout.container.js'
/*eslint-disable */
import configureMockStore from 'redux-mock-store'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
fetchMock.mock('^http://localhost:8080', {data: 'foo'})

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

describe('Layout actions', () => {
    it('should create a global menu toggle action', () => {

        var store = mockStore({})
        const expected = {type: constants.GLOBAL_MENU_TOGGLE, open: false}
        store.dispatch(actions.globalMenuToggle(true))
        expect(store.getActions()[0]).toEqual(expected)


        store.dispatch(actions.globalMenuToggle(false))
        expect(store.getActions()[1]).toEqual({
            type: constants.GLOBAL_MENU_TOGGLE,
            open: true})
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
/*eslint-enable */
