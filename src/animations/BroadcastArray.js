import React, { Component, PropTypes } from 'react';
const d3 = require('d3');

class BroadcastArray extends Component {
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

        if(this.props.mode === '0' || this.props.mode === '1') {
            this.svg.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('x', d => d[1])
                .attr('y', d => d[2])
                .attr('transform', 'translate(10, 23)')
                .attr('font-size', '20px')
                .text(d => this.props.mode)
                .exit();
        } else if(this.props.mode === 'identity') {
            this.svg.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('x', d => d[1])
                .attr('y', d => d[2])
                .attr('transform', 'translate(10, 23)')
                .attr('font-size', (d, i) => ((i % width) === Math.floor(i / width) ? '25px' : '12px'))
                .text((d, i) => ((i % width) === Math.floor(i / width) ? 1 : 0))
                .exit();
        }
    }

    remove() {
        if(!this.svg) return;
        this.svg.selectAll('rect').remove();
        this.svg.selectAll('text').remove();
    }

    render() {
        let width = (this.props.rectNumber[0] * this.props.rectSize)
         + ((this.props.rectNumber[0] - 1) * 5);
        let height = (this.props.rectNumber[1] * this.props.rectSize)
         + ((this.props.rectNumber[1] - 1) * 5);

        width = width > 0 ? width : 0;
        height = height > 0 ? height : 0;
        return <g className="broadcastArray" transform={`translate(${-width / 2},${-height / 2})`} id={this.props.id + this.state.id} />;
    }
}

BroadcastArray.propTypes = {
    id: PropTypes.string,
    rectSize: PropTypes.number,
    style: PropTypes.object,    // eslint-disable-line
    rectNumber: PropTypes.arrayOf(PropTypes.number),
    mode: PropTypes.string,
};

BroadcastArray.defaultProps = {
    rectSize: 100,
    rectNumber: [4, 3],
    mode: '',
    style: {
        fill: 'black',
        stroke: 'black',
    },
};


export default BroadcastArray;
