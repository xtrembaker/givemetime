import React from 'react';

const projectsList = [
    {author: 'Denis Fortin', title:'Bastion v2', estimate:23, acquired:12,description:'bastion est trop bon'},
    {author: 'Clément Prévost', title:'SteamLearn', estimate:45, acquired:2,description:'Lorem IPSUM'},
];

export default React.createClass({
    render: function() {
        return React.cloneElement(this.props.children, {projectsList: projectsList});
    }
});