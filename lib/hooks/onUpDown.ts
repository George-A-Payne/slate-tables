import { Editor } from 'slate';

import { Options } from 'types';
import { TablePosition } from 'utils';
import { moveTableSelectionBy } from 'changes';

const onUpDown = (event: KeyboardEvent, editor: Editor, options: Options) => {
    const direction = event.key === 'ArrowUp' ? -1 : +1;
    const position = new TablePosition(editor, options);

    // Let the default behavior move out of the table
    if ((position.isFirstRow() && direction === -1) || (position.isLastRow() && direction === +1)) {
        return editor;
    }

    event.preventDefault();
    return moveTableSelectionBy(options, editor, 0, event.key === 'ArrowUp' ? -1 : +1);
};

export default onUpDown;
