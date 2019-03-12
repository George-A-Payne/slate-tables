import { Editor } from 'slate';

import { Options } from 'types';
import { createRow } from 'create';
import { TablePosition, updateTableMeta } from 'utils';

type TextGetter = (row: number) => string;

const insertRow = (options: Options, editor: Editor, at?: number, textGetter: TextGetter = () => '') => {
    const position = new TablePosition(editor, options);
    const firstRow = position.getRow(0);
    const index = at != null ? at : position.getRowIndex() + 1;
    const newRow = createRow(options, firstRow.nodes.size, index, textGetter);

    editor.withoutNormalizing(() => {
        editor
            .insertNodeByKey(position.table.key, index, newRow)
            .moveToEndOfNode(
                newRow.nodes.get(position.getColumnIndex()),
            );

        updateTableMeta(options, editor);
    });

    return editor;
};

export default insertRow;
