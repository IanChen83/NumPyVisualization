# pylint: disable=R0201, C0103

from .. import utils, color

INIT = utils.test_init
END = utils.test_end
AST = utils.my_ast

printc = utils.printc


class TestCreation(utils.TestCase):

    def setUp(self):

        self.DV = AST.DimensionVisitor()


    def test_func1(self):
        INIT(self, 'func(3)')

        node = AST.parse('func(3)')
        # printc(AST.ast.dump(node), color.CBLUE)
        with self.assertRaises(Exception) as context:
            self.DV.visit(node)

        printc(context.exception, color.CRED)

        END()

    def test_func2(self):
        INIT(self, 'np.mod1.func()')

        node = AST.parse('np.mod1.func()')
        # printc(AST.ast.dump(node), color.CBLUE)
        with self.assertRaises(Exception) as context:
            self.DV.visit(node)

        printc(context.exception, color.CRED)

        END()


    def test_func3(self):
        INIT(self, 'np.ones((2, 3))')

        def np_ones(args):
            return AST.Token((len(args), ))

        self.DV.predefinedFunc['np.ones'] = np_ones

        node = AST.parse('np.ones((2, 3))')
        printc(AST.ast.dump(node), color.CBLUE)
        self.DV.visit(node)

        self.assertDimEqual(self.DV.result[node], AST.Token((1,)))

        END()
