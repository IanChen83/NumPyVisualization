import React from 'react';
import { Header, Segment, Input, Menu } from 'semantic-ui-react';
import { hashToQuery } from '../utils';
import VisUsagePage from './VisUsagePage'
import VisUIPage from './VisUIPage';

export default class VisualizePage extends React.Component {
	constructor(props) {
		super(props);

		const query = hashToQuery(window.location.hash);

		this.state = {
			visCmd: query.query.target || '',
			displayPage: 'visUsage',
		};

		// this.onInputChange = this.onInputChange.bind(this);
	}

	// onInputChange(e) {
	// 	this.setState({ visCmd: e.target.value });
	// }

	// isSupportedvisCmd(visCmd) {
	// 	if(visCmd === 'ls' || visCmd === 'find') {
	// 		return true;
	// 	}

	// 	return false;
	// }

	renderMenu() {

		const menuItems = [{
			name: 'visUsage',
			display: 'Usage',
		}, {
			name: 'visUI',
			display: 'UI',
		}];

		return(
			<Menu secondary pointing style={{ borderRadius: 0, marginBottom: 0 }} color="blue">
				{
					menuItems.map((v, i) =>
						<Menu.Item
						  name={v.name}
						  onClick={() => this.setState({ displayPage: v.name })}
						  key={i}
						  active={v.name === this.state.displayPage}
						>{v.display}
						</Menu.Item>)
				}
			</Menu>
		);
	}

	renderSubPage() {
		if(this.state.displayPage === 'visUsage') {
			return <VisUsagePage visCmd={this.state.visCmd} />;
		} else if(this.state.displayPage === 'visUI') {
			return <VisUIPage visCmd={this.state.visCmd} />;
		}
	}

	render() {
		return(
			<Segment style={{ paddingLeft: 0, paddingRight: 0 }}>
				<Header as="h1" style={{ margin: '15 auto' }}>
					{'Visualizing a numpy command right now !!'}
				</Header>
				{this.renderMenu()}
				{this.renderSubPage()}
			</Segment>
		);
	}
}