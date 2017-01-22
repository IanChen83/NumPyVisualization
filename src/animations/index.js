import React from 'react';
import NewArray from './NewArray';
import CopyArray from './CopyArray';
import BroadcastArray from './BroadcastArray';

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

const IdentityObject = {
    helpTitle: 'np.identity(n)',
    helpMessage: [
        'Return the identity array.',
        'The identity array is a square array with ones on the main diagonal.',
    ],
    obj: <NewArray id="identityObject" style={OnesStyle} mode="identity" rectNumber={[4, 4]} rectSize={75} />,
};

const OnesLikeObject = {
    helpTitle: 'np.ones_like(arr)',
    helpMessage: ['Return an array of ones with the same shape and type as a given array.'],
    obj: <CopyArray id="oneslikeObject" style={OnesStyle} mode="1" />,
};

const ZerosLikeObject = {
    helpTitle: 'np.zeros_like(arr)',
    helpMessage: ['Return an array of zeros with the same shape and type as a given array.'],
    obj: <CopyArray id="zeroslikeObject" style={ZerosStyle} mode="0" />,
};

const BroadcastObject = {
    helpTitle: 'Broadcasting Operation',
    helpMessage: ['Broadcasting will happen during binary Operations like adding or multiplying, providing the two arrays have different shape.'],
    obj: <BroadcastArray id="broadcastArray" />,
};

const Animations = {
    'np.ones': OnesObject,
    'np.zeros': ZerosObject,
    'np.identity': IdentityObject,
    'np.ones_like': OnesLikeObject,
    'np.zeros_like': ZerosLikeObject,
    name: NameObject,
    Add: BroadcastObject,
};

export default Animations;
