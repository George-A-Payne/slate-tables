import { Editor } from 'slate';
import { Options } from 'types';
import { TablePosition } from 'utils';

const removeTable = (options: Options, editor: Editor) => {
    const { table } = new TablePosition(editor, options);

    return editor
        .deselect()
        .removeNodeByKey(table.key);
};

export default removeTable;
