import { Editor } from 'slate';
import { Options } from 'types';
import { TablePosition } from 'utils';

const isSelectionInTable = (options: Options) => (editor: Editor): boolean => {
    const { startBlock } = editor.value;
    if (!startBlock) return false;

    return TablePosition.isInCell(editor, options);
};

export default isSelectionInTable;
