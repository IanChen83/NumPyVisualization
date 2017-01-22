import React, { Component, PropTypes } from 'react';
const d3 = require('d3');

class CopyArray extends Component {
    constructor(props) {
        super(props);
        this.array = [];
        this.state = {
            id: '',
        };
    }

    componentWillMount() {
        this.setState({ id: (0 | Math.random() * 9e6).toString(36) });
    }

    componentDidMount() {
        this.create();
    }

    componentDidUpdate() {
        this.remove();
        this.create();
    }

    create() {
        if(this.props.rectNumber.length !== 2) return;

        const width = this.props.rectNumber[0];
        const height = this.props.rectNumber[1];
        const style = this.props.style;
        const size = this.props.rectSize;
        const data = Array.from({ length: width * height }, (v, i) => {
            const x = (size + 5) * (i % width);
            const y = (size + 5) * Math.floor(i / width);
            return [i, x, y];
        });

        this.svg = d3.select(`#${this.props.id}${this.state.id}`);


        this.svg.append('g')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', size)
            .attr('height', size)
            .attr('x', d => d[1])
            .attr('y', d => d[2])
            .attr('stroke', 'transparent')
            .attr('stroke-width', 2)
            .attr('fill', style.fill)
            .attr('rx', 5)
            .attr('ry', 5)
            .exit();

        const rect2 = this.svg.append('g');
        rect2.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', size)
            .attr('height', size)
            .attr('x', d => d[1])
            .attr('y', d => d[2])
            .attr('stroke', style.stroke)
            .attr('stroke-width', 2)
            .attr('fill', 'transparent')
            .attr('rx', 5)
            .attr('ry', 5)
            .exit();

        rect2.selectAll('rect')
            .transition()
            .delay((d, i) => (i * 30) + 500)
            .duration(1500)
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 0)
            .attr('height', 0)
            .ease(d3.easeCircleOut);
    }

    remove() {
        if(!this.svg) return;
        this.svg.selectAll('rect').remove();
        this.svg.selectAll('text').remove();
        this.svg.selectAll('g').remove();
    }

    render() {
        let width = (this.props.rectNumber[0] * this.props.rectSize)
         + ((this.props.rectNumber[0] - 1) * 5);
        let height = (this.props.rectNumber[1] * this.props.rectSize)
         + ((this.props.rectNumber[1] - 1) * 5);

        width = width > 0 ? width : 0;
        height = height > 0 ? height : 0;
        return <g className="newArray" transform={`translate(${-width / 2},${-height / 2})`} id={this.props.id + this.state.id} />;
    }
}

CopyArray.propTypes = {
    id: PropTypes.string,
    rectSize: PropTypes.number,
    style: PropTypes.object,    // eslint-disable-line
    rectNumber: PropTypes.arrayOf(PropTypes.number),
    mode: PropTypes.string,
};

CopyArray.defaultProps = {
    rectSize: 100,
    rectNumber: [4, 3],
    mode: '',
    style: {
        fill: 'black',
        stroke: 'black',
    },
};


export default CopyArray;
