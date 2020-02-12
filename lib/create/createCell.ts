import { Text, Node, Block, BlockProperties } from 'slate';
import { List } from 'immutable';

import { Options } from 'types';

const createCell = ({ typeCell, typeContent }: Options, index: number, text: string = ''): Node => {
    return Block.create({
        type: typeCell,
        nodes: List([
            Block.create({
                type: typeContent,
                nodes: List([Text.create(text)]),
            } as BlockProperties),
        ]),
        data: {
            index,
        },
    } as BlockProperties);
};

export default createCell;
