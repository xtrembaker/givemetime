import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import ProjectCard from './ProjectCard.jsx';

const styles = {
  gridList: {
    width: "100%",
    height: '2  0%',
    overflowY: 'auto',
    marginBottom: 24,
  },
};

export default class ProjectsGrid extends React.Component {

  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <div>
        <GridList cellHeight={200} style={styles.gridList} cols={4}>
          <ProjectCard title="Project A" author="Clement Prevost" estimate={12} acquired={4}/> 
          <ProjectCard title="Project B" author="Denis Fortin" estimate={34} acquired={24}/> 
        </GridList>
      </div>
    );
  }
}