/** @jsx hyperscript */

import { createEditor, hyperscript, createValue, createTableValue } from '@tests';
import { Block } from 'slate';

describe('removeColumn', () => {
    test('removes a column', () => {
        const input = createTableValue({
            rows: 3,
            columns: 3,
            cursor: [1, 1],
        });

        const output = createValue(
            <table>
                <tr>
                    <td>
                        <p>Row 0, Col 0</p>
                    </td>
                    <td>
                        <p>Row 0, Col 2</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Row 1, Col 0</p>
                    </td>
                    <td>
                        <p>Row 1, Col 2</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Row 2, Col 0</p>
                    </td>
                    <td>
                        <p>Row 2, Col 2</p>
                    </td>
                </tr>
            </table>,
        );

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToRangeOfNode(cursorBlock);
        editor.removeColumn();

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('removes a column at position', () => {
        const input = createTableValue({
            rows: 3,
            columns: 3,
            cursor: [1, 1],
        });

        const output = createValue(
            <table>
                <tr>
                    <td>
                        <p>Row 0, Col 0</p>
                    </td>
                    <td>
                        <p>Row 0, Col 1</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Row 1, Col 0</p>
                    </td>
                    <td>
                        <p>Row 1, Col 1</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Row 2, Col 0</p>
                    </td>
                    <td>
                        <p>Row 2, Col 1</p>
                    </td>
                </tr>
            </table>,
        );

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToRangeOfNode(cursorBlock);
        editor.removeColumn(2);

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('removes the entire table if there is only one column', () => {
        const input = createTableValue({
            rows: 2,
            columns: 1,
            cursor: [0, 0],
        });

        const output = createValue(<p>{''}</p>);

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToRangeOfNode(cursorBlock);
        editor.removeColumn();

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('undo returns the column', () => {
        const input = createTableValue({
            rows: 2,
            columns: 2,
            cursor: [0, 0],
        });

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToStartOfNode(cursorBlock);
        editor.removeColumn();
        editor.undo();

        expect(editor.value.toJSON()).toEqual(input.toJSON());
    });

    test('undo returns the table, if it was removed', () => {
        const input = createTableValue({
            rows: 2,
            columns: 1,
            cursor: [0, 0],
        });

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToStartOfNode(cursorBlock);
        editor.removeColumn();
        editor.undo();

        expect(editor.value.toJSON()).toEqual(input.toJSON());
    });
});
