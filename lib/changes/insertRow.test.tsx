/** @jsx hyperscript */

import { createEditor, hyperscript, createValue, createTableValue } from '@tests';
import { Block } from 'slate';

describe('insertRow', () => {
    test('inserts a row', () => {
        const input = createTableValue({
            rows: 2,
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
                    <td>
                        <p>Row 0, Col 2</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Row 1, Col 0</p>
                    </td>
                    <td>
                        <p>Row 1, Col 1</p>
                    </td>
                    <td>
                        <p>Row 1, Col 2</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>
                            <text />
                        </p>
                    </td>
                    <td>
                        <p>
                            <text />
                        </p>
                    </td>
                    <td>
                        <p>
                            <text />
                        </p>
                    </td>
                </tr>
            </table>,
        );

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToRangeOfNode(cursorBlock);
        editor.insertRow();

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('inserts a row at position', () => {
        const input = createTableValue({
            rows: 2,
            columns: 3,
            cursor: [1, 1],
        });

        const output = createValue(
            <table>
                <tr>
                    <td>
                        <p>
                            <text />
                        </p>
                    </td>
                    <td>
                        <p>
                            <text />
                        </p>
                    </td>
                    <td>
                        <p>
                            <text />
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Row 0, Col 0</p>
                    </td>
                    <td>
                        <p>Row 0, Col 1</p>
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
                        <p>Row 1, Col 1</p>
                    </td>
                    <td>
                        <p>Row 1, Col 2</p>
                    </td>
                </tr>
            </table>,
        );

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToRangeOfNode(cursorBlock);
        editor.insertRow(0);

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('undo removes row', () => {
        const input = createTableValue({
            rows: 3,
            columns: 3,
            cursor: [1, 1],
        });

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToStartOfNode(cursorBlock);
        editor.insertRow();

        expect(editor.value.startBlock.text).toEqual('');

        editor.undo();

        expect(editor.value.toJSON()).toEqual(input.toJSON());
    });
});
