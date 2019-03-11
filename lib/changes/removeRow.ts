import { Editor } from 'slate';

import { Options } from 'types';
import { TablePosition } from 'utils';
import { removeTable } from 'changes';

const removeRow = (options: Options, editor: Editor, at?: number) => {
    const position = new TablePosition(editor, options);

    // if only row, remove table
    if (position.getHeight() <= 1) {
        return removeTable(options, editor);
    }

    // Update table by removing the row
    const row = position.getRow(at);
    editor.removeNodeByKey(row.key);
    return editor;
};

export default removeRow;
