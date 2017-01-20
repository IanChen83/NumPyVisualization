import ast
from .my_ast import Token

__all__ = [
    'np_identity',
    'np_ones',
    'np_zeros',
    'np_ones__like',
    'np_zeros__like',
    'np_diag',
    'np_tril',
    'np_triu',
    'np_reshape',
    'np_transpose',
    'np_swapaxis',
    'np_concatenate',
    'get_all_func_name'
]

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
        raise ValueError('np.zeross_like(arr) has indeterminate array')

    dv.result[node] = Token(dv.result[args[0]].dim[:])

def np_diag(dv, node, args, keywords):
    pass

def np_tril(dv, node, args, keywords):
    pass

def np_triu(dv, node, args, keywords):
    pass

def np_reshape(dv, node, args, keywords):
    pass

def np_transpose(dv, node, args, keywords):
    pass

def np_swapaxis(dv, node, args, keywords):
    pass

def np_concatenate(dv, node, args, keywords):
    pass

def get_all_func_name():
    return __all__.copy()
