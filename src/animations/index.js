import React from 'react';
import NewArray from './NewArray';

const OnesStyle = {
    fill: '#E29BD7',
    stroke: '#CB48B7',
};

const OnesObject = {
    helpTitle: 'np.ones(shape)',
    helpMessage: [
        'Return a new array of given shape and type, filled with ones.',
    ],
    obj: <NewArray id="onesObject" style={OnesStyle} mode="1" />,
};

const ZerosStyle = {
    fill: '#F2F2EB',
    stroke: '#E4E3D3',
};

const ZerosObject = {
    helpTitle: 'np.zeros(shape)',
    helpMessage: [
        'Return a new array of given shape and type, filled with zeros.',
    ],
    obj: <NewArray id="zerosObject" style={ZerosStyle} mode="0" />,
};

const NameStyle = {
    fill: '#2E2D4D',
    stroke: '#2E2D4D',
};

const NameObject = {
    helpTitle: 'It\'s an array you defined',
    helpMessage: [
        'Poor kid, don\'t tell me you have forget about it...',
    ],
    obj: <NewArray id="nameObject" style={NameStyle} />,
};


const Animations = {
    'np.ones': OnesObject,
    'np.zeros': ZerosObject,
    name: NameObject,
};

export default Animations;
