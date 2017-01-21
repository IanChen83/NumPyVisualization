# pylint: disable=R0201, C0103
from functools import reduce
import operator
from . import utils, color

INIT = utils.test_init
END = utils.test_end
AST = utils.my_ast

printc = utils.printc

def check_reshape_compatible(dim1, dim2):
    elt1 = reduce(operator.mul, dim1, 1)
    elt2 = reduce(operator.mul, dim2, 1)
    if elt1 <= 0:
        return False
    if -1 in dim2:
        if elt2 >= 0 or elt1 % -elt2 != 0:
            return False
    else:
        if elt2 <= 0 or elt1 != elt2:
            return False

    return True

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

    def test_reshape_compatible(self):
        INIT(self, '(2, 3), (3, -1)')

        self.assertTrue(check_reshape_compatible((2, 3), (3, -1)))

        END()

    def test_reshape(self):
        INIT(self, 'np.reshape(a, (3, -1))')

        node = AST.parse('np.reshape(a, (3, -1))')
        # printc(AST.ast.dump(node), color.CBLUE)
        self.DV.visit(node)

        self.assertDimEqual(self.DV.result[node], AST.Token((3, 2)))

        END()
