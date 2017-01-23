# pylint: disable=R0201, C0103

import ast
import math
import asttokens
from copy import deepcopy

__all__ = [
    'Token',
    'parse',
    'DimensionVisitor',
    'LocationVisitor'
]

class Token:
    def __init__(self, dim=None):
        self.col_s = -1
        self.col_e = -1
        self.identifier = ''
        self.children = []
        self.dim = dim if dim is not None else tuple([])


def parse(t):
    atok = asttokens.ASTTokens(t)
    root = ast.parse(t, mode='eval')
    atok.mark_tokens(root)

    return root.body

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
        return (int(math.ceil((upper - lower) / step)),) + dim[1:]
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
    def __init__(self, result=None, predefined=None, predefinedFunc=None):
        super(DimensionVisitor, self).__init__()

        self.result = result if result is not None else dict()
        self.predefined = predefined if predefined is not None else dict()
        self.predefinedFunc = predefinedFunc if predefinedFunc is not None else dict()

    def visit_Num(self, node):
        if node not in self.result:
            token = Token()
            token.identifier = 'Num'
            self.result[node] = token

    def visit_Name(self, node):
        if node not in self.result:
            if node.id in self.predefined:
                self.result[node] = deepcopy(self.predefined[node.id])
            else:
                raise ValueError('Node with name \'{0}\' is undefined'.format(node.id))
                # self.result[node] = Token()

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
                self.predefinedFunc[func_name](self, node, node.args, node.keywords)

    def visit_Tuple(self, node):
        if node not in self.result:
            self.generic_visit(node)
            ret = []
            for d in node.elts:
                if isinstance(d, ast.Num):
                    ret.append(d.n)
                if isinstance(d, ast.UnaryOp):  # for negative numbers
                    if isinstance(d.op, ast.USub) and isinstance(d.operand, ast.Num):
                        ret.append(-d.operand.n)
            self.result[node] = tuple(ret)


class LocationVisitor(ast.NodeVisitor):
    def __init__(self, result=None, predefined=None, predefinedFunc=None):
        super(LocationVisitor, self).__init__()

        self.result = result if result is not None else dict()
        self.predefined = predefined if predefined is not None else dict()
        self.predefinedFunc = predefinedFunc if predefinedFunc is not None else dict()

    def visit_Call(self, node):
        self.generic_visit(node)
        self.result[node].identifier = 'Call:{0}'.format(get_func_name(node.func))
        self.result[node].children += [self.result[x] for x in node.args]
        self.result[node].children += [self.result[x] for x in node.keywords]

    def visit_Subscript(self, node):
        self.generic_visit(node)
        self.result[node].identifier = 'Subscript'
        self.result[node].children.append(self.result[node.value])

    def visit_BinOp(self, node):
        self.generic_visit(node)
        # Add | Sub | Mult | Div | Mod | Pow
        self.result[node].identifier = "BinOp:{0}".format(node.op.__class__.__name__)
        self.result[node].children.append(self.result[node.left])
        self.result[node].children.append(self.result[node.right])

    def visit_UnaryOp(self, node):
        self.generic_visit(node)
        # Invert | Not | UAdd | USub
        self.result[node].identifier = "UnaryOp:{0}".format(node.op.__class__.__name__)
        self.result[node].children.append(self.result[node.operand])

    def visit_Name(self, node):
        self.generic_visit(node)
        self.result[node].identifier = 'Name:{0}'.format(node.id)

    def visit(self, node):
        if node in self.result and isinstance(self.result[node], Token):
            self.result[node].col_s = node.first_token.startpos
            self.result[node].col_e = node.last_token.endpos

        method = 'visit_' + node.__class__.__name__
        visitor = getattr(self, method, self.generic_visit)
        return visitor(node)
