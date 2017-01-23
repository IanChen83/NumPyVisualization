import React from 'react';
import NewArray from './NewArray';
import CopyArray from './CopyArray';
import BroadcastArray from './BroadcastArray';
import UnaryArray from './UnaryArray';
import ReshapeArray from './ReshapeArray';
import SwapAxesArray from './SwapAxesArray';

const OnesStyle = {
    fill: '#FF4D4D',
    stroke: '#FF4D4D',
};

const OnesObject = {
    helpTitle: 'np.ones(shape)',
    helpMessage: [
        'Return a new array of given shape and type, filled with ones.',
    ],
    obj: <NewArray id="onesObject" style={OnesStyle} mode="1" />,
};

const ZerosStyle = {
    fill: '#4d4dff',
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
    fill: '#FF4D4D',
    stroke: '#FF4D4D',
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

const BroadcastStyle = {
    fill1: '#FF4D4D',
    fill2: '#4d4dff',
};

const BroadcastObject = {
    helpTitle: 'Binary Broadcasting Op',
    helpMessage: ['Broadcasting will happen during binary Operations like adding or multiplying, providing the two arrays have different shape.'],
    obj: <BroadcastArray id="broadcastArray" style={BroadcastStyle} />,
};

const UnaryObject = {
    helpTitle: 'Unary Operations',
    helpMessage: ['Unary operations will keep dimensions unchanged.'],
    obj: <UnaryArray id="unaryArray" style={BroadcastStyle} />,
};

const ReshapeStyle = {
    fill1: '#FF4D4D',
    fill2: '#4d4dff',
    stroke: 'black',
};

const ReshapeObject = {
    helpTitle: 'np.reshape(arr, shape)',
    helpMessage: ['Gives a new shape to an array without changing its data.'],
    obj: <ReshapeArray id="reshapeArray" style={ReshapeStyle} />,
};

const SwapAxesObject = {
    helpTitle: 'np.swapaxes(arr, shape)',
    helpMessage: ['Interchange two axes of an array.'],
    obj: <SwapAxesArray id="swapAxesArray" style={ReshapeStyle} />,
};

const TransposeObject = {
    helpTitle: 'np.transpose(arr, axes=None)',
    helpMessage: ['Permute the dimensions of an array.'],
    obj: <SwapAxesArray id="transposeArray" style={ReshapeStyle} />,
};

const Animations = {
    'np.ones': OnesObject,
    'np.zeros': ZerosObject,
    'np.identity': IdentityObject,
    'np.ones_like': OnesLikeObject,
    'np.zeros_like': ZerosLikeObject,
    'np.reshape': ReshapeObject,
    'np.swapaxis': SwapAxesObject,
    'np.transpose': TransposeObject,
    name: NameObject,
    Add: BroadcastObject,
    Sub: BroadcastObject,
    Mult: BroadcastObject,
    Div: BroadcastObject,
    Mod: BroadcastObject,
    Pow: BroadcastObject,
    UAdd: UnaryObject,
    Invert: UnaryObject,
    USub: UnaryObject,
    Not: UnaryObject,

};

export default Animations;
