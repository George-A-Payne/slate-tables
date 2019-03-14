/** @jsx hyperscript */

import { createEditor, createTableValue } from '@tests';
import { Block } from 'slate';
import { ofType } from 'utils';

describe('toggleTableHeaders', () => {
    test('toggles the table headers', () => {
        const input = createTableValue({
            rows: 3,
            columns: 3,
            cursor: [1, 1],
        });

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToRangeOfNode(cursorBlock);

        let table = editor.value.document.getClosest(cursorBlock.key, ofType('table')) as Block;

        expect(table.data.get('header')).toBeFalsy();

        editor.toggleTableHeaders();

        table = editor.value.document.getClosest(cursorBlock.key, ofType('table')) as Block;

        expect(table.data.get('header')).toBe(true);

        editor.toggleTableHeaders();

        table = editor.value.document.getClosest(cursorBlock.key, ofType('table')) as Block;

        expect(table.data.get('header')).toBe(false);
    });

    test('should be persisted along meta updates', () => {
        const input = createTableValue({
            rows: 3,
            columns: 3,
            cursor: [1, 1],
        });

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToRangeOfNode(cursorBlock);
        editor.toggleTableHeaders();

        let table = editor.value.document.getClosest(editor.value.startBlock.key, ofType('table')) as Block;

        expect(table.data.get('header')).toBe(true);

        const priorMeta = table.data.toJS();

        editor.removeColumn();

        table = editor.value.document.getClosest(editor.value.startBlock.key, ofType('table')) as Block;

        expect(table.data.get('header')).toBe(true);

        expect(table.data.toJS()).not.toEqual(priorMeta);
    });
});
