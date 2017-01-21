import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

export default class AboutPage extends React.Component {
	render() {
		return(
			<Segment>
				<Header as="h1" style={{ margin: '15 auto' }}>
					About <Header as="h1" style={{ display: 'inline' }} color="blue">Numpy-Visualization</Header>
				</Header>
				<div style={{ textAlign: 'left' }}>
					<p>
					What do you wnat to know ?
					</p>
					<p>
					What do you wnat to know ?
					</p>
					<p>
					What do you wnat to know ?
					</p>
					<p>
					What do you wnat to know ?
					</p>
					<p>
					What do you wnat to know ?
					</p>
				</div>
			</Segment>
		);
	}
}
