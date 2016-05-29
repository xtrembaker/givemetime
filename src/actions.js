export const getGraphQL = (payload, variables, payloadToAction, errorToAction) => {
  payloadToAction = payloadToAction || (a => a);
  errorToAction = errorToAction || (a => a);
  errorToAction = variables || "";
  return dispatch => {
    return new Promise(function(resolve, reject) {
      let request=new XMLHttpRequest();
      request.open("POST", "https://enriched-fluorine-353.myreindex.com/graphql", true);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify({query: payload, variables: variables}));
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          resolve(request.responseText)
        }
      }
    })
    .catch(response => dispatch(errorToAction(JSON.parse(response))))
    .then(response => dispatch(payloadToAction(JSON.parse(response).data)))
  }
}

export const fetchProjects = () =>
    getGraphQL(`
       query { viewer { allProjects { nodes {
          id,
          title,
          estimate,
          acquired,
          description,
          author {
            id,
            fullname,
            credit
          } } } } }
      `,
      {},
      (response) =>
          dispatch => response.viewer.allProjects.nodes
            .map(node => dispatch(projectFetched(
              node.id,
              node.title,
              node.estimate,
              node.acquired,
              node.description,
              node.author ? node.author.fullname : null
            ))),
      (response) => apologize(response)
    )
;

export const projectFetched = (id, title, estimate, acquired, description, author) => {
  return {
    type: 'PROJECT_FETCHED',
    id: id,
    estimate: estimate,
    acquired: acquired,
    description: description,
    title: title,
  }
}
export const projectCreated = (id, title, estimate, acquired, description, author) => {
  return {
    type: 'PROJECT_CREATED',
    id: id,
    estimate: estimate,
    acquired: acquired,
    description: description,
    title: title,
  }
}

export const createProject = (acquired, estimate, title, description) => {
    return {
        type: 'CREATE_PROJECT',
        estimate: estimate,
        acquired: acquired,
        description: description,
        title: title,
    }
}
export const deleteProject = (id) => {
    return {
        type: 'DELETE_PROJECT',
        id: id,
    }
}
export const apologize = (msg) => {
    return {
        type: 'APOLOGIZE',
        message: msg,
    }
}

export const addProjectDialogToggle = (open) => {
    if (open) {
        return {
            type: 'ADD_PROJECT_DIALOG_OPEN',
        }
    } else {
        return {
            type: 'ADD_PROJECT_DIALOG_CLOSE',
        }
    }
}

export const closeProjectDialog = () => {
    return {
        type: 'VIEW_PROJECT_DIALOG_CLOSE',
    }
}
export const openProjectDialog = (id) => {
    return {
        type: 'VIEW_PROJECT_DIALOG_OPEN',
        id: id
    }
}


export const closeGiveTimeDialog = () => {
    return {
        type: 'GIVE_TIME_DIALOG_CLOSE',
    }
}
export const openGiveTimeDialog = (id) => {
    return {
        type: 'GIVE_TIME_DIALOG_OPEN',
        id: id
    }
}
export const giveTime = (amount, projectId) => {
    return {
        type: 'GIVE_TIME',
        amount: amount,
        id: projectId
    }
}
export const giveTimeFormChange = (amount, projectId) => {
    return {
        type: 'GIVE_TIME_FORM_CHANGE',
        amount: amount,
        id: projectId
    }
}

// create dependency between store structure and redux connector but small amount of code :)
export const projectFormChange = (prop, value) => {
    return {
        type: 'PROJECT_FORM_CHANGE',
        prop: prop,
        value: value
    }
}
