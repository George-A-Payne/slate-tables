import { Block, Editor } from 'slate';
import { Range } from 'immutable';

import { Options } from 'types';
import { createCell } from 'create';

const normalizeRow = (options: Options) => (row: Block, editor: Editor, next: () => Editor) => {
    const cells = row.data.get('cells');
    if (cells === row.nodes.size) return next();

    const presentCells = row.nodes.map((c) => (c as Block).data.get('index'));

    Range(0, cells).forEach((i) => {
        if (!presentCells.contains(i!)) {
            const cell = createCell(options, i!);
            return editor.insertNodeByKey(row.key, i!, cell);
        }
    });

    return next();
};

export default normalizeRow;
