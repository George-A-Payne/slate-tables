import { Editor, Block } from 'slate';

import { Options } from 'types';
import { TablePosition, ofType } from 'utils';
import { moveTableSelectionBy } from 'changes';

import { KEY } from './onKeyDown';

const onUpDown = (event: KeyboardEvent, editor: Editor, options: Options) => {
    const position = new TablePosition(editor, options);

    const { document, startBlock } = editor.value;
    const nextPosition = event.key === KEY.UP ? document.getPreviousBlock(startBlock.key) : document.getNextBlock(startBlock.key);

    // we have somewhere to go
    if (nextPosition != null) {
        const nextPositionParentCell = document.getClosest(nextPosition.key, ofType(options.typeCell));

        // and it is contained in the current cell
        if (
            nextPositionParentCell != null &&
            (nextPositionParentCell === position.cell || position.cell.hasDescendant(nextPositionParentCell.key))
        ) {
            return editor;
        }
    }

    // we aren't navigating within our cell
    event.preventDefault();

    if (event.key === KEY.UP && position.isFirstRow()) {
        return moveUp(editor, options, position.table);
    }

    if (event.key === KEY.DOWN && position.isLastRow()) {
        return moveDown(editor, options, position.table);
    }

    const direction = event.key === KEY.UP ? -1 : +1;
    return moveTableSelectionBy(options, editor, 0, direction);
};

const moveUp = (editor: Editor, options: Options, table: Block): Editor => {
    const { document } = editor.value;
    const previous = document.getPreviousBlock(table.key);
    const parent = document.getParent(table.key) as Block;

    // cursor has somewhere to go
    if (previous != null) {
        const previousParent = document.getParent(previous.key) as Block;

        // and it isn't inside a table, lets go there.
        if (previousParent === parent || previousParent.type !== options.typeCell) {
            return editor.moveTo(previous.key);
        }
    }

    // the parent isn't a table, but the cursor has nowhere to go, insert somewhere and go there.
    if (parent.type !== options.typeCell) {
        const index = parent.nodes.findIndex((x) => x === table);
        const nextPosition = Block.create(options.typeDefault);

        return editor
            .insertNodeByKey(editor.value.document.key, index, nextPosition)
            .moveTo(nextPosition.key);
    }

    // we are moving up to parent table
    const parentCell = parent;
    const parentRow = document.getClosest(table.key, ofType(options.typeRow)) as Block;
    const parentTable = document.getClosest(table.key, ofType(options.typeTable)) as Block;

    const rowIndex = parentTable.nodes.findIndex((x) => x === parentRow);

    // we are at the top of the parent table, so we need to decide what to do from there
    if (rowIndex === 0) {
        return moveUp(editor, options, parentTable);
    }

    // we are somewhere in the parent table, move up one row
    const cellIndex = parentTable.nodes.findIndex((x) => x === parentCell);
    const nextRow = parentTable.nodes.get(rowIndex - 1) as Block;
    const nextCell = nextRow.nodes.get(cellIndex) as Block;

    return editor.moveTo(nextCell.getFirstText()!.key);
};

const moveDown = (editor: Editor, options: Options, table: Block): Editor => {
    const { document } = editor.value;
    const next = document.getNextBlock(table.key);
    const parent = document.getParent(table.key) as Block;

    // cursor has somewhere to go
    if (next != null) {
        const nextParent = document.getParent(next.key) as Block;

        // and it isn't inside a table, lets go there.
        if (nextParent === parent || nextParent.type !== options.typeCell) {
            return editor.moveTo(next.key);
        }
    }

    // the parent isn't a table, but the cursor has nowhere to go, insert somewhere and go there.
    if (parent.type !== options.typeCell) {
        const index = parent.nodes.findIndex((x) => x === table);
        const nextPosition = Block.create(options.typeDefault);

        return editor
            .insertNodeByKey(editor.value.document.key, index + 1, nextPosition)
            .moveTo(nextPosition.key);
    }

    // we are moving up to parent table
    const parentCell = parent;
    const parentRow = document.getClosest(table.key, ofType(options.typeRow)) as Block;
    const parentTable = document.getClosest(table.key, ofType(options.typeTable)) as Block;

    const rowIndex = parentTable.nodes.findIndex((x) => x === parentRow);

    // we are at the bottom of the parent table, so we need to decide what to do from there
    if (rowIndex === parentTable.nodes.size - 1) {
        return moveDown(editor, options, parentTable);
    }

    // we are somewhere in the parent table, move down one row
    const cellIndex = parentTable.nodes.findIndex((x) => x === parentCell);
    const nextRow = parentTable.nodes.get(rowIndex + 1) as Block;
    const nextCell = nextRow.nodes.get(cellIndex) as Block;

    return editor.moveTo(nextCell.getFirstText()!.key);
};

export default onUpDown;
