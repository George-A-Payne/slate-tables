import { Editor } from 'slate';
import { Options } from 'types';
import { createTable } from 'create';

const insertTable = (options: Options, editor: Editor, columns: number = 2, rows: number = 2) => {
    const { value } = editor;

    if (!value.selection.start.key) return false;

    const table = createTable(options, columns, rows);
    const currentBlock = editor.value.startBlock;

    if (!currentBlock.text.length) {
        editor.replaceNodeByKey(currentBlock.key, table);
    } else {
        editor.insertBlock(table);
    }

    // focus first cell of new table
    editor.moveTo(table.getFirstText()!.key, 0);

    return editor;
};

export default insertTable;
