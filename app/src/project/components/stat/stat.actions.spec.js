import expect from 'expect'
import * as actions from './stat.actions.js'

describe('Stat convertCreatedAtToKey function', () => {
    it('should return a key having the expected value', () => {

        var createdAt = 'Tue Oct 11 2016 10:05:26 GMT+0000 (UTC)'

        const result = actions.convertCreatedAtToKey(createdAt)
        const expected = '2016-9-11'

        expect(result).toEqual(expected)
    })
})

describe('Stat computeAggregateAcquiredByDate function', () => {
    it('should compute result', () => {

        const objectA = {
            'toto' : 1,
            'tata' : 3,
            'titi' : 4,
        }

        const objectB = {
            'toto' : 4,
            'tata' : 1,
        }

        const expected = {
            'toto' : 5,
            'tata' : 4,
            'titi' : 4,
        }

        const result = actions.computeAggregateAcquiredByDate(objectA, objectB)

        expect(result).toEqual(expected)
    })
})