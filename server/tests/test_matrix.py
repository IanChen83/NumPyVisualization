# pylint: disable=R0201, C0103

from . import utils, color

INIT = utils.test_init
END = utils.test_end
AST = utils.my_ast

printc = utils.printc


class TestMatrix(utils.TestCase):

    def setUp(self):
        all_func_dict = dict()
        for func_name in utils.my_np_func.get_all_func_name():
            x = func_name.replace('_', '.').replace('..', '_')
            all_func_dict[x] = getattr(utils.my_np_func, func_name)

        predefined = dict({
            'a': AST.Token((2, 3))
        })

        self.DV = AST.DimensionVisitor(
            predefinedFunc=all_func_dict,
            predefined=predefined
        )


    def test_t(self):
        INIT(self, 'np.triu(a, k=3)')

        node = AST.parse('np.triu(a, k=3)')
        self.DV.visit(node)
        printc(AST.ast.dump(node), color.CBLUE)

        self.assertDimEqual(self.DV.result[node], AST.Token((2, 3)))

        END()
