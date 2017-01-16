# pylint: disable=R0201, C0103

import ast
def parse(t):
    return ast.parse(t, mode='eval').body

class DimensionVisitor(ast.NodeVisitor):
    def __init__(self, predefinedDim=None, predefinedType=None):
        super(DimensionVisitor, self).__init__()

        self.result = dict()
        if not predefinedDim:
            self.predefinedDim = dict()
        else:
            self.predefinedDim = predefinedDim

        if not predefinedType:
            self.predefinedType = dict()
        else:
            self.predefinedType = predefinedType

    @staticmethod
    def check_compatible_dimension(a, b):
        if len(a) < len(b):
            return DimensionVisitor.check_compatible_dimension(b, a)

        for x in zip(a[::-1], b[::-1]):
            # Only get result of smaller length in a and b
            if x[0] != x[1] and x[0] != 1 and x[1] != 1:
                return False

        return True


    def visit_Num(self, node):
        if node not in self.result:
            self.result[node] = tuple([1]), 'Num'

    def visit_Name(self, node):
        if node not in self.result:
            if node.id in self.predefinedDim and node.id in self.predefinedType:
                self.result[node] = self.predefinedDim[node.id], self.predefinedType[node.id]
            else:
                self.result[node] = tuple([1]), 'Num'


    def visit_BinOp(self, node):
        if node not in self.result:
            self.generic_visit(node)
            if self.result[node.left][1] == 'array' or self.result[node.right][1] == 'array':
                left = self.result[node.left][0]
                right = self.result[node.right][0]

                if not DimensionVisitor.check_compatible_dimension(left, right):
                    raise ValueError('Incompatible dimensions for {0} and {1}'.format(left, right))

                x, y = list(left), list(right)
                if len(x) > len(y):
                    y = [0] * (len(x) - len(y)) + y
                elif len(y) > len(x):
                    x = [0] * (len(y) - len(x)) + x
                merged = tuple(max(*p) for p in zip(x, y))

                self.result[node] = merged, 'array'
            else:
                pass
