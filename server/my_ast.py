# pylint: disable=R0201, C0103

import ast
from copy import deepcopy

class Token:
    def __init__(self, dim=None, children=None, start=-1, end=-1):
        self.col_s = start
        self.col_e = end
        self._children = children if children is not None else []
        self.dim = dim if dim is not None else tuple([])


def parse(t):
    return ast.parse(t, mode='eval').body


def check_compatible_dimension(a, b):
    if len(a) < len(b):
        return check_compatible_dimension(b, a)

    for x in zip(a[::-1], b[::-1]):
        # Only get result of smaller length in a and b
        if x[0] != x[1] and x[0] != 1 and x[1] != 1:
            return False

    return True


def binary_merge_dimension(left, right):
    if not check_compatible_dimension(left.dim, right.dim):
        raise ValueError('Incompatible dimensions for {0} and {1}'.format(left, right))

    x, y = list(left.dim), list(right.dim)
    if len(x) > len(y):
        y = [0] * (len(x) - len(y)) + y
    elif len(y) > len(x):
        x = [0] * (len(y) - len(x)) + x
    merged = tuple(max(*p) for p in zip(x, y))

    token = Token(dim=merged)

    return token


def slice_dimension(token, s):
    if isinstance(s, ast.Index):
        if isinstance(s.value, ast.Num):
            return Token(token.dim[:-1])
        elif isinstance(s.value, ast.Ellipsis):
            return Token(token.dim[:])
        raise NotImplementedError('Index cannot contain object other than number')
    elif isinstance(s, ast.Slice):
        pass
    elif isinstance(s, ast.ExtSlice):
        pass



class DimensionVisitor(ast.NodeVisitor):
    def __init__(self, predefined=None):
        super(DimensionVisitor, self).__init__()

        self.result = dict()
        if not predefined:
            self.predefined = dict()
        else:
            self.predefined = predefined

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
                self.result[node] = binary_merge_dimension(left, right)
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
            self.result[node] = slice_dimension(value, node.slice)
