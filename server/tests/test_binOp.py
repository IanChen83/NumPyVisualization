# pylint: disable=R0201, C0103

from . import utils, color

INIT = utils.test_init
END = utils.test_end
AST = utils.my_ast

printc = utils.printc


class TestBinaryOperation(utils.TestCase):

    def setUp(self):
        self.DV = AST.DimensionVisitor()

    def test_invalid_broadcasting1(self):
        INIT(self, '(3, 4) + (2, 3)')


        self.DV.predefined['a'] = AST.Token((3, 4))
        self.DV.predefined['b'] = AST.Token((2, 3))

        node = AST.parse('a + b')

        with self.assertRaises(Exception) as context:
            self.DV.visit(node)

        printc(context.exception, color.CRED)

        END()

    def test_valid_broadcasting1(self):
        INIT(self, '(2, 3) + (2, 3)')


        self.DV.predefined['a'] = AST.Token((2, 3))
        self.DV.predefined['b'] = AST.Token((2, 3))

        node = AST.parse('a + b')
        self.DV.visit(node)
        self.assertDimEqual(self.DV.result[node], AST.Token((2, 3)))

        END()

    def test_valid_broadcasting2(self):
        INIT(self, '(2, 2, 3) + (2, 3)')

        self.DV.predefined['a'] = AST.Token((2, 2, 3))
        self.DV.predefined['b'] = AST.Token((2, 3))

        node = AST.parse('a + b')
        self.DV.visit(node)
        self.assertDimEqual(self.DV.result[node], AST.Token((2, 2, 3)))

        END()

    def test_valid_broadcasting3(self):
        INIT(self, '(2, 3) + (2, 1, 3)')

        self.DV.predefined['a'] = AST.Token((2, 3))
        self.DV.predefined['b'] = AST.Token((2, 1, 3))

        node = AST.parse('a + b')
        self.DV.visit(node)
        self.assertDimEqual(self.DV.result[node], AST.Token((2, 2, 3)))

        END()


    def test_valid_broadcasting4(self):
        INIT(self, '(2, 1) + (2, 1, 3)')

        self.DV.predefined['a'] = AST.Token((2, 1))
        self.DV.predefined['b'] = AST.Token((2, 1, 3))

        node = AST.parse('a + b')
        self.DV.visit(node)
        self.assertDimEqual(self.DV.result[node], AST.Token((2, 2, 3)))

        END()

    def test_valid_broadcasting5(self):
        INIT(self, '2 + 3')

        node = AST.parse('2 + 3')
        self.DV.visit(node)
        self.assertDimEqual(self.DV.result[node], AST.Token())

        END()
