import { Editor } from 'slate';

import { Options } from 'types';
import { TablePosition } from 'utils';

const moveTableSelection = (options: Options, editor: Editor, x: number, y: number) => {
    const { value } = editor;
    let startOffset = value.selection.start.offset;

    if (!TablePosition.isInCell(editor, options)) {
        throw new Error('moveSelection can only be applied in a cell');
    }

    const postion = new TablePosition(editor, options);

    const row = postion.getRow(y);
    const cell = row.nodes.get(x);

    // Calculate new offset
    const cellTextLength = cell.text.length;

    if (startOffset > cellTextLength) {
        startOffset = cellTextLength;
    }

    return editor.moveTo(cell.getFirstText()!.key, startOffset);
};

export default moveTableSelection;
