import { Editor, Block } from 'slate';

import { Options } from 'types';
import { TablePosition } from 'utils';
import { removeTable } from 'changes';

const removeColumn = (options: Options, editor: Editor, at?: number) => {
    const position = new TablePosition(editor, options);
    const index = at != null ? at : position.getColumnIndex();

    // if only row, remove table
    if (position.getWidth() <= 1) {
        return removeTable(options, editor);
    }

    // Remove the cell from every row
    editor.withoutNormalizing( () => {
        position.table.nodes.forEach((row) => {
            const cell = (row as Block).nodes.get(index);
            editor.removeNodeByKey(cell.key);
        });
    });

    return editor;
};

export default removeColumn;
