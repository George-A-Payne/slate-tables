import { Range } from 'immutable';
import { Block, BlockProperties } from 'slate';

import { Options } from 'types';
import { createRow } from 'create';

type TextGetter = (row: number, column: number) => string;

function createTable(options: Options, columns: number, rows: number, textGetter: TextGetter = () => ''): Block {
    const rowNodes = Range(0, rows)
        .map((i) => createRow(options, columns, i as number, textGetter.bind(null, i as number)))
        .toList();

    return Block.create({
        type:  options.typeTable,
        nodes: rowNodes,
        data: {
            columns,
            rows,
        },
    } as BlockProperties);
}

export default createTable;
