import { connect as apolloConnect } from 'react-apollo';
import React from 'react'

/**
 * Allow one to provide an argument named mapResultToProps, a function that
 * maps a graphQL result to the component properties
 * Example:
 *
 * const mapResultToProps = (result) => {
 *     if (result.projects.viewer && result.projects.viewer.allProjects.edges.length) {
 *         return {
 *             projects: result.projects.viewer.allProjects.edges.map((edge) => {
 *                 return edge.node;
 *             })
 *         }
 *     } else {
 *         return {
 *             projects: []
 *         }
 *     }
 * }
 *
 * const ProjectsTable = connect({
 *   mapQueriesToProps,
 *   mapResultToProps
 * })(ProjectsTableComponent)
 */
function connect(args) {
    const mapResultToProps = args.mapResultToProps || (a => a);
    return function(component) {
        return apolloConnect(args)((props) => {
            // throw exception if a query failed
            Object.keys(props).map((k) => {
                if (props[k].errors) {
                    throw props[k].errors;
                }
            });
            props = mapResultToProps(props);
            return React.createElement(component, props);
        })
    }
}

/**
 * If the doFunc throws, return defaultValue
 * If it doesn't, return the result
 * Allow one to be mode concise when accessing deep objects that might be undefined
 * The function name is purposely scary
 *
 * Example: 
 * return {
 *     projects: silentCatchToDefault([], (result) => {
 *         return result.projects.viewer.allProjects.edges.map((edge) => {
 *             return edge.node;
 *         })
 *     }, result)
 * }
 */
function silentCatchToDefault(defaultValue, doFunc, ...doFuncArgs) {
    try {
        return doFunc(...doFuncArgs);
    } catch(e) {
        //console.debug(e);
    }
    return defaultValue;
}

export { connect, silentCatchToDefault }