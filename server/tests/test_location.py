# pylint: disable=R0201, C0103
from functools import reduce
import operator
from . import utils, color

INIT = utils.test_init
END = utils.test_end
AST = utils.my_ast

printc = utils.printc

class TestTranspose(utils.TestCase):

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

        self.LV = AST.LocationVisitor(
            result=self.DV.result,
            predefinedFunc=all_func_dict,
            predefined=predefined
        )

    def DFS(self, token, level=0):
        if isinstance(token, AST.Token):
            print('\t' * level + str(token.dim))
            for x in token.children:
                self.DFS(x, level + 1)
        elif isinstance(token, tuple):
            print('\t' * level + str(token))

    def test_print_location(self):
        INIT(self, 'np.reshape(a, (3, -1))')

        node = AST.parse('np.reshape(a[1], (3, -1))')
        self.DV.visit(node)
        self.LV.visit(node)

        self.DFS(self.LV.result[node])

        END()
