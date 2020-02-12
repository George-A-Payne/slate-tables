/** @jsx hyperscript */

import { createEditor, createTableValue } from '@tests';
import { Block } from 'slate';

describe('moveTableSelection', () => {
    const input = createTableValue({
        rows: 3,
        columns: 3,
        cursor: [1, 1],
    });

    const offset = 2;
    const editor = createEditor(input);
    const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

    editor.moveToRangeOfNode(cursorBlock).moveForward(offset);

    editor.moveTableSelectionBy(-1, -1);

    const { selection, startBlock } = editor.value;

    test('moves selection to position', () => {
        expect(startBlock.text).toEqual('Row 0, Col 0');
    });

    test('collapses the selection', () => {
        expect(selection.start.key).toEqual(selection.end.key);
    });

    test('keeps same offset', () => {
        expect(selection.start.offset).toEqual(offset);
    });
});
