import React from 'react';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import ProjectTableRow from './ProjectTableRow';

const styles = {
  projectsTable: {

  },
};

export default class ProjectsTable extends React.Component {
    
    constructor(){
        super();
    }


    render(){
        return <Table style={styles.projectsTable}>
                <TableHeader displaySelectAll={false} menableSelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Author</TableHeaderColumn>
                    <TableHeaderColumn>Time</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <ProjectTableRow 
                    title="Bastion v2" 
                    author="Denis Fortin" 
                    description="Lorem Ipsum" 
                    estimate={24} 
                    acquired={12}/>
                  <ProjectTableRow 
                    title="SteamLearn Website" 
                    author="Clément Prévost" 
                    description="Lorem Ipsum" 
                    estimate={38} 
                    acquired={2} />
                </TableBody>
              </Table>
    }    
}