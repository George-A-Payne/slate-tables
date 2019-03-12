import { Block, Editor } from 'slate';
import { Range } from 'immutable';

import { Options } from 'types';
import { createRow } from 'create';

const normalizeTable = (options: Options) => (table: Block, editor: Editor, next: () => Editor) => {
    const rows = table.data.get('rows');

    if (rows === table.nodes.size) return next();

    const columns = table.data.get('columns');
    const presentRows = table.nodes.map((r) => (r as Block).data.get('index'));

    Range(0, rows).forEach((i) => {
        if (!presentRows.contains(i!)) {
            const row = createRow(options, columns, i!);
            return editor.insertNodeByKey(table.key, i!, row);
        }
    });

    return next();
};

export default normalizeTable;
