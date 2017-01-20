# pylint: disable=R0201, C0103

from . import utils, color

INIT = utils.test_init
END = utils.test_end
AST = utils.my_ast

printc = utils.printc


class TestCreation(utils.TestCase):

    def setUp(self):
        all_func_dict = dict()
        for func_name in utils.my_np_func.get_all_func_name():
            x = func_name.replace('_', '.').replace('..', '_')
            all_func_dict[x] = getattr(utils.my_np_func, func_name)

        self.DV = AST.DimensionVisitor(predefinedFunc=all_func_dict)


    def test_identity(self):
        INIT(self, 'np.identity(3)')

        node = AST.parse('np.identity(3)')
        self.DV.visit(node)

        self.assertDimEqual(self.DV.result[node], AST.Token((3, 3)))

        END()

    def test_ones(self):
        INIT(self, 'np.ones((3, 4))')

        node = AST.parse('np.ones((3, 4))')
        printc(AST.ast.dump(node), color.CBLUE)
        self.DV.visit(node)

        self.assertDimEqual(self.DV.result[node], AST.Token((3, 4)))

        END()

    def test_ones_like(self):
        INIT(self, 'np.ones_like(np.ones((3, 4)))')

        node = AST.parse('np.ones_like(np.ones((3, 4)))')
        # printc(AST.ast.dump(node), color.CBLUE)
        self.DV.visit(node)

        self.assertDimEqual(self.DV.result[node], AST.Token((3, 4)))

        END()
