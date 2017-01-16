# pylint: disable=R0201, C0103

import unittest
from .. import utils, color

INIT = utils.test_init
END = utils.test_end
AST = utils.my_ast

printc = utils.printc


class TestParenthesis(unittest.TestCase):

    def setUp(self):
        self.DV = AST.DimensionVisitor()

    def test_name(self):
        INIT(self, '(a)')

        node = AST.parse('(a)')
        self.DV.visit(node)
        self.assertEqual(self.DV.result[node], (tuple([1]), 'Num'))

        END()

    def test_two_name(self):
        INIT(self, '(a + b)')

        node = AST.parse('(a + b)')
        printc(AST.ast.dump(node), color.CBLUE)
        self.DV.visit(node)

        END()
