/** @jsx hyperscript */

import { Value } from 'slate';
import { createEditor, hyperscript, createValue } from '@tests';

describe('schema', () => {
    test('handles a standard table', () => {
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
            </table>,
        );

        const editor = createEditor(input);

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('tables must contain rows', () => {
        const input = ((
            <value>
                <document>
                    <table>no rows</table>
                </document>
            </value>
        ) as any) as Value;

        const output = createValue(
            <table>
                <tr>
                    <td>
                        <p>
                            <text />
                        </p>
                    </td>
                </tr>
            </table>,
        );

        const editor = createEditor(input);

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('tables remove malformed rows', () => {
        const input = ((
            <value>
                <document>
                    <table>
                        <tr>
                            <td>
                                <p>Row 1, Col 1</p>
                            </td>
                        </tr>
                        <other>
                            <td>
                                <p>Row 2, Col 1</p>
                            </td>
                        </other>
                        <tr>
                            <td>
                                <p>Row 3, Col 1</p>
                            </td>
                        </tr>
                    </table>
                </document>
            </value>
        ) as any) as Value;

        const output = createValue(
            <table>
                <tr>
                    <td>
                        <p>Row 1, Col 1</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Row 3, Col 1</p>
                    </td>
                </tr>
            </table>,
        );

        const editor = createEditor(input);

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('cells must contain blocks', () => {
        const input = ((
            <value>
                <document>
                    <table>
                        <tr>
                            <td>Row 1, Col 1</td>
                            <td>
                                <a>Row 1, Col 2</a>
                            </td>
                            <td>Row 1, Col 3</td>
                        </tr>
                    </table>
                </document>
            </value>
        ) as any) as Value;

        const output = createValue(
            <table>
                <tr>
                    <td>
                        <p>Row 1, Col 1</p>
                    </td>
                    <td>
                        <p>
                            <text />
                            <a>Row 1, Col 2</a>
                            <text />
                        </p>
                    </td>
                    <td>
                        <p>Row 1, Col 3</p>
                    </td>
                </tr>
            </table>,
        );

        const editor = createEditor(input);

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('rows must not contain blocks', () => {
        const input = ((
            <value>
                <document>
                    <table>
                        <tr>
                            <td>
                                <p>Row 1, Col 1</p>
                            </td>
                            <td>
                                <p>Row 1, Col 2</p>
                            </td>
                            <td>
                                <p>Row 1, Col 3</p>
                            </td>
                            <p>Row 1, Col 4</p>
                        </tr>
                    </table>
                </document>
            </value>
        ) as any) as Value;

        const output = createValue(
            <table>
                <tr>
                    <td>
                        <p>Row 1, Col 1</p>
                    </td>
                    <td>
                        <p>Row 1, Col 2</p>
                    </td>
                    <td>
                        <p>Row 1, Col 3</p>
                    </td>
                    <td>
                        <p />
                    </td>
                </tr>
            </table>,
        );

        const editor = createEditor(input);

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('table must not contain blocks', () => {
        const input = ((
            <value>
                <document>
                    <table>
                        <tr>
                            <td>
                                <p>Row 1, Col 1</p>
                            </td>
                            <td>
                                <p>Row 1, Col 2</p>
                            </td>
                            <td>
                                <p>Row 1, Col 3</p>
                            </td>
                        </tr>
                        <p>Row 1, Col 4</p>
                    </table>
                </document>
            </value>
        ) as any) as Value;

        const output = createValue(
            <table>
                <tr>
                    <td>
                        <p>Row 1, Col 1</p>
                    </td>
                    <td>
                        <p>Row 1, Col 2</p>
                    </td>
                    <td>
                        <p>Row 1, Col 3</p>
                    </td>
                </tr>
            </table>,
        );

        const editor = createEditor(input);

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('rows and cells must be within tables', () => {
        const input = ((
            <value>
                <document>
                    <tr>
                        <td>No table</td>
                    </tr>
                    <td>No rows</td>
                </document>
            </value>
        ) as any) as Value;

        const output = createValue(
            <table>
                <tr>
                    <td>
                        <p>No table</p>
                    </td>
                </tr>
            </table>,
            <table>
                <tr>
                    <td>
                        <p>No rows</p>
                    </td>
                </tr>
            </table>,
        );

        const editor = createEditor(input);

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });

    test('rows require the same number of columns', () => {
        const input = ((
            <value>
                <document>
                    <table>
                        <tr>
                            <td>
                                <p>Col 1, Row 1</p>
                            </td>
                            <td>
                                <p>Col 2, Row 1</p>
                            </td>
                            <td>
                                <p>Col 3, Row 1</p>
                            </td>
                        </tr>
                        <tr>
                            <td>There is only one column here</td>
                        </tr>
                        <tr>
                            <td>
                                <p>Col 1, Row 3</p>
                            </td>
                            <other>
                                <p>Col 2, Row 3</p>
                            </other>
                            <td>
                                <p>Col 3, Row 3</p>
                            </td>
                        </tr>
                    </table>
                </document>
            </value>
        ) as any) as Value;

        const output = createValue(
            <table>
                <tr>
                    <td>
                        <p>Col 1, Row 1</p>
                    </td>
                    <td>
                        <p>Col 2, Row 1</p>
                    </td>
                    <td>
                        <p>Col 3, Row 1</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>There is only one column here</p>
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
                        <p>Col 1, Row 3</p>
                    </td>
                    <td>
                        <p>
                            <text />
                        </p>
                    </td>
                    <td>
                        <p>Col 3, Row 3</p>
                    </td>
                </tr>
            </table>,
        );

        const editor = createEditor(input);

        expect(editor.value.toJSON()).toEqual(output.toJSON());
    });
});
