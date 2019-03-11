import { Editor } from 'slate';

import { Options } from 'types';
import { createRow } from 'create';
import { TablePosition } from 'utils';

type TextGetter = (row: number) => string;

const insertRow = (options: Options, editor: Editor, at?: number, textGetter: TextGetter = () => '') => {
    const position = new TablePosition(editor, options);
    const firstRow = position.getRow(0);
    const index = at != null ? at : position.getRowIndex() + 1;
    const newRow = createRow(options, firstRow.nodes.size, index, textGetter);

    return editor
        .insertNodeByKey(position.table.key, index, newRow)
        .moveToEndOfNode(
            newRow.nodes.get(position.getColumnIndex()),
        );
};

export default insertRow;
