import { Options } from 'types';
import { Editor, Node, Block } from 'slate';
import { ofType } from 'utils';

const closestTable = (options: Options, editor: Editor, node: Node): Block => (
    editor.value.document.getClosest(node.key, ofType(options.typeTable)) as Block
);

export default closestTable;
