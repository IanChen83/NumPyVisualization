import React from 'react';
import { Table, Button } from 'semantic-ui-react';

export default class MyArray extends React.Component {
	constructor(props) {
		super(props);

		this.onClickRmArr = this.onClickRmArr.bind(this);
	}

	onClickRmArr(e) {
		this.props.onClickRmArr(e, this.props.arrIdx);
	}

	render() {
		const { arrIdx, name, shape } = this.props;
		return (
			<Table.Row>
				<Table.Cell>{ `# ${(arrIdx+1)}` }</Table.Cell>
				<Table.Cell>{ name }</Table.Cell>
				<Table.Cell>{ shape }</Table.Cell>
				<Table.Cell collapsing>
					<Button
						fluid basic positive
						icon='remove circle'
						onClick={ this.onClickRmArr }
					>
					</Button>
				</Table.Cell>
			</Table.Row>
		);
	}
}
