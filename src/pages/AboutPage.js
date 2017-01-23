import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

export default class AboutPage extends React.Component {
	render() {
		return(
			<Segment>
				<Header as="h1" style={{ margin: '15 auto' }}>
					About <Header as="h1" style={{ display: 'inline' }} color='blue'>Numpy-Visualization</Header>
				</Header>
				<div style={{ textAlign: 'left', fontSize: '17px' }}>
					<p>
						<span style={{ fontWeight: 'bold', color: '#2185D0' }}>Developer : </span>
						<p>Patrick Chen, Tom Fan</p>
					</p>
					<p>
						<span style={{ fontWeight: 'bold', color: '#2185D0' }}>Instructor : </span>	
						<p>Chung-Yang Ric Huang</p>
					</p>
					<p>
						<span style={{ fontWeight: 'bold', color: '#2185D0' }}>Project : </span>
						<p>NTUEE Web Programming final, 2016 Fall</p>
					</p>
				</div>
			</Segment>
		);
	}
}
