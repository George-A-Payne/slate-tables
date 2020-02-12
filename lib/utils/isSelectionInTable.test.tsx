/** @jsx hyperscript */

import { createEditor, hyperscript, createTableValue } from '@tests';
import { Block, Value } from 'slate';

describe('isSelectionInTable', () => {
    test('return true if cursor is within table', () => {
        const input = createTableValue({
            rows: 3,
            columns: 2,
            cursor: [1, 1],
        });

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToRangeOfNode(cursorBlock);

        const isInTable = editor.isSelectionInTable();

        expect(isInTable).toBe(true);
    });

    test('return false if cursor is outside table', () => {
        const input = ((
            <value>
                <document>
                    <p key="_cursor_">A paragraph not in a table</p>
                    <table>
                        <tr>
                            <td>
                                <p>A paragraph within a table</p>
                            </td>
                        </tr>
                    </table>
                </document>
            </value>
        ) as any) as Value;

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToRangeOfNode(cursorBlock);

        const isInTable = editor.isSelectionInTable();

        expect(isInTable).toBe(false);
    });
});
