import React from 'react';
import { Header, Segment, Input, Menu } from 'semantic-ui-react';
import { hashToQuery } from '../utils';
import VisUsagePage from './VisUsagePage'
import VisUIPage from './VisUIPage';

export default class VisualizePage extends React.Component {
	constructor(props) {
		super(props);

		// const query = hashToQuery(window.location.hash);

		this.state = {
			// visCmd: query.query.target || '',
			displayPage: 'visUsage',
		};
	}

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
				{ menuItems.map((v, i) =>
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
			return <VisUsagePage />;
		} else if(this.state.displayPage === 'visUI') {
			return <VisUIPage />;
		}
	}

	render() {
		return(
			<Segment style={{ paddingLeft: 0, paddingRight: 0 }}>
				{this.renderMenu()}
				{this.renderSubPage()}
			</Segment>
		);
	}
}
