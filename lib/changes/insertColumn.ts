import { Editor } from 'slate';

import { TablePosition } from 'utils';
import { moveTableSelection } from 'changes';
import { createCell } from 'create';
import { Options } from 'types';

const insertColumn = (options: Options, editor: Editor, at?: number) => {
    const position = new TablePosition(editor, options);
    const index = at != null ? at : position.getColumnIndex() + 1;

    // Insert the new cell
    editor.withoutNormalizing( () => {
        position.table.nodes.forEach((row) => {
            const newCell = createCell(options, index);
            editor.insertNodeByKey(row!.key, index, newCell);
        });
    });

    // Update the selection (not doing can break the undo)
    return moveTableSelection(options, editor, index, position.getRowIndex());
};

export default insertColumn;
