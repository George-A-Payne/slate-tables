import { Editor } from 'slate';

import { Options } from 'types';
import { TablePosition } from 'utils';
import { moveTableSelection } from 'changes';

const moveTableSelectionBy = (options: Options, editor: Editor, x: number, y: number) => {
    if (!TablePosition.isInCell(editor, options)) {
        throw new Error('moveSelectionBy can only be applied in a cell');
    }

    const position = new TablePosition(editor, options);

    const [absX, absY] = position.relativePosition([x, y]);

    // Out of table
    if (absX === -1) {
        return editor;
    }

    return moveTableSelection(options, editor, absX, absY);
};

export default moveTableSelectionBy;
