import React, { Component, PropTypes } from 'react';
import TweenMax from 'gsap';
const d3 = require('d3');

class NewArray extends Component {
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


        this.svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', 0)
            .attr('height', 0)
            .attr('x', d => d[1])
            .attr('y', d => d[2])
            .attr('fill', style.fill)
            .attr('stroke-width', 2)
            .attr('stroke', style.stroke)
            .attr('rx', 5)
            .attr('ry', 5)
            .exit();

        this.svg.selectAll('rect')
            .transition()
            .delay((d, i) => i * 30)
            .duration(1000)
            .attr('width', size)
            .attr('height', size)
            .ease(d3.easeCircleOut);
    }

    remove() {
        if(!this.svg) return;
        this.svg.selectAll('rect').remove();
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

NewArray.propTypes = {
    id: PropTypes.string,
    rectSize: PropTypes.number,
    style: PropTypes.object,    // eslint-disable-line
    rectNumber: PropTypes.arrayOf(PropTypes.number),
};

NewArray.defaultProps = {
    rectSize: 100,
    rectNumber: [4, 3],
    style: {
        fill: 'black',
        stroke: 'black',
    },
};


export default NewArray;
