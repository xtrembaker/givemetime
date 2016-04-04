import React from 'react';

import ProjectsTable from './ProjectsTable.jsx';


export default class Projects extends React.Component {

    constructor(){
        super();
    }

    render(){
        
        return (
          <div><ProjectsTable projects={this.props.projectsList}/></div>
        );
    }    
}