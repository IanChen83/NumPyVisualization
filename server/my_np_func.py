import ast
from .my_ast import Token
from functools import reduce
import operator

__all__ = [
    'np_identity',
    'np_ones',
    'np_zeros',
    'np_ones__like',
    'np_zeros__like',
    'np_tril',
    'np_triu',
    'np_reshape',
    'np_transpose',
    'np_swapaxes',
    'get_all_func_name'
]

def check_reshape_compatible(dim1, dim2):
    elt1 = reduce(operator.mul, dim1, 1)
    elt2 = reduce(operator.mul, dim2, 1)
    if elt1 <= 0:
        return False
    if -1 in dim2:
        if elt2 >= 0 or elt1 % -elt2 != 0:
            return False
    else:
        if elt2 <= 0 or elt1 != elt2:
            return False

    return True

def raise_argument_number_error(func_name, arg_len):
    raise ValueError('{0} receive {1} parameter(s)'.format(func_name, arg_len))

def raise_argument_type_error(func_name, arg_type):
    raise ValueError('{0} receive invalid type {1}'.format(func_name, arg_type))


def np_identity(dv, node, args, keywords):
    if len(args) != 1:
        raise_argument_number_error('np.identity(n)', len(args))
    if not isinstance(args[0], ast.Num):
        raise_argument_type_error('np.identity(n)', type(args[0]))

    dv.result[node] = Token((args[0].n, args[0].n))

def np_ones(dv, node, args, keywords):
    if len(args) != 1:
        raise_argument_number_error('np.ones(shape)', len(args))

    if args[0] not in dv.result or not isinstance(args[0], ast.Tuple):
        raise ValueError('np.ones(shape) has indeterminate shape')

    dv.result[node] = Token(dv.result[args[0]])

def np_zeros(dv, node, args, keywords):
    if len(args) != 1:
        raise_argument_number_error('np.zeros(shape)', len(args))

    if args[0] not in dv.result or not isinstance(args[0], ast.Tuple):
        raise ValueError('np.zeros(shape) has indeterminate shape')

    dv.result[node] = Token(dv.result[args[0]])

def np_ones__like(dv, node, args, keywords):
    if len(args) != 1:
        raise_argument_number_error('np.ones_like(arr)', len(args))

    if args[0] not in dv.result or not isinstance(dv.result[args[0]], Token):
        raise ValueError('np.ones_like(arr) has indeterminate array')

    dv.result[node] = Token(dv.result[args[0]].dim[:])


def np_zeros__like(dv, node, args, keywords):
    if len(args) != 1:
        raise_argument_number_error('np.zeros_like(arr)', len(args))

    if args[0] not in dv.result or not isinstance(dv.result[args[0]], Token):
        raise ValueError('np.zeros_like(arr) has indeterminate array')

    dv.result[node] = Token(dv.result[args[0]].dim[:])

def np_tril(dv, node, args, keywords):
    if len(args) != 1:
        raise_argument_number_error('np.tril(arr)', len(args))

    if args[0] not in dv.result or not isinstance(dv.result[args[0]], Token):
        raise ValueError('np.tril(arr) has indeterminate array')

    dv.result[node] = Token(dv.result[args[0]].dim[:])

def np_triu(dv, node, args, keywords):
    if len(args) != 1:
        raise_argument_number_error('np.triu(arr)', len(args))

    if args[0] not in dv.result or not isinstance(dv.result[args[0]], Token):
        raise ValueError('np.triu(arr) has indeterminate array')

    dv.result[node] = Token(dv.result[args[0]].dim[:])

def np_reshape(dv, node, args, keywords):
    if len(args) != 2:
        raise_argument_number_error('np.reshape(arr, shape)', len(args))

    if args[0] not in dv.result or not isinstance(dv.result[args[0]], Token):
        raise ValueError('np.reshape(arr, shape) has indeterminate array')

    if args[1] not in dv.result or not isinstance(dv.result[args[1]], tuple):
        raise ValueError('np.reshape(arr, shape) has indeterminate shape')

    dim1 = dv.result[args[0]].dim
    dim2 = dv.result[args[1]]

    if not check_reshape_compatible(dim1, dim2):
        raise ValueError(
            'np.reshape(arr, shape) should have reshape compatible shape {0} and {1}'.format(
                dim1, dim2
            ))

    if -1 in dim2:
        d = reduce(operator.mul, dim1, 1) / reduce(operator.mul, (x for x in dim2 if x != -1), 1)
        dim2 = tuple(x if x != -1 else int(d) for x in dim2)

    dv.result[node] = Token(dim2)

def np_transpose(dv, node, args, keywords):
    if len(args) != 2:
        raise_argument_number_error('np.transpose(arr, axes)', len(args))

    if args[0] not in dv.result or not isinstance(dv.result[args[0]], Token):
        raise ValueError('np.transpose(arr, axes) has indeterminate array')

    if args[1] not in dv.result or not isinstance(dv.result[args[1]], tuple):
        print(args[1])
        raise ValueError('np.transpose(arr, axes) has indeterminate axes')

    dim1 = dv.result[args[0]].dim
    axes = dv.result[args[1]]

    for i in axes:
        if i < 0 or i > len(dim1):
            raise ValueError('np.transpose(arr, axes) has invalid axes')

    dim2 = (dim1[i] for i in axes)
    dv.result[node] = Token(dim2)

def np_swapaxes(dv, node, args, keywords):
    if len(args) != 3:
        raise_argument_number_error('np.swapaxes(arr, axis1, axis2)', len(args))

    if args[0] not in dv.result or not isinstance(dv.result[args[0]], Token):
        raise ValueError('np.swapaxes(arr, axis1, axis2) has indeterminate array')

    if not isinstance(args[1], ast.Num) or not isinstance(args[2], ast.Num):
        raise ValueError('np.swayaxes(arr, axis1, axis2) has invalid axes')

    dim = list(dv.result[args[0]].dim)
    dim[args[1].n], dim[args[2].n] = dim[args[2].n], dim[args[1].n]

    dv.result[node] = Token(tuple(dim))

def get_all_func_name():
    return __all__.copy()
