# pylint: disable=R0201, C0103

import unittest
from .. import utils, color

INIT = utils.test_init
END = utils.test_end
AST = utils.my_ast

printc = utils.printc


class TestScalarDimension(unittest.TestCase):

    def setUp(self):
        self.DV = AST.DimensionVisitor()

    def test_name(self):
        INIT(self, 'a')

        node = AST.parse('a')
        self.DV.visit(node)
        self.assertEqual(self.DV.result[node], (tuple([1]), 'Num'))
        END()

    def test_int(self):
        INIT(self, '3')

        node = AST.parse('3')
        self.DV.visit(node)
        self.assertEqual(self.DV.result[node], (tuple([1]), 'Num'))
        END()

    def test_float(self):
        INIT(self, '3.')

        node = AST.parse('3.')
        self.DV.visit(node)
        self.assertEqual(self.DV.result[node], (tuple([1]), 'Num'))
        END()

    def test_name_predefined(self):
        INIT(self, 'a (predefined)')

        self.DV.predefinedDim['a'] = tuple([1, 2])
        self.DV.predefinedType['a'] = 'array'
        node = AST.parse('a')
        self.DV.visit(node)
        self.assertEqual(self.DV.result[node], (tuple([1, 2]), 'array'))

        END()
