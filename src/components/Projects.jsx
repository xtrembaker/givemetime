import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import Project from './Project.jsx';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  
  gridList: {
    width: "100%",
    height: '100%',
    overflowY: 'auto',
    marginBottom: 24,
  },
};

export default class Projects extends React.Component {

  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <div>
        <GridList cellHeight={200} style={styles.gridList} cols={4}>
          <Project title="Project A" author="Clement Prevost" estimate={12} acquired={4}/> 
          <Project title="Project B" author="Denis Fortin" estimate={34} acquired={24}/> 
        </GridList>
      </div>
    );
  }
}