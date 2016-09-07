import reducer from './viewProject.reducers.js'
import expect from 'expect'

describe('viewProject reducer', () => {
    it('should handle VIEW_PROJECT_DIALOG', () => {
        expect(
            reducer({ viewProjectDialog: { openId: 2 } }, {
                type: 'VIEW_PROJECT_DIALOG_OPEN',
                id: 2,
            })
        ).toEqual({ viewProjectDialog: { openId: 2 } })

        expect(
            reducer({}, {
                type: 'VIEW_PROJECT_DIALOG_CLOSE',
            })
        ).toEqual({ viewProjectDialog: { openId: null } })
    })
})
