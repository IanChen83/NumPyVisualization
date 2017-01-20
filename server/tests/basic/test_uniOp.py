# pylint: disable=R0201, C0103

from .. import utils

INIT = utils.test_init
END = utils.test_end
AST = utils.my_ast

printc = utils.printc


class TestUnaryOp(utils.TestCase):

    def setUp(self):
        self.DV = AST.DimensionVisitor()

    def test_plus(self):
        INIT(self, '+a')
        self.DV.predefined['a'] = AST.Token((2, 3))

        node = AST.parse('+a')
        self.DV.visit(node)

        self.assertDimEqual(self.DV.result[node], AST.Token((2, 3)))

        END()
