/** @jsx hyperscript */

import { createEditor, hyperscript, createValue } from '@tests';
import { Block } from 'slate';

describe('insertTable', () => {
    test('inserts a table after current node, if has value', () => {
        const input = createValue((
            <p key="_cursor_">
                {'text here'}
            </p>
        ));

        const output = createValue(
            (<p>{'text here'}</p>),
            (
                <table>
                    <tr>
                        <td>
                            <p><text /></p>
                        </td>
                        <td>
                            <p><text /></p>
                        </td>
                        <td>
                            <p><text /></p>
                        </td>
                    </tr>
                </table>
            ),
        );

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToEndOfNode(cursorBlock);
        editor.insertTable(3, 1);

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('replaces current node, if has no value', () => {
        const input = createValue((
            <p key="_cursor_">
                {''}
            </p>
        ));

        const output = createValue((
            <table>
                <tr>
                    <td>
                        <p><text /></p>
                    </td>
                    <td>
                        <p><text /></p>
                    </td>
                    <td>
                        <p><text /></p>
                    </td>
                </tr>
            </table>
        ));

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToEndOfNode(cursorBlock);
        editor.insertTable(3, 1);

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('undo removes table', () => {
        const input = createValue((
            <p key="_cursor_">
                {''}
            </p>
        ));

        const editor = createEditor(input);
        const cursorBlock = editor.value.document.getDescendant('_cursor_') as Block;

        editor.moveToStartOfNode(cursorBlock);
        editor.insertTable(3, 1);

        expect(editor.value.startBlock.text).toEqual('');

        editor.undo();

        expect(editor.value.toJSON()).toEqual(input.toJSON());
    });
});
