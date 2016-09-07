import reducer from './addProject.reducers.js'
import expect from 'expect'

describe('addProject reducer', () => {
    it('should handle ADD_PROJECT_DIALOG_TOGGLE', () => {
        expect(
            reducer({ addProjectDialog: { open: true } }, {
                type: 'ADD_PROJECT_DIALOG_TOGGLE',
                open: false,
            })
        ).toEqual({ addProjectDialog: { open: false } })

        expect(
            reducer({ addProjectDialog: { open: false } }, {
                type: 'ADD_PROJECT_DIALOG_TOGGLE',
                open: true,
            })
        ).toEqual({ addProjectDialog: { open: true } })
    })
})
