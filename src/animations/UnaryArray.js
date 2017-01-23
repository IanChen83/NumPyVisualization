import React, { Component, PropTypes } from 'react';
import TweenMax from 'gsap';

const d3 = require('d3');

class UnaryArray extends Component {
    constructor(props) {
        super(props);
        this.rects = [];
        this.state = {
            id: '',
        };
    }

    componentWillMount() {
        this.setState({ id: (0 | Math.random() * 9e6).toString(36) });
    }

    componentDidMount() {
        this.create();
        const rects0 = document.getElementById(`${this.props.id}${this.state.id}`).querySelectorAll(
            '.class0 rect');
        if(rects0.length > 0) {
            const width = this.props.rectNumber[0];
            const height = this.props.rectNumber[1];
            const size = this.props.rectSize;
            this.timeline = new TimelineMax()
                .staggerTo(rects0, 0.7, { delay: 1, rotation: 360, fill: this.props.style.fill2 }, 0.1);
        }
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
            .attr('class', 'class0')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', size)
            .attr('height', size)
            .attr('x', d => d[1])
            .attr('y', d => d[2])
            .attr('fill', style.fill1)
            .attr('stroke-width', 2)
            .attr('stroke', style.stroke)
            .attr('rx', 5)
            .attr('ry', 5)
            .exit();
    }

    remove() {
        if(!this.svg) return;
        this.svg.selectAll('rect').remove();
        this.svg.selectAll('text').remove();
    }

    render() {
        let width = (this.props.rectNumber[0] * this.props.rectSize) + ((this.props.rectNumber[
            0] - 1) * 5);
        let height = (this.props.rectNumber[1] * this.props.rectSize) + ((this.props.rectNumber[
            1] - 1) * 5);

        width = width > 0 ? width : 0;
        height = height > 0 ? height : 0;
        return <g className="unaryArray" transform={`translate(${-width / 2},${-height / 2})`} id={this.props.id + this.state.id} />;
    }
}

UnaryArray.propTypes = {
    id: PropTypes.string,
    rectSize: PropTypes.number,
    style: PropTypes.object, // eslint-disable-line
    rectNumber: PropTypes.arrayOf(PropTypes.number),
    mode: PropTypes.string,
};

UnaryArray.defaultProps = {
    rectSize: 80,
    rectNumber: [4, 3],
    mode: '',
    style: {
        fill: 'black',
        stroke: 'black',
    },
};


export default UnaryArray;
