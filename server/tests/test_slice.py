# pylint: disable=R0201, C0103

from . import utils, color
import numpy as np

INIT = utils.test_init
END = utils.test_end
AST = utils.my_ast

printc = utils.printc


class TestSlice(utils.TestCase):

    def setUp(self):
        self.DV = AST.DimensionVisitor()
        self.DV.predefined['a'] = AST.Token((3, 4))

    def test_index_name(self):
        INIT(self, 'a[b]')

        node = AST.parse('a[b]')

        with self.assertRaises(Exception) as context:
            self.DV.visit(node)

        printc(context.exception, color.CRED)

        END()

    def test_index(self):
        INIT(self, 'a[2]')

        node = AST.parse('a[2]')
        self.DV.visit(node)

        self.assertDimEqual(self.DV.result[node], AST.Token((4, )))

        END()

    def test_double_index(self):
        INIT(self, 'a[2][3]')

        node = AST.parse('a[2][3]')
        # printc(AST.ast.dump(node), color.CBLUE)
        self.DV.visit(node)
        # Subscript(
        #   value=Subscript(
        #       value=Name(id='a', ctx=Load()),
        #       slice=Index(value=Num(n=2)),
        #       ctx=Load()),
        #   slice=Index(value=Num(n=3)),
        #   ctx=Load()
        # )

        self.assertDimEqual(self.DV.result[node], AST.Token())

        END()

    def test_ellipsis(self):
        INIT(self, 'a[...]')

        node = AST.parse('a[...]')
        # printc(AST.ast.dump(node), color.CBLUE)
        self.DV.visit(node)

        # self.assertEqual(self.DV.result[node], (tuple([1]), 'number'))

        END()

    def test_slice(self):
        INIT(self, 'a[2:3]')

        node = AST.parse('a[2:3]')
        self.DV.visit(node)
        # printc(AST.ast.dump(node), color.CBLUE)

        self.assertDimEqual(self.DV.result[node], AST.Token((1, 4)))

        END()

    def test_ext_slice1(self):
        INIT(self, 'a[2:3, 2]')

        node = AST.parse('a[2:3, 2]')
        self.DV.visit(node)
        # printc(AST.ast.dump(node), color.CBLUE)

        self.assertDimEqual(self.DV.result[node], AST.Token((1, )))

        END()

    def test_ext_slice2(self):
        INIT(self, '(3, 5, 5, 2)[2:3, 2, 1:2]')

        self.DV.predefined['b'] = AST.Token((3, 5, 5, 2))

        b = np.ones((3, 5, 5, 2))

        node = AST.parse('b[2:3, 2, 1:2]')
        self.DV.visit(node)
        # printc(AST.ast.dump(node), color.CBLUE)

        self.assertDimEqual(self.DV.result[node], AST.Token(b[2:3, 2, 1:2].shape))

        END()
