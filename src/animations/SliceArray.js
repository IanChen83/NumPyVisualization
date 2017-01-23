import React, { Component, PropTypes } from 'react';
import TweenMax from 'gsap';

const d3 = require('d3');

class SliceArray extends Component {
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
        const rects0 = [].slice.call(document.getElementById(`${this.props.id}${this.state.id}`).querySelectorAll(
            '.class0 rect'));
        if(rects0.length > 0) {
            const width = this.props.rectNumber[0];
            const height = this.props.rectNumber[1];
            const wh2 = this.props.rectNumber2;
            const style = this.props.style;
            const size = this.props.rectSize;
            const data = Array.from({ length: width * height }, (v, i) => {
                const x = (size + 5) * (i % width);
                const y = (size + 5) * Math.floor(i / width);
                return [x, y];
            });

            const rects1 = rects0.filter((v, i) => i % width > wh2[1]);
            const rects2 = rects0.filter((v, i) => Math.floor(i / width) < wh2[0]);
            const rects3 = rects0.filter((v, i) => Math.floor(i / width) > wh2[2]);


            this.timeline = new TimelineMax()
                .staggerTo(rects0, 0, {
                    cycle: {
                        x: (i => data[i][0]),
                        y: (i => data[i][1]),
                    },
                })
                .staggerTo(rects0, 0.3, {
                    opacity: 1,
                    width: size,
                    height: size,
                }, 0.01)
                .staggerTo(rects1, 0.3, { scale: 0.5, opacity: 0, x: '+=50' }, 0.01)
                .staggerTo(rects2, 0.3, { scale: 0.5, opacity: 0, y: '-=50' }, 0.01)
                .staggerTo(rects3, 0.3, { scale: 0.5, opacity: 0, y: '+=50' }, 0.01)
                .set(document.getElementById(`${this.props.id}${this.state.id}`), { transformOrigin: 'center' })
                .to(document.getElementById(`${this.props.id}${this.state.id}`), 0.3, { scale: 1.3 })
                .to(rects0, 0.3, { fill: style.fill2 }, 4);
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
            .attr('width', 0)
            .attr('height', 0)
            .attr('x', 0)
            .attr('y', 0)
            .attr('fill', style.fill1)
            .attr('opacity', 0)
            .attr('stroke-width', 1)
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
        return <g className="sliceArray" transform={`translate(${-width / 2},${-height / 2})`} id={this.props.id + this.state.id} />;
    }
}

SliceArray.propTypes = {
    id: PropTypes.string,
    rectSize: PropTypes.number,
    style: PropTypes.object, // eslint-disable-line
    rectNumber: PropTypes.arrayOf(PropTypes.number),
    rectNumber2: PropTypes.arrayOf(PropTypes.number),
    mode: PropTypes.string,
};

SliceArray.defaultProps = {
    rectSize: 30,
    rectNumber: [15, 10],
    rectNumber2: [3, 10, 6],    // y1, x2, y2
    mode: '',
    style: {
        fill: 'black',
        stroke: 'black',
    },
};


export default SliceArray;
