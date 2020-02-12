import { Editor, Block, Text, BlockProperties } from 'slate';
import { List } from 'immutable';

import { Options } from 'types';
import { TablePosition } from 'utils';

const removeTable = (options: Options, editor: Editor) => {
    const { table } = new TablePosition(editor, options);

    const previous = editor.value.document.getPreviousBlock(table.key);
    const next = editor.value.document.getNextBlock(table.key);

    editor.deselect();

    if (!previous && !next) {
        const blank = Block.create({
            type: options.typeDefault,
            nodes: List([Text.create('')]),
        } as BlockProperties);

        editor.replaceNodeByKey(table.key, blank);
    } else {
        editor.removeNodeByKey(table.key);
    }

    return editor;
};

export default removeTable;
