import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

export default class VisUsagePage extends React.Component {
	render() {
		return(
			<Segment>
				<Header
					as="h1" style={{ margin: '15 auto' }}
					color="blue"
				>
					How to Visualize ?
				</Header>
				<div style={{ textAlign: 'left' }}>
					<p>
						It's very simple, figure out yourself.
					</p>
				</div>
			</Segment>
		);
	}
}