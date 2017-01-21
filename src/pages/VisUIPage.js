import React from 'react';
import { Segment, Header, Grid, Table, Button, Input, Icon } from 'semantic-ui-react';
import CodeMirror from 'react-codemirror';

import { isNaturalNum } from './../utils';

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
		this.onClickAddNewArr = this.onClickAddNewArr.bind(this);
		this.onClickVisualize = this.onClickVisualize.bind(this);
		this.arrCheckValid = this.arrCheckValid.bind(this);
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

	arrCheckValid(arrList, curArrName, curArrShape) {
		if (curArrShape[0] !== '(' || curArrShape[(curArrShape.length - 1)] !== ')') {
			return 0;
		} else {
			const shapeSplitByComma = curArrShape.substr(1, curArrShape.length - 2).split(',');
			// console.log(shapeSplitByComma);
			if (!(shapeSplitByComma.length === 2 && isNaturalNum(shapeSplitByComma[0])
			 && shapeSplitByComma[1].trim() === '')) {
				for (let i = 0; i < shapeSplitByComma.length; ++i) {
					if (!isNaturalNum(shapeSplitByComma[i])) {
						return 0;
					}
				}
			}
		}

		// console.log(arrList.length);

		for (let i = 0; i < arrList.length; ++i) {
			if (arrList[i].name === curArrName) {
				if (arrList[i].shape === curArrShape) {
					return 1;
				} else {
					return (i + 3);
				}
			}
		}

		return 2;
	}

	onClickAddNewArr() {
		// console.warn("Not implemented yet...")
		const { curArrName, curArrShape, arrList } = this.state;

		const caseIdx = this.arrCheckValid(arrList, curArrName, curArrShape);
		// console.log(caseIdx);
		switch(caseIdx) {
			case 0:
				alert('Shape specification is wrong...');
				break;
			case 1:
				alert('An array with same name and shape has already been declared.')
				break;
			case 2:
				const newArrList = [...arrList, {name: curArrName, shape: curArrShape.replace(/ /gi, '')}];
				this.setState({ arrList: newArrList });
				break;
			default:
				if (confirm('This array\'s name exsit, will overwrite the value if you click yes.')) {
					let newArrList = arrList;
					// console.log(newArrList[caseIdx]);
					newArrList[(caseIdx - 3)].shape = curArrShape.replace(/ /gi, '');
					this.setState({ arrList: newArrList });
				}
				break;
		}
	}

	onClickVisualize() {
		console.warn("Not implemented yet...");
	}

	renderBtn(content, onClickFunc, icon='world') {
		return (
			<Button
				fluid basic positive
				icon={ `${icon}` } labelPosition='right'
				style={{ textAlign:'left', height: '8%' }}
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
					transparent placeholder="type command here..."
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
							{ this.renderBtn('add', this.onClickAddNewArr, 'add circle') }
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={13}>
							<Segment style={{ paddingLeft: 0, paddingRight: 0 }}>
								{ this.renderNpCmd() }
							</Segment>
						</Grid.Column>
						<Grid.Column width={3}>
							{ this.renderBtn('visualize', this.onClickVisualize, 'video play') }
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
