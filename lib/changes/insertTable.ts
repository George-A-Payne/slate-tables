import { Editor } from 'slate';
import { Options } from 'types';
import { createTable } from 'create';

const insertTable = (options: Options, editor: Editor, columns: number = 2, rows: number = 2) => {
    const { value } = editor;

    if (!value.selection.start.key) return false;

    const table = createTable(options, columns, rows);

    return editor
        .insertBlock(table);
};

export default insertTable;
