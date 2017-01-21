import flask
import json
from html import escape, unescape
import server.my_ast  as AST
import server.my_np_func as np_func
app = flask.Flask(__name__)

all_func_dict = dict()
for func_name in np_func.get_all_func_name():
    x = func_name.replace('_', '.').replace('..', '_')
    all_func_dict[x] = getattr(np_func, func_name)

def get_predefined(p):
    ret = dict()
    if not isinstance(p, list):
        return ret
    for item in p:
        if 'name' not in item or 'type' not in item:
            continue
        if item['type'] == 'array' and 'dim' in item and isinstance(item['dim'], list):
            ret[item['name']] = AST.Token(tuple(item['dim']))

    return ret

def DFS(token ,level=0):
    ret = dict()
    if isinstance(token, AST.Token):
        ret['type'] = 'array'
        ret['identifier'] = token.identifier
        ret['col_s'] = token.col_s
        ret['col_e'] = token.col_e
        ret['children'] = [DFS(x, level + 1) for x in token.children]
    elif isinstance(token, tuple):
        ret['type'] = 'tuple'
        ret['value'] = str(token)

    return ret


@app.route("/", methods=['POST'])
def parse_ast():
    j = flask.request.get_json()
    predefined = None
    if 'code' not in j:
        flask.abort(404)

    if 'predefined' in j:
        predefined = get_predefined(j['predefined'])

    node = AST.parse(j['code'])

    DV = AST.DimensionVisitor(predefinedFunc=all_func_dict, predefined=predefined)
    LV = AST.LocationVisitor(predefinedFunc=all_func_dict, predefined=predefined)

    result = dict()
    DV.result = result
    LV.result = result

    DV.visit(node)
    LV.visit(node)

    return json.dumps(DFS(result[node]))

if __name__ == "__main__":
    app.run()
