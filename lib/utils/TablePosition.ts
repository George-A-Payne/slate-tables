import { Editor, Block } from 'slate';
import { Record } from 'immutable';

import { Options } from 'types';
import { ofType } from 'utils';

const DEFAULTS = {
    table: null,
    row: null,
    cell: null,
};

class TablePosition extends Record(DEFAULTS) {
    static isInCell = ({ value }: Editor, { typeCell }: Options): boolean =>
        value.startBlock.type === typeCell || !!value.document.getClosest(value.startBlock.key, ofType(typeCell));

    public readonly table!: Block;
    public readonly row!: Block;
    public readonly cell!: Block;

    constructor({ value }: Editor, { typeCell, typeRow, typeTable }: Options) {
        super();

        this.table = value.document.getClosest(value.startBlock.key, ofType(typeTable)) as Block;
        this.row = value.document.getClosest(value.startBlock.key, ofType(typeRow)) as Block;
        this.cell = value.document.getClosest(value.startBlock.key, ofType(typeCell)) as Block;
    }

    public getWidth = (): number => {
        const { table } = this;
        const rows = table.nodes;
        const cells = (rows.get(0) as Block).nodes;

        return cells.size;
    };

    public getHeight = (): number => {
        const { table } = this;
        const rows = table.nodes;

        return rows.size;
    };

    public relativePosition = ([x, y]: [number, number]): [number, number] => {
        const rowIndex = this.getRowIndex();
        const colIndex = this.getColumnIndex();
        const width = this.getWidth();
        const height = this.getHeight();

        let xx = x + colIndex;
        let yy = y + rowIndex;

        if (xx < 0) {
            xx = width - 1;
            yy--;
        }

        if (yy < 0) {
            return [-1, -1];
        }

        if (xx >= width) {
            xx = 0;
            yy++;
        }

        if (yy >= height) {
            return [-1, -1];
        }

        return [xx, yy];
    };

    public getRowIndex = (): number => {
        const { table, row } = this;
        const rows = table.nodes;

        return rows.findIndex((x) => x === row);
    };

    public getRow = (index: number = this.getRowIndex()): Block => this.table.nodes.get(index) as Block;

    public getColumnIndex = (): number => {
        const { row, cell } = this;
        const cells = row.nodes;

        return cells.findIndex((x) => x === cell);
    };

    public isFirstCell = (): boolean => {
        return this.isFirstRow() && this.isFirstColumn();
    };

    public isLastCell = (): boolean => {
        return this.isLastRow() && this.isLastColumn();
    };

    public isFirstRow = (): boolean => {
        return this.getRowIndex() === 0;
    };

    public isLastRow = (): boolean => {
        return this.getRowIndex() === this.getHeight() - 1;
    };

    public isFirstColumn = (): boolean => {
        return this.getColumnIndex() === 0;
    };

    public isLastColumn = (): boolean => {
        return this.getColumnIndex() === this.getWidth() - 1;
    };
}

export default TablePosition;
