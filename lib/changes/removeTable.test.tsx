/** @jsx hyperscript */

import { createEditor, hyperscript, createValue, createTableValue } from '@tests';
import { Block } from 'slate';

describe('removeTable', () => {
    test('removes the table, replacing itself with the default node, if nothing else is present', () => {
        const input = createTableValue({
            rows: 3,
            columns: 3,
            cursor: [1, 1],
        });

        const output = createValue(<p />);

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToRangeOfNode(cursorBlock);
        editor.removeTable();

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('the table, without replacement, if another node is present', () => {
        const input = createValue(
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
                        <p key={'_cursor_'}>Row 1, Col 0</p>
                    </td>
                    <td>
                        <p>Row 1, Col 1</p>
                    </td>
                    <td>
                        <p>Row 1, Col 2</p>
                    </td>
                </tr>
            </table>,
            <p>{'hello'}</p>,
        );

        const output = createValue(<p>{'hello'}</p>);

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToRangeOfNode(cursorBlock);
        editor.removeTable();

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('removes a nested table', () => {
        const input = createValue(
            <table>
                <tr>
                    <td>
                        <p>Table 1, Row 0, Col 0</p>
                    </td>
                    <td>
                        <p>Table 1, Row 0, Col 1</p>
                    </td>
                    <td>
                        <p>Table 1, Row 0, Col 2</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <p>Table 2, Row 0, Col 0</p>
                                </td>
                                <td>
                                    <p>Table 2, Row 0, Col 1</p>
                                </td>
                                <td>
                                    <p>Table 2, Row 0, Col 2</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p key={'_cursor_'}>Table 2, Row 1, Col 0</p>
                                </td>
                                <td>
                                    <p>Table 2, Row 1, Col 1</p>
                                </td>
                                <td>
                                    <p>Table 2, Row 1, Col 2</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <p>Table 1, Row 1, Col 1</p>
                    </td>
                    <td>
                        <p>Table 1, Row 1, Col 2</p>
                    </td>
                </tr>
            </table>,
        );

        const output = createValue(
            <table>
                <tr>
                    <td>
                        <p>Table 1, Row 0, Col 0</p>
                    </td>
                    <td>
                        <p>Table 1, Row 0, Col 1</p>
                    </td>
                    <td>
                        <p>Table 1, Row 0, Col 2</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p />
                    </td>
                    <td>
                        <p>Table 1, Row 1, Col 1</p>
                    </td>
                    <td>
                        <p>Table 1, Row 1, Col 2</p>
                    </td>
                </tr>
            </table>,
        );

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToRangeOfNode(cursorBlock);
        editor.removeTable();

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('undo returns the table', () => {
        const input = createTableValue({
            rows: 1,
            columns: 2,
            cursor: [0, 0],
        });

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToStartOfNode(cursorBlock);
        editor.removeTable();
        editor.undo();

        expect(editor.value.toJSON()).toEqual(input.toJSON());
    });
});
