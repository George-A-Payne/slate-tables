import { Editor } from 'slate';
import { Options } from 'types';
import { createTable } from 'create';

const insertTable = (options: Options, editor: Editor, columns: number = 2, rows: number = 2) => {
    const { value } = editor;

    if (!value.selection.start.key) return false;

    const table = createTable(options, columns, rows);
    const currentBlock = editor.value.startBlock;

    if (!currentBlock.text.length) {
        return editor.replaceNodeByKey(currentBlock.key, table);
    }

    return editor.insertBlock(table);
};

export default insertTable;
