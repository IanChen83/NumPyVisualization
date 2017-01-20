# pylint: disable=R0201, C0103

from .. import utils, color

INIT = utils.test_init
END = utils.test_end
AST = utils.my_ast

printc = utils.printc


class TestScalarDimension(utils.TestCase):

    def setUp(self):
        self.DV = AST.DimensionVisitor()

    def test_name(self):
        INIT(self, 'a')

        node = AST.parse('a')
        self.DV.visit(node)
        self.assertDimEqual(self.DV.result[node], AST.Token())
        END()

    def test_int(self):
        INIT(self, '3')

        node = AST.parse('3')
        self.DV.visit(node)
        self.assertDimEqual(self.DV.result[node], AST.Token())
        END()

    def test_float(self):
        INIT(self, '3.')

        node = AST.parse('3.')
        self.DV.visit(node)
        self.assertDimEqual(self.DV.result[node], AST.Token())
        END()

    def test_name_predefined(self):
        INIT(self, 'a (predefined)')

        self.DV.predefined['a'] = AST.Token((1, 2))
        node = AST.parse('a')
        self.DV.visit(node)
        self.assertDimEqual(self.DV.result[node], AST.Token((1, 2)))

        END()
