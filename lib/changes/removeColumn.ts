import { Editor, Block } from 'slate';

import { Options } from 'types';
import { TablePosition, updateTableMeta } from 'utils';
import { removeTable } from 'changes';

const removeColumn = (options: Options, editor: Editor, at?: number) => {
    const position = new TablePosition(editor, options);

    // if only row, remove table
    if (position.getWidth() <= 1) {
        return removeTable(options, editor);
    }

    const index = at != null ? at : position.getColumnIndex();
    const rowIndex = position.getRowIndex();

    const nextFocusRow = position.getRow(rowIndex);
    const nextFocusCell = nextFocusRow.nodes.get(index === 0 ? 1 : index - 1) as Block;

    // Remove the cell from every row
    editor.withoutNormalizing(() => {
        position.table.nodes.forEach((row) => {
            const cell = (row as Block).nodes.get(index);
            editor.removeNodeByKey(cell.key);
        });

        editor.moveTo(nextFocusCell.getFirstText()!.key, 0);

        updateTableMeta(options, editor);
    });

    return editor;
};

export default removeColumn;
