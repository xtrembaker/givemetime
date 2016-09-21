import expect from 'expect'
import thunk from 'redux-thunk'
import * as actions from './addProject.actions.js'
import * as constants from './addProject.actionTypes.js'
import configureMockStore from 'redux-mock-store'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('addProject actions', () => {
    it('should create a openDialog action', () => {

        var store = mockStore({})
        const expected = { type: constants.ADD_PROJECT_DIALOG_TOGGLE, open: true }
        store.dispatch(actions.openDialog())
        expect(store.getActions()[0]).toEqual(expected)

        store.dispatch(actions.closeDialog())
        expect(store.getActions()[1]).toEqual({
            type: constants.ADD_PROJECT_DIALOG_TOGGLE,
            open: false })
    })
})
