# pylint: disable=R0201, C0103

import ast
import math
from copy import deepcopy

class Token:
    def __init__(self, dim=None, children=None, start=-1, end=-1):
        self.col_s = start
        self.col_e = end
        self._children = children if children is not None else []
        self.dim = dim if dim is not None else tuple([])


def parse(t):
    return ast.parse(t, mode='eval').body


def get_func_name(func):
    if isinstance(func, ast.Name):
        return func.id
    elif isinstance(func, ast.Attribute):
        return '{0}.{1}'.format(get_func_name(func.value), func.attr)
    else:
        raise NotImplementedError('Unknown object with type {0}'.format(type(func)))


def check_compatible_dimension(a, b):
    if len(a) < len(b):
        return check_compatible_dimension(b, a)

    for x in zip(a[::-1], b[::-1]):
        # Only get result of smaller length in a and b
        if x[0] != x[1] and x[0] != 1 and x[1] != 1:
            return False

    return True


def binary_merge_dimension(left, right):
    if not check_compatible_dimension(left, right):
        raise ValueError('Incompatible dimensions for {0} and {1}'.format(left, right))

    x, y = list(left), list(right)
    if len(x) > len(y):
        y = [0] * (len(x) - len(y)) + y
    elif len(y) > len(x):
        x = [0] * (len(y) - len(x)) + x
    merged = tuple(max(*p) for p in zip(x, y))

    return merged


def slice_dimension(dim, s):
    if isinstance(s, ast.Index):
        if isinstance(s.value, ast.Num):
            return dim[1:]
        elif isinstance(s.value, ast.Ellipsis):
            return dim[:]
        raise NotImplementedError('Index cannot contain object other than number')
    elif isinstance(s, ast.Slice):
        lower, upper, step = 0, dim[0], 1
        if not isinstance(s.lower, ast.Num):
            if s.lower is not None:
                raise NotImplementedError('Slice lower contain object other than number')
        else:
            lower = s.lower.n if s.lower.n > 0 else s.lower.n + dim[0]
        if not isinstance(s.upper, ast.Num):
            if s.upper is not None:
                raise NotImplementedError('Slice upper contain object other than number')
        else:
            upper = s.upper.n if s.upper.n > 0 else s.upper.n + dim[0]
        if not isinstance(s.step, ast.Num):
            if s.step is not None:
                raise NotImplementedError('Slice lower contain object other than number')
        else:
            step = s.step.n if s.step.n > 0 else 10

        if upper <= lower:
            raise ValueError('Slice upper <= lower')
        return (math.ceil((upper - lower) / step),) + dim[1:]
    elif isinstance(s, ast.ExtSlice):
        ret = list(dim)
        for i, x in enumerate(s.dims):
            if isinstance(x, ast.Index):
                ret[i] = 0
            elif isinstance(x, ast.Slice):
                ret[i] = slice_dimension(tuple(ret[i:]), x)[0]
            elif isinstance(x, ast.ExtSlice):
                raise NotImplementedError('ExtSlice cannot contain Ellipsis')
        return tuple(filter(lambda x: x != 0, ret))

class DimensionVisitor(ast.NodeVisitor):
    def __init__(self, predefined=None, predefinedFunc=None):
        super(DimensionVisitor, self).__init__()

        self.result = dict()
        if not predefined:
            self.predefined = dict()
        else:
            self.predefined = predefined
        if not predefinedFunc:
            self.predefinedFunc = dict()
        else:
            self.predefinedFunc = predefinedFunc

    def visit_Num(self, node):
        if node not in self.result:
            self.result[node] = Token()

    def visit_Name(self, node):
        if node not in self.result:
            if node.id in self.predefined:
                self.result[node] = deepcopy(self.predefined[node.id])
            else:
                self.result[node] = Token()

    def visit_BinOp(self, node):
        if node not in self.result:
            self.generic_visit(node)
            left = self.result[node.left]
            right = self.result[node.right]
            if isinstance(left, Token) and isinstance(right, Token):
                self.result[node] = Token(binary_merge_dimension(left.dim, right.dim))
            else:
                raise ValueError(
                    'BinOp has wrong node with type {0} & {1}'.format(type(left), type(right))
                )

    def visit_UnaryOp(self, node):
        if node not in self.result:
            self.generic_visit(node)
            if isinstance(self.result[node.operand], Token):
                self.result[node] = deepcopy(self.result[node.operand])

    def visit_Subscript(self, node):
        if node not in self.result:
            self.generic_visit(node)
            value = self.result[node.value]
            if not isinstance(value, Token):
                raise ValueError('Object with type {0} is not subscriptable'.format(type(value)))
            elif len(value.dim) == 0:
                raise ValueError('Token has 0 dimension')
            self.result[node] = Token(slice_dimension(value.dim, node.slice))

    def visit_Call(self, node):
        if node not in self.result:
            self.generic_visit(node)
            func_name = get_func_name(node.func)

            if func_name not in self.predefinedFunc:
                raise NotImplementedError(
                    'This function \'{0}\' is not implemented'.format(func_name)
                )
            else:
                self.result[node] = self.predefinedFunc[func_name](node.args)
