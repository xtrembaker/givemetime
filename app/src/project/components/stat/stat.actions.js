import { getGraphQL } from '../../../common/common.actions.js'
import * as constants from './stat.actionTypes'

/**
 * Convert a date into a key like "YYYY-MM-DD"
 * @param createdAt
 * @returns {string}
 */
export function convertCreatedAtToKey (createdAt) {
    const date = new Date(createdAt)
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
}

/**
 * Compute two object by merging property and SUM value
 *
 * @param {} objectA
 * @param {} objectB
 * @returns {*}
 */
export function computeAggregateAcquiredByDate (objectA, objectB) {
    for(const key in objectB) {
        if(objectA[key]) {
            objectA[key] = objectA[key] ? objectA[key] + objectB[key] : objectB[key]
        }
    }
    return objectA
}

/**
 * Fetch whatever query with variables. Execute resolver once done
 *
 * @param query
 * @param variables
 * @param resolver
 * @returns {Promise}
 */
function fetchQuery (query, variables, resolver) {
    variables.after = variables.after || null
    return new Promise(function (resolve) {
        getGraphQL(null, query,
            variables,
            response => {
                resolve(resolver(response))
            }
        )()
    })
}

/**
 * Return aggregate acquired stat
 *
 * @param variables
 * @returns {number}
 */
async function loadAggregateAcquiredStat () {
    // acquired aggregate (SUM)
    var aggregateAcquired = 0

    // query that will be executed
    const query = `
            query($after : Cursor){
                viewer {
                  projectNodes(first: 10, after: $after) {
                    edges {
                      node {
                        acquired
                      }
                      cursor
                    }
                    pageInfo {
                      endCursor
                      hasNextPage
                    }
                  }
                }
            }
            `

    // variables needed by the query
    const variables = {}

    /**
     * Resolver
     *
     * @param response
     * @returns {*}
     */
    function resolver (response) {
        // SUM all the value
        aggregateAcquired = response.viewer.projectNodes.edges.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.node.acquired
        }, aggregateAcquired)

        return response
    }

    /**
     * Fetch aggregateAcquired (SUM) until we've reached the end of the pagination
     *
     * @param query
     * @param variables
     * @param resolver
     */
    async function trigger (query, variables, resolver) {
        const response = await fetchQuery(query, variables, resolver)
        if(response.viewer.projectNodes.pageInfo.hasNextPage) {
            variables.after = response.viewer.projectNodes.pageInfo.endCursor
            await trigger(query, variables , resolver)
        }
    }
    // Trigger first query
    await trigger(query, variables, resolver)
    // Once the SUM has been done, return it
    return aggregateAcquired
}



/**
 * Return Aggregate acquired by date
 *
 * @param variables
 * @returns {number}
 */
async function loadAggregateAcquiredByDateStat () {
    // aggregate acquired by date
    var acquiredByDate = {}

    // query that will be executed
    const query = `
           query($after : Cursor){
                viewer {
                  projectNodes(first: 10, after: $after) {
                    edges {
                      node {
                        acquired,
                        createdAt
                      }
                      cursor
                    }
                    pageInfo {
                      endCursor
                      hasNextPage
                    }
                  }
                }
           }
    `

    // variables needed by the query
    const variables = {}

    /**
     * Resolver
     * @param response
     * @returns {*}
     */
    function resolver (response) {
        response.viewer.projectNodes.edges.map(node => {
            const key = convertCreatedAtToKey(node.node.createdAt)
            // map = addValueTo()
            acquiredByDate[key] = (acquiredByDate.hasOwnProperty(key) ? acquiredByDate[key] + node.node.acquired : node.node.acquired)
        })

        return response
    }

    /**
     * Fetch aggregateAcquiredbyDate (SUM) until we've reached the end of the pagination
     * @param query
     * @param variables
     * @param resolver
     */
    async function trigger (query, variables, resolver) {
        const response = await fetchQuery(query, variables, resolver)
        if(response.viewer.projectNodes.pageInfo.hasNextPage) {
            variables.after = response.viewer.projectNodes.pageInfo.endCursor
            await trigger(query, variables , resolver)
        }
    }
    // Trigger first query
    await trigger(query, variables, resolver)
    // Once the SUM has been done, return it
    return acquiredByDate
}

/**
 *
 * @returns {function(*)}
 */
export function loadStats () {
    return async dispatch => {
        const stat = {}
        stat.aggregateAcquired = await loadAggregateAcquiredStat()
        stat.aggregateAcquiredByDate = await loadAggregateAcquiredByDateStat()
        dispatch(statFetched(stat))
    }
}



/**
 *
 *
 * @param id
 * @param row_id
 * @param title
 * @param estimate
 * @returns {{type: *, stat : {}}
 */
export const statFetched = stat => {
    return {
        type: constants.STAT_FETCHED,
        stat : stat,
    }
}

