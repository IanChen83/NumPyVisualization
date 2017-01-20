import sys
import inspect
from inspect import getouterframes, currentframe
import unittest

from .. import my_ast, my_np_func
from .color import CWHITE, CRED2, CEND

def formatc(text, color):
    return '{0}{1}{2}'.format(color, text, CEND)

def printc(text, color=CWHITE):
    print(formatc(text, color))

def test_init(ctx=None, t=''):
    if not ctx:
        func_name = inspect.stack()[1].function
        printc('\n[{0}]'.format(func_name), CRED2)
    else:
        info = ctx.id().split('.')[-2:]
        if t == '':
            printc('\n[{0}.{1}]'.format(*info), CRED2)
        else:
            printc('\n[{0}.{1}]: {2}'.format(*info, t), CRED2)

def test_end():
    pass

class TestCase(unittest.TestCase):
    def assertDimEqual(self, first, second, msg=None):
        assertion_func = self._getAssertEqualityFunc(first.dim, second.dim)
        assertion_func(first.dim, second.dim, msg=msg)
