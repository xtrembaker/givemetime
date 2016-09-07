import expect from 'expect'

import 'isomorphic-fetch' // Fetch polyfill for node and browsers alike
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from './layout.actions.js'

import * as constants from './layout.actionTypes.js'

import configureMockStore from 'redux-mock-store'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
fetchMock.mock('^http://localhost:8080', { data: 'foo' })

describe('Layout actions', () => {
    it('should create a global menu toggle action', () => {

        var store = mockStore({})
        const expected = { type: constants.GLOBAL_MENU_TOGGLE, open: false }
        store.dispatch(actions.globalMenuToggle(true))
        expect(store.getActions()[0]).toEqual(expected)

        store.dispatch(actions.globalMenuToggle(false))
        expect(store.getActions()[1]).toEqual({
            type: constants.GLOBAL_MENU_TOGGLE,
            open: true })
    })
})