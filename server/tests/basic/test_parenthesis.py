# pylint: disable=R0201, C0103

from .. import utils, color

INIT = utils.test_init
END = utils.test_end
AST = utils.my_ast

printc = utils.printc


class TestParenthesis(utils.TestCase):

    def setUp(self):
        self.DV = AST.DimensionVisitor()

    def test_name(self):
        INIT(self, '(a)')

        node = AST.parse('(a)')
        self.DV.visit(node)
        self.assertDimEqual(self.DV.result[node], AST.Token())

        END()

    def test_two_names(self):
        INIT(self, '(a + b)')

        node = AST.parse('(a + b)')
        printc(AST.ast.dump(node), color.CBLUE)
        self.DV.visit(node)

        END()
