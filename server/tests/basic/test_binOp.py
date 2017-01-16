# pylint: disable=R0201, C0103

import unittest
from .. import utils, color

INIT = utils.test_init
END = utils.test_end
AST = utils.my_ast

printc = utils.printc


class TestBinaryOperation(unittest.TestCase):

    def setUp(self):
        self.DV = AST.DimensionVisitor()

    def test_invalid_broadcasting1(self):
        INIT(self, '(3, 4) + (2, 3)')


        self.DV.predefinedDim['a'] = tuple([3, 4])
        self.DV.predefinedType['a'] = 'array'
        self.DV.predefinedDim['b'] = tuple([2, 3])
        self.DV.predefinedType['b'] = 'array'

        node = AST.parse('a + b')

        with self.assertRaises(Exception) as context:
            self.DV.visit(node)

        printc(context.exception, color.CRED)

        END()

    def test_valid_broadcasting1(self):
        INIT(self, '(2, 3) + (2, 3)')


        self.DV.predefinedDim['a'] = tuple([2, 3])
        self.DV.predefinedType['a'] = 'array'
        self.DV.predefinedDim['b'] = tuple([2, 3])
        self.DV.predefinedType['b'] = 'array'

        node = AST.parse('a + b')
        self.DV.visit(node)
        self.assertEqual(self.DV.result[node], (tuple([2, 3]), 'array'))

        END()

    def test_valid_broadcasting2(self):
        INIT(self, '(2, 2, 3) + (2, 3)')


        self.DV.predefinedDim['a'] = tuple([2, 2, 3])
        self.DV.predefinedType['a'] = 'array'
        self.DV.predefinedDim['b'] = tuple([2, 3])
        self.DV.predefinedType['b'] = 'array'

        node = AST.parse('a + b')
        self.DV.visit(node)
        self.assertEqual(self.DV.result[node], (tuple([2, 2, 3]), 'array'))

        END()

    def test_valid_broadcasting3(self):
        INIT(self, '(2, 3) + (2, 1, 3)')


        self.DV.predefinedDim['a'] = tuple([2, 3])
        self.DV.predefinedType['a'] = 'array'
        self.DV.predefinedDim['b'] = tuple([2, 1, 3])
        self.DV.predefinedType['b'] = 'array'

        node = AST.parse('a + b')
        self.DV.visit(node)
        self.assertEqual(self.DV.result[node], (tuple([2, 2, 3]), 'array'))

        END()


    def test_valid_broadcasting4(self):
        INIT(self, '(2, 1) + (2, 1, 3)')


        self.DV.predefinedDim['a'] = tuple([2, 1])
        self.DV.predefinedType['a'] = 'array'
        self.DV.predefinedDim['b'] = tuple([2, 1, 3])
        self.DV.predefinedType['b'] = 'array'

        node = AST.parse('a + b')
        self.DV.visit(node)
        self.assertEqual(self.DV.result[node], (tuple([2, 2, 3]), 'array'))

        END()
