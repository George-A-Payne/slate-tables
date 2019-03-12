import { Plugin } from 'slate-react';

import { Options } from 'types';
import { isSelectionInTable, withEditor, defaultRenderers } from 'utils';
import { normalizeNode, schema } from 'schema';
import { onKeyDown } from 'hooks';
import {
    insertTable,
    removeTable,
    insertRow,
    removeRow,
    insertColumn,
    removeColumn,
    moveTableSelection,
    moveTableSelectionBy,
    toggleTableHeaders,
} from 'changes';

const EditTable = (opts: Partial<Options> = {}): Plugin => {
    const options: Options = {
        typeTable: 'table',
        typeRow: 'table_row',
        typeCell: 'table_cell',
        typeContent: 'paragraph',
        ...opts,
    };

    return {
        onKeyDown: onKeyDown(options),

        schema: schema(options),
        normalizeNode: normalizeNode(options),
        renderNode: defaultRenderers(options),

        queries: {
            isSelectionInTable: isSelectionInTable(options),
        },

        commands: {
            insertTable: withEditor(insertTable, options, false),
            removeTable: withEditor(removeTable, options),

            insertRow: withEditor(insertRow, options),
            removeRow: withEditor(removeRow, options),

            insertColumn: withEditor(insertColumn, options),
            removeColumn: withEditor(removeColumn, options),

            moveTableSelection: withEditor(moveTableSelection, options),
            moveTableSelectionBy: withEditor(moveTableSelectionBy, options),

            toggleTableHeaders: withEditor(toggleTableHeaders, options),
        },
    } as any;
};

export default EditTable;
