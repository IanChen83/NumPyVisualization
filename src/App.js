import React from 'react';
import { Grid, Breadcrumb, Icon } from 'semantic-ui-react';

// All pages are imported here
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import VisualizePage from './pages/VisualizePage';

import { goToPage, hashToQuery } from './utils';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...hashToQuery(window.location.hash) };
		this.reRoute = this.reRoute.bind(this);
	}

	componentDidMount() {
		window.addEventListener('hashchange', this.reRoute);
	}

	reRoute() {
		// console.log(hashToQuery(window.location.hash));
		this.setState({ ...hashToQuery(window.location.hash) });
	}

	renderRoute() {
		if(this.state.page === '/about') {
			return <AboutPage />;
		}

		if(this.state.page.startsWith('/visualize')) {
			return <VisualizePage />;
		}

		return <HomePage />;
	}

	renderBreadCrumb() {
		const isHome = this.state.page === '/' || this.state.page === '';
		const isVisCmd = ['/visualize', '/visUsage', '/visUI'].some(x => this.state.page.startsWith(x));
		const isAbout = this.state.page === '/about';
		return(
			<Breadcrumb size="large" style={{ marginBottom: 5 }}>
				<Breadcrumb.Section link={!isHome} active={isHome} onClick={goToPage('/')}>Home</Breadcrumb.Section>
				<Breadcrumb.Divider icon="right angle" />
				<Breadcrumb.Section link={!isVisCmd} active={isVisCmd} onClick={goToPage('/visualize')}>Visualization</Breadcrumb.Section>
				<Breadcrumb.Divider icon="right angle" />
				<Breadcrumb.Section link={!isAbout} active={isAbout} onClick={goToPage('/about')}>About</Breadcrumb.Section>
			</Breadcrumb>
		);
	}

	render() {
		return(
			<Grid centered>
				<Grid.Row>
					<Grid.Column width={6} verticalAlign="bottom">
						<h1 style={{ textAlign: 'left', marginTop: 20 }}>
							<Icon name="home" color="blue" />
							Numpy Visualization
						</h1>
					</Grid.Column>
					<Grid.Column width={6} verticalAlign="bottom" style={{textAlign: 'right'}}>
						{this.renderBreadCrumb()}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={12}>
						{this.renderRoute()}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}
