import React from 'react';
import { Segment, Header, Grid, Table, Button, Input, Icon } from 'semantic-ui-react';
import CodeMirror from 'react-codemirror';

export default class VisUIPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			curArrName: '',
			curArrShape: '',
			arrList: [],
			npCmd: '',
		};

		this.onNpCmdChange = this.onNpCmdChange.bind(this);
		this.onArrNameChange = this.onArrNameChange.bind(this);
		this.onArrShapeChange = this.onArrShapeChange.bind(this);
		// this.onNpCmdChange = this.onNpCmdChange.bind(this);
		this.addNewArr = this.addNewArr.bind(this);
		this.runVisualize = this.runVisualize.bind(this);
	}

	// onNpCmdChange(npCmdScript) {
	// 	console.log(npCmdScript);
	// 	this.setState({ npCmdScript: npCmdScript });
	// }

	onNpCmdChange(e) {
		this.setState({ npCmd: e.target.value });
	}

	onArrNameChange(e) {
		this.setState({ curArrName: e.target.value });
	}

	onArrShapeChange(e) {
		this.setState({ curArrShape: e.target.value });
	}

	addNewArr() {
		// console.warn("Not implemented yet...")
		const { curArrName, curArrShape, arrList } = this.state;
		if (curArrName !== '' && curArrShape !== '') {
			console.log(arrList);
			const newArrList = [...arrList, {name: curArrName, shape: curArrShape}];
			this.setState({ arrList: newArrList });
		}
	}

	// removeArr(e, idx) {
	// 	console.log(e, idx);
	// }

	runVisualize() {
		console.warn("Not implemented yet...");
	}

	// renderNpCmdScript() {
	// 	const options = {
	// 		mode: 'python',
	// 		indentUnit: 4,
	// 		lineNumbers: true,
	// 	};

	// 	const style = {
	// 		marginTop: 2,
	// 		borderRadius: 4,
	// 		border: 'solid 1px rgba(0, 0, 0, 0.298039)',
	// 	};

	// 	return (
	// 		<div>
	// 			<div style={ style }>
	// 				<CodeMirror
	// 					value={ this.state.npCmdScript }
	// 					options={ options }
	// 					onChange={ this.onNpCmdChange }
	// 				/>
	// 			</div>
	// 			<Button fluid basic positive onClick={this.runVisualize}>
	// 				visualize
	// 			</Button>
	// 		</div>
	// 	);
	// }

	renderBtn(content, onClickFunc, icon='world') {
		return (
			<Button
				fluid basic positive
				icon={ `${icon}` } labelPosition='right'
				style={{ textAlign:'left', height: '10%' }}
				onClick={ onClickFunc }
				content = { `${content}` }
			>
			</Button>
		);
	}

	renderInitArr(placeholder, inputOnChange, inputValue) {
		return (
			<Segment>
				<Input
					transparent placeholder= {`${placeholder}`} 
					style={{ borderBottom: '1px solid black', fontSize: '15px', width: '100%', height: '5%' }}
					onChange={ inputOnChange }
				>
					<input
						style={{ textAlign: 'center' }}
						value={ inputValue }
					/>
				</Input>
			</Segment>
		);
	}

	renderArr() {
		const arrList = this.state.arrList;
		if (arrList.length === 0) {
			return (
				<Table.Row>
					<Table.Cell></Table.Cell>
				</Table.Row>
			);
		} else {
			return (
				arrList.map((arr, i) => {
					return (
						<Table.Row key={i}>
							<Table.Cell>{ `# ${(i+1)}` }</Table.Cell>
							<Table.Cell>{ arr.name }</Table.Cell>
							<Table.Cell>{ arr.shape }</Table.Cell>
						</Table.Row>
					); 
				})
			);
		}
	}

	renderArrTable() {
		return (
			<Table compact celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Array</Table.HeaderCell>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Shape</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{ this.renderArr() }
				</Table.Body>
			</Table>
		);
	}

	renderNpCmd() {
		return (
			<div style={{ fontSize: '20px'}}>
				{'Command :'}
				<Input
					transparent placeholder="type here..."
					style={{ borderBottom: '1px solid black', fontSize: '15px', width: '70%' }}
					onChange={ this.onNpCmdChange }
				>
					<input
						style={{ textAlign: 'center' }}
						value={ this.state.npCmd }
					/>
				</Input>
			</div>
		);
	}

	renderVisualization() {
		return "!!"
	}

	render() {
		return(
			<div>
				<Grid divided style={{ margin: 0 }}>
					<Grid.Row>
						<Grid.Column width={13}>
							{ this.renderArrTable() }
						</Grid.Column>
						<Grid.Column width={3}>
							{ this.renderInitArr('name...', this.onArrNameChange, this.state.curArrName) }
							{ this.renderInitArr('shape...', this.onArrShapeChange, this.state.curArrShape) }
							{ this.renderBtn('add', this.addNewArr, 'add circle') }
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={13}>
							<Segment style={{ paddingLeft: 0, paddingRight: 0 }}>
								{ this.renderNpCmd() }
							</Segment>
						</Grid.Column>
						<Grid.Column width={3}>
							{ this.renderBtn('visualize', this.runVisualize, 'video play') }
						</Grid.Column>
					</Grid.Row>
					<Grid.Row style={{ textAlign: 'left' }}>
						<Grid.Column width={16}>
							<Segment inverted style={{ fontFamily: 'Monospace', whiteSpace: 'pre' }}>
								{ this.renderVisualization() }
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

// <Grid.Column width={6}>
	 // {this.renderNpCmdScript()}
// </Grid.Column>
