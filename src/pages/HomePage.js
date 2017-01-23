import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

const HomePage = () => (
    <Segment style={{ paddingLeft: 0, paddingRight: 0, textAlign: 'left' }} basic>
        <Header as="h1" style={{ margin: '15 auto' }}>
            What is <span style={{ color: '#2185D0' }}>NumPy Visualization</span> ?
        </Header>
        <p>This is a website to help you visualize what a numpy command actually dose</p>
    </Segment>
);

export default HomePage;
