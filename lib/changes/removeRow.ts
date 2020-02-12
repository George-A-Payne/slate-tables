import { Editor, Block } from 'slate';

import { Options } from 'types';
import { TablePosition, updateTableMeta } from 'utils';
import { removeTable } from 'changes';

const removeRow = (options: Options, editor: Editor, at?: number) => {
    const position = new TablePosition(editor, options);

    // if only row, remove table
    if (position.getHeight() <= 1) {
        return removeTable(options, editor);
    }

    const index = at != null ? at : position.getRowIndex();
    const cellIndex = position.getColumnIndex();

    // Update table by removing the row
    const row = position.getRow(index);
    const nextFocusRow = position.getRow(index === 0 ? 1 : index - 1);
    const nextFocusCell = nextFocusRow.nodes.get(cellIndex) as Block;

    editor.withoutNormalizing(() => {
        editor.removeNodeByKey(row.key).moveTo(nextFocusCell.getFirstText()!.key, 0);

        updateTableMeta(options, editor);
    });

    return editor;
};

export default removeRow;
