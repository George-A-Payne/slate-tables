import { Editor, Block } from 'slate';
import { Options } from 'types';
import { TablePosition, updateNodeData, ofType, closestTable } from 'utils';

const updateTableMeta = (
    options: Options,
    editor: Editor,
    node: Block = new TablePosition(editor, options).table,
): Editor => {
    const table = node.type === options.typeTable ? node : closestTable(options, editor, node);

    // table is invalid and will be normalized, abort
    if (table == null) return editor;

    const rows = table.nodes.filter(ofType(options.typeRow)).size;

    // table is invalid and will be normalized, abort
    if (rows === 0) return editor;

    const columns = (table.nodes.get(0) as Block).nodes.filter(ofType(options.typeCell)).size;

    // table is invalid and will be normalized, abort
    if (columns === 0) return editor;

    editor.withoutNormalizing(() => {
        updateNodeData(editor, table, {
            columns,
            rows,
        });

        // update row indexs
        table.nodes.filter(ofType(options.typeRow)).forEach((r, rIndex) => {
            const row = r as Block;

            updateNodeData(editor, row, {
                cells: columns,
                index: rIndex,
            });

            row.nodes.filter(ofType(options.typeCell)).forEach((c, cIndex) => {
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
