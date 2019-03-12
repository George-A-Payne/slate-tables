import { Node, Editor } from 'slate';
import { Options } from 'types';

import normalizeTable from './normalizeTable';
import normalizeRow from './normalizeRow';

const normalizeNode = (options: Options) => (node: Node, editor: Editor, next: () => Editor) => {
    if (node.object !== 'block') return next();
    if (node.type === options.typeTable) return normalizeTable(options)(node, editor, next);
    if (node.type === options.typeRow) return normalizeRow(options)(node, editor, next);

    return next();
};

export default normalizeNode;
