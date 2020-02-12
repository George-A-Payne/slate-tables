import { Editor } from 'slate';

import { Options } from 'types';
import { TablePosition } from 'utils';
import { moveTableSelectionBy } from 'changes';

/**
 * Pressing "Tab" moves the cursor to the next cell
 * and select the whole text
 */
const onTab = (event: KeyboardEvent, editor: Editor, options: Options): Editor => {
    event.preventDefault();
    const direction = event.shiftKey ? -1 : +1;
    const position = new TablePosition(editor, options);

    if ((position.isFirstCell() && direction === -1) || (position.isLastCell() && direction === 1)) {
        return editor;
    }

    return moveTableSelectionBy(options, editor, direction, 0).moveToRangeOfNode(editor.value.startBlock);
};

export default onTab;
