import expect from 'expect'
import 'isomorphic-fetch' // Fetch polyfill for node and browsers alike
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from './viewProject.actions.js'
import * as constants from './viewProject.actionTypes.js'
import configureMockStore from 'redux-mock-store'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
fetchMock.mock('^http://localhost:8080', { data: 'foo' })

describe('addProject actions', () => {
    it('should create a openDialog action', () => {

        var store = mockStore({})
        const expected = { type: constants.VIEW_PROJECT_DIALOG_OPEN, id: 2 }
        store.dispatch(actions.openProjectDialog(2))
        expect(store.getActions()[0]).toEqual(expected)

        store.dispatch(actions.closeProjectDialog())
        expect(store.getActions()[1]).toEqual({
            type: constants.VIEW_PROJECT_DIALOG_CLOSE,
        })
    })
})
