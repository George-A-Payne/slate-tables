import { Block, BlockProperties } from 'slate';
import { Range } from 'immutable';

import { Options } from 'types';
import { createCell } from 'create';

type TextGetter = (row: number) => string;

function createRow(options: Options, columns: number, index: number, textGetter: TextGetter = () => '') {
    const cellNodes = Range(0, columns)
        .map((i) => createCell(options, i as number, textGetter(i as number)))
        .toList();

    return Block.create({
        type:  options.typeRow,
        nodes: cellNodes,
        data: {
            cells: columns,
            index,
        },
    } as BlockProperties);
}

export default createRow;
