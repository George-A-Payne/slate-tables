import { Editor, Block } from 'slate';
import { Options } from 'types';
import { TablePosition, updateNodeData } from 'utils';

const updateTableMeta = (options: Options, editor: Editor): Editor => {
    const position = new TablePosition(editor, options);
    const { table } = position;
    const columns = position.getWidth();
    const rows = position.getHeight();

    editor.withoutNormalizing(() => {
        updateNodeData(editor, table, {
            columns,
            rows,
        });

        // update row indexs
        table.nodes.forEach((r, rIndex) => {
            const row = r as Block;

            updateNodeData(editor, row, {
                cells: columns,
                index: rIndex,
            });

            row.nodes.forEach((c, cIndex) => {
                const cell = c as Block;

                updateNodeData(editor, cell, {
                    index: cIndex,
                });
            });
        });
    });

    return editor;
};

export default updateTableMeta;
